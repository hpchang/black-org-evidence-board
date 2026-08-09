# 後續模型移交摘要

## 一、專案概況

專案名稱：**《名偵探柯南》黑衣組織互動式證據板**

專案位置：

```text
/Users/hpchang/Documents/claude/MyProjects/black_organization_of_conan
```

這是一個無框架、無套件依賴、可完全離線使用的靜態網頁。使用者可以直接雙擊 `index.html`，不需要本地伺服器。

整體視覺是黑紅色 Noir 偵探風格，包含紙張卡片、圖釘、SVG 紅線和機密卷宗側欄。

## 二、目前檔案

```text
CLAUDE.md
README.md
HANDOFF.md
index.html
styles.css
script.js
data.json
black-org-evidence-data.json
black-org-evidence-board.html
```

### 檔案職責

- `index.html`
  - 網頁固定結構。
  - 包含控制列、證據板、SVG 圖層和右側卷宗欄。

- `styles.css`
  - Noir 視覺系統。
  - 桌面、平板與手機響應式版面。
  - 卡片、紅線、側欄、分類顏色和無障礙狀態。

- `script.js`
  - 內嵌完整 `evidenceData`。
  - 負責卡片渲染、拖曳、展開／收合、篩選、SVG 連線和側欄內容。
  - 資料內嵌是為了確保 `file://` 離線開啟不會發生 CORS 錯誤。

- `data.json`
  - 獨立資料庫版本。

- `black-org-evidence-data.json`
  - 與 `data.json` 相同內容的部署命名版本。

- `black-org-evidence-board.html`
  - 將 CSS 和 JavaScript 全部內嵌的單檔版本。
  - 這是產生檔，修改時應以 `index.html`、`styles.css`、`script.js` 為準，再重新產生。

- `CLAUDE.md`
  - 已記錄專案架構、驗證指令、資料同步規則和開發注意事項。

## 三、目前已完成的功能

1. 卡片滑鼠拖曳。
2. 行動裝置觸控拖曳。
3. 使用 Pointer Events 統一滑鼠與觸控。
4. SVG 曲線紅線隨卡片即時移動。
5. 點擊卡片展開或收合直接關聯節點。
6. 人物、代號、事件、物品分類篩選。
7. 選中卡片及直接關聯高亮。
8. 非關聯卡片與紅線淡化。
9. 右側卷宗欄顯示短版情報摘要。
10. 側欄列出直接關聯線索。
11. 點擊側欄關聯可跳到另一張卡片。
12. 重置佈局。
13. 鍵盤 Enter／Space 操作。
14. `prefers-reduced-motion` 支援。
15. `forced-colors` 支援。
16. 桌面、平板和手機響應式版面。
17. 不依賴任何外部圖片、字體或 JavaScript 套件。

## 四、目前資料模型

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

目前類型：

```text
person
code
event
item
```

目前共 **19 筆資料、19 個唯一 ID**（已新增羽田浩司 `p11`）。

修改資料時，必須同步更新：

```text
script.js 內的 evidenceData
data.json
black-org-evidence-data.json
```

若資料筆數改變，也要更新 `index.html` 中目前寫死的：

```html
/ 18 線索
```

## 五、目前使用者的新需求

使用者認為現在側欄中的短版「情報摘要」長度很好，希望保留。

但希望增加第二層詳細情報：

1. 點擊卡片後，側欄仍先顯示短摘要。
2. 在摘要下方增加「展開完整情報」之類的按鈕。
3. 點擊後顯示更完整的：
   - 身分背景
   - 別名
   - 所屬組織
   - 時間線
   - 重要事件
   - 人物關係
   - 相關物品
   - 已確認情報
   - 尚未確認或有爭議的情報
   - 資料來源
4. 詳細內容可以用：
   - 側欄內展開
   - 大型 modal
   - 第二層情報抽屜
   - 獨立詳細頁面
5. 使用者尚未決定最終 UI 方案，也尚未提供完整詳細材料。

## 六、詳細情報來源候選

使用者提出以下三個網站：

```text
https://conan-zukai.com/
https://www.detectiveconanworld.com/
https://www.conanpedia.com/
```

### 目前研究狀態

- `conan-zukai.com` 經 WebFetch 存取時回傳 HTTP 403。
- 另外兩個網站的讀取操作被使用者中途取消。
- 因此三站的頁面結構、授權、可否嵌入及固定條目 URL 尚未完成研究。

### 接手模型應注意

不建議直接在瀏覽器端即時爬取這些網站，原因包括：

- CORS
- HTTP 403
- 網站結構變動
- 著作權與轉載規則
- 網路中斷會破壞離線功能
- 外部網站可能不允許 iframe
- 詳細內容可能包含漫畫進度劇透或未確認推測

