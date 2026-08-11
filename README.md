# 黑衣組織互動式證據板

《名偵探柯南》黑衣組織關係資料的離線互動網頁。支援卡片拖曳、紅線即時連動、節點展開／收合、分類篩選、鍵盤操作與行動裝置觸控。

## 正式部署

以下為目前記錄的公開部署資訊；repository 本身無法證明外部站點目前在線或 Supabase migration 已套用。

- 網址：<https://www.hpchang.com/black-org-evidence-board/>
- Open Graph 圖：`assets/og/black-org-evidence-board-og.png`（1200×630）
- Supabase 計數 slug：`black-org-evidence-board`

## 本地使用

四個核心檔案位於同一資料夾：

- `index.html`
- `styles.css`
- `script.js`
- `data.json`

直接雙擊 `index.html` 即可使用。資料已內嵌於 `script.js`，因此不需要啟動本機伺服器，也不會遇到 `file://` 讀取 JSON 的 CORS 限制。瀏覽計數器是線上增強功能；無網路、Supabase 未設定或請求逾時時會靜默隱藏，不影響證據板離線操作。

## 資料檔

- `data.json`：獨立資料來源，供伺服器或 API 環境使用。
- `black-org-evidence-data.json`：與 `data.json` 相同內容的部署命名版本。

若改為伺服器動態載入，可將 `script.js` 頂端的 `evidenceData` 改為 `let evidenceData = []`，並在非同步初始化流程中使用：

```js
const response = await fetch("data.json");
evidenceData = await response.json();
```

## 新增線索

每筆資料須包含：

```json
{
  "id": "c5",
  "type": "code",
  "name": "香緹 (Chianti)",
  "description": "組織狙擊手。",
  "connections": ["c2"]
}
```

可用類型：`person`、`code`、`event`、`item`。為讓資料關係完整，建議在兩端節點的 `connections` 中都加入對方 ID。

## 單檔版本

`black-org-evidence-board.html` 是將 CSS 與 JavaScript 全部內嵌的單檔發布版本，適合直接傳送或嵌入無外部程式資源的環境。它與 `index.html` 使用相同的線上計數器；離線開啟時請求失敗會被忽略。

來源檔更新後，用標準函式庫生成器重建：

```bash
python3 tools/build_standalone.py
```

生成器會內嵌目前的 `styles.css`、`script.js` 與 SVG favicon；請勿在單檔版做獨立修改。

## 社群分享圖與素材授權

- 最終圖：`assets/og/black-org-evidence-board-og.png`
- 可重建設計：`swift tools/generate_og.swift`
- 原始軟木板照片與 CC BY 4.0 標示：[`assets/og/CREDITS.md`](assets/og/CREDITS.md)

社群 metadata 使用正式站上的絕對 HTTPS 圖片網址，避免分享爬蟲無法解析相對路徑。

## Supabase 瀏覽計數器

證據板 HUD 會在取得有效數字後顯示 `ARCHIVE ACCESS`。同一瀏覽階段第一次載入呼叫 `bump_hits`，重新整理則呼叫 `read_hits`，避免同一個分頁階段重複累加；請求 8 秒逾時或失敗時不顯示。

資料庫 migration 與安全模型說明位於 [`supabase/`](supabase/README.md)。`supabase/counter.sql` 是已備妥的 migration 檔；共享 Supabase 專案是否已實際套用，需於外部專案驗證，repository 內容無法證明。若尚未套用、網路不可用或請求逾時，計數器會靜默隱藏，證據板核心功能仍可離線運作。

## 第二層詳細情報

每張卡片側欄在「情報摘要」下方有「展開完整情報」按鈕，點擊就地展開完整檔案：

- 身分背景、別名、所屬組織／陣營
- 時間線、人物關係、相關物品
- 已確認情報、尚未確認或有爭議
- 資料來源（附網址，`target="_blank" rel="noopener noreferrer"`）

其中時間線、人物關係、相關物品若帶 `targetId`（指向現有線索），會渲染成可點的關聯 chip，點擊跳到該線索卡，與「直接關聯線索」共用同一個跳轉。連結對應穩定 ID，不靠名稱猜測。

