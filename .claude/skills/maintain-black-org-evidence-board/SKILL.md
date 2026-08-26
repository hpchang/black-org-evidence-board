---
name: maintain-black-org-evidence-board
description: 維護黑衣組織證據板的證據資料、詳細情報、關係連線、Noir SVG 插畫、離線靜態 UI、standalone 產物或部署設定時使用；也適用於同步三份資料、驗證 file:// 相容性、重建單檔版，以及判讀專案進度與待決策事項。
---

# 維護黑衣組織證據板

## 先確認權威來源

1. 先讀 `CLAUDE.md`，遵守專案架構、資料不變量與驗證指令。
2. 以 split source 為權威：`index.html`、`styles.css`、`script.js`。
3. 以 `script.js` 的 `evidenceData` 與 `evidenceDetails` 判斷目前實作狀態；用 `data.json`、`black-org-evidence-data.json` 核對部署資料。
4. 將 `black-org-evidence-board.html` 視為生成檔，不直接編輯。
5. 將 `README.md`、`HANDOFF.md`、`DETAILS_GUIDE.md` 視為補充資料。若它們與程式或目前資料不一致，先回報漂移，不以歷史敘述覆蓋現況。

目前基準是 19 筆唯一線索、19 筆完整第二層詳細情報與 19 張原創 Noir SVG。不要重新開啟已完成的 UI 選型或「全數待補」工作。

## 整理證據資料

- 保留 `evidenceData.description` 為短版側欄摘要；完整策展情報寫入以穩定 ID 為鍵的 `evidenceDetails`。
- 每筆詳細情報使用既有欄位：
  - `identity`
  - `aliases[]`
  - `affiliations[]`
  - `timeline[]`
  - `relationships[]`
  - `relatedItems[]`
  - `confirmedFacts[]`
  - `unconfirmed[]`
  - `sources[]`
- `timeline` 項目使用 `{ label, content, targetId? }`。
- `relationships` 項目使用 `{ targetId, summary }`。
- `relatedItems` 可使用純字串、既有節點 ID，或 `{ name, targetId }`。
- `sources` 使用 `{ site, title, url }`。
- 只根據使用者提供材料或可核實來源整理內容。改寫成繁體中文，不大量複製第三方百科原文，不自行補寫劇情。
- 清楚分開 `confirmedFacts` 與 `unconfirmed`；矛盾或未證實內容不得寫成已確認事實。
- 既有卡片的引用必須使用穩定 `targetId`，不依名稱猜測。無獨立卡片的人物維持純文字。
- 延續既有 DOM 建構與 `textContent` 模式；不要把外部材料直接插入 `innerHTML`。

## 管理卡片與關係

- 新增卡片前先取得使用者確認，再建立唯一且穩定的 ID。
- 新增卡片時同步：
  1. `script.js` 的 `evidenceData` 與必要的 `evidenceDetails`／`cardArt`。
  2. `data.json`。
  3. `black-org-evidence-data.json`。
  4. `index.html` 的硬編碼總數。
- 新增關係前先取得使用者確認。更新 `connections` 時通常維持雙向關係，除非劇情語意明確要求單向。
- 所有 connection target 必須存在；無效 `targetId` 不得進入正式資料。
- 目前未決項目只有 project memory 記錄的候選人物建卡與候選關係，不要自行採納。

## 維持離線靜態架構

- 保持 dependency-free、offline-first，且 `index.html` 可直接由 `file://` 開啟。
- 不把證據資料改成 runtime `fetch`，不新增 framework、bundler、CDN、外部字型或執行時外部圖片。
- Supabase 計數器只是可失敗的線上增強功能；逾時、離線或 RPC 失敗時，證據板核心功能仍須正常。
- 不把 publishable key 當秘密；絕不提交 service-role key、資料庫密碼或管理員憑證。
- repo 內存在 `supabase/counter.sql` 不代表共享 Supabase 專案已套用 migration。沒有外部驗證時只描述為「migration 檔已備妥」。

## 維護 Noir SVG 插畫

- 延續自行繪製、統一風格、離線內嵌的原創 Noir SVG，不抓取或重製外部官方圖片。
- 使用既有 `cardArt` 展示層資產；同一份 SVG 同時供卡片縮圖與側欄大圖使用。
- 維持 240×200 畫布、淺米線稿與深色背景的視覺語彙，並以輪廓、髮型或案件象徵物區分線索。
- 插畫不寫入兩份資料 JSON。

