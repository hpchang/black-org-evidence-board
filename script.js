// 內嵌資料庫：確保使用 file:// 直接開啟時不受 CORS 限制，完全離線可用。
const evidenceData = [
  {
    id: "p1",
    type: "person",
    name: "烏丸蓮耶",
    description: "黑衣組織的創立者與幕後首領，半個世紀前已被官方記錄死亡的日本大富豪，掌控著組織的終極研發目標。",
    connections: ["e1", "i1", "c1", "c4", "p6"]
  },
  {
    id: "c1",
    type: "code",
    name: "朗姆 (Rum / 脇田兼則)",
    description: "組織的第二把手，右眼為義眼。現使用化名「脇田兼則」在伊呂波壽司店潛伏，17年前在美國犯下羽田浩司命案。",
    connections: ["p1", "e2", "p2", "p3", "p9", "p11"]
  },
  {
    id: "c2",
    type: "code",
    name: "琴酒 (Gin)",
    description: "組織的高級幹部，冷酷無情，負責前線暗殺、交易與清除叛徒。在熱帶樂園灌下工藤新一 APTX 4869，親手殺害宮野明美。",
    connections: ["p4", "i1", "c3", "p7", "p8"]
  },
  {
    id: "c3",
    type: "code",
    name: "伏特加 (Vodka)",
    description: "琴酒的貼身助手，忠實執行命令。在追捕卡邁爾時，不慎透露了朗姆「改變容貌並起了一個愚蠢假名」的關鍵情報。",
    connections: ["c2"]
  },
  {
    id: "c4",
    type: "code",
    name: "苦艾酒 (Vermouth)",
    description: "深受首領寵愛的高級幹部，著名美國女星，擁有不老容顏。因新一和小蘭曾救過她，私下隱瞞新一與志保變小的秘密。",
    connections: ["p1", "p4", "p5", "i1"]
  },
  {
    id: "p4",
    type: "person",
    name: "工藤新一 (江戶川柯南)",
    description: "高中生偵探，被琴酒灌下 APTX 4869 後身體縮小，化名江戶川柯南，與 FBI、公安聯手調查組織，誓死解開羽田浩司等案件之謎。",
    connections: ["c2", "p5", "i1", "c4", "p9", "p8"]
  },
  {
    id: "p5",
    type: "person",
    name: "宮野志保 (雪莉 / 灰原哀)",
    description: "組織的前科學家，代號「雪莉」。繼承父母研究並主導 APTX 4869 的開發。在姐姐明美被殺後吞藥企圖自殺，身體縮小並叛逃。",
    connections: ["p4", "i1", "p6", "p7", "c4"]
  },
  {
    id: "p6",
    type: "person",
    name: "宮野厚司 & 艾蓮娜",
    description: "組織初期的科學家夫婦，被稱為「地獄天使」。19年前接受烏丸集團贊助開啟核心藥物研發，在研發出「銀色子彈」後死於神祕火災。",
    connections: ["p1", "p5", "p7", "e1", "i1"]
  },
  {
    id: "p7",
    type: "person",
    name: "宮野明美",
    description: "志保的姐姐，組織外圍成員。為了帶妹妹脫離組織，答應執行十億元搶劫案，最終在達成條件後仍被琴酒殘忍殺害。",
    connections: ["c2", "p5", "p6", "p8"]
  },
  {
    id: "p8",
    type: "person",
    name: "赤井秀一 (萊伊 / 沖矢昴)",
    description: "FBI 高級搜查官，曾化名「諸星大」並以代號「萊伊」滲透組織。其父赤井務武因調查17年前羽田浩司案而失蹤，促使秀一加入 FBI。",
    connections: ["p7", "c2", "p4", "p10", "e2", "p11"]
  },
  {
    id: "p9",
    type: "person",
    name: "安室透 (降谷零 / 波本)",
    description: "日本警察廳公安臥底。在現代事件中意外拾獲若狹留美掉落的「角行」將棋棋子，並依此判斷其主人為17年前遇害的羽田浩司而對若狹展開警戒。",
    connections: ["c1", "p4", "p10", "i2"]
  },
  {
    id: "p10",
    type: "person",
    name: "諸伏景光 (蘇格蘭)",
    description: "警視廳公安臥底，本名諸伏景光，代號「蘇格蘭」。臥底身分暴露後，為了不連累同僚與家人，在赤井面前奪槍自殺殉職。",
    connections: ["p9", "p8"]
  },
  {
    id: "p11",
    type: "person",
    name: "羽田浩司",
    description: "天才將棋棋手，17年前在美國涉入命案，被朗姆以藥物殺害。死前留下臨終訊息並將角行棋子留給淺香。羽田秀吉為其無血緣關係之義弟。",
    connections: ["e2", "i2", "p2", "p8", "c1"]
  },
  {
    id: "p2",
    type: "person",
    name: "若狹留美 (蕾切爾·淺香)",
    description: "帝丹小學副班導師，真實身分為17年前阿曼達的保鏢「淺香」。案發時獲羽田浩司保護並贈予「角行」棋子作為護身符，此後隨身攜帶，近期意外被安室透拾獲。",
    connections: ["c1", "e2", "i2", "p3", "p11"]
  },
  {
    id: "p3",
    type: "person",
    name: "黑田兵衛",
    description: "警視廳管理官，17年前在美國涉入羽田浩司命案並在救助淺香時遭遇車禍昏迷10年。目前正聯手柯南重新調查羽田浩司案的真相。",
    connections: ["c1", "e2", "p2"]
  },
  {
    id: "e1",
    type: "event",
    name: "藥物計畫啟動",
    description: "超過50年前由大富豪烏丸蓮耶啟動的極秘科學計畫，旨在達成組織「逆轉時間流逝」的終極目的，為 APTX 4869 的起源。",
    connections: ["p1", "p6", "i1"]
  },
  {
    id: "e2",
    type: "event",
    name: "羽田浩司命案",
    description: "17年前發生在美國的未解懸案。羽田浩司與美國富豪阿曼達被朗姆以藥物殺害，浩司死前留下了指向「ASACA RUM」的剪切臨終訊息，且隨身攜帶的「角行」棋子從現場神祕消失。",
    connections: ["c1", "p2", "p3", "p8", "i2", "p11"]
  },
  {
    id: "i1",
    type: "item",
    name: "APTX 4869",
    description: "由宮野夫婦研發、後由雪莉（志保）繼承開發的神秘藥物。臨床上作為無痕毒藥使用，卻會偶發性導致人體細胞退化縮小。",
    connections: ["e1", "p4", "p5", "p6", "c4", "c2", "p1"]
  },
  {
    id: "i2",
    type: "item",
    name: "角行將棋棋子",
    description: "羽田浩司生前作為護身符不離身的將棋棋子「角行」。案發時浩司將其贈予淺香（若狹留美）作為防身與牽絆，此後被其隨身攜帶，於現代事件中不慎掉落並被安室透拾獲，成為破解懸案之關鍵。",
    connections: ["e2", "p2", "p9", "p11"]
  }
];

