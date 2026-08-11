# UI Optimization Handover — 紅線追查 / Threadline Dossier

> 給後續模型／工程代理直接執行的實作交接文件。  
> 基準日期：2026-08-12  
> 目前分支：`docs/cleanup-stale-narratives`  
> 目前 working tree：乾淨  
> 現況產品評分：**53 / 100**  
> PM 核准的目標設計規格：**100 / 100**  
> 實作狀態：**尚未開始，`implementationVerified = false`**

---

## 0. 可直接交給執行模型的任務提示

```text
你要在 dependency-free、offline-first、可直接用 file:// 開啟的靜態網站中，
分 P0 → P1 → P2 實作「紅線追查 / Threadline Dossier」UI optimization。

開始前必讀：
- CLAUDE.md
- UI_OPTIMIZATION_HANDOFF.md
- index.html
- styles.css
- script.js

規則：
1. 先檢查 git status，確認既有變更，不可覆蓋他人工作。
2. 一次只執行一個 phase；先提出該 phase 的具體 plan，再修改。
3. 只把 index.html、styles.css、script.js 視為 UI 權威 source。
4. 不直接編輯 black-org-evidence-board.html；source 完成後執行
   python3 tools/build_standalone.py。
5. 不新增 framework、bundler、套件、CDN、外部字型、runtime evidence fetch。
6. 不修改 19 筆證據內容、不新增人物或關係，除非另有明確指示。
7. 保留 file://、Pointer/keyboard interaction、filter、relation navigation、details disclosure、reset 與 Supabase fail-silent 行為。
8. 每個 phase 必須完成 handover 指定的 browser/manual acceptance matrix；測試未通過不得宣稱完成。
9. 不自動 commit 或 push，除非使用者明確要求。

先執行 P0。P0 驗收全部通過後停止並回報，不要自動開始 P1。
```

---

# 1. 產品方向與完成定義

## 1.1 核心體驗

新介面固定圍繞四步：

1. **選一條線索**
2. **看懂直接關係**
3. **深入該筆卷宗**
4. **沿一個明確關聯繼續追查**

Noir 證據板的視覺不是問題；問題是目前手機首屏、CTA、手勢與卷宗順序無法穩定完成以上流程。

## 1.2 必須保留的品牌語言

- 深色軟木／格線背景
- 米色紙卡
- 圖釘
- 紅色 signal thread
- 人物藍、代號紅、事件金、物品綠
- 原創 Noir SVG fallback 與現有卡片圖像層
- Active / directly related / dimmed 三層狀態
- 桌面左側證據板、右側卷宗的主從關係
- CASE 4869、Record ID、機密卷宗語彙

不得把網站改成一般 dashboard、圓角 KPI 卡片或列表型百科。

## 1.3 100 分產品完成定義

只有以下都成立，才可把「設計規格 100 分」轉成「產品實作 100 分」：

- 390×844 與 620px breakpoint 的核心手機流程通過。
- 1440×1000 桌面沉浸感與既有探索能力沒有回歸。
- 點擊、拖曳、板面平移、bottom sheet 與卷宗滾動不互相誤觸。
- 直接關聯在手機第一個卷宗 viewport 內可達。
- 鍵盤、ARIA、焦點、live region、reduced-motion、forced-colors 通過。
- `file://`、離線、Supabase timeout／失敗下核心功能正常。
- Standalone 由 split source 重建成功。
- JavaScript、資料與 connection target 驗證通過。

---

# 2. 非協商架構限制

## 2.1 權威來源

只修改：

- `index.html`
- `styles.css`
- `script.js`

視需要同步文件：

- `README.md`
- `HANDOFF.md`
- 本文件 `UI_OPTIMIZATION_HANDOFF.md`

生成檔：

- `black-org-evidence-board.html`

**禁止直接編輯生成檔。** 修改 `index.html`、`styles.css`、`script.js` 或 favicon 後，執行：

```bash
python3 tools/build_standalone.py
```

## 2.2 不可引入

- Framework
- Bundler
- Package manager dependency
- CDN
- 外部字型
- Runtime external image dependency
- Runtime evidence data fetch
- Service-role key、資料庫密碼或管理員憑證

## 2.3 資料不變量

本次 UI optimization 不應改證據資料。若非預期碰到資料，立即停止並確認：

- 19 筆唯一 ID
- `type` 只能為 `person`、`code`、`event`、`item`
- 所有 `connections` target 存在
- `script.js` embedded `evidenceData`
- `data.json`
- `black-org-evidence-data.json`

三份資料比較要按 ID map，不要用頂層陣列順序；`p11` 在兩份 JSON 中位置不同不是資料缺漏。

## 2.4 Supabase counter

