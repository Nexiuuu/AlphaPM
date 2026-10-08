package pl.alphapm.website.task.data;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import pl.alphapm.website.global.enums.ProjectPermission;
import pl.alphapm.website.global.exceptions.BadRequestException;
import pl.alphapm.website.global.exceptions.ResourceNotFoundException;
import pl.alphapm.website.task.data.dto.CreateTaskRequestDTO;
import pl.alphapm.website.task.data.dto.UpdateTaskRequestDTO;
import pl.alphapm.website.task.data.entities.Task;
import pl.alphapm.website.task.data.entities.TaskDetails;

@Repository
public class SupabaseTaskRepository implements TaskRepository {

    private static final Logger logger = LoggerFactory.getLogger("SECURITY");
    private final JdbcTemplate jdbcTemplate;

    public SupabaseTaskRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private TaskDetails insertTask(
            CreateTaskRequestDTO request,
            UUID userId
    ) {
        String sql = """
            WITH inserted AS (
                INSERT INTO private.tasks (
                    name,
                    author_id,
                    project_id,
                    color,
                    starts_at,
                    ends_at,
                    all_day,
                    description,
                    visible_to
                )
                SELECT
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?::permissions
                WHERE EXISTS (
                    SELECT 1
                    FROM private.project_members
                    WHERE project_id = ?
                    AND user_id = ?
                    AND permissions IN ('member', 'admin', 'owner')
                    AND permissions >= ?::permissions
                )
                RETURNING
                    id,
                    name,
                    author_id,
                    project_id,
                    color,
                    starts_at,
                    ends_at,
                    all_day,
                    description,
                    visible_to,
                    created_at,
                    last_update
                )
            SELECT
                i.id,
                i.name,
                i.author_id,
                us.public_nickname,
                i.project_id,
                i.color,
                i.starts_at,
                i.ends_at,
                i.all_day,
                i.description,
                i.visible_to,
                i.created_at,
                i.last_update
            FROM inserted i
            LEFT JOIN private.user_settings us
                ON us.user_id = i.author_id
        """;

        try {
            return jdbcTemplate.queryForObject(
                    sql,
                    (s, rowNum) -> new TaskDetails(
                            s.getObject("id", UUID.class),
                            s.getString("name"),
                            s.getObject("author_id", UUID.class),
                            s.getString("public_nickname"),
                            s.getObject("project_id", UUID.class),
                            s.getString("color"),
                            s.getObject("starts_at", OffsetDateTime.class),
                            s.getObject("ends_at", OffsetDateTime.class),
                            s.getBoolean("all_day"),
                            List.of(),
                            List.of(),
                            s.getString("description"),
                            s.getObject("created_at", OffsetDateTime.class),
                            s.getObject("last_update", OffsetDateTime.class),
                            ProjectPermission.valueOf(s.getString("visible_to").toUpperCase())
                    ),
                    request.name(),
                    userId,
                    request.projectId(),
                    request.color(),
                    request.startsAt(),
                    request.endsAt(),
                    request.allDay(),
                    request.description(),
                    request.visibleTo().getValue(),
                    request.projectId(),
                    userId,
                    request.visibleTo().getValue()
            );
        } catch (EmptyResultDataAccessException e) {
            logger.warn("User {} attempted to create task in project {}", userId, request.projectId());
            throw new BadRequestException("Task couldn't be created");
        }
    }

    private void insertTaskGroupsTasks(
            UUID userId,
            UUID taskId,
            UUID projectId,
            List<UUID> groupIds
    ) {
        if (groupIds == null || groupIds.isEmpty()) {
            return;
        }

        String sql = """
            INSERT INTO private.task_group_tasks (
                task_id,
                task_group_id
            )
            SELECT
                ?,
                tg.id
            FROM private.task_groups tg
            WHERE tg.id = ?
            AND tg.project_id = ?
            """;

        int[][] results = jdbcTemplate.batchUpdate(
                sql,
                groupIds,
                groupIds.size(),
                (statement, groupId) -> {
                    statement.setObject(1, taskId);
                    statement.setObject(2, groupId);
                    statement.setObject(3, projectId);
                }
        );

        int i = 0;
        for (int[] batch : results) {
            for (int result : batch) {
                if (result != 1) {
                    logger.warn(
                            "User {} attempted to use task group {} outside project {}",
                            userId,
                            groupIds.get(i),
                            projectId
                    );
                    throw new ResourceNotFoundException("One or more groups do not exist!");
                }
                ++i;
            }
        }

    }