// ── 第二層詳細情報資料模型 ─────────────────────────────────────────
// 採用「空骨架待補」策略：結構與欄位齊備，但各筆詳細內容留空，
// 待使用者提供情報材料後再填入。絕不自行編造劇情設定。
//
// 每筆 details 可包含：
//   identity        身分背景（字串）
//   aliases         別名清單（字串陣列）
//   affiliations    所屬組織／陣營（字串陣列）
//   timeline        [{ label, content }]
//   relationships   [{ targetId, summary }]
//   relatedItems    相關物品（字串陣列）
//   confirmedFacts  已確認情報（字串陣列）
//   unconfirmed     尚未確認或有爭議情報（字串陣列）
//   sources         [{ site, title, url }]
//
// 任何欄位缺空或為空陣列時，UI 不會渲染該區塊。
const DETAILS_PLACEHOLDER = "（待補，等待情報材料）";

function emptyDetails() {
  return {
    identity: "",
    aliases: [],
    affiliations: [],
    timeline: [],
    relationships: [],
    relatedItems: [],
    confirmedFacts: [],
    unconfirmed: [],
    sources: []
  };
}

const evidenceDetails = {};
evidenceData.forEach((node) => {
  evidenceDetails[node.id] = emptyDetails();
});

function getDetails(nodeId) {
  const stored = evidenceDetails[nodeId];
  if (!stored) return emptyDetails();
  // 合併至完整骨架：即使只提供部分欄位，也能補齊缺空的陣列／字串，
  // 避免 renderDetailsPanel 讀取未定義欄位而崩潰。
  const base = emptyDetails();
  return {
    identity: stored.identity ?? base.identity,
    aliases: Array.isArray(stored.aliases) ? stored.aliases : base.aliases,
    affiliations: Array.isArray(stored.affiliations) ? stored.affiliations : base.affiliations,
    timeline: Array.isArray(stored.timeline) ? stored.timeline : base.timeline,
    relationships: Array.isArray(stored.relationships) ? stored.relationships : base.relationships,
    relatedItems: Array.isArray(stored.relatedItems) ? stored.relatedItems : base.relatedItems,
    confirmedFacts: Array.isArray(stored.confirmedFacts) ? stored.confirmedFacts : base.confirmedFacts,
    unconfirmed: Array.isArray(stored.unconfirmed) ? stored.unconfirmed : base.unconfirmed,
    sources: Array.isArray(stored.sources) ? stored.sources : base.sources
  };
}

