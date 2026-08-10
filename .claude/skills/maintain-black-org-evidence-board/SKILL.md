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

## 交付前檢查

- 說明修改了哪些權威 source 與生成檔。
- 說明三份資料是否同步、採用何種 ID-based 比較。
- 如有未執行的 browser、Supabase 或部署驗證，明確列出，不推測成功。
- 不自動 commit 或 push；只有使用者明確要求時才進行。
