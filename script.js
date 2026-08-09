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
//   timeline        [{ label, content, targetId? }]  targetId 可選：把內容裡的對應線索變可點連結
//   relationships   [{ targetId, summary }]
//   relatedItems    相關物品（字串或 ID；若為現有節點 ID 則渲染成可點連結）
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

// ── 已策展的詳細情報（使用者提供材料後整理、改寫，並附來源）────────
// 寫法對應 renderDetailsPanel 支援的連結型態：
//   relatedItems 每項可為純字串、節點 ID、或 { name, targetId }
//   timeline   每條可選 targetId：內容後附可點的關聯 chip
//   relationships 每條 { targetId, summary }
// 無卡片者（如 Amanda Hughes）以純文字呈現，不建立連結。
evidenceDetails.p1 = {
  identity: "日本實力最為強大的頂級大富豪，黑衣組織的創立者與幕後最高支配者。官方記錄其於 50 年前死亡，實際存活至今。",
  aliases: ["組織首領", "「那位大人」（Anokata）"],
  affiliations: ["黑衣組織", "烏丸集團（Karasuma Group）"],
  timeline: [
    { label: "未知年份", content: "烏丸蓮耶誕生。" },
    { label: "67 年前", content: "美國富豪 Amanda Hughes 在烏丸蓮耶的誕生派對上，與尚未獲得二把手稱號的朗姆遭遇。", targetId: "c1" },
    { label: "超過 50 年前", content: "啟動黑衣組織的核心研究計畫，該計畫最終導致 APTX 4869 的研發。", targetId: "i1" },
    { label: "50 年前", content: "官方記錄烏丸蓮耶死亡。" },
    { label: "約 47 年前", content: "朗姆代表因身體狀況抱恙而缺席的烏丸蓮耶，出席國際經濟論壇的年會。", targetId: "c1" },
    { label: "19 年前", content: "宮野夫婦同意關閉診所，加入由烏丸集團贊助的神秘研究設施。", targetId: "p6" },
    { label: "當前時間線", content: "工藤優作向柯南與赤井秀一證實，17 年前羽田浩司命案的死前留言應解讀為「CARASUMA」，判定烏丸蓮耶是組織首領且至今依然活著。", targetId: "e2" }
  ],
  relationships: [
    { targetId: "c1", summary: "其組織二把手，在數十年前便代表病重的烏丸蓮耶出席公開活動。" },
    { targetId: "p6", summary: "19 年前接受烏丸集團贊助，為其開發核心藥物。" },
    { targetId: "c4", summary: "深受首領寵愛的高級幹部，兩人關係極其特殊，苦艾酒似有不希望被組織知道身體變小（退化）的理由。" }
  ],
  relatedItems: [
    { name: "APTX 4869 原始開發企劃", targetId: "i1" }
  ],
  confirmedFacts: [
    "為黑衣組織的最高首領，擁有富可敵國的財力。",
    "50 年前官方記錄死亡，但實際存活至今。"
  ],
  unconfirmed: [
    "具體的存活方式是否與 APTX 4869 的藥效有關。",
    "與苦艾酒之間不為人知的深層承諾（資料中僅提及苦艾酒隱瞞新一與志保縮小的真相，其與首領的具體爭議未完全揭露）。"
  ],
  sources: [
    { site: "Detective Conan Wiki", title: "Timeline", url: "https://www.detectiveconanworld.com/wiki/Timeline" }
  ]
};