- 可以保留。
- 它是 fail-silent online enhancement，不是核心案件資料。
- 離線、timeout 或 RPC 失敗不得影響 board、sidebar、filter、keyboard 或 layout。
- 不得把 repo 中存在 `supabase/counter.sql` 描述成 migration 已部署。

---

# 3. 現況評分與主要缺口

| 類別 | 權重 | 現況 | 目標 |
|---|---:|---:|---:|
| 手機首屏與響應式局部網絡 | 24 | 5 | 24 |
| 互動模型、CTA 與行動階層 | 16 | 6 | 16 |
| 桌面沉浸感與視覺證據語言 | 12 | 11 | 12 |
| 資訊架構與漸進揭露 | 14 | 8 | 14 |
| 可達性、鍵盤與狀態回饋 | 12 | 7 | 12 |
| 圖譜理解、探索與可逆狀態 | 10 | 6 | 10 |
| 效能、offline/file:// 與維護 | 12 | 10 | 12 |
| **總分** | **100** | **53** | **100** |

實測基線：

- 桌面：1440×1000。
- 手機：390×844。
- 手機 board 可視高度約 430px。
- 選取並展開後，手機 sidebar content viewport 約 217px。
- 完整內容 scroll height 約 2412px。
- 第一次選取由 5 張卡片展開到 8 張。

主要缺口：

1. 手機仍裁切固定 1800×1240 桌面畫布，第一個可操作目標不在首屏。
2. HUD 以 sticky + negative margin 覆蓋卡片。
3. 卡片同時承擔選取、展開與拖曳。
4. `expandedNodeIds` 累積，手機網絡會失控膨脹。
5. 手機卷宗先顯示大型插畫，直接關聯被埋在後方。
6. Reset 名稱沒有揭示會清除位置、選取、展開與 filter。
7. 動態 record heading、live announcement、selected state 與焦點返回不完整。

---

# 4. 現有程式地圖與回歸耦合

> 行號以 2026-08-12 的 working tree 為準；若修改後位移，請以 symbol/class 搜尋。

## 4.1 `index.html`

- Toolbar、filter、reset：`index.html:44-55`
  - `.toolbar`
  - `.filter-group`
  - `.filter-btn`
  - `[data-filter]`
  - `#reset-layout-btn`
- Board shell：`index.html:58-67`
  - `#board-wrapper`
  - `#pinboard`
  - `#connections-svg`
- HUD：`index.html:69-81`
  - `.board-hud`
  - `#visible-count`
  - `#hits-line`
  - `#hits`
- Sidebar：`index.html:84-105`
  - `#case-file-sidebar`
  - `#sidebar-content`
  - `#record-clock`

這些 ID 被 `script.js` 直接依賴，改名時必須同步 JS。

## 4.2 `script.js` state

- `CORE_NODE_IDS`、`INITIAL_POSITIONS`：`script.js:921-928`
- `activeNodeId`：目前選取節點
- `currentFilter`：目前分類 filter
- `positions`：卡片可變座標
- `expandedNodeIds`：已展開關係節點
- `autoPositionedNodeIds`：自動配置座標節點
- `CARD_EDGE_MARGIN`
- `resizeFrameId`
- State 區段：`script.js:930-941`
- DOM handles：`script.js:943-947`

這些 state 彼此耦合；不要只改其中一個 handler。

## 4.3 Visibility 與 render

- `getVisibleNodeIds()`：`script.js:972-984`
  - 固定加入 `CORE_NODE_IDS`
  - 加入 expanded node 的 connections
  - 加入 active node
- `init()`：`script.js:1039-1062`
  - render
  - filter/reset/counter setup
  - resize RAF
  - clock
  - 初始 `scrollTo({ left: 70, top: 24 })`
- `renderBoard()`：`script.js:1064-1087`

`renderBoard()` 的重要順序：

```text
preserveRenderedPositions()
→ 移除舊 .node-card
→ getVisibleNodeIds()
→ currentFilter
→ 補 fallback positions
→ 建立卡片
→ visible count
→ overlap / clamp
→ updateCardVisuals()
→ drawConnections()
```

先刪卡再保存位置會丟失使用者拖曳結果。

## 4.4 Card、Pointer 與 SVG

- `createNodeCard()`：`script.js:1168-1219`
- `makeElementInteractive()`：`script.js:1221-1289`
  - Pointer Events
  - pointer capture
  - 5px movement threshold
  - pointermove 時 `drawConnections()`
  - pointerup 未移動才 select
  - Enter／Space
- `seedConnectedPositions()`：`script.js:1291-1310`
- `selectNode()`：`script.js:1324-1340`
- `drawConnections()`：`script.js:1342-1387`
  - 只畫目前 rendered DOM cards
  - 以排序 ID key 去重雙向線
- `updateCardVisuals()`：`script.js:1403-1425`
  - `.active-card`
  - `.related-card`
  - `.dimmed-card`
  - `aria-expanded`

