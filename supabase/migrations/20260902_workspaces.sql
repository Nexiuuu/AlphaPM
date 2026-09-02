-- Applied to production on 2026-09-02; kept here so the schema is reproducible.
alter table private.projects
  add column if not exists name text,
  add column if not exists color text;

update private.projects
set name = coalesce(nullif(btrim(name), ''), 'Workspace ' || id::text),
    color = coalesce(nullif(btrim(color), ''), '#6366f1')
where name is null or btrim(name) = '' or color is null or btrim(color) = '';

alter table private.projects
  alter column name set not null,
  alter column color set default '#6366f1',
  alter column color set not null;

create or replace function api.get_projects()
returns setof private.projects
language sql
stable
security definer
set search_path = ''
as $$
  select p.*
  from private.projects p
  where p.owner_id = (select auth.uid())
     or exists (
       select 1
       from private.project_members pm
       where pm.project_id = p.id
         and pm.user_id = (select auth.uid())
     )
  order by p.created_at desc;
$$;

revoke all on function api.get_projects() from public, anon;
grant execute on function api.get_projects() to authenticated;

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
begin
  if v_user_id is null then
    raise exception 'Authentication required' using errcode = '28000';
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
