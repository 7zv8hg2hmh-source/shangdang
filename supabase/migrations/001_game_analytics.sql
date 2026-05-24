create extension if not exists pgcrypto;

create table if not exists public.game_sessions (
  id uuid primary key default gen_random_uuid(),
  visitor_id text not null,
  started_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  play_date date not null default ((now() at time zone 'Asia/Shanghai')::date)
);

create table if not exists public.game_analytics_totals (
  id boolean primary key default true,
  total_plays bigint not null default 0,
  updated_at timestamptz not null default now(),
  constraint one_row_only check (id)
);

insert into public.game_analytics_totals (id, total_plays)
values (true, 0)
on conflict (id) do nothing;

alter table public.game_sessions enable row level security;
alter table public.game_analytics_totals enable row level security;

create or replace function public.get_game_analytics()
returns jsonb
language sql
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'online', (
      select count(*) from public.game_sessions
      where last_seen_at >= now() - interval '2 minutes'
    ),
    'today', (
      select count(*) from public.game_sessions
      where play_date = ((now() at time zone 'Asia/Shanghai')::date)
    ),
    'total', (
      select total_plays from public.game_analytics_totals where id = true
    )
  );
$$;

create or replace function public.start_game_session(p_visitor_id text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_session_id uuid;
begin
  insert into public.game_sessions (visitor_id)
  values (left(coalesce(p_visitor_id, 'anonymous'), 120))
  returning id into v_session_id;

  update public.game_analytics_totals
  set total_plays = total_plays + 1,
      updated_at = now()
  where id = true;

  return public.get_game_analytics() || jsonb_build_object('session_id', v_session_id);
end;
$$;

create or replace function public.heartbeat_game_session(p_session_id uuid)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.game_sessions
  set last_seen_at = now()
  where id = p_session_id;

  return public.get_game_analytics();
end;
$$;

grant execute on function public.get_game_analytics() to anon, authenticated;
grant execute on function public.start_game_session(text) to anon, authenticated;
grant execute on function public.heartbeat_game_session(uuid) to anon, authenticated;