不要改成根據完整 data 直接畫所有線，否則 filter 與 visibility 會失配。

## 4.5 Sidebar 與 details

- `populateSidebar()`：`script.js:1428-1490`
- `createArtFigure()`：`script.js:1493-1538`
- `createDetailsDisclosure()`：`script.js:1546-1583`
- `renderDetailsPanel()`：`script.js:1585-1627`
- Details sections/timeline：`script.js:1629-1686`
- `createDetailLinkChip()`：`script.js:1690-1703`
- Related／relationship sections：`script.js:1705-1775`
- Sources：`script.js:1777-1819`
- `createRelationButton()`：`script.js:1821-1852`
- `handleRelationClick()`：`script.js:1854-1873`
- `resetSidebar()`：`script.js:1875-1892`
- `setupFilters()`／`setActiveFilter()`：`script.js:1894-1918`
- `setupResetLayout()`：`script.js:1920-1931`

`handleRelationClick()` 目前會：

```text
若 target 被 filter 隱藏 → filter 切回 all
→ active target
→ expanded add target
→ seed positions
→ render board
→ populate sidebar
→ scrollIntoView + focus
```

不要只更新 sidebar，否則 board 可能沒有 target card。

## 4.6 CSS anchors

- App grid：`styles.css:65-72`
- Header／toolbar／filter：`styles.css:75-209`
- `.board-wrapper`：`styles.css:212-240`
- `.pinboard` 固定 1800×1240：`styles.css:242-256`
- SVG connection：`styles.css:330-374`
- `.node-card` 與狀態：`styles.css:377-481`
- Card internals：`styles.css:483-594`
- `.board-hud`：`styles.css:596-667`
- Sidebar shell：`styles.css:669-733`
- Detail card/art：`styles.css:788-940`
- Relations：`styles.css:942-1037`
- Disclosure/panel：`styles.css:1038-1107`
- Detail sections：`styles.css:1109-1276`
- `@media (max-width: 1120px)`：`styles.css:1290-1306`
- `@media (max-width: 880px)`：`styles.css:1308-1434`
- `@media (max-width: 620px)`：`styles.css:1436-1503`
- Reduced motion：`styles.css:1505-1514`
- Forced colors：`styles.css:1516-1533`

---

# 5. P0 — 手機核心任務與狀態模型

## 5.1 P0 目標

讓使用者在 390×844 冷啟動後，不需猜測拖曳方向，即可：

1. 看見完整核心卡。
2. 點擊並開啟卷宗。
3. 理解一階關聯。
4. 點擊關聯繼續追查。
5. 返回板面。

## 5.2 P0 修改範圍

必改：

- `index.html`
- `styles.css`
- `script.js`

不改：

- `evidenceData`
- `evidenceDetails`
- `data.json`
- `black-org-evidence-data.json`
- 圖片資產
- Standalone 內容本身

完成 source 後才重建 standalone。

## 5.3 P0-A：Mobile compact layout

### 需求

在 `max-width: 620px`：

- 不直接沿用桌面 `INITIAL_POSITIONS` 與固定初始 scroll offset。
- 390×844 首屏完整顯示至少一張核心卡。
- 至少兩張直接關聯卡完整或清楚可辨識。
- 保留圖釘、紙卡與至少一條可理解的紅線。
- `body` 不產生非預期水平 overflow。
- Board 可以局部平移，但必須有「拖曳空白處探索」提示。

### 建議技術設計

保留桌面 `INITIAL_POSITIONS`，新增 mobile 專用位置來源，例如：

```js
const MOBILE_INITIAL_POSITIONS = { ... };

function isMobileBoard() {
  return window.matchMedia("(max-width: 620px)").matches;
}

function getInitialPositions() {
  return clonePositions(isMobileBoard()
    ? MOBILE_INITIAL_POSITIONS
    : INITIAL_POSITIONS);
}
```

也可以依 `boardWrapper.clientWidth` 計算 compact layout，但必須是可重現的 deterministic layout，不要每次 render 隨機改變。

禁止只用 CSS `transform: scale(...)` 縮放整張 pinboard，因為會讓：

- Pointer 座標
- `offsetLeft` / `offsetTop`
- SVG 路徑
- Drag bounds
- scrollIntoView

產生座標系不一致。

### Resize 要求

由 desktop 切到 mobile 或反向時：

- 不得把卡片 clamp 到錯誤畫布。
- 不得讓 SVG 線留在舊位置。
- 必須決定並明示：保留各 viewport 自己的位置，或切換時重置為該模式初始位置。

建議各模式有獨立 positions map：

```js
const positionsByLayout = {
  desktop: clonePositions(INITIAL_POSITIONS),
  mobile: clonePositions(MOBILE_INITIAL_POSITIONS)
};
```