const TYPE_LABELS = {
  person: "主要人物",
  code: "組織代號",
  event: "關鍵事件",
  item: "專屬物品"
};

const TYPE_SHORT_LABELS = {
  person: "人物",
  code: "代號",
  event: "事件",
  item: "物品"
};

const CORE_NODE_IDS = ["p1", "c1", "c2", "p4", "i1"];
const INITIAL_POSITIONS = {
  p1: { x: 500, y: 105 },
  c1: { x: 265, y: 285 },
  c2: { x: 735, y: 285 },
  p4: { x: 500, y: 605 },
  i1: { x: 500, y: 355 }
};

let activeNodeId = null;
let currentFilter = "all";
let positions = clonePositions(INITIAL_POSITIONS);
const expandedNodeIds = new Set();

const pinboard = document.getElementById("pinboard");
const svgLayer = document.getElementById("connections-svg");
const sidebarContent = document.getElementById("sidebar-content");
const boardWrapper = document.getElementById("board-wrapper");
const visibleCount = document.getElementById("visible-count");

function clonePositions(source) {
  return Object.fromEntries(
    Object.entries(source).map(([id, position]) => [id, { ...position }])
  );
}

function hashString(value) {
  return [...value].reduce((hash, character) => ((hash << 5) - hash + character.charCodeAt(0)) | 0, 0);
}

function getNode(nodeId) {
  return evidenceData.find((node) => node.id === nodeId);
}

function areConnected(firstId, secondId) {
  const first = getNode(firstId);
  const second = getNode(secondId);
  return Boolean(
    first && second &&
    (first.connections.includes(secondId) || second.connections.includes(firstId))
  );
}

function getVisibleNodeIds() {
  const visibleIds = new Set(CORE_NODE_IDS);

  expandedNodeIds.forEach((nodeId) => {
    const node = getNode(nodeId);
    if (!node) return;
    visibleIds.add(nodeId);
    node.connections.forEach((connectionId) => visibleIds.add(connectionId));
  });

  if (activeNodeId) visibleIds.add(activeNodeId);
  return visibleIds;
}

function getActiveFilterButton() {
  return document.querySelector(".filter-btn.active");
}

