import { useMemo, useState, type ChangeEvent, type ReactNode } from "react";
import {
  AlertCircle,
  FolderKanban,
  LoaderCircle,
  Plus,
  Search,
  UsersRound,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import { Card } from "../../../components/ui/Card/Card";
import { useWorkspaces } from "../../workspaces/useWorkspaces";
import { CreateTeamModal } from "./CreateTeamModal";
import { useTeams } from "../useTeams";
import type { CreateTeamInput } from "../types";

export const TeamsOverview = () => {
  const { t } = useTranslation("teams");
  const { workspaces, isLoading: areProjectsLoading, error: projectsError } =
    useWorkspaces();
  const {
    teams,
    isLoading,
    isAuthenticated,
    error,
    createTeam,
    reloadTeams,
  } = useTeams();
  const [query, setQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const filteredTeams = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (!normalizedQuery) return teams;

    return teams.filter((team) => {
      const matchesName = team.name.toLocaleLowerCase().includes(normalizedQuery);
      const matchesDescription = team.description
        .toLocaleLowerCase()
        .includes(normalizedQuery);
      const matchesProject = team.projects.some((project) =>
        project.name.toLocaleLowerCase().includes(normalizedQuery),
      );

      return matchesName || matchesDescription || matchesProject;
    });
  }, [query, teams]);

  const projectCount = new Set(
    teams.flatMap((team) => team.projects.map((project) => project.id)),
  ).size;
  const memberCount = teams.reduce((total, team) => total + team.memberCount, 0);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleCreateTeam = async (input: CreateTeamInput) => {
    setIsCreating(true);
    try {
      await createTeam(input);
      setIsCreateOpen(false);
    } finally {
      setIsCreating(false);
    }
  };

  if (!isAuthenticated && !isLoading) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-10 text-center sm:py-14">
        <UsersRound
          size={25}
          className="mx-auto mb-3 text-[var(--color-primary)]"
          aria-hidden="true"
        />
        <h3 className="font-semibold text-[var(--color-text)]">
          {t("signInToSeeTeams")}
        </h3>
        <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-[var(--color-text-muted)]">
          {t("signInToSeeTeamsDescription")}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      {error ? (
        <div className="flex flex-col gap-3 rounded-xl border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/5 p-4 sm:flex-row sm:items-center">
          <AlertCircle
            size={18}
            className="shrink-0 text-[var(--color-danger)]"
            aria-hidden="true"
          />
          <p className="flex-1 text-sm text-[var(--color-danger)]">
            {t("loadError")}: {error}
          </p>
          <button
            type="button"
            onClick={() => void reloadTeams()}
            className="
              self-start 
              rounded-lg 
              border 
              border-[var(--color-border)] 
              px-3 
              py-2 
              text-sm 
              font-medium 
              text-[var(--color-text)] 
              transition-colors 
              hover:bg-[var(--color-surface-hover)] 
              sm:self-auto
            "
          >
            {t("retry")}
          </button>
        </div>
      ) : isLoading ? (
        <div className="
          flex 
          min-h-36 
          items-center 
          justify-center 
          gap-2 
          rounded-xl 
          border 
          border-[var(--color-border)] 
          bg-[var(--color-surface)] 
          text-sm 
          text-[var(--color-text-muted)]
          "
        >
          <LoaderCircle size={17} className="animate-spin" aria-hidden="true" />
          {t("loadingTeams")}
        </div>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            <SummaryCard
              icon={<UsersRound size={18} />}
              label={t("summary.teams")}
              value={teams.length}
            />
            <SummaryCard
              icon={<UsersRound size={18} />}
              label={t("summary.members")}
              value={memberCount}
            />
            <SummaryCard
              icon={<FolderKanban size={18} />}
              label={t("summary.projects")}
              value={projectCount}
            />
          </div>

          <section>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text)]">
                  {t("listTitle")}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {t("listDescription")}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsCreateOpen(true)}
                className="
                  inline-flex 
                  h-10 
                  cursor-pointer 
                  items-center 
                  justify-center 
                  gap-2 
                  rounded-[var(--radius-md)] 
                  bg-[var(--color-primary)]
                  px-4 
                  text-sm 
                  font-medium 
                  text-[var(--color-primary-foreground)] 
                  transition-colors 
                  hover:bg-[var(--color-primary-hover)]
                "
              >
                <Plus size={17} />
                {t("createTeam")}
              </button>
            </div>

            {teams.length > 0 && (
              <label className="relative mb-4 block max-w-md">
                <Search
                  size={17}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={handleSearch}
                  placeholder={t("searchPlaceholder")}
                  aria-label={t("searchLabel")}
                  className="
                    h-11 
                    w-full 
                    rounded-xl 
                    border 
                    border-[var(--color-border)] 
                    bg-[var(--color-surface)] 
                    pl-10 
                    pr-4 
                    text-sm 
                    text-[var(--color-text)] 
                    outline-none 
                    transition-colors 
                    placeholder:text-[var(--color-text-muted)] 
                    focus:border-[var(--color-primary)]
                  "
                />
              </label>
            )}

            {filteredTeams.length > 0 ? (
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {filteredTeams.map((team) => (
                  <Card key={team.id} className="flex h-full flex-col p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                        <UsersRound size={19} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-semibold text-[var(--color-text)]">
                          {team.name}
                        </h4>
                        <p className="mt-1 min-h-10 text-sm leading-5 text-[var(--color-text-muted)]">
                          {team.description || t("noDescription")}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-5 border-y border-[var(--color-border)] py-3">
                      <TeamMetric
                        icon={<UsersRound size={15} />}
                        value={team.memberCount}
                        label={t("memberCountLabel")}
                      />
                      <TeamMetric
                        icon={<FolderKanban size={15} />}
                        value={team.projects.length}
                        label={t("projectCountLabel")}
                      />
                    </div>

                    <div className="mt-4">
                      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                        {t("linkedProjects")}
                      </p>
                      {team.projects.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {team.projects.map((project) => (
                            <span
                              key={project.id}
                              className="
                                inline-flex 
                                max-w-full 
                                items-center 
                                gap-2 
                                rounded-full 
                                border 
                                border-[var(--color-border)] 
                                bg-[var(--color-background)] 
                                px-2.5 
                                py-1.5 
                                text-xs 
                                text-[var(--color-text-secondary)]
                              "
                            >
                              <span
                                className="h-2 w-2 shrink-0 rounded-full"
                                style={{ backgroundColor: project.color }}
                                aria-hidden="true"
                              />
                              <span className="truncate">{project.name}</span>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-[var(--color-text-muted)]">
                          {t("noLinkedProjects")}
                        </p>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-[var(--color-border)] px-5 py-10 text-center">
                <Search
                  size={22}
                  className="mx-auto mb-3 text-[var(--color-text-muted)]"
                  aria-hidden="true"
                />
                <p className="font-medium text-[var(--color-text)]">
                  {teams.length === 0 ? t("emptyTeams") : t("noTeamsFound")}
                </p>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {teams.length === 0
                    ? t("emptyTeamsDescription")
                    : t("noTeamsFoundDescription")}
                </p>
              </div>
            )}
          </section>
        </>
      )}

      {isCreateOpen && (
        <CreateTeamModal
          projects={workspaces}
          isProjectsLoading={areProjectsLoading}
          projectsError={projectsError}
          isSubmitting={isCreating}
          onClose={() => setIsCreateOpen(false)}
          onSubmit={handleCreateTeam}
        />
      )}
    </div>
  );
};

interface SummaryCardProps {
  icon: ReactNode;
  label: string;
  value: number;
}

const SummaryCard = ({ icon, label, value }: SummaryCardProps) => (
  <Card className="flex items-center gap-3 p-4 sm:p-5">
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
      {icon}
    </span>
    <div>
      <p className="text-2xl font-semibold leading-none text-[var(--color-text)]">
        {value}
      </p>
      <p className="mt-1.5 text-xs text-[var(--color-text-muted)]">{label}</p>
    </div>
  </Card>
);

interface TeamMetricProps {
  icon: ReactNode;
  value: number;
  label: string;
}

const TeamMetric = ({ icon, value, label }: TeamMetricProps) => (
  <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
    {icon}
    <span className="text-sm font-semibold text-[var(--color-text)]">{value}</span>
    <span className="text-xs">{label}</span>
  </div>
);