避免 mobile layout 覆寫 desktop 使用者已整理的位置。

## 5.4 P0-B：HUD 不得覆蓋證據

### 現況

`.board-hud` 以 sticky + negative margin 疊在 board 上。

### 需求

手機改成正式佔位的 40–44px status bar：

```text
局部網絡 3 / 19 · 點卡片查看卷宗
```

- 不覆蓋卡片、圖釘、標題、footer 或紅線。
- 保留 `#visible-count`。
- 手機隱藏或移出 `ARCHIVE ACCESS`。
- 不因 counter 成功／失敗改變 board 高度。

### DOM 建議

可保留 `.board-hud` ID/class contract，但將 readout、操作提示與 view controls 分組：

- `.hud-status`
- `.hud-view-controls`
- `.hud-instruction`

如新增 DOM ID，必須同步 standalone build 來源，不要只改生成檔。

## 5.5 P0-C：Bounded local graph

### 需求

手機預設：

- 未選取：顯示 5 張 compact core nodes。
- 已選取：顯示 active node + active node 的一階 connections。
- 切換 active node：上一個 active 的展開狀態不得繼續無聲累積。
- 提供可逆模式：至少 `局部網絡` 與 `全圖`；建議再提供 `收合其他`。
- 桌面可以保留較完整的探索能力。

### 建議 state

```js
let viewMode = "local"; // local | all
```

不要只在 CSS 隱藏卡片；`getVisibleNodeIds()`、`renderBoard()`、`drawConnections()` 必須使用同一 visibility 結果。

建議把 visibility 規則寫成可測的純邏輯：

```js
function getVisibleNodeIds() {
  if (viewMode === "all") return new Set(evidenceData.map((node) => node.id));

  if (isMobileBoard() && activeNodeId) {
    const active = getNode(activeNodeId);
    return new Set([active.id, ...active.connections]);
  }

  // Desktop 保留既有 core + expanded 邏輯。
}
```

實作時必須處理：

- Active node 被 filter 隱藏。
- Relation navigation 跨 filter。
- Full graph → local graph。
- Reset。
- Resize desktop ↔ mobile。
- `visible-count` 與實際 rendered cards 一致。

## 5.6 P0-D：卡片點擊與拖曳分離

### 目標語意

- 點卡片：選取、開卷、顯示一階關聯。
- 拖曳空白板面：平移 board。
- 拖曳卡片：只在明確的整理模式或拖曳 handle 上發生。
- Bottom sheet 內容捲動：只閱讀卷宗。

### 推薦 DOM 重構

保留 `.node-card` 作 positioned container，不再讓 container 本身同時是 drag surface 與 `role="button"`。

建議新增：

```text
.node-card
├── visual card content
├── button.card-select-action   // absolute inset，負責選取
└── button.card-drag-handle     // 位於上層，只負責拖曳
```

注意：

- 不要把一個 button 巢狀放進另一個 button。
- `.card-select-action` 可是透明 overlay button，使用完整 `aria-label`。
- `.card-drag-handle` 必須位於 overlay 之上，至少 44×44px。
- 移動的是 `.node-card` container。
- 卡片視覺內容保持現有 DOM/textContent 建構方式。

替代方案：手機新增明確「整理版面」模式；預設模式不允許移動卡片，整理模式才顯示 handle。

### Pointer 保留要求

重構 `makeElementInteractive()` 時不得丟失：

- Pointer capture
- 5px movement threshold 或更清楚的 drag threshold
- `pointercancel`
- 拖曳時即時 `drawConnections()`
- 拖曳結束後不得誤選取
- Touch 與 mouse 共用 Pointer Events

### Keyboard

- Select button 原生支援 Enter／Space。
- Drag handle 至少可被鍵盤聚焦。
- 建議 Arrow 移動 10px、Shift+Arrow 移動 40px；若 P0 不做鍵盤重排，必須在 P1 補齊，且不能讓 handle 成為無功能 focus target。

## 5.7 P0-E：Mobile bottom sheet 基線

### 狀態

建議 sidebar 在 mobile 具有：

- `empty`：尚未選取。
- `peek`：顯示「選一條線索開始追查」。
- `expanded`：已選取，約 70–72vh。
- `collapsed`：返回板面後只保留 sticky summary/handle。

可使用：

```html
<aside id="case-file-sidebar" data-sheet-state="peek">...</aside>
```

### 行為

- 未選取：顯示簡短 onboarding 與「檢視核心線索」。
- 選取卡片：sheet 展開。
- 點「回到板面」：sheet 收合，active card 保留。
- 點關聯：目標卡置中、sidebar 更新、sheet 保持可讀。
- Sheet handle 與 sidebar content scroll 不得互相誤觸。
- `safe-area-inset-bottom` 必須納入 padding。