function init() {
  renderBoard();
  setupFilters();
  setupResetLayout();
  updateRecordClock();

  window.addEventListener("resize", drawConnections);
  window.setInterval(updateRecordClock, 60000);

  window.requestAnimationFrame(() => {
    boardWrapper.scrollTo({ left: 70, top: 24, behavior: "auto" });
  });
}

function renderBoard() {
  preserveRenderedPositions();
  pinboard.querySelectorAll(".node-card").forEach((card) => card.remove());

  const visibleIds = getVisibleNodeIds();
  const displayedNodes = evidenceData.filter((node) => {
    const matchesFilter = currentFilter === "all" || node.type === currentFilter;
    return visibleIds.has(node.id) && matchesFilter;
  });

  displayedNodes.forEach((node) => {
    if (!positions[node.id]) {
      positions[node.id] = findFallbackPosition(node.id);
    }
    pinboard.appendChild(createNodeCard(node));
  });

  visibleCount.textContent = String(displayedNodes.length);
  updateCardVisuals();
  drawConnections();
}

function preserveRenderedPositions() {
  pinboard.querySelectorAll(".node-card").forEach((card) => {
    positions[card.dataset.nodeId] = {
      x: Number.parseFloat(card.style.left),
      y: Number.parseFloat(card.style.top)
    };
  });
}

function createNodeCard(node) {
  const card = document.createElement("article");
  const rotation = ((Math.abs(hashString(node.id)) % 7) - 3) * 0.32;

  card.id = `node-${node.id}`;
  card.className = "node-card";
  card.dataset.nodeId = node.id;
  card.dataset.type = node.type;
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `${node.name}，${TYPE_LABELS[node.type]}，點擊展開或收合關聯線索`);
  card.setAttribute("aria-expanded", String(expandedNodeIds.has(node.id)));
  card.style.left = `${positions[node.id].x}px`;
  card.style.top = `${positions[node.id].y}px`;
  card.style.setProperty("--card-rotation", `${rotation}deg`);

  const meta = document.createElement("div");
  meta.className = "card-meta";

  const type = document.createElement("span");
  type.className = "card-type";
  type.textContent = TYPE_SHORT_LABELS[node.type];

  const id = document.createElement("span");
  id.className = "card-id";
  id.textContent = node.id.toUpperCase().padStart(4, "0");

  const title = document.createElement("h2");
  title.className = "card-title";
  title.textContent = node.name;

  const footer = document.createElement("div");
  footer.className = "card-footer";

  const connectionCount = document.createElement("span");
  connectionCount.textContent = `${node.connections.length} RELATIONS`;

  const expandStatus = document.createElement("span");
  expandStatus.className = "expand-status";
  expandStatus.textContent = expandedNodeIds.has(node.id) ? "− 收合" : "+ 展開";

  meta.append(type, id);
  footer.append(connectionCount, expandStatus);
  card.append(meta, title, footer);

  makeElementInteractive(card, node);
  return card;
}

function makeElementInteractive(card, node) {
  let pointerId = null;
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;
  let hasMoved = false;

  card.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    event.preventDefault();
    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    startLeft = card.offsetLeft;
    startTop = card.offsetTop;
    hasMoved = false;
    card.setPointerCapture(pointerId);
  });

  card.addEventListener("pointermove", (event) => {
    if (event.pointerId !== pointerId) return;

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    if (!hasMoved && Math.hypot(deltaX, deltaY) < 5) return;

    hasMoved = true;
    card.classList.add("dragging");

    const maxX = pinboard.clientWidth - card.offsetWidth - 18;
    const maxY = pinboard.clientHeight - card.offsetHeight - 18;
    const nextX = Math.max(18, Math.min(maxX, startLeft + deltaX));
    const nextY = Math.max(18, Math.min(maxY, startTop + deltaY));

    card.style.left = `${nextX}px`;
    card.style.top = `${nextY}px`;
    positions[node.id] = { x: nextX, y: nextY };
    drawConnections();
  });

  const finishPointer = (event) => {
    if (event.pointerId !== pointerId) return;

    if (card.hasPointerCapture(pointerId)) {
      card.releasePointerCapture(pointerId);
    }

    card.classList.remove("dragging");
    pointerId = null;

    if (!hasMoved) {
      selectNode(node);
    }
  };

  card.addEventListener("pointerup", finishPointer);
  card.addEventListener("pointercancel", (event) => {
    if (event.pointerId !== pointerId) return;
    card.classList.remove("dragging");
    pointerId = null;
  });

  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    selectNode(node);
  });
}