## 同步三份證據資料

每次更改 `evidenceData` 後，同步並檢查：

- `script.js` 內嵌資料
- `data.json`
- `black-org-evidence-data.json`

同步規則：

- ID 唯一且三份集合一致。
- `type` 只能是 `person`、`code`、`event`、`item`。
- 所有 `connections` target 都存在。
- 比較 JSON 時先按 `id` 建立 map，再比較每筆內容；不要直接用頂層陣列順序判定同步結果。
- 目前兩份 JSON 按 ID 比較語意相同，但 `p11` 的陣列位置不同；除非任務明確要求 canonical ordering，不要把此順序差異誤判為資料缺漏。

## 禁止事項

- 不直接編輯生成的 standalone HTML。
- 不新增 runtime data fetch 或破壞 `file://` 的依賴。
- 不自行建立未確認的人物卡片或關係。
- 不把推測寫成已確認情報，也不大量複製第三方原文。
- 不把 SQL 檔存在 repo 解讀為 migration 已部署。
- 不把 JSON 頂層陣列順序差異誤判為資料內容不同。

## 重建生成檔

修改 `index.html`、`styles.css`、`script.js` 或 favicon 後執行：

```bash
python3 tools/build_standalone.py
```

確認 `black-org-evidence-board.html` 已內嵌 CSS、JavaScript 與 favicon。若只更新 skill、memory 或一般文件，不需要重建網站。

修改 Open Graph 圖片設計或來源照片時才執行：

```bash
swift tools/generate_og.swift
```

保留 `assets/og/` 的來源與 attribution，並維持 metadata image URL 為絕對網址。

## 驗證

至少執行與變更範圍相符的檢查。

JavaScript 語法：

```bash
node --check script.js
```

JSON 與 connection targets：

```bash
python3 - <<'PY'
import json
from pathlib import Path
items = json.loads(Path("data.json").read_text())
ids = {item["id"] for item in items}
missing = sorted({target for item in items for target in item["connections"] if target not in ids})
assert len(ids) == len(items), "duplicate evidence IDs"
assert not missing, f"missing connection targets: {missing}"
assert all(item["type"] in {"person", "code", "event", "item"} for item in items)
print(f"validated {len(items)} evidence records")
PY
```

資料變更時另以 ID map 比較兩份 JSON，並核對 `script.js` 的 embedded `evidenceData`。不要只比較 raw array equality。

UI 或互動變更時，依影響路徑實測：

- 卡片 Pointer Events 拖曳
- Enter／Space 選取
- 詳細情報展開／收合
- 分類篩選
- 側欄關係導覽
- reset
- `file://` 離線開啟
- 必要時以本地 HTTP server 檢查瀏覽器行為

## 響應式 UI 與狀態維護經驗

這個專案的 responsive layout 不只是 CSS 排版，而是 CSS 尺寸、JavaScript 座標 map、visibility state、ARIA 與 scroll state 共同形成的契約。修改其中一層時要同步檢查其餘各層。

- `.pinboard` 是固定 `1800×1240` 邏輯畫布。若 mobile `.board-wrapper` 改成 flex column，`.pinboard` 必須維持不可收縮（例如 `flex: 0 0 auto`）；否則 `clientHeight` 會縮成 viewport 剩餘高度，座標 clamp、SVG 與內部 scroll range 會一起失真。
- 手機初始座標必須以實際卡片 geometry 驗證，不可只看 `x/y` 數字。以目前 `154px` 寬、`190px` 最小高度為基準，計算每對矩形是否相交；核心 seed 不屬於 `autoPositionedNodeIds`，不能期待 overlap resolver 修復。
- 跨 breakpoint 不只切換 `positionsByLayout` 別名，也要重建該 layout 的 state invariant。mobile local 以 `active + 一階關聯` 顯示、desktop local 以 `core + expanded + active` 顯示，因此 mobile→desktop 時需將 active node 恢復為 expanded 並在 desktop map seed 關聯位置。
- `aria-expanded` 應描述使用者看到／控制的 semantic state，不一定等於內部集合。mobile local 雖不累積 `expandedNodeIds`，active card 的 dossier 與一階網絡已展開；應以共用 helper 同步卡片文案和 ARIA。
- 動態 replacement 的 scroll state 不會自動回到頂端。`sidebarContent.replaceChildren(...)` 後要明確重設 `scrollTop = 0`，避免新卷宗沿用舊卷宗的深層位置。
- 元件移動後要重新檢查所有 parent responsive rules。計數器從 HUD 移到 `.sidebar-footer` 後，若舊 breakpoint 還有 `.sidebar-footer { display: none; }`，即使 RPC 成功與 `hidden=false` 也不會顯示；mobile grid 也需為恢復的 footer 配置明確 row。
- 每個 breakpoint 至少測「邊界值」與「剛跨過邊界」：`880/879px`、`620/619px`，另以 `390×844` 檢查手機首屏。特別測 resize 前後的 active node、rendered relations、scroll offset、ARIA、footer/counter 與 logical canvas 高度。
- 沒有 Playwright dependency 時，可使用已安裝 Chrome 的 headless mode + Chrome DevTools Protocol 做臨時驗證；仍要實際互動並檢查 screenshot、DOM geometry、runtime exceptions，而不是只確認頁面能載入。不要使用 `--no-sandbox`。
- `file://` 要分別驗證 split `index.html` 與 generated standalone；standalone 應沒有 `styles.css`、`script.js` 或本地 card-art runtime dependency。

