# 後續模型移交摘要

## 一、專案概況

專案名稱：**《名偵探柯南》黑衣組織互動式證據板**

專案位置：

```text
/Users/hpchang/Documents/claude/MyProjects/black_organization_of_conan
```

無框架、無套件依賴、可完全離線使用的靜態網頁。使用者可直接雙擊 `index.html`，不需本機伺服器。整體視覺為黑紅色 Noir 偵探風格，包含紙張卡片、圖釘、SVG 紅線與機密卷宗側欄。

權威來源順序：先讀 `CLAUDE.md` 與 `.claude/skills/maintain-black-org-evidence-board/SKILL.md`，再以 split source（`index.html`、`styles.css`、`script.js`）判斷實際狀態。`README.md`、`HANDOFF.md`、`DETAILS_GUIDE.md` 為補充資料；若與程式或資料不一致，以程式與資料為準，並回報漂移。

## 二、檔案職責

```text
CLAUDE.md              專案架構、資料不變量、驗證指令
README.md              使用說明、進度、候選決策、驗證方式
HANDOFF.md             本檔：移交摘要
DETAILS_GUIDE.md       詳細情報維護與增修指南
index.html             網頁固定結構（控制列、證據板、SVG 圖層、卷宗欄）
styles.css             Noir 視覺系統與響應式版面
script.js              內嵌 evidenceData／evidenceDetails／cardArt 與全部互動邏輯
data.json              獨立資料來源
black-org-evidence-data.json  與 data.json 相同內容的部署命名版本
black-org-evidence-board.html  內嵌 CSS＋JS＋favicon 的單檔產生版（不可直接編輯）
tools/build_standalone.py     由 split source 重建單檔版
tools/generate_og.swift      重建 1200×630 Open Graph 圖
assets/og/                    OG 圖、來源照片與授權
.claude/skills/maintain-black-org-evidence-board/SKILL.md  專案維護流程
```

資料內嵌於 `script.js` 是為了確保 `file://` 離線開啟不會遇到 CORS 限制；不要改成 runtime `fetch` 載入證據資料。

## 三、目前已完成的功能

1. 卡片拖曳（滑鼠與觸控，統一使用 Pointer Events 與 pointer capture）。
2. SVG 曲線紅線隨卡片即時移動。
3. 點擊卡片展開或收合直接關聯節點。
4. 人物、代號、事件、物品分類篩選。
5. 選中卡片及直接關聯高亮；非關聯卡片與紅線淡化。
6. 右側卷宗欄顯示短版情報摘要與直接關聯線索；點擊關聯可跳到另一張卡片。
7. 重置佈局。
8. 鍵盤 Enter／Space 操作。
9. `prefers-reduced-motion` 與 `forced-colors` 支援。
10. 桌面、平板與手機響應式版面。
11. 不依賴任何外部字型或 JavaScript 套件。本地 proposal image 為卡片／側欄主要圖像；原創 Noir SVG `cardArt` 為離線載入失敗時的 fallback。Proposal image 的正式部署權利需另行確認。
12. 第二層詳細情報：側欄內就地展開，含身分、別名、組織、時間線、人物關係、相關物品、已確認／未確認情報與來源連結。
13. 詳細情報的 `targetId` 關聯 chip 與「直接關聯線索」共用同一跳轉。
14. 19 筆線索均配置本地 proposal image（主要）與自行繪製、離線內嵌的原創 Noir SVG（`cardArt`，載入失敗 fallback）。
15. Cloudflare Worker `ARCHIVE ACCESS` 瀏覽計數器為 fail-silent 線上增強；離線、逾時或請求失敗時證據板核心功能仍正常。

## 四、目前資料狀態

每筆線索格式：

```json
{
  "id": "p1",
  "type": "person",
  "name": "烏丸蓮耶",
  "description": "短版情報摘要",
  "connections": ["e1", "i1", "c1"]
}
```

可用類型：`person`、`code`、`event`、`item`。

目前共 **19 筆資料、19 個唯一 ID**：

```text
p1, c1, c2, c3, c4, p4, p5, p6, p7, p8, p9, p10, p11, p2, p3, e1, e2, i1, i2
```

修改資料時必須同步三份：

```text
script.js 的 evidenceData
data.json
black-org-evidence-data.json
```

若資料筆數改變，也要更新 `index.html` 中硬編碼的總數（目前為 `/ 19 線索`）。兩份 JSON 按 `id` 比較內容相同，但頂層陣列順序不同（`p11` 位置不同）；後續驗證應以 ID map 比對，不要用 raw array equality 判定同步結果。

## 五、詳細情報資料模型

完整策展情報儲存於 `script.js` 的 `evidenceDetails`（以穩定 ID 為鍵），與短版 `description` 分層。`emptyDetails()` 先為每個節點建立完整空骨架，再由 19 筆已策展資料覆寫；未來新增或缺資料的節點仍會使用此骨架作為 fallback，UI 對空欄位不渲染，全部為空時顯示 `DETAILS_PLACEHOLDER`（`（待補，等待情報材料）`）。

每筆 details 欄位：