不要依賴外部 bottom-sheet library。

## 5.8 P0-F：卷宗第一個 viewport 的最小重排

手機第一個 sidebar viewport 必須依序可達：

1. 類型與 record 名稱。
2. 1–2 行摘要。
3. 關聯數量。
4. 前 2–3 個直接關聯 CTA。
5. `回到板面`。

大型 hero 不得先佔滿 viewport；先把它限制為 120–160px 或放到關聯後方。

完整資訊架構、heading 與 ARIA 在 P1 完成，但 P0 必須先解除「找不到下一步」的阻斷。

## 5.9 P0-G：Reset 語意

目前 `setupResetLayout()` 同時清除：

- positions
- expanded state
- active node
- filter
- sidebar
- board scroll

P0 最低要求：

- 把文案改成 **「重置整個視圖」**。
- 以 `title`、`aria-label` 或確認提示揭示清除範圍。

可選改進：拆成「重置卡片位置」與「清除探索狀態」，但不要為了拆分讓 toolbar 過度複雜。

## 5.10 P0 驗收矩陣

### Viewport

- [ ] 1440×1000
- [ ] 880px
- [ ] 620px
- [ ] 390×844

### 冷啟動

- [ ] 390×844 完整顯示至少一張可操作核心卡。
- [ ] 至少兩張直接關聯卡完整或清楚可辨識。
- [ ] HUD 不覆蓋卡片、圖釘、標題、線段或操作提示。
- [ ] Body 沒有非預期水平 overflow。
- [ ] 有清楚的「點卡片」與 board 平移提示。

### 選取與關係

- [ ] 點卡片只產生可預測的選取／開卷結果。
- [ ] 第一次選取 active/related/dimmed 清楚。
- [ ] 手機只顯示 active + 一階關聯。
- [ ] 切換 active 不會累積舊 expanded nodes。
- [ ] `visible-count` 與 rendered card 數一致。
- [ ] Relation navigation 跨 filter 仍能定位 target。
- [ ] Target card 被置中或明確帶入可視區。

### 手勢

- [ ] 點擊不誤觸 drag。
- [ ] Drag 不誤觸 select。
- [ ] Board pan 不會移動卡片。
- [ ] Sidebar scroll 不會拖動 sheet。
- [ ] Sheet handle 不會捲動 sidebar content。
- [ ] Pointer cancel 後狀態恢復。
- [ ] Mouse、touch、trackpad 都實測。

### Keyboard

- [ ] Enter／Space 選取與 pointer 結果一致。
- [ ] Focus ring 清楚。
- [ ] Relation buttons 可用鍵盤。
- [ ] Reset 可用鍵盤。

### Regression

- [ ] Desktop card drag 正常。
- [ ] SVG 線隨 card drag 更新。
- [ ] Filter 正常。
- [ ] Details disclosure 正常。
- [ ] Reset 正常。
- [ ] `file://` 直接開啟正常。

## 5.11 P0 完成回報格式

```text
P0 status: completed / blocked

Modified source:
- index.html
- styles.css
- script.js
- black-org-evidence-board.html（generated）

Implemented:
- mobile compact layout
- non-overlapping HUD
- bounded local graph
- separated selection/drag/pan
- mobile sheet baseline
- reset semantics

Verified:
- viewport matrix
- pointer/keyboard/filter/relation/reset
- file://
- node --check
- standalone rebuild

Not verified:
- 明確列出未測項目，不得推測成功
```

---

# 6. P1 — 資訊架構、可達性與可逆狀態

> 只有 P0 驗收完成後才開始。

## 6.1 P1 目標

讓使用者與輔助科技都能知道：

- 目前選取了誰／什麼。
- 類型與直接關聯數。
- 下一步可追查哪一筆。
- 如何回到板面。
- Filter、view mode、reset 改變了什麼。

## 6.2 P1-A：Sidebar DOM 順序

重構 `populateSidebar()` 的 DOM append 順序：

1. Stable sidebar heading/context。
2. Classification + record ID。
3. Dynamic record name。
4. Short description。
5. Direct relation count。
6. First relation buttons / complete relation list。
7. Compact art。
8. Details disclosure。
9. Timeline、relationships、related items、facts、sources。

手機必須讓前 2–3 個 relation CTA 在第一個 sidebar viewport 內可達。

不要只靠 CSS `order` 讓視覺順序與 DOM／screen reader 順序相反。

## 6.3 P1-B：Heading 與 landmark

- 頁面只保留一個穩定 `h1`。
- Dynamic record name 使用 `h2`。
- Details section 使用依序 `h3` 或適當 heading。
- `aside#case-file-sidebar` 保留穩定 accessible label。
- Bottom sheet 若不是 modal，不要誤用 `role="dialog"`；可維持 `complementary`，並提供 sheet state 與控制關係。