function seedConnectedPositions(node) {
  const parentPosition = positions[node.id] || findFallbackPosition(node.id);
  const total = Math.max(node.connections.length, 1);

  node.connections.forEach((connectionId, index) => {
    if (positions[connectionId]) return;

    const baseAngle = (index / total) * Math.PI * 2;
    const offset = (Math.abs(hashString(`${node.id}-${connectionId}`)) % 31) / 100;
    const angle = baseAngle + offset;
    const radiusX = 225 + (index % 2) * 35;
    const radiusY = 175 + ((index + 1) % 2) * 30;

    positions[connectionId] = {
      x: clamp(parentPosition.x + Math.cos(angle) * radiusX, 32, pinboard.clientWidth - 205),
      y: clamp(parentPosition.y + Math.sin(angle) * radiusY, 42, pinboard.clientHeight - 160)
    };
  });
}

function findFallbackPosition(nodeId) {
  const hash = Math.abs(hashString(nodeId));
  return {
    x: 380 + (hash % 780),
    y: 180 + ((hash * 7) % 720)
  };
}

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value));
}

function selectNode(node) {
  if (activeNodeId === node.id) {
    if (expandedNodeIds.has(node.id)) {
      expandedNodeIds.delete(node.id);
    } else {
      expandedNodeIds.add(node.id);
      seedConnectedPositions(node);
    }
  } else {
    activeNodeId = node.id;
    expandedNodeIds.add(node.id);
    seedConnectedPositions(node);
  }

  renderBoard();
  populateSidebar(node);
}

function drawConnections() {
  svgLayer.replaceChildren();
  const drawnKeys = new Set();

  evidenceData.forEach((node) => {
    const fromCard = document.getElementById(`node-${node.id}`);
    if (!fromCard) return;

    node.connections.forEach((connectionId) => {
      const toCard = document.getElementById(`node-${connectionId}`);
      if (!toCard) return;

      const key = [node.id, connectionId].sort().join("-");
      if (drawnKeys.has(key)) return;
      drawnKeys.add(key);

      const x1 = fromCard.offsetLeft + fromCard.offsetWidth / 2;
      const y1 = fromCard.offsetTop + 4;
      const x2 = toCard.offsetLeft + toCard.offsetWidth / 2;
      const y2 = toCard.offsetTop + 4;
      const curve = createCurvePath(x1, y1, x2, y2, key);
      const isActive = activeNodeId && (node.id === activeNodeId || connectionId === activeNodeId);
      const isDimmed = activeNodeId && !isActive;

      const shadow = document.createElementNS("http://www.w3.org/2000/svg", "path");
      shadow.setAttribute("d", curve);
      shadow.setAttribute("class", `connection-shadow${isDimmed ? " dimmed-connection" : ""}`);

      const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
      line.setAttribute("d", curve);
      line.setAttribute("class", [
        "connection-line",
        isActive ? "active-connection" : "",
        isDimmed ? "dimmed-connection" : ""
      ].filter(Boolean).join(" "));

      const knot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      knot.setAttribute("cx", String(x1));
      knot.setAttribute("cy", String(y1));
      knot.setAttribute("r", isActive ? "4" : "3");
      knot.setAttribute("class", `connection-knot${isDimmed ? " dimmed-connection" : ""}`);

      svgLayer.append(shadow, line, knot);
    });
  });
}