evidenceDetails.i1 = {
  identity: "由宮野厚司 & 艾蓮娜開啟研發、後由其小女兒宮野志保繼承開發的神秘藥物，研發起點可追溯至半個世紀前。",
  aliases: ["宮野艾蓮娜生前將此藥物的前身計畫稱為「銀色子彈（Silver Bullet）」"],
  affiliations: ["黑衣組織"],
  timeline: [
    { label: "超過 50 年前", content: "烏丸蓮耶啟動與此藥物相關的組織核心科學計畫。", targetId: "p1" },
    { label: "17 年前", content: "羽田浩司命案中，天才棋手羽田浩司被組織強灌某版本的 APTX 4869 毒殺，其名字後被記錄在 APTX 受害者名單中。", targetId: "e2" },
    { label: "5 年前", content: "年僅 13 歲的宮野志保在組織內以高智商科學家身分，主導並進行 APTX 4869 的開發工作。", targetId: "p5" },
    { label: "當前時間線", content: "工藤新一在熱帶樂園被琴酒與伏特加灌下此藥，身體縮小至 6-7 歲，被迫化名江戶川柯南。", targetId: "p4" },
    { label: "當前時間線", content: "宮野志保在姐姐宮野明美被殺後中斷研究，被囚禁時服下 APTX 4869 企圖自殺，卻意外身體縮小逃脫，化名灰原哀。", targetId: "p5" },
    { label: "當前時間線", content: "灰原哀取得部分藥物資料，開發出臨時解毒劑，供柯南在倫敦與京都修學旅行期間短暫恢復為工藤新一。" },
    { label: "當前時間線", content: "赤井瑪麗在倫敦 Vauxhall 橋被偽裝成赤井務武的苦艾酒強灌此藥，導致身體退化至中學生大小。", targetId: "c4" },
    { label: "當前時間線", content: "組織二把手朗姆下令要求收集並調查 APTX 4869 在不同服用者身上產生不同效果（死亡或縮小）的具體條件。", targetId: "c1" }
  ],
  relationships: [
    { targetId: "p6", summary: "此藥物原始項目「銀色子彈」的最初奠基者與研發者。" },
    { targetId: "p5", summary: "繼承父母研究並將其開發為試作毒藥的科學家，後因吞服此藥縮小叛逃。" },
    { targetId: "p4", summary: "受害者，被琴酒灌藥後縮小。" },
    { targetId: "p11", summary: "17 年前被該藥物殺害的受害者。" },
    { targetId: "c4", summary: "強行灌藥導致赤井瑪麗縮小的加害者，且出於未知原因隱瞞了工藤新一與宮野志保服用此藥後依然存活的秘密。" }
  ],
  relatedItems: [
    "臨時解毒劑（Antidote）"
  ],
  confirmedFacts: [
    "藥物在常規下可致人於無形死亡。",
    "有極低機率會引發人體細胞退化縮小，且縮小後的個體仍保留原本的記憶與智商。"
  ],
  unconfirmed: [
    "藥物研發的終極目標（「逆轉時間流逝」）。",
    "宮野夫婦原版藥物與志保繼承後藥物在成分上的本質差異。"
  ],
  sources: [
    { site: "Detective Conan Wiki", title: "Timeline", url: "https://www.detectiveconanworld.com/wiki/Timeline" }
  ]
};

evidenceDetails.e2 = {
  identity: "17 年前黑衣組織二把手朗姆犯下的重大謀殺案，也是赤井秀一加入 FBI、柯南、黑田兵衛、若狹留美與安室透各方勢力深入對抗組織的命運交織點。",
  aliases: ["17 年前的真相事件（Case from 17 years ago）"],
  affiliations: ["黑衣組織（策劃與執行方）"],
  timeline: [
    { label: "17 年前", content: "朗姆帶領組織成員企圖逼迫 Amanda Hughes 加入組織，Amanda 吞下藥物自殺。", targetId: "c1" },
    { label: "17 年前", content: "羽田浩司在自己的房間保護了 Amanda 的保鏢若狹留美（Asaka），隨後被朗姆灌下 APTX 4869 毒殺，並在死前切碎鏡子留下「ASACA RUM」留言。", targetId: "p11" },
    { label: "17 年前", content: "前來接頭的黑田兵衛發現遺體，在帶領 Asaka 開車逃亡時遭遇嚴重交通車禍昏迷 10 年。", targetId: "p3" },
    { label: "17 年前", content: "赤井務武受羽田家委託調查後失蹤，其子赤井秀一因此立志加入 FBI 調查此案。", targetId: "p8" },
    { label: "當前時間線", content: "柯南與灰原哀在網路上檢索羽田浩司命案，並將其與 APTX 受害者名單進行關聯調查。" },
    { label: "當前時間線", content: "工藤優作推導出，命案現場的死前留言「ASACA RUM」實為「CARASUMA」之字母重組，鎖定烏丸蓮耶為組織首領。", targetId: "p1" },
    { label: "當前時間線", content: "安室透在現代事件中意外撿到若狹留美掉落的將棋棋子「角行」，回憶起這曾是羽田浩司隨身攜帶、但在 17 年前命案現場神祕消失的遺物，因而開始全力戒備若狹留美。", targetId: "p9" },
    { label: "當前時間線", content: "黑田兵衛在現代聯手柯南，重新還原 17 年前命案當天的完整細節，正式揭開若狹留美就是消失的 Asaka，並引發了組織對若狹留美的狙擊大戰。", targetId: "p3" }
  ],
  relationships: [
    { targetId: "p11", summary: "被害者，遇害前將護身符棋子留給 Asaka。" },
    { targetId: "c1", summary: "此命案的主導者與兇手。" },
    { targetId: "p2", summary: "當年的失蹤保鏢 Asaka，目前隱姓埋名潛伏在帝丹小學，隨身攜帶浩司的角行棋子並誓死向組織報仇。" },
    { targetId: "p3", summary: "當年的現場調查者與 Asaka 的救助者，因車禍導致右眼失明白髮，昏迷 10 年。" },
    { targetId: "p8", summary: "因父親赤井務武調查此案失蹤而加入 FBI，誓要捉拿兇手朗姆。" },
    { targetId: "p9", summary: "現代拾獲浩司遺物棋子的調查者，隨後被若狹留美襲擊並奪回棋子。" }
  ],
  relatedItems: [
    { name: "角行將棋棋子", targetId: "i2" },
    "死前留言（鏡子字母拼寫）"
  ],
  confirmedFacts: [
    "羽田浩司是被組織藥物毒殺。",
    "Amanda 的死因在外界記錄為未知，但實際是為保全 Asaka 而主動吞藥自盡。"
  ],
  unconfirmed: [
    "黑田兵衛與 Asaka 發生車禍的確切真相。",
    "若狹留美在 17 年間如何逃過組織追殺並取得教師執照的具體細節。"
  ],
  sources: [
    { site: "Detective Conan Wiki", title: "Timeline", url: "https://www.detectiveconanworld.com/wiki/Timeline" }
  ]
};