詳細情報儲存於 `script.js` 的 `evidenceDetails`（以 ID 為鍵），資料模型見 `script.js` 頂部註解。填寫與增修規範見 `DETAILS_GUIDE.md`。

## 當前進度

截至 2026-08-09：

- 19 筆線索、19 個唯一 ID，三份資料（`script.js` evidenceData / `data.json` / `black-org-evidence-data.json`）已同步。
- 19 筆線索皆有策展詳細內容與來源（主要來源為 Detective Conan Wiki Timeline），個別欄位可依資料情況留空。
- 已建立 git 版本控制（main 分支）。

## 後續待處理

### 一、待確認是否建立獨立卡片

前批材料的時間線／關係中反覆提及、但目前無獨立卡片的人物。若建卡需使用者確認，不會自動新增：

- Amanda Hughes（阿曼達·休斯）— 與羽田浩司命案、朗姆、若狹留美、黑田兵衛相關
- 工藤優作 — 與工藤新一、烏丸蓮耶、羽田浩司命案相關
- 赤井務武 — 與赤井秀一、羽田浩司命案相關
- 赤井瑪麗（Mary Sera）— 與赤井秀一、APTX 4869、苦艾酒相關
- 卡邁爾 — 與赤井秀一、琴酒、伏特加相關
- 基安蒂／科倫（狙擊手）— 與琴酒、伏特加、卡邁爾相關

建卡流程：新增卡片 + 同步三份資料 + 更新 `index.html` 的硬編碼計數 + 重新產生 `black-org-evidence-board.html` + 驗證 + commit。

### 二、關係連線補強候選

以下關係值得補強但目前未建立直接連線（APTX 4869 → 烏丸蓮耶 的反向連線已於前次加入）：

1. 朗姆（c1）→ 工藤新一／柯南（p4）
2. 伏特加（c3）→ 朗姆（c1）
3. 安室透（p9）→ 赤井秀一（p8）
4. 琴酒（c2）→ 宮野志保（p5）

是否加入由使用者確認；加入時應盡量雙向，並同步三份資料。

### 三、卡片插畫素材（本地 proposal image 為主，原創 Noir SVG 為 fallback）

目前 19 筆線索的圖像流程：

- 本地 proposal image（`assets/card-art/`）為卡片縮圖與側欄大圖的主要圖像；來源與版權狀態記錄於 `assets/card-art/SOURCES.json`。
- 原創 Noir 漫畫線稿 `cardArt` 內嵌於 `script.js`，作為本地圖片載入失敗時的離線 fallback；人物以髮型、輪廓與案件象徵物建立辨識度，不直接重製動畫／漫畫官方圖像。
- 組織代號、事件與物品使用酒器、實驗器材、案件現場與關鍵物證等符號構圖。
- 兩套資產共用同一 `createArtFigure()` 流程：先載入本地圖片，`error` 時退回 SVG，確保 `file://` 與完全離線時核心功能仍可完整運作。
- Proposal image 的正式部署權利需另行確認；未確認前可替換或清除為 SVG fallback。

插圖統一採用 240×200 畫布、淺米色主線與深色背景，配合固定 1800×1240 證據畫布的 Noir 黑紅視覺系統。修改插圖後需重新產生 `black-org-evidence-board.html`。

### 四、驗證方式

修改後應執行：

```bash
node --check script.js
swift tools/generate_og.swift
python3 tools/build_standalone.py
python3 - <<'PY'
import json
from pathlib import Path
for fn in ["data.json", "black-org-evidence-data.json"]:
    items = json.loads(Path(fn).read_text())
    ids = {i["id"] for i in items}
    assert len(ids) == len(items)
    assert not {t for i in items for t in i["connections"] if t not in ids}
    assert all(i["type"] in {"person","code","event","item"} for i in items)
    print(fn, len(items), "valid")
PY
```

再以本地 HTTP 確認頁面與 `assets/og/black-org-evidence-board-og.png` 回傳 200，並檢查正式頁的 canonical、Open Graph、Twitter metadata 與 Supabase 計數器。直接以 `file://` 開啟來源版及單檔版時，也須確認拖曳、篩選、卷宗導航與重設功能不受網路失敗影響。