function createCurvePath(x1, y1, x2, y2, key) {
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  const length = Math.max(Math.hypot(deltaX, deltaY), 1);
  const normalX = -deltaY / length;
  const normalY = deltaX / length;
  const hash = hashString(key);
  const direction = hash % 2 === 0 ? 1 : -1;
  const bend = (15 + (Math.abs(hash) % 28)) * direction;
  const controlX = (x1 + x2) / 2 + normalX * bend;
  const controlY = (y1 + y2) / 2 + normalY * bend;
  return `M ${x1} ${y1} Q ${controlX} ${controlY} ${x2} ${y2}`;
}

function updateCardVisuals() {
  evidenceData.forEach((node) => {
    const card = document.getElementById(`node-${node.id}`);
    if (!card) return;

    card.classList.remove("active-card", "related-card", "dimmed-card");
    card.setAttribute("aria-expanded", String(expandedNodeIds.has(node.id)));

    const status = card.querySelector(".expand-status");
    if (status) {
      status.textContent = expandedNodeIds.has(node.id) ? "− 收合" : "+ 展開";
    }

    if (!activeNodeId) return;

    if (node.id === activeNodeId) {
      card.classList.add("active-card");
    } else if (areConnected(activeNodeId, node.id)) {
      card.classList.add("related-card");
    } else {
      card.classList.add("dimmed-card");
    }
  });
}

function populateSidebar(node) {
  const detail = document.createElement("article");
  detail.className = "detail-card";
  detail.dataset.type = node.type;

  const classification = document.createElement("div");
  classification.className = "detail-classification";

  const type = document.createElement("span");
  type.className = "detail-type";
  type.textContent = TYPE_LABELS[node.type];

  const recordId = document.createElement("span");
  recordId.className = "detail-record-id";
  recordId.textContent = `RECORD ${node.id.toUpperCase().padStart(4, "0")}`;

  const name = document.createElement("h1");
  name.className = "detail-name";
  name.textContent = node.name;

  const descriptionBlock = document.createElement("section");
  descriptionBlock.className = "detail-desc-block";

  const descriptionLabel = document.createElement("span");
  descriptionLabel.className = "detail-label";
  descriptionLabel.textContent = "INTELLIGENCE ABSTRACT / 情報摘要";

  const description = document.createElement("p");
  description.className = "detail-desc";
  description.textContent = node.description;

  const relations = document.createElement("section");
  relations.className = "relations-section";

  const relationsHeading = document.createElement("div");
  relationsHeading.className = "relations-heading";

  const relationsTitle = document.createElement("h3");
  relationsTitle.textContent = "直接關聯線索";

  const relationsCount = document.createElement("span");
  relationsCount.textContent = `${String(node.connections.length).padStart(2, "0")} LINKS`;

  const relationsList = document.createElement("div");
  relationsList.className = "relations-list";

  node.connections.forEach((connectionId) => {
    const relatedNode = getNode(connectionId);
    if (!relatedNode) return;
    relationsList.appendChild(createRelationButton(relatedNode));
  });

  classification.append(type, recordId);
  descriptionBlock.append(descriptionLabel, description);
  relationsHeading.append(relationsTitle, relationsCount);
  relations.append(relationsHeading, relationsList);
  detail.append(classification, name, descriptionBlock, createDetailsDisclosure(node), relations);
  sidebarContent.replaceChildren(detail);
}

// ── 第二層詳細情報：可收合展開區 ───────────────────────────────────
function createDetailsDisclosure(node) {
  const wrapper = document.createElement("div");
  wrapper.className = "details-disclosure";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "details-toggle";
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", `details-panel-${node.id}`);

  const toggleLabel = document.createElement("span");
  toggleLabel.className = "details-toggle-label";
  toggleLabel.textContent = "展開完整情報";

  const toggleIcon = document.createElement("span");
  toggleIcon.className = "details-toggle-icon";
  toggleIcon.setAttribute("aria-hidden", "true");
  toggleIcon.textContent = "+";

  button.append(toggleLabel, toggleIcon);

  const panel = document.createElement("div");
  panel.id = `details-panel-${node.id}`;
  panel.className = "details-panel";
  panel.hidden = true;

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    toggleLabel.textContent = isOpen ? "展開完整情報" : "收合完整情報";
    toggleIcon.textContent = isOpen ? "+" : "−";
    panel.hidden = isOpen;
  });

  renderDetailsPanel(panel, node);
  wrapper.append(button, panel);
  return wrapper;
}