較穩定的方向是：

> **在本地資料中儲存自行整理、改寫的詳細情報，再附上來源網站與原始條目連結。**

也就是「本地策展內容＋外部來源連結」的混合方案。

避免大段直接複製第三方百科文字；應整理、改寫並標註來源。

## 七、建議的詳細資料結構

可將每筆資料擴充為：

```json
{
  "id": "p1",
  "type": "person",
  "name": "烏丸蓮耶",
  "description": "目前側欄顯示的短摘要",
  "connections": ["e1", "i1", "c1", "c4", "p6"],
  "details": {
    "identity": "完整身分背景",
    "aliases": [],
    "affiliations": [],
    "timeline": [
      {
        "label": "時間或篇章",
        "content": "發生事項"
      }
    ],
    "relationships": [
      {
        "targetId": "c1",
        "summary": "與朗姆的詳細關係"
      }
    ],
    "relatedItems": [],
    "confirmedFacts": [],
    "unconfirmed": [],
    "sources": [
      {
        "site": "Conanpedia",
        "title": "條目名稱",
        "url": "https://..."
      }
    ]
  }
}
```

如要避免 `data.json` 過度膨脹，也可拆成：

```text
data.json
details/
  p1.json
  c1.json
  c2.json
```

但拆成外部 JSON 後，直接使用 `file://` 讀取會遇到 CORS，因此如果必須繼續「雙擊即玩」，詳細資料仍應：

- 內嵌於 `script.js`；或
- 放在另一個普通 JavaScript 檔案，例如 `details-data.js`，使用全域常數載入。

## 八、目前關係資料的主要分群

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

### 4. FBI與公安

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

## 九、目前資料中值得補強的關係

以下人物已在摘要中提及，但目前沒有建立直接連線：

1. 朗姆 `c1` → 工藤新一／柯南 `p4`
2. 伏特加 `c3` → 朗姆 `c1`
3. 安室透 `p9` → 赤井秀一 `p8`
4. 琴酒 `c2` → 宮野志保 `p5`
5. APTX 4869 `i1` → 烏丸蓮耶 `p1`

最後一項目前只有：

```text
烏丸蓮耶 → APTX 4869
```

但缺少反向：

```text
APTX 4869 → 烏丸蓮耶
```

關係是否新增，應由使用者確認，不要自動修改。

## 十、建議優先新增的卡片

這些主題在現有摘要中已經出現，但尚未成為獨立卡片。

### 第一優先

#### 羽田浩司

可連接：

```text
羽田浩司命案
若狹留美
黑田兵衛
朗姆
赤井秀一
角行棋子
阿曼達·休斯
```

#### 阿曼達·休斯

可連接：

```text
羽田浩司
若狹留美／淺香
朗姆
黑田兵衛
羽田浩司命案
```

#### 銀色子彈研究

可連接：

```text
宮野厚司、宮野艾蓮娜
宮野志保
APTX 4869
藥物計畫啟動
烏丸蓮耶
```

注意應區分：

- 宮野夫婦研究的「銀色子彈」
- 赤井秀一／柯南被稱為「銀色子彈」

#### 十億元搶劫案

可連接：

```text
宮野明美
琴酒
宮野志保
赤井秀一
工藤新一／柯南
```

#### ASACA RUM 臨終訊息

可連接：

```text
羽田浩司
羽田浩司命案
朗姆
若狹留美
烏丸蓮耶
```

### 第二優先

```text
毛利蘭
毛利小五郎
卡邁爾
諸伏高明
阿笠博士
```

## 十一、使用者稍後可能提供的材料格式

使用者表示會先蒐集詳細情報，再輸入給模型。

接手模型應允許使用者直接貼：

- 網址
- 原始摘錄
- 零散筆記
- 不同網站互相矛盾的內容
- 未整理的角色關係
- 集數／漫畫話數
- 日文、英文或繁體中文材料

模型再負責：

1. 合併重複資料。
2. 改寫為繁體中文。
3. 區分官方已確認內容與推測。
4. 區分漫畫、動畫、劇場版或其他媒體設定。
5. 整理時間線。
6. 建立人物關係。
7. 加入來源標註。
8. 轉換為網站 JSON 格式。
9. 保留簡短摘要，另外建立完整情報。

建議使用者提供材料時使用：

```text
主題：
資料來源：
網址：
原始摘錄或筆記：
與哪些人物／物品有關：
尚未確認或有爭議的內容：
```

## 十二、尚未執行的工作

