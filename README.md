# 黑衣組織互動式證據板

《名偵探柯南》黑衣組織關係資料的離線互動網頁。支援卡片拖曳、紅線即時連動、節點展開／收合、分類篩選、鍵盤操作與行動裝置觸控。

## 本地使用

四個核心檔案位於同一資料夾：

- `index.html`
- `styles.css`
- `script.js`
- `data.json`

直接雙擊 `index.html` 即可使用。資料已內嵌於 `script.js`，因此不需要啟動本機伺服器，也不會遇到 `file://` 讀取 JSON 的 CORS 限制。

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

`black-org-evidence-board.html` 是將 CSS 與 JavaScript 全部內嵌的單檔發布版本，適合直接傳送或嵌入無外部資源的環境。

## 第二層詳細情報

每張卡片側欄在「情報摘要」下方有「展開完整情報」按鈕，點擊就地展開完整檔案：

- 身分背景、別名、所屬組織／陣營
- 時間線、人物關係、相關物品
- 已確認情報、尚未確認或有爭議
- 資料來源（附網址，`target="_blank" rel="noopener noreferrer"`）

其中時間線、人物關係、相關物品若帶 `targetId`（指向現有線索），會渲染成可點的關聯 chip，點擊跳到該線索卡，與「直接關聯線索」共用同一個跳轉。連結對應穩定 ID，不靠名稱猜測。

詳細情報儲存於 `script.js` 的 `evidenceDetails`（以 ID 為鍵），資料模型見 `script.js` 頂部註解。填寫規範見 `TODO_DETAILS.md`。

## 當前進度

截至 2026-08-09：

- 19 筆線索、19 個唯一 ID，三份資料（`script.js` evidenceData / `data.json` / `black-org-evidence-data.json`）已同步。
- 19 筆的第二層詳細情報**已全部補完**，來源為 Detective Conan Wiki（Timeline）。
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

### 三、卡片插畫素材（尚未決定）

兩個方案：

- **方案一**：採 CC0 或 Creative Commons BY‑SA 授權素材（Pixabay、Unsplash、OpenClipart），下載後裁切、調色、標註來源與授權。
- **方案二**：自行繪製統一風格的日式漫畫插圖（簡潔線條、平塗色塊、黑白／單色調），匯出 PNG/SVG。

關鍵考量：

- 現有 `styles.css` 是固定 1800×1240 證據畫布的 Noir 黑紅偵探風格，插畫需配合此視覺系統，不能破壞一致性。
- 專案強調完全離線、無外部資源依賴——圖檔最終都應內嵌或隨專案附帶，不應執行時從外部載入（會破壞 `file://` 離線）。
- 此議題與資料填寫為兩條獨立線，可分別推進。

### 四、驗證方式

修改後應執行：

```bash
node --check script.js
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

並重新產生 `black-org-evidence-board.html`（內嵌 `styles.css` + `script.js`），再以本地 HTTP 確認各檔回傳 200。