## 6.4 P1-C：Card selected state

每張 card select control 提供：

- 清楚 accessible name：名稱、類型、直接關聯數、主要動作。
- `aria-pressed` 或等效 selected state。
- `aria-controls="case-file-sidebar"`。
- Active card 視覺不能是唯一選取回饋。

如果 card container 不再是 focusable button，必須更新 `updateCardVisuals()` 操作的 ARIA target。

## 6.5 P1-D：Live region

在 `index.html` 增加穩定 live region，例如：

```html
<div id="interaction-status" class="visually-hidden"
     role="status" aria-live="polite" aria-atomic="true"></div>
```

建議公告：

- 選取：`已選取烏丸蓮耶，類型為人物，顯示 5 個直接關聯。`
- 關聯跳轉：`已定位至 APTX 4869，卷宗已更新。`
- Filter：`顯示 4 筆人物線索。`
- View mode：`已切換至局部網絡，顯示 6 筆線索。`
- Reset：`已重置整個視圖。`

避免連續 pointermove 或 resize 對 live region 發送公告。

## 6.6 P1-E：Focus management

### Keyboard selection

- Enter／Space 選取後，可將焦點移到 record `h2` 或第一個 relation button。
- 必須提供「回到板面」控制。
- 返回後焦點回原 card select control。

### Pointer selection

- 不必無條件搶走 pointer 使用者焦點。
- 可開啟 sheet 並透過 live region 公告。

### Relation navigation

- Target card 必須進入 board 可視區。
- Target card focus 後，sidebar 與 active state 同步。
- 不使用會讓整頁 body 跳動的未限制 `scrollIntoView()`；優先計算 `boardWrapper` 內部 scroll。

建議新增：

```js
function centerCardInBoard(nodeId, { focus = false } = {}) { ... }
```

只調整 `boardWrapper.scrollLeft/scrollTop`。

## 6.7 P1-F：Filter、view mode 與 reset 狀態

- Filter button 保留 `aria-pressed`。
- 顯示各分類結果數或至少選取後公告結果數。
- 若 filter 會隱藏 active node，必須明示並決定：
  - 保留 active 但自動切 all；或
  - 清除 active 並公告原因。
- Relation navigation 跨 filter 的既有「切回 all」能力不可回歸。
- View mode control 使用按鈕或 radio-like semantics，清楚顯示目前模式。
- Reset 名稱與行為一致。

## 6.8 P1-G：Details disclosure

保留：

- `.details-toggle`
- `aria-expanded`
- `aria-controls`
- `.details-panel[hidden]`
- Empty details fallback
- Target ID chips
- Sources `target="_blank" rel="noopener noreferrer"`
- DOM API + `textContent`

可選：保存每個 node 的 disclosure state；若不保存，要把「sidebar 重建後預設關閉」視為明確產品決策並維持一致。

## 6.9 P1-H：Counter 降級

- 將 `ARCHIVE ACCESS` 移出主探索 HUD。
- 明示為「網站訪客計數」。
- 放在 sidebar footer 或其他次要區域。
- 成功、逾時、離線三種狀態不得造成主 layout shift。
- 保留 fail-silent timeout 與 session counting。

## 6.10 P1 驗收矩陣

### Keyboard-only

- [ ] Tab 可依合理順序到達 filter、card、relation、details、view mode、reset。
- [ ] Enter／Space 可完成選取與 details toggle。
- [ ] Relation navigation 後焦點位置可預測。
- [ ] 可返回原 card。
- [ ] Focus ring 在 dark board、paper card、sidebar 都可見。

### Screen reader semantics

- [ ] 只有一個頁面 `h1`。
- [ ] Dynamic record 是 `h2`。
- [ ] Card 有名稱、類型、關聯數與 selected state。
- [ ] Card control 與 sidebar 具有 controls relation。
- [ ] Relation list 是紅線的完整文字替代。
- [ ] 選取、跳轉、filter、view mode、reset 有適量 live announcement。

### Information hierarchy

- [ ] 手機第一個 sidebar viewport 看得到 short summary。
- [ ] 看得到至少 2–3 個 relation CTA。
- [ ] Art 為 120–160px 或可折疊 secondary content。
- [ ] `回到板面` sticky 且可用。
- [ ] 完整情報仍為第二層 disclosure。

### State reversibility

- [ ] Local → all → local 可逆。
- [ ] 收合其他可逆。
- [ ] Filter 不會無聲丟失 active context。
- [ ] Reset 副作用有清楚說明。
- [ ] Sidebar、board、HUD 數量與 active state 同步。

### Regression

- [ ] Timeline chip navigation。
- [ ] Relationship chip navigation。
- [ ] Related item target navigation。
- [ ] Source links。
- [ ] Empty details fallback。
- [ ] Reduced motion 基線沒有回歸。
- [ ] Forced colors 基線沒有回歸。

