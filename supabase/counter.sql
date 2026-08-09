-- 瀏覽計數器 · Supabase 設定（多站共用單一專案）
-- 套用方式：在 Supabase 儀表板 → SQL Editor → New query，整段貼上後按 Run。
--
-- 安全設計：
--   1. 資料表開啟 RLS 且不建立任何 policy，前端金鑰無法直接讀寫
--   2. 匿名使用者只能呼叫累加與純讀取兩個 RPC
--   3. 累加函式只能更新既有列，無法用任意 slug 建立新列
--   4. security definer 搭配固定 search_path，避免 search_path 注入
--   5. 函式內固定 slug 白名單，拒絕未核准頁面

-- ---------------------------------------------------------------
-- 1. 計數表與核准頁面
-- ---------------------------------------------------------------
create table if not exists public.page_hits (
  slug       text primary key,
  hits       bigint      not null default 0,
  updated_at timestamptz not null default now()
);

insert into public.page_hits (slug, hits)
values
  ('timeline',                  0), -- /detective-conan-narrative-analysis/
  ('idle-creator-journey',      0), -- /idle-creator-journey/
  ('pikmin-planner',            0), -- /pikmin-planner/
  ('black-org-evidence-board',  0)  -- /black-org-evidence-board/
on conflict (slug) do nothing;

-- ---------------------------------------------------------------
-- 2. 開啟 RLS，且刻意不建立任何 policy
-- ---------------------------------------------------------------
alter table public.page_hits enable row level security;

-- ---------------------------------------------------------------
-- 3. 累加函式（原子操作，回傳累加後的數字）
-- ---------------------------------------------------------------
create or replace function public.bump_hits(page_slug text)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  n bigint;
begin
  if page_slug is null or page_slug not in (
    'timeline',
    'idle-creator-journey',
    'pikmin-planner',
    'black-org-evidence-board'
  ) then
    raise exception 'unknown page slug: %', page_slug using errcode = '22023';
  end if;

  update public.page_hits
     set hits = hits + 1,
         updated_at = now()
   where slug = page_slug
  returning hits into n;

  if n is null then
    raise exception 'unknown page slug: %', page_slug using errcode = '22023';
  end if;

  return n;
end;
$$;

-- ---------------------------------------------------------------
-- 4. 純讀取函式（同一瀏覽階段重新整理時使用）
-- ---------------------------------------------------------------
create or replace function public.read_hits(page_slug text)
returns bigint
language plpgsql
security definer
stable
set search_path = public
as $$
declare
  n bigint;
begin
  if page_slug is null or page_slug not in (
    'timeline',
    'idle-creator-journey',
    'pikmin-planner',
    'black-org-evidence-board'
  ) then
    raise exception 'unknown page slug: %', page_slug using errcode = '22023';
  end if;

  select hits
    into n
    from public.page_hits
   where slug = page_slug;

  if n is null then
    raise exception 'unknown page slug: %', page_slug using errcode = '22023';
  end if;

  return n;
end;
$$;

-- ---------------------------------------------------------------
-- 5. 權限：只放行這兩個函式給未登入使用者
-- ---------------------------------------------------------------
revoke all on function public.bump_hits(text) from public;
revoke all on function public.read_hits(text) from public;

grant execute on function public.bump_hits(text) to anon;
grant execute on function public.read_hits(text) to anon;

-- 驗證範例：
-- select public.read_hits('black-org-evidence-board');
-- select public.bump_hits('black-org-evidence-board');
