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