---

# 7. P2 — Noir 精修、離線穩定與最終交付

> 只有 P0、P1 驗收完成後才開始。

## 7.1 P2 目標

- 精修功能文字對比與 Noir 層級。
- 保留品牌而移除阻礙理解的裝飾噪音。
- 完成 reduced-motion、forced-colors、文字放大與多 viewport 驗收。
- 完成 `file://`、standalone、offline、counter failure 與資料完整性驗證。

## 7.2 P2-A：Visual hierarchy

提高以下功能性資訊的尺寸／對比：

- Card type
- Relation count
- Expand／collapse state
- Sidebar classification
- Relations heading
- CTA
- View mode
- Filter result

可以維持低對比：

- Record ID
- Source site label
- Board coordinate texture
- 非操作性的 metadata

紅色只作 signal：

- Active node
- Active connection
- 主要追查 CTA
- 目前流程步驟
- Error／warning

不要用更多紅色補救不清楚的資訊架構。

## 7.3 P2-B：Connections 與圖譜理解

- Active → direct relation 線最清楚。
- 非焦點線顯著降權。
- Full graph 可顯示更多線，但不可讓全部線具有相同強度。
- 關係判讀仍以文字 list 為完整替代。
- SVG 可維持 `aria-hidden`。
- Active / related / dimmed 在一秒內可辨識。

## 7.4 P2-C：座標、TOP SECRET、crosshair

桌面可保留；手機縮減或移出首屏安全區。

要求：

- 不得像隨機裁切的載入殘留。
- 不得覆蓋卡片或操作。
- 若無定位功能，就清楚維持為不干擾的 atmosphere layer。

## 7.5 P2-D：Motion 與 accessibility modes

### `prefers-reduced-motion`

- 取消大幅自動平移動畫。
- Bottom sheet 不使用彈簧式 animation。
- Card/line state 仍可立即辨識。
- `scroll-behavior` 使用 auto。

### Forced colors

- Active、related、focus、CTA 不只靠顏色。
- 使用 border、outline、text label 或 pattern。
- Paper card 與 board 有可辨識邊界。

### Text zoom

實測 200%：

- Card title 不被固定高度截斷。
- CTA 不重疊。
- Sidebar 可捲動。
- Bottom sheet sticky header 不覆蓋內容。
- Header／filter 可換行或水平容器內捲動，不造成 body overflow。

## 7.6 P2-E：Image 與授權提示

目前實際 image flow：

```text
cardImages local proposal image
→ load error
→ cardArt original Noir SVG fallback
```

Anchors：

- `cardImages`：`script.js:866-885`
- `createArtFigure()`：`script.js:1493-1538`
- Card art CSS：`styles.css:514-560`
- Detail art CSS：`styles.css:879-940`
- `assets/card-art/SOURCES.json`

注意：proposal images 不等於已取得 production redistribution rights。正式部署前必須：

- 替換，或
- 清除，或
- 確認授權。

不要把原創 SVG fallback 刪除。

## 7.7 P2-F：Offline 與 counter failure

必測：

1. `file://` 開啟 split source。
2. `file://` 開啟 standalone。
3. 完全離線。
4. Supabase timeout。
5. RPC error。
6. Counter success。
7. Local image error → SVG fallback。

所有情況下核心 board、sidebar、filter、relation、details、reset 與 keyboard 必須正常。

## 7.8 P2-G：文件同步

目前 README/HANDOFF 有 image 敘述漂移：仍偏向描述 `cardArt` SVG 是主要 card/sidebar image；現況已是 local proposal image primary、SVG fallback。

不要覆寫整份 `HANDOFF.md`。建議只更新相關影像段落，保留其架構、資料與驗證說明。

更新後應明確寫：

> 本地 proposal image 為 primary；原創 Noir SVG `cardArt` 為離線載入失敗 fallback。Proposal image 的正式部署權利需另行確認。

## 7.9 P2 最終驗收矩陣

### Functional

- [ ] Card pointer drag / arrange mode。
- [ ] Enter／Space selection。
- [ ] Expand／collapse relations。
- [ ] Local／all／collapse state。
- [ ] Category filter。
- [ ] Sidebar relation navigation。
- [ ] Timeline/relationship/related item navigation。
- [ ] Details disclosure。
- [ ] Reset。
- [ ] Resize desktop ↔ mobile。

### Visual viewport

- [ ] 1440×1000。
- [ ] 1120px。
- [ ] 880px。
- [ ] 620px。
- [ ] 390×844。
- [ ] 200% text zoom。
- [ ] Reduced motion。
- [ ] Forced colors。

### Offline/output