function renderDetailsPanel(panel, node) {
  const details = getDetails(node.id);

  const sections = [];

  if (details.identity) {
    sections.push(buildDetailSection("身分背景", [details.identity]));
  }
  if (details.aliases.length) {
    sections.push(buildDetailSection("別名", details.aliases));
  }
  if (details.affiliations.length) {
    sections.push(buildDetailSection("所屬組織／陣營", details.affiliations));
  }
  if (details.timeline.length) {
    const items = details.timeline.map((entry) => ({
      label: entry.label,
      content: entry.content
    }));
    sections.push(buildTimelineSection("時間線", items));
  }
  if (details.relationships.length) {
    sections.push(buildRelationshipSection("人物關係", node, details.relationships));
  }
  if (details.relatedItems.length) {
    sections.push(buildDetailSection("相關物品", details.relatedItems));
  }
  if (details.confirmedFacts.length) {
    sections.push(buildDetailSection("已確認情報", details.confirmedFacts));
  }
  if (details.unconfirmed.length) {
    sections.push(buildDetailSection("尚未確認或有爭議", details.unconfirmed, true));
  }
  if (details.sources.length) {
    sections.push(buildSourcesSection("資料來源", details.sources));
  }

  if (!sections.length) {
    const note = document.createElement("p");
    note.className = "details-empty";
    note.textContent = DETAILS_PLACEHOLDER;
    panel.appendChild(note);
    return;
  }

  sections.forEach((section) => panel.appendChild(section));
}

function buildDetailSection(label, items, isUnconfirmed = false) {
  const section = document.createElement("section");
  section.className = "details-section";
  if (isUnconfirmed) section.dataset.variant = "unconfirmed";

  const heading = document.createElement("span");
  heading.className = "details-label";
  heading.textContent = label;

  const list = document.createElement("ul");
  list.className = "details-list";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "details-item";
    li.textContent = item;
    list.appendChild(li);
  });

  section.append(heading, list);
  return section;
}

function buildTimelineSection(label, entries) {
  const section = document.createElement("section");
  section.className = "details-section";

  const heading = document.createElement("span");
  heading.className = "details-label";
  heading.textContent = label;

  const list = document.createElement("ol");
  list.className = "details-timeline";

  entries.forEach((entry) => {
    const li = document.createElement("li");
    li.className = "timeline-entry";

    const stamp = document.createElement("span");
    stamp.className = "timeline-stamp";
    stamp.textContent = entry.label;

    const body = document.createElement("span");
    body.className = "timeline-body";
    body.textContent = entry.content;

    li.append(stamp, body);
    list.appendChild(li);
  });

  section.append(heading, list);
  return section;
}

function buildRelationshipSection(label, node, relationships) {
  const section = document.createElement("section");
  section.className = "details-section";

  const heading = document.createElement("span");
  heading.className = "details-label";
  heading.textContent = label;

  const list = document.createElement("ul");
  list.className = "details-list";

  relationships.forEach((rel) => {
    const li = document.createElement("li");
    li.className = "details-item details-relationship";

    const target = getNode(rel.targetId);
    if (target) {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "relationship-chip";
      chip.dataset.type = target.type;
      chip.textContent = target.name;
      chip.setAttribute("aria-label", `前往關聯線索：${target.name}`);
      chip.addEventListener("click", () => handleRelationClick(target.id));
      li.append(chip, document.createTextNode("　"));
    }

    const summary = document.createElement("span");
    summary.className = "relationship-summary";
    summary.textContent = rel.summary;
    li.appendChild(summary);

    list.appendChild(li);
  });

  section.append(heading, list);
  return section;
}

