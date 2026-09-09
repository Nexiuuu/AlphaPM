-- Basic accounts can access up to five workspaces.
create or replace function api.create_project(
  p_name text,
  p_color text default '#6366f1'
)
returns private.projects
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_project private.projects;
  v_projects_count integer;
begin
  if v_user_id is null then
    raise exception 'Authentication required' using errcode = '28000';
  end if;

  -- Prevent simultaneous requests from creating more than five workspaces.
  perform pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(v_user_id::text, 0)
  );

  select count(*)
  into v_projects_count
  from private.projects p
  where p.owner_id = v_user_id
     or exists (
       select 1
       from private.project_members pm
       where pm.project_id = p.id
         and pm.user_id = v_user_id
     );

  if v_projects_count >= 5 then
    raise exception 'Basic plan workspace limit reached (5)'
      using errcode = 'P0001';
  end if;

  if char_length(btrim(coalesce(p_name, ''))) not between 1 and 60 then
    raise exception 'Workspace name must contain between 1 and 60 characters';
  end if;

  if coalesce(p_color, '') !~ '^#[0-9A-Fa-f]{6}$' then
    raise exception 'Workspace color must use the #RRGGBB format';
  end if;

  insert into private.projects (owner_id, name, color)
  values (v_user_id, btrim(p_name), lower(p_color))
  returning * into v_project;

  return v_project;
end;
$$;

revoke all on function api.create_project(text, text) from public, anon;
grant execute on function api.create_project(text, text) to authenticated;