- [ ] `index.html` via `file://`。
- [ ] `black-org-evidence-board.html` via `file://`。
- [ ] Offline core flow。
- [ ] Counter success/failure/timeout 不改變核心 layout。
- [ ] Local image failure 有 SVG fallback。
- [ ] Standalone 已 inline CSS、JS、favicon 與必要資產。

### Static validation

```bash
node --check script.js
```

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

資料未修改時仍應確認數量與 targets；若資料意外變更，另做三份 ID-map 同步比較。

Build：

```bash
python3 tools/build_standalone.py
```

Diff hygiene：

```bash
git diff --check
git status --short
```

---

# 8. 建議 PR / Commit 邊界

## PR 1 — P0 Mobile investigation baseline

只包含：

- Mobile compact layout
- HUD 正式佔位
- Bounded local graph
- Selection/drag/pan 分離
- Bottom sheet baseline
- Relation-first mobile viewport
- Reset 語意

不要混入：

- 大量 visual polish
- 資料變更
- 圖片替換
- 文件全面改寫

## PR 2 — P1 IA and accessibility

只包含：

- Sidebar DOM order
- Sticky context / back-to-board
- Heading hierarchy
- ARIA selected/controls
- Live region
- Focus management
- Filter/view/reset announcements
- Counter 降級

## PR 3 — P2 Visual and delivery hardening

只包含：

- Contrast/type/connection polish
- Decorative layer cleanup
- Reduced motion / forced colors / text zoom
- Offline/counter/image failure validation
- Standalone rebuild
- README/HANDOFF drift correction

每個 PR：

- Source 與 generated standalone 可同 PR，但 generated file 不得手改。
- 說明實際執行的 browser matrix。
- 未驗證項目必須列出。
- 不因「看起來正常」省略 `file://` 與 keyboard 測試。

---

# 9. 常見錯誤與禁止做法

## 不要做

- 不要直接改 `black-org-evidence-board.html`。
- 不要把資料改成 `fetch("data.json")`。
- 不要引入 React、Vue、Svelte、Tailwind、npm 或 CDN。
- 不要用 CSS scale 假裝 mobile responsive canvas。
- 不要只在 CSS 隱藏節點，卻讓 JS count/lines 仍包含它們。
- 不要讓 card container 同時承擔 click、drag、disclosure 而沒有清楚熱區。
- 不要移除 pointer capture 卻不補 touch drag 測試。
- 不要只更新 sidebar 而不 render target card。
- 不要只靠 SVG 紅線傳達關係。
- 不要把 dynamic record name 繼續設為第二個 `h1`。
- 不要讓 counter success 改變 HUD 高度。
- 不要刪除 SVG fallback。
- 不要自行新增人物、證據或關係。
- 不要宣稱 Supabase migration 已部署。
- 不要在 browser 未實測時宣稱 UI 100 分。

## 要做

- 先讀 `CLAUDE.md`。
- 每 phase 先 plan。
- 使用現有命名、DOM API、`textContent` 與 Pointer Events idiom。
- 每次 render 先保存 positions。
- 保持 visibility、count、card state、sidebar 與 SVG 同步。
- 以 ID 處理 relation target。
- 保留 keyboard 路徑。
- 每次 source UI 變更後 rebuild standalone。
- 忠實回報未驗證情境。

---

# 10. 每階段開始前檢查

```text
[ ] 已讀 CLAUDE.md
[ ] 已讀 UI_OPTIMIZATION_HANDOFF.md
[ ] git status 已檢查
[ ] 沒有覆蓋其他未提交變更
[ ] 已確認本次只做一個 phase
[ ] 已列出涉及函式、DOM ID/class 與 CSS breakpoint
[ ] 已定義 browser acceptance matrix
[ ] 已確認不需要資料變更
```

# 11. 每階段交付前檢查

```text
[ ] 權威 source 修改完成
[ ] 沒有 standalone-only edit
[ ] node --check script.js 通過
[ ] JSON ID/type/connection 驗證通過
[ ] Browser/manual matrix 已執行
[ ] file:// 已實測
[ ] keyboard 已實測
[ ] mobile 390×844 已實測
[ ] desktop 1440×1000 已實測
[ ] python3 tools/build_standalone.py 已執行
[ ] generated standalone 已實測
[ ] git diff --check 通過
[ ] 未驗證項目已明列
[ ] 未自動 commit/push
```

---

# 12. 最終狀態判讀

- **設計規格已核准：100 / 100。**
- **目前實作仍是：53 / 100。**
- P0、P1、P2 不是三個可平行亂序執行的樣式工作；它們是依賴順序：

```text
P0 手機核心任務與 state model
→ P1 資訊架構與 accessibility
→ P2 visual polish、offline 與最終交付
```

後續模型完成某一 phase 後應停止，提交驗收結果給使用者確認，再進下一階段。