1. ✅ 已選定詳細情報 UI：採「側欄內就地展開」。
2. ✅ 已加入 `details` 資料模型（`evidenceDetails` + `emptyDetails()` + `getDetails()`）。
3. ✅ 已加入「展開完整情報」按鈕（`.details-toggle` + `aria-expanded` + 鍵盤可操作）。
4. 採側欄內展開，未另做 modal／抽屜／獨立頁。
5. ✅ 已加入來源連結區（`buildSourcesSection`，`rel="noopener noreferrer"`，`href`／`title` 經屬性與 textContent 安全插入）。
6. 尚未研究三個外部網站的固定條目 URL。
7. 尚未取得使用者的完整情報材料——目前 19 筆 details 皆為空骨架待補，UI 會顯示「待補，等待情報材料」。
8. ✅ 已新增羽田浩司 `p11`（同步進 script.js、data.json、black-org-evidence-data.json，並更新 index.html 計數為 19、重新產生 board）。
9. handoff 第九節列出的關係補強候選中，已隨 p11 同步新增的部分：APTX 4869→烏丸蓮耶（反向）、朗姆→羽田浩司、羽田浩司→各相關節點。其餘候選（朗姆↔柯南、伏特加↔朗姆、安室↔赤井、琴酒↔宮野志保）尚未加入，仍待使用者確認。

## 十二之一、詳細情報資料模型與填寫方式

`script.js` 中 `evidenceDetails` 為以 ID 為鍵的物件，每筆預設為 `emptyDetails()`（全空）。
提供材料時，對該 ID 寫入：

```js
evidenceDetails.p11 = {
  identity: "天才將棋棋手…",
  aliases: ["羽田浩司"],
  affiliations: [],
  timeline: [{ label: "17年前", content: "在美國遇害" }],
  relationships: [{ targetId: "c1", summary: "遭其以藥物殺害" }],
  relatedItems: ["i2"],
  confirmedFacts: ["已確認死亡"],
  unconfirmed: ["臨終訊息確切拼法仍有爭議"],
  sources: [{ site: "Conanpedia", title: "羽田浩司", url: "https://..." }]
};
```

`getDetails()` 會把部分填寫的物件合併至完整骨架，缺空欄位不會讓 UI 崩潰。
任何空陣列／空字串欄位對應的區塊不會渲染。全部為空時顯示 `（待補，等待情報材料）`。
絕不自行編造劇情；待使用者提供材料後再填入真實內容，並附來源、避免大量複製第三方百科原文。

## 十三、驗證狀態

已完成：

```bash
node --check script.js      # OK
node --check （內嵌板 JS）  # OK
python3 JSON 驗證            # data.json、black-org-evidence-data.json 皆 19 筆、無重複、無斷線、型別合法
本地 HTTP 200               # 六個檔案皆 200
```

資料驗證結果：

```text
18 records
18 unique IDs
missing connections: none
invalid types: none
```

所有主要檔案經本地 HTTP 伺服器回傳 `200`。

自動化瀏覽器互動測試未完成，原因：

- Safari 未啟用 Allow Remote Automation。
- 外部 Playwright 套件下載受到權限阻擋。

因此後續若修改 UI，仍需實際在瀏覽器確認：

- 卡片拖曳
- 點擊與拖曳是否互相衝突
- 節點展開／收合
- 分類篩選
- 側欄滾動
- 詳細情報展開
- 手機版高度與 overflow
- 鍵盤操作

## 十四、可直接交給下一個模型的任務描述

```text
請接手以下專案：

/Users/hpchang/Documents/claude/MyProjects/black_organization_of_conan

先閱讀 CLAUDE.md、HANDOFF.md、README.md、index.html、styles.css、script.js 與 data.json。

這是一個可直接使用 file:// 離線開啟的《名偵探柯南》黑衣組織互動式證據板。現有側欄會顯示短版情報摘要，使用者希望保留摘要長度，未來再增加可點擊展開的完整情報。

完整情報預計包含身分、別名、時間線、人物關係、相關物品、已確認情報、未確認內容及來源。資料來源候選為 conan-zukai.com、detectiveconanworld.com 和 conanpedia.com，但網站研究尚未完成，使用者也尚未提供詳細材料。

目前不要自行增加或改寫劇情資料。先等待使用者提供情報材料，或協助使用者選擇詳細情報 UI 方案。

修改時必須維持：
1. 雙擊 index.html 即可離線使用。
2. 不依賴執行時 fetch。
3. script.js、data.json、black-org-evidence-data.json 資料同步。
4. black-org-evidence-board.html 是產生檔，不可單獨修改。
5. 使用 DOM textContent 插入外部資料。
6. 維持滑鼠、觸控與鍵盤操作。
7. 詳細情報需附來源，但不要直接大量複製第三方網站內容。
```
