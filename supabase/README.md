# Supabase 瀏覽計數器

本目錄提供 `ARCHIVE ACCESS` 瀏覽計數器的資料庫設定。前端使用既有共享 Supabase 專案的 publishable key，頁面 slug 為 `black-org-evidence-board`。

## 套用方式

1. 登入既有共享 Supabase 專案。
2. 開啟 **SQL Editor → New query**。
3. 完整閱讀並貼上 [`counter.sql`](./counter.sql)。
4. 執行 SQL，確認沒有錯誤。
5. 在 SQL Editor 驗證：

```sql
select public.read_hits('black-org-evidence-board');
select * from public.page_hits where slug = 'black-org-evidence-board';
```

`counter.sql` 可重複執行：資料表與列使用 `if not exists`／`on conflict do nothing`，RPC 使用 `create or replace function`。

## 安全模型

- `page_hits` 開啟 RLS，而且不建立匿名讀寫 policy。
- 瀏覽器只能呼叫 `bump_hits` 與 `read_hits`。
- RPC 只接受固定白名單中的 slug，累加也只能更新既有列。
- 函式使用 `security definer` 與固定 `search_path = public`。
- 前端的 `sb_publishable_...` key 本來就會公開傳送到瀏覽器；它不是資料庫密碼或 service-role secret。

請勿把 database password、service-role key 或其他管理員憑證寫入本專案。公開計數器仍可能被人工重複呼叫而灌高數字；若未來需要更強的防濫用能力，應在伺服器端加入速率限制或驗證。

## 前端失敗行為

Supabase 尚未套用 SQL、無網路、被瀏覽器阻擋或超過 8 秒時，頁面會靜默隱藏計數器，證據板仍可正常離線使用。