```text
identity        身分背景（字串）
aliases         別名清單（字串陣列）
affiliations    所屬組織／陣營（字串陣列）
timeline        [{ label, content, targetId? }]  targetId 可選：內容後附可點關聯 chip
relationships   [{ targetId, summary }]
relatedItems    相關物品（純字串、節點 ID，或 { name, targetId }）
confirmedFacts  已確認情報（字串陣列）
unconfirmed     尚未確認或有爭議情報（字串陣列）
sources         [{ site, title, url }]
```

連結規則：

- 既有卡片的引用必須使用穩定 `targetId`，不依名稱猜測。
- 無獨立卡片的人物（如 Amanda Hughes）以純文字呈現，不建立連結。
- `confirmedFacts` 與 `unconfirmed` 必須分流；矛盾或未證實內容不得寫成已確認事實。
- 來源使用 `{ site, title, url }`；整理改寫為繁體中文，不大量複製第三方百科原文，不自行補寫劇情。
- 外部文字以 DOM API 與 `textContent` 安全插入，不直接寫入 `innerHTML`。

19 筆詳細情報均已策展完成，來源主要為 Detective Conan Wiki（Timeline）。

## 六、關係資料的主要分群

### 1. 組織首領與藥物研究

```text
烏丸蓮耶
├─ 朗姆
├─ 苦艾酒
├─ 宮野厚司、宮野艾蓮娜
├─ 藥物計畫啟動
└─ APTX 4869
```

### 2. 琴酒與主角線

```text
琴酒
├─ 工藤新一／柯南
├─ APTX 4869
├─ 伏特加
├─ 宮野明美
└─ 赤井秀一
```

### 3. 宮野家族

```text
宮野志保
├─ 工藤新一／柯南
├─ APTX 4869
├─ 宮野厚司、宮野艾蓮娜
├─ 宮野明美
└─ 苦艾酒
```

### 4. FBI 與公安

```text
赤井秀一
├─ 宮野明美
├─ 琴酒
├─ 工藤新一／柯南
├─ 諸伏景光
└─ 羽田浩司命案
```

```text
安室透／降谷零
├─ 朗姆
├─ 工藤新一／柯南
├─ 諸伏景光
└─ 角行棋子
```

### 5. 羽田浩司案

```text
羽田浩司命案
├─ 朗姆
├─ 若狹留美／淺香
├─ 黑田兵衛
├─ 赤井秀一
└─ 角行棋子
```

## 七、尚待使用者確認的決策

以下候選人物是否建立獨立卡片（未確認前不自動新增）：

```text
Amanda Hughes（阿曼達·休斯）
工藤優作
赤井務武
赤井瑪麗（Mary Sera）
卡邁爾（Kamel）
基安蒂／科倫（狙擊手）
```

以下候選關係是否加入 `connections`（未確認前不自動新增；加入時應盡量雙向並同步三份資料）：

```text
1. 朗姆（c1）→ 工藤新一／柯南（p4）
2. 伏特加（c3）→ 朗姆（c1）
3. 安室透（p9）→ 赤井秀一（p8）
4. 琴酒（c2）→ 宮野志保（p5）
```

`APTX 4869（i1）↔ 烏丸蓮耶（p1）` 的雙向連線已存在，不再列為待補。

## 八、計數器與部署狀態

- repo 內容無法證明計數器 Worker 已部署；Worker 程式碼不在本 repo 內，因此只能描述前端已接好端點，不可宣稱後端已上線。
- `ARCHIVE ACCESS` 計數器是 optional、fail-silent 的線上增強；離線、逾時或請求失敗不得影響證據板核心功能。
- 公開網址與 slug 見 `README.md`；該資訊為記錄用途，不代表 repository 可證明外部站點目前在線或 Worker 已部署。

## 九、驗證

JavaScript 語法：

```bash
node --check script.js
```

JSON 與 connection targets（CLAUDE.md 腳本）：

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

資料變更時另以 ID map 比較兩份 JSON，並核對 `script.js` 的 embedded `evidenceData`；不要只比較 raw array equality。

重建單檔版：

```bash
python3 tools/build_standalone.py
```

UI 或互動變更時，依影響路徑實測：卡片拖曳、Enter／Space 選取、詳細情報展開／收合、分類篩選、側欄關係導覽、reset、`file://` 離線開啟。

自動化瀏覽器互動測試尚未完成（Safari 未啟用 Allow Remote Automation、外部 Playwright 套件下載受權限阻擋）；若修改 UI，仍需在瀏覽器實測上述路徑。

## 十、交接守則

1. 不直接編輯 `black-org-evidence-board.html`；改 source 後用 `tools/build_standalone.py` 重建。
2. 不新增 runtime data fetch 或破壞 `file://` 的依賴。
3. 不自行建立未確認的人物卡片或關係。
4. 不把推測寫成已確認情報，也不大量複製第三方原文。
5. 不從 repo 內容推論計數器 Worker 已部署；Worker 程式碼不在本 repo 內。
6. 不把 JSON 頂層陣列順序差異誤判為資料內容不同。
7. 不刪除 `emptyDetails()`、`DETAILS_PLACEHOLDER` 或 `getDetails()` 的 fallback 行為。
8. 不自動 commit 或 push；只有使用者明確要求時才進行。