    private void insertTaskCategoriesTasks(
            UUID userId,
            UUID taskId,
            UUID projectId,
            List<UUID> categoryIds
    ) {
        if (categoryIds == null || categoryIds.isEmpty()) {
            return;
        }

        String sql = """
            INSERT INTO private.task_category_tasks (
                task_id,
                task_category_id
            )
            SELECT
                ?,
                tc.id
            FROM private.task_categories tc
            WHERE tc.id = ?
            AND tc.project_id = ?
        """;

        int[][] results = jdbcTemplate.batchUpdate(
                sql,
                categoryIds,
                categoryIds.size(),
                (statement, categoryId) -> {
                    statement.setObject(1, taskId);
                    statement.setObject(2, categoryId);
                    statement.setObject(3, projectId);
                }
        );

        int i = 0;
        for (int[] batch : results) {
            for (int result : batch) {
                if (result != 1) {
                    logger.warn(
                            "User {} attempted to use task category {} outside project {}",
                            userId,
                            categoryIds.get(i),
                            projectId
                    );
                    throw new ResourceNotFoundException("One or more categories do not exist!");
                }
                ++i;
            }
        }
    }

    @Transactional
    @Override
    public TaskDetails createTask(
            CreateTaskRequestDTO request,
            UUID userId
    ) {
        TaskDetails task = insertTask(request, userId);

        insertTaskGroupsTasks(
                userId,
                task.getId(),
                request.projectId(),
                request.groupsIds()
        );

        insertTaskCategoriesTasks(
                userId,
                task.getId(),
                request.projectId(),
                request.categoryIds()
        );

        return task;
    }

    @Override
    public List<Task> getTasks(
            UUID projectId,
            UUID userId
    ) {
        String sql = """
            SELECT
                t.id,
                t.name,
                t.author_id,
                t.project_id,
                t.color,
                t.starts_at,
                t.ends_at,
                t.all_day,
                t.description,
                t.created_at,
                t.last_update
            FROM private.tasks t
            JOIN private.project_members pm
                ON pm.project_id = t.project_id
            AND pm.user_id = ?
            WHERE t.project_id = ?
            AND pm.permissions >= t.visible_to
            ORDER BY t.starts_at
        """;

        return jdbcTemplate.query(
                sql,
                (s, rowNum) -> new Task(
                        s.getObject("id", UUID.class),
                        s.getString("name"),
                        s.getObject("author_id", UUID.class),
                        s.getObject("project_id", UUID.class),
                        s.getString("color"),
                        s.getObject("starts_at", OffsetDateTime.class),
                        s.getObject("ends_at", OffsetDateTime.class),
                        s.getBoolean("all_day"),
                        s.getString("description"),
                        s.getObject("created_at", OffsetDateTime.class),
                        s.getObject("last_update", OffsetDateTime.class)
                ),
                userId,
                projectId
        );
    }

    @Override
    public TaskDetails getTask(
            UUID taskId,
            UUID userId
    ) {
        String sql = """
            SELECT
                t.id,
                t.name,
                t.author_id,
                us.public_nickname,
                t.project_id,
                t.color,
                t.starts_at,
                t.ends_at,
                t.all_day,
                t.description,
                t.visible_to,
                t.created_at,
                t.last_update
            FROM private.tasks t
            JOIN private.project_members pm
                ON pm.project_id = t.project_id
            AND pm.user_id = ?
            LEFT JOIN private.user_settings us
                ON us.user_id = t.author_id
            WHERE t.id = ?
            AND pm.permissions >= t.visible_to
        """;

        try {
            return jdbcTemplate.queryForObject(
                    sql,
                    (s, rowNum) -> new TaskDetails(
                            s.getObject("id", UUID.class),
                            s.getString("name"),
                            s.getObject("author_id", UUID.class),
                            s.getString("public_nickname"),
                            s.getObject("project_id", UUID.class),
                            s.getString("color"),
                            s.getObject("starts_at", OffsetDateTime.class),
                            s.getObject("ends_at", OffsetDateTime.class),
                            s.getBoolean("all_day"),
                            List.of(),
                            List.of(),
                            s.getString("description"),
                            s.getObject("created_at", OffsetDateTime.class),
                            s.getObject("last_update", OffsetDateTime.class),
                            ProjectPermission.valueOf(
                                    s.getString("visible_to").toUpperCase()
                            )
                    ),
                    userId,
                    taskId
            );
        } catch (EmptyResultDataAccessException e) {
            logger.warn("User {} attempted to get task {}", userId, taskId);
            throw new ResourceNotFoundException("Task couldn't be found");
        }
    }

    @Override
    public TaskDetails updateTask(
            UUID taskId,
            UpdateTaskRequestDTO request,
            UUID userId
    ) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void deleteTask(
            UUID taskId,
            UUID userId
    ) {
        throw new UnsupportedOperationException();
    }
}