## 部署到 GitHub Pages

本專案沿用 `/Users/hpchang/Documents/claude/MyProjects/GITHUB_PAGES_DEPLOYMENT_STANDARD.md` 的通用靜態部署標準：GitHub Pages classic branch deployment，source = `main` / `/`，帳號層級 custom domain `www.hpchang.com`，project repo 不加 CNAME、不建 `gh-pages` 分支、不建 Actions workflow。正式網址為 `https://www.hpchang.com/black-org-evidence-board/`。部署 = 把 source 推到 `main`，Pages 自動重建。

### 部署前檢查

- `node --check script.js`
- 兩份 JSON 的 ID / connection validation（見上方「驗證」）。
- standalone freshness：先備份 `black-org-evidence-board.html`，跑 `python3 tools/build_standalone.py`，`diff` 確認無 stale。若 source 有改過卻沒重建，部署前一定要重建。
- SEO 與路徑：`index.html` 的 canonical / og:url / og:image / twitter:image 用 `https://www.hpchang.com/black-org-evidence-board/...` 絕對網址；站內資源（`styles.css`、`script.js`、`./favicon/...`、`./assets/...`）必須是相對路徑，不可出現 `/assets/...` 這種從網域根起算的路徑，否則在 `/<slug>/` 子路徑會 404。

### 部署

工作分支先 fast-forward 進 `main` 再 push（`main` 通常可乾淨 fast-forward）：

```bash
git checkout main
git merge --ff-only <工作分支>
git push origin main
```

若工作分支已不需要，部署後 `git branch -d <工作分支>` 清理本地；遠端若無此分支就不必另外刪除。

### 部署後驗證

```bash
# Pages source 仍為 main / /，且觀察 build 狀態
gh api repos/hpchang/black-org-evidence-board/pages --jq '{status, source:.source, https_enforced}'

# 輪詢最新 build 直到 built（building 時每 ~5s 重查，通常 1-2 分鐘）
gh api repos/hpchang/black-org-evidence-board/pages/builds --jq '.[0] | .status+" "+.commit'

# 正式頁 HTTP 200
curl -s -o /dev/null -w "%{http_code}\n" -L https://www.hpchang.com/black-org-evidence-board/

# 確認 title / canonical / og:url / og:image
curl -s -L https://www.hpchang.com/black-org-evidence-board/ | grep -oiE '<title>[^<]*</title>|rel="canonical"[^>]*|og:url"[^>]*|og:image"[^>]*'

# 首頁引用的 css/js/json/favicon/og-image/card-art 逐一 curl，全 200
```

### 注意

- Pages API 的 `https_enforced` 可能為 `false`；GitHub 仍會自動跳 HTTPS 且憑證已 approved，但若要強制 HTTPS 需在 repo Settings → Pages 勾 Enforce HTTPS（部署時可順便詢問使用者）。
- Pages build 即使 API 顯示 timeout，仍需直接 `curl` 正式頁確認是否已更新。
- `supabase/counter.sql` 是否已套用於共享 Supabase 專案，repo 無法證實；計數器 fail-silent，不影響部署驗證。

## 交付前檢查

- 說明修改了哪些權威 source 與生成檔。
- 說明三份資料是否同步、採用何種 ID-based 比較。
- 如有未執行的 browser、Supabase 或部署驗證，明確列出，不推測成功。
- 不自動 commit 或 push；只有使用者明確要求時才進行。