function buildSourcesSection(label, sources) {
  const section = document.createElement("section");
  section.className = "details-section";

  const heading = document.createElement("span");
  heading.className = "details-label";
  heading.textContent = label;

  const list = document.createElement("ul");
  list.className = "details-sources";

  sources.forEach((src) => {
    const li = document.createElement("li");
    li.className = "source-entry";

    const site = document.createElement("span");
    site.className = "source-site";
    site.textContent = src.site || "";

    const link = document.createElement("a");
    link.className = "source-link";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    // 安全插入：url 與 title 皆來自本地策展資料，且僅寫入屬性／textContent，
    // 不會被當作 HTML 解析，避免注入。
    if (src.url) {
      try {
        link.href = String(src.url);
        link.textContent = src.title || src.url;
      } catch {
        link.textContent = src.title || "";
      }
    } else {
      link.textContent = src.title || "";
    }

    li.append(site, link);
    list.appendChild(li);
  });

  section.append(heading, list);
  return section;
}

function createRelationButton(node) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "relation-item";
  button.dataset.type = node.type;
  button.setAttribute("aria-label", `前往關聯線索：${node.name}`);

  const marker = document.createElement("span");
  marker.className = "relation-marker";
  marker.setAttribute("aria-hidden", "true");

  const copy = document.createElement("span");
  copy.className = "relation-copy";

  const kind = document.createElement("span");
  kind.className = "relation-kind";
  kind.textContent = TYPE_LABELS[node.type];

  const name = document.createElement("span");
  name.className = "relation-name";
  name.textContent = node.name;

  const arrow = document.createElement("span");
  arrow.className = "relation-arrow";
  arrow.textContent = "→";
  arrow.setAttribute("aria-hidden", "true");

  copy.append(kind, name);
  button.append(marker, copy, arrow);
  button.addEventListener("click", () => handleRelationClick(node.id));
  return button;
}

function handleRelationClick(nodeId) {
  const node = getNode(nodeId);
  if (!node) return;

  if (currentFilter !== "all" && currentFilter !== node.type) {
    setActiveFilter("all");
  }

  activeNodeId = node.id;
  expandedNodeIds.add(node.id);
  seedConnectedPositions(node);
  renderBoard();
  populateSidebar(node);

  window.requestAnimationFrame(() => {
    const card = document.getElementById(`node-${node.id}`);
    card?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    card?.focus({ preventScroll: true });
  });
}

function resetSidebar() {
  const empty = document.createElement("div");
  empty.className = "empty-state";

  const crosshair = document.createElement("div");
  crosshair.className = "empty-crosshair";
  crosshair.setAttribute("aria-hidden", "true");

  const title = document.createElement("p");
  title.className = "empty-title";
  title.textContent = "尚未選取線索";

  const body = document.createElement("p");
  body.textContent = "點擊證據板上的任意卡片，解鎖其深層關係與機密檔案。";

  empty.append(crosshair, title, body);
  sidebarContent.replaceChildren(empty);
}

function setupFilters() {
  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      setActiveFilter(filter);

      const activeNode = activeNodeId ? getNode(activeNodeId) : null;
      if (activeNode && filter !== "all" && activeNode.type !== filter) {
        activeNodeId = null;
        resetSidebar();
      }

      renderBoard();
    });
  });
}

function setActiveFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll(".filter-btn").forEach((button) => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function setupResetLayout() {
  document.getElementById("reset-layout-btn").addEventListener("click", () => {
    positions = clonePositions(INITIAL_POSITIONS);
    expandedNodeIds.clear();
    activeNodeId = null;
    setActiveFilter("all");
    resetSidebar();
    renderBoard();
    boardWrapper.scrollTo({ left: 70, top: 24, behavior: "smooth" });
  });
}

function updateRecordClock() {
  const target = document.getElementById("record-clock");
  const now = new Date();
  const time = new Intl.DateTimeFormat("zh-Hant", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(now);
  target.textContent = `SYS / OFFLINE / ${time}`;
}

init();