evidenceDetails.c3 = {
  identity: "黑衣組織的高級幹部之一，主要擔任琴酒的副手、司機與前線聯絡人。",
  aliases: ["ウォッカ（Wokka）"],
  affiliations: ["黑衣組織"],
  timeline: [
    { label: "當前時間線（柯南篇起）", content: "在熱帶樂園與交易對象會面，並在琴酒襲擊工藤新一並強灌 APTX 4869 時在場協助。", targetId: "p4" },
    { label: "當前時間線", content: "在新幹線上與琴酒執行交易計畫，差點用炸彈炸毀火車，被柯南阻止。" },
    { label: "當前時間線", content: "在杯戶城市飯店協助琴酒搜捕雪莉，並差點殺死回歸原樣的雪莉。", targetId: "p5" },
    { label: "當前時間線", content: "差點被柯南設局誘騙出關於板倉卓系統軟體交易的機密情報，因琴酒及時介入而免於暴露。" },
    { label: "當前時間線", content: "在圍捕 FBI 搜查官卡邁爾的行動中，在車上透露出「朗姆改變了容貌，並為自己起了一個愚蠢假名潛伏」的最高機密，該對話被卡邁爾聽見並轉告給赤井秀一與柯南。", targetId: "c1" }
  ],
  relationships: [
    { targetId: "c2", summary: "其直屬上司與行動搭檔。" },
    { targetId: "p4", summary: "主要敵人，曾多次在暗中阻撓伏特加的交易與計畫。" },
    { targetId: "p5", summary: "組織的叛逃者，伏特加多次協助琴酒進行搜捕。" }
  ],
  relatedItems: [
    "常年配戴的墨鏡"
  ],
  confirmedFacts: [
    "為琴酒的助手。",
    "知道組織二把手朗姆的偽裝秘密（改變容貌與愚蠢假名）並無意中洩露。"
  ],
  unconfirmed: [
    "伏特加在組織中的具體晉升背景及其他個人檔案。"
  ],
  sources: [
    { site: "Detective Conan Wiki", title: "Timeline", url: "https://www.detectiveconanworld.com/wiki/Timeline" }
  ]
};

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
    sections.push(buildTimelineSection("時間線", details.timeline));
  }
  if (details.relationships.length) {
    sections.push(buildRelationshipSection("人物關係", node, details.relationships));
  }
  if (details.relatedItems.length) {
    sections.push(buildRelatedItemsSection("相關物品", details.relatedItems));
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

    // 可選 targetId：若指向現有節點，在內容後附上可點的關聯 chip，
    // 與「直接關聯線索」共用同一跳轉邏輯。
    const chip = createDetailLinkChip(entry.targetId);
    if (chip) body.append("　", chip);

    li.append(stamp, body);
    list.appendChild(li);
  });

  section.append(heading, list);
  return section;
}

// 共用：把 targetId 渲染成可點的關聯 chip，點擊跳轉到該線索卡。
// 與 buildRelationshipSection、buildRelatedItemsSection 共用同一跳轉。
function createDetailLinkChip(targetId) {
  if (!targetId) return null;
  const target = getNode(targetId);
  if (!target) return null;

  const chip = document.createElement("button");
  chip.type = "button";
  chip.className = "relationship-chip";
  chip.dataset.type = target.type;
  chip.textContent = target.name;
  chip.setAttribute("aria-label", `前往關聯線索：${target.name}`);
  chip.addEventListener("click", () => handleRelationClick(target.id));
  return chip;
}

function buildRelatedItemsSection(label, items) {
  const section = document.createElement("section");
  section.className = "details-section";

  const heading = document.createElement("span");
  heading.className = "details-label";
  heading.textContent = label;

  const list = document.createElement("ul");
  list.className = "details-list";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "details-item details-relationship";

    // 支援兩種寫法：純字串（顯示文字，或剛好是節點 ID）與 { name, targetId }。
    const text = typeof item === "string" ? item : (item && item.name) || "";
    const linkId = item && typeof item === "object" ? item.targetId : text;

    const chip = createDetailLinkChip(linkId);
    if (chip) {
      if (text && text !== linkId) {
        const prefix = document.createElement("span");
        prefix.className = "relationship-summary";
        prefix.textContent = text + "　";
        li.appendChild(prefix);
      }
      li.appendChild(chip);
    } else {
      const span = document.createElement("span");
      span.className = "relationship-summary";
      span.textContent = text;
      li.appendChild(span);
    }

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

    const chip = createDetailLinkChip(rel.targetId);
    if (chip) li.append(chip, document.createTextNode("　"));

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
