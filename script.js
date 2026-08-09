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

evidenceDetails.c1 = {
  identity: "黑衣組織的第二把手，右眼為義眼。現化名為「脇田兼則」於米花伊呂波壽司店潛伏。",
  aliases: ["脇田兼則（Wakita Kanenori）", "愚蠢的化名"],
  affiliations: ["黑衣組織"],
  timeline: [
    { label: "67 年前", content: "於烏丸蓮耶的生日派對上與阿曼達·休斯首次碰面。", targetId: "p1" },
    { label: "約 47 年前", content: "代表因身體不適而缺席的烏丸蓮耶，出席國際經濟論壇的年會。", targetId: "p1" },
    { label: "17 年前", content: "在美國主導羽田浩司命案，意圖強迫阿曼達加入組織，導致阿曼達服毒自殺、羽田浩司被毒殺，並在黑田兵衛介入後導致保鏢若狹留美失蹤。", targetId: "e2" },
    { label: "2 年前", content: "化裝成老人出現在舊倉庫，暗中試探並成功識破了赤井秀一的 FBI 臥底身分並將其驅逐。", targetId: "p8" },
    { label: "當前時間線", content: "化名脇田兼則潛伏在毛利偵探事務所旁。" },
    { label: "當前時間線", content: "派遣安室透全力調查並收集工藤新一的情報，下達「Time is Money」的指令。", targetId: "p9" },
    { label: "當前時間線", content: "發現若狹留美的行蹤後下令狙擊手進行遠程暗殺，但被若狹留美反向擊傷狙擊手。", targetId: "p2" }
  ],
  relationships: [
    { targetId: "p1", summary: "其直接首領。" },
    { targetId: "p2", summary: "17 年前羽田浩司命案中的宿敵，至今仍在積極追尋其下落並多次展開交鋒。" },
    { targetId: "p3", summary: "17 年前命案現場的對手，黑田近年也一直在針對朗姆進行調查。" },
    { targetId: "p11", summary: "17 年前命案中被其灌下 APTX 4869 毒殺的被害者。" },
    { targetId: "p9", summary: "其直屬部下，近期被其催促調查工藤新一。" }
  ],
  relatedItems: [
    { name: "APTX 4869（用於毒殺羽田浩司）", targetId: "i1" },
    { name: "角行將棋棋子", targetId: "i2" }
  ],
  confirmedFacts: [
    "右眼為義眼。",
    "17 年前犯下羽田浩司命案。",
    "現改變容貌並化名脇田兼則進行潛伏。"
  ],
  unconfirmed: [
    "臥底時期對諸伏景光身分暴露所起到的具體作用，以及組織內是否有其他警視廳內線向其提供情報。"
  ],
  sources: [
    { site: "Detective Conan Wiki", title: "Timeline", url: "https://www.detectiveconanworld.com/wiki/Timeline" }
  ]
};

evidenceDetails.c2 = {
  identity: "黑衣組織的高級幹部，性格冷酷無情，負責組織在第一線的交易、暗殺及清除叛徒等核心行動。",
  aliases: ["ジン（Jin）"],
  affiliations: ["黑衣組織"],
  timeline: [
    { label: "當前時間線", content: "在熱帶樂園執行交易時襲擊工藤新一，並強行灌下試作毒藥 APTX 4869 導致其縮小，開啟故事序幕。", targetId: "p4" },
    { label: "當前時間線", content: "親手開槍處決了企圖帶妹妹脫離組織的外圍成員宮野明美。", targetId: "p7" },
    { label: "當前時間線", content: "在新幹線上進行交易，企圖以炸彈將整列火車抹除，被柯南在暗中阻止。" },
    { label: "當前時間線", content: "於杯戶城市飯店酒窖內圍捕雪莉（宮野志保），將其開槍射傷但仍被其逃脫。", targetId: "p5" },
    { label: "當前時間線", content: "在板倉卓的置物櫃前差點發現躲藏在內的柯南。" },
    { label: "當前時間線", content: "為了重新驗證基爾的忠誠，逼迫並下令其在來葉山道槍殺赤井秀一。", targetId: "p8" }
  ],
  relationships: [
    { targetId: "c3", summary: "其直屬隨行助手與行動搭檔。" },
    { targetId: "p4", summary: "將其灌藥縮小的宿敵，但至今仍未察覺工藤新一退化存活的真相。" },
    { targetId: "p5", summary: "組織極力獵殺的頭號背叛者，曾多次對其展開搜捕與暗殺。" },
    { targetId: "p7", summary: "因十億元搶劫案而被琴酒親手滅口。" },
    { targetId: "p8", summary: "宿敵，對其展開多次圍捕，並曾下令要求基爾將其槍殺。" }
  ],
  relatedItems: [
    { name: "APTX 4869（用於灌殺工藤新一）", targetId: "i1" }
  ],
  confirmedFacts: [
    "手段冷酷殘忍。",
    "為殺害宮野明美的兇手。",
    "奉首領與朗姆命令進行多次高難度圍捕與肅清行動。"
  ],
  unconfirmed: [
    "琴酒是否對苦艾酒與烏丸蓮耶的特殊關係有所察覺。"
  ],
  sources: [
    { site: "Detective Conan Wiki", title: "Timeline", url: "https://www.detectiveconanworld.com/wiki/Timeline" }
  ]
};

evidenceDetails.c4 = {
  identity: "深受首領烏丸蓮耶寵愛的組織高級幹部。真實身分為著名美國女星 Sharon Vineyard，擁有常人不老容顏、超凡的易容術與變聲術。",
  aliases: ["貝爾摩德", "克莉絲·溫亞德（Chris Vineyard）", "莎朗·溫亞德（Sharon Vineyard）"],
  affiliations: ["黑衣組織"],
  timeline: [
    { label: "約 20 年前", content: "為了扮演特定角色，與工藤有希子一同向黑羽盜一學習易容與變聲技術。" },
    { label: "約 20 年前", content: "殘忍殺害了茱蒂·史坦林的父親並燒毀其住宅。" },
    { label: "1 年前", content: "於紐約化裝成公路惡魔連環殺手，企圖誘殺赤井秀一被其開槍擊中腹部；隨後在失足墜樓時被工藤新一與毛利蘭救起，自此尊稱他們為「Cool Guy」與「Angel」並默默保護他們。", targetId: "p8" },
    { label: "不到 1 年前", content: "對外宣告 Sharon Vineyard 死亡，並以 Chris Vineyard 身分重新在公眾面前活動。" },
    { label: "當前時間線", content: "化名為新出智明醫生滲透進帝丹高中，並在露營車與萬聖節郵輪事件中與柯南及 FBI 對峙，承諾放棄追殺雪莉，並在暗中隱瞞工藤新一與宮野志保身體縮小的真相。", targetId: "p5" },
    { label: "當前時間線", content: "於「神祕列車」事件中化裝成傷疤赤井，配合波本（安室透）獵殺雪莉，企圖直接用炸藥炸死她，最終反被柯南與有希子的計謀愚弄。", targetId: "p9" },
    { label: "數月前", content: "在倫敦沃克斯霍爾橋易容成赤井務武，強行對赤井瑪麗灌下 APTX 4869 藥物使其縮小。", targetId: "i1" }
  ],
  relationships: [
    { targetId: "p1", summary: "與其關係極其特殊，深受其寵愛與偏袒。" },
    { targetId: "p4", summary: "因救命之恩將其視為「銀色子彈／Cool Guy」並默默保護其安全與身分。" },
    { targetId: "p5", summary: "極力想要抹除的組織叛徒，但在神秘列車事件後因計謀而暫時相信其已被炸死。" },
    { targetId: "p6", summary: "雪莉的父母。在強灌瑪麗藥物時，曾提及該縮小藥物是由其阿姨艾蓮娜所研發。" },
    { targetId: "p8", summary: "宿敵，在紐約曾被其開槍打傷腹部。" }
  ],
  relatedItems: [
    { name: "APTX 4869（在倫敦對瑪麗灌藥時使用）", targetId: "i1" }
  ],
  confirmedFacts: [
    "擁有不老容顏，精通易容術。",
    "因救命之恩極力保護工藤新一與毛利蘭，並為此向組織隱瞞退化秘密。"
  ],
  unconfirmed: [
    "她與烏丸蓮耶的具體關係承諾，以及其不老容顏的具體由來（是否與早期藥物實驗有關）。"
  ],
  sources: [
    { site: "Detective Conan Wiki", title: "Timeline", url: "https://www.detectiveconanworld.com/wiki/Timeline" }
  ]
};

evidenceDetails.e1 = {
  identity: "黑衣組織的核心極秘科學研究項目，其最終的研究成果直接導向了 APTX 4869 的開發。",
  aliases: ["不詳"],
  affiliations: ["烏丸集團（Karasuma Group）"],
  timeline: [
    { label: "超過 50 年前", content: "由組織首領烏丸蓮耶主導並正式開啟此項主要研究計畫。", targetId: "p1" },
    { label: "19 年前", content: "宮野厚司 & 艾蓮娜同意關閉診所，加入由烏丸集團贊助的神秘研究設施，接手主導該藥物計畫的研發。", targetId: "p6" },
    { label: "18 年前", content: "宮野志保（雪莉）出生，隨後不久宮野夫婦因研究所的神祕火災事故雙雙身亡，原始藥物資料大部分被毀。", targetId: "p5" },
    { label: "5 年前", content: "年僅 13 歲的宮野志保在組織內重啟該計畫，並繼承父母的研究資料繼續開發 APTX 4869。", targetId: "p5" }
  ],
  relationships: [
    { targetId: "p1", summary: "該研究計畫的發起者與幕後掌控者。" },
    { targetId: "p6", summary: "19 年前加入該計畫並進行原始藥物「銀色子彈（Silver Bullet）」研發的科學家夫婦。" },
    { targetId: "p5", summary: "重啟該計畫並繼承父母剩餘資料將其開發為 APTX 4869 的主導科學家。" }
  ],
  relatedItems: [
    { name: "APTX 4869", targetId: "i1" }
  ],
  confirmedFacts: [
    "該計畫由烏丸集團（烏丸蓮耶）於半個世紀前創立，旨在研發某種具備特殊生理效果的藥物。"
  ],
  unconfirmed: [
    "計畫的最終宗旨（是否與「逆轉時間流逝」或長生不老有關）。",
    "宮野夫婦原始研發的「銀色子彈」與志保後來繼承研發的「APTX 4869」兩者在藥性上的具體分歧。"
  ],
  sources: [
    { site: "Detective Conan Wiki", title: "Timeline", url: "https://www.detectiveconanworld.com/wiki/Timeline" }
  ]
};

evidenceDetails.p4 = {
  identity: "高中生偵探。被灌藥縮小後化名「江戶川柯南」寄住在毛利偵探事務所，與阿笠博士、少年偵探團及 FBI、公安多方聯手。",
  aliases: ["江戶川柯南（Edogawa Konan）", "福爾摩斯的弟子"],
  affiliations: ["高中生偵探", "江戶川柯南", "與 FBI 及公安等陣營合作"],
  timeline: [
    { label: "13 年前", content: "首次與毛利蘭相遇。" },
    { label: "10 年前", content: "與赤井秀一、赤井瑪麗在海灘重逢，並首次見到世良真純。", targetId: "p8" },
    { label: "7 年前", content: "與小蘭偶遇研二並目睹其用棒球堵住漏水的水龍頭。" },
    { label: "1 年前", content: "於洛杉磯航班上解決了首起案件，隨後在紐約與小蘭救下了墜樓的苦艾酒。", targetId: "c4" },
    { label: "當前時間線", content: "於熱帶樂園被琴酒灌下 APTX 4869 身體縮小，化名江戶川柯南。", targetId: "i1" },
    { label: "當前時間線", content: "與灰原哀（宮野志保）相識並收留其寄住在阿笠博士家。", targetId: "p5" },
    { label: "當前時間線", content: "推導出組織首領的電子郵件信箱按鍵音為童謠《七隻烏鴉》。" },
    { label: "當前時間線", content: "藉助灰原的臨時解毒劑短暫復原為工藤新一，在倫敦向小蘭告白，並於京都修學旅行獲得小蘭吻臉回應。" },
    { label: "當前時間線", content: "聯手赤井秀一設計卡邁爾假死，並在近期正式確信脇田兼則就是組織二把手朗姆。", targetId: "p8" }
  ],
  relationships: [
    { targetId: "p5", summary: "同為 APTX 4869 的受害者與知情同盟，在其提供臨時解毒劑的幫助下短暫恢復身體。" },
    { targetId: "c2", summary: "將其灌藥縮小的宿敵，柯南至今全力追查其行蹤。" },
    { targetId: "c4", summary: "救命恩人，苦艾酒因承諾而多次暗中保護其身分不被組織發現。" },
    { targetId: "p8", summary: "極度信任的戰友，暗中策劃了赤井在來葉山道的假死並協助其化名「沖矢昴」借住於工藤家。" },
    { targetId: "p9", summary: "亦敵亦友的合作夥伴，安室透近期已察覺江戶川柯南的真實身分就是工藤新一。" }
  ],
  relatedItems: [
    { name: "APTX 4869", targetId: "i1" },
    "臨時解毒劑"
  ],
  confirmedFacts: [
    "真實身分為工藤新一，因 APTX 4869 身體退化至小學生大小。",
    "目前多方聯手暗中調查組織首領「烏丸蓮耶」。"
  ],
  unconfirmed: [
    "他何時會主動向毛利蘭坦白自己的真實身分，以及他與灰原哀在最終決戰中的解毒方案。"
  ],
  sources: [
    { site: "Detective Conan Wiki", title: "Timeline", url: "https://www.detectiveconanworld.com/wiki/Timeline" }
  ]
};

evidenceDetails.p5 = {
  identity: "前黑衣組織核心科學家，代號雪莉，APTX 4869 的核心研發者。逃離組織後服用該藥縮小。",
  aliases: ["宮野志保（Miyano Shiho）", "雪莉（Sherry）", "灰原哀（Haibara Ai）"],
  affiliations: ["前黑衣組織科學家", "現為江戶川柯南與阿笠博士的同盟"],
  timeline: [
    { label: "18 年前", content: "出生於日本，不久後父母於研究所火災事故中身亡。", targetId: "p6" },
    { label: "5 年前（13 歲）", content: "已在組織內以高智商科學家身分主導藥物研發。" },
    { label: "當前時間線", content: "因姐姐宮野明美被琴酒殺害而抗議並停止藥物研究，被囚禁時服下 APTX 4869 自殺未遂退化，叛逃後被阿笠博士收留。", targetId: "p7" },
    { label: "當前時間線", content: "在杯戶城市飯店酒窖短暫恢復原樣，被琴酒射傷後從煙囪逃脫。", targetId: "c2" },
    { label: "當前時間線", content: "於「神祕列車」事件中由怪盜基德假扮成其原本樣貌（雪莉）面對波本（安室透），成功使組織誤信「雪莉已被炸死」。", targetId: "p9" },
    { label: "當前時間線", content: "開發出 APTX 4869 臨時解毒劑，並多次協助工藤新一在關鍵時刻短暫恢復身體。", targetId: "p4" },
    { label: "當前時間線", content: "近期在帝丹小學內多次觸發其敏銳的「黑衣組織雷達」。" }
  ],
  relationships: [
    { targetId: "p6", summary: "科學家父母，在其出生後不久舊研究設施起火而雙雙遇難。" },
    { targetId: "p7", summary: "親姐姐，因姐姐被琴酒殺害而反抗組織並吞藥叛逃。" },
    { targetId: "p4", summary: "同為縮小同盟與生死夥伴，對其暗中保護並提供臨時解毒劑。" },
    { targetId: "c4", summary: "宿敵，曾千方百計想要將其剷除，目前誤以為雪莉已死而暫時停止追捕。" }
  ],
  relatedItems: [
    { name: "APTX 4869", targetId: "i1" },
    "臨時解毒劑",
    "艾蓮娜留給志保的生日錄音帶"
  ],
  confirmedFacts: [
    "真實身分為科學家宮野志保，因服用 APTX 4869 退化為 7 歲幼童，目前協助柯南研發解毒劑。"
  ],
  unconfirmed: [
    "她對若狹留美真實身分的察覺與信任度變化。"
  ],
  sources: [
    { site: "Detective Conan Wiki", title: "Timeline", url: "https://www.detectiveconanworld.com/wiki/Timeline" }
  ]
};

evidenceDetails.p6 = {
  identity: "黑衣組織初期的藥物科學家夫婦，開發了 APTX 4869 的前身藥物。艾蓮娜被組織內部稱為「地獄天使（Hell Angel）」。",
  aliases: ["宮野厚司（Miyano Atsushi）", "宮野艾蓮娜（Miyano Elena / Hell Angel）"],
  affiliations: ["黑衣組織（前期藥物開發部門）"],
  timeline: [
    { label: "30 年前", content: "宮野厚司搬出父親的房屋，加入「白鳩製藥」進行藥物研究。" },
    { label: "25 年前", content: "白鳩製藥宣告破產，夫妻兩人隨後開設了一家私人小診所。" },
    { label: "約 20 年前", content: "夫妻帶著當時年僅 4-5 歲的大女兒宮野明美，最後一次拜訪厚司父親的舊居。", targetId: "p7" },
    { label: "19 年前", content: "同意接受烏丸集團的贊助，關閉小診所並正式加入組織旗下的極秘研究設施。", targetId: "p1" },
    { label: "18 年前", content: "在小女兒宮野志保出生後不久，因研究所發生一場神祕火災，夫婦兩人雙雙不幸身亡。", targetId: "p5" }
  ],
  relationships: [
    { targetId: "p1", summary: "為其集團贊助的研究項目研發原始藥物。" },
    { targetId: "p7", summary: "大女兒，曾帶其拜訪出島診所。" },
    { targetId: "p5", summary: "小女兒，艾蓮娜在生前為其錄製了多盤生日祝福錄音帶。" },
    { targetId: "p9", summary: "小時候曾因打架受傷多次前往艾蓮娜的診所敷藥，艾蓮娜是降谷零童年最珍視的溫暖回憶，也是他立志成為警察的起點。" }
  ],
  relatedItems: [
    "銀色子彈（Silver Bullet，艾蓮娜生前研發的原始藥物）",
    "生日錄音帶"
  ],
  confirmedFacts: [
    "為組織初期的核心藥物研究奠基者，死於研究所火災。",
    "艾蓮娜與赤井瑪麗為親姐妹。"
  ],
  unconfirmed: [
    "宮野夫婦死於火災的背後具體真相（是否為組織刻意人為縱火滅口）。",
    "他們研發的原始藥物「銀色子彈」的真實意圖。"
  ],
  sources: [
    { site: "Detective Conan Wiki", title: "Timeline", url: "https://www.detectiveconanworld.com/wiki/Timeline" }
  ]
};

evidenceDetails.p7 = {
  identity: "黑衣組織的外圍成員，宮野夫婦的大女兒，雪莉（志保）的姐姐。",
  aliases: ["廣田雅美（Masami Hirota）"],
  affiliations: ["黑衣組織外圍"],
  timeline: [
    { label: "約 20 年前", content: "年僅 4-5 歲時，與父母一同前往拜訪父親的出島舊居。", targetId: "p6" },
    { label: "5 年前", content: "在組織內與化名「諸星大」滲透進來的 FBI 搜查官赤井秀一交往，並以此協助其獲得代號「萊伊」。", targetId: "p8" },
    { label: "當前時間線", content: "在遇害的前一週，秘密將母親艾蓮娜留給妹妹志保的生日錄音帶藏匿於出島舊居的廁所內。" },
    { label: "當前時間線", content: "為了讓自己與妹妹能夠脫離組織，接受組織開出的條件，化名「廣田雅美」策劃並執行了十億元銀行搶劫案。", targetId: "p5" },
    { label: "當前時間線", content: "在成功達成十億元目標後，仍被琴酒在廢棄倉庫冷酷開槍殺害。", targetId: "c2" },
    { label: "當前時間線", content: "近期，柯南、灰原哀與若狹留美在帝丹小學找到了其生前與小學同學共同埋下的時空膠囊，內含其寫給妹妹志保的信與兒時照片。", targetId: "p2" }
  ],
  relationships: [
    { targetId: "p5", summary: "親妹妹，一生都在為保護妹妹並帶其脫離組織而努力。" },
    { targetId: "p6", summary: "親生父母。" },
    { targetId: "p8", summary: "前男友，即使在得知赤井秀一是利用自己潛伏的 FBI 搜查官後，依然對其深情不變。" },
    { targetId: "c2", summary: "殺害自己的直接兇手。" }
  ],
  relatedItems: [
    "十億元搶劫贓款",
    "藏有艾蓮娜生日錄音帶的鑰匙"
  ],
  confirmedFacts: [
    "為組織外圍成員，與赤井秀一曾為情侶，因十億元搶劫案遭琴酒殺害。"
  ],
  unconfirmed: [
    "她小時候與若狹留美是否存在過未被揭露的接觸。"
  ],
  sources: [
    { site: "Detective Conan Wiki", title: "Timeline", url: "https://www.detectiveconanworld.com/wiki/Timeline" }
  ]
};

evidenceDetails.p8 = {
  identity: "美國聯邦調查局（FBI）高級搜查官，狙擊能力頂尖，曾臥底滲透組織，目前化名「沖矢昴」借住於工藤新一家中暗中行動。",
  aliases: ["萊伊（Rye）", "諸星大（Dai Moroboshi）", "沖矢昴（Subaru Okiya）", "銀色子彈"],
  affiliations: ["美國聯邦調查局（FBI）"],
  timeline: [
    { label: "17 年前", content: "因父親赤井務武前往美國調查羽田浩司命案後失蹤，秀一立志加入 FBI 以徹查父親失蹤與浩司遇害的真相。", targetId: "e2" },
    { label: "10 年前", content: "與母親瑪麗、弟弟秀吉相隔 7 年後在沙灘重逢，並首次見到工藤新一與毛利蘭。", targetId: "p4" },
    { label: "5 年前", content: "以化名「諸星大」並藉由交往宮野明美成功打入黑衣組織內部。", targetId: "p7" },
    { label: "2 年前", content: "因 FBI 同僚卡邁爾在倉庫包圍行動中的失誤，導致臥底身分徹底敗露，被迫撤離組織。" },
    { label: "當前時間線", content: "在來葉山道配合工藤新一的假死計畫，在琴酒的監控下由基爾「槍殺」並炸毀車輛。", targetId: "p4" },
    { label: "當前時間線", content: "假死後化名為東都大學研究生「沖矢昴」，借住在工藤新一家中，暗中保護灰原哀並收集情報。", targetId: "p5" },
    { label: "當前時間線", content: "於「神祕列車」事件中暗中保護灰原哀，配合工藤有希子與柯南實施偷樑換柱計畫。" },
    { label: "當前時間線", content: "於緋色系列中，在工藤家與前來對峙的安室透正面交鋒，並在車上揭露其公安臥底真實身分「降谷零」，迫使其暫時撤退。", targetId: "p9" }
  ],
  relationships: [
    { targetId: "p7", summary: "前女友，一生最摯愛與愧疚的女性。" },
    { targetId: "p4", summary: "極度信任的戰友，兩人默契配合完成了來葉山道假死與多次對抗組織的行動。" },
    { targetId: "p5", summary: "明美的妹妹，受明美生前之託，化名沖矢昴在暗中誓死保護其安全。" },
    { targetId: "p9", summary: "組織時期的臥底同僚，因諸伏景光的殉職事件，遭到安室透極深的誤解與憎恨。" },
    { targetId: "p10", summary: "昔日臥底同盟，曾極力阻止其自殺，但未能成功。" }
  ],
  relatedItems: [
    "諸伏景光遺留的手機（沾有彈孔，已被寄回長野縣警）"
  ],
  confirmedFacts: [
    "FBI 頂尖王牌搜查官，曾臥底獲得代號「萊伊」。",
    "目前以「沖矢昴」的身分隱蔽活動，與柯南為核心盟友。"
  ],
  unconfirmed: [
    "他是否已察覺到母親赤井瑪麗也因灌藥而縮小並潛伏在附近。"
  ],
  sources: [
    { site: "Detective Conan Wiki", title: "Timeline", url: "https://www.detectiveconanworld.com/wiki/Timeline" }
  ]
};

evidenceDetails.p9 = {
  identity: "日本警察廳公安臥底搜查官，本名降谷零，隸屬「ZERO」小組，目前潛伏於組織中，日常在白羅咖啡廳打工並拜小五郎為師。",
  aliases: ["波本（Bourbon）", "安室透（Amuro Toru）", "降谷零（Furuya Rei）", "Zero"],
  affiliations: ["警察廳警備局警備企劃課（ZERO）", "黑衣組織（臥底）"],
  timeline: [
    { label: "7 年前", content: "與諸伏景光、松田陣平、研二及伊達航在警視廳警察學校同期受訓。", targetId: "p10" },
    { label: "4 年前", content: "在火車站月台指導當時年幼的世良真純彈奏吉他時，身邊帶有臥底同僚諸伏景光。", targetId: "p10" },
    { label: "當前時間線", content: "以安室透身分潛入白羅咖啡廳，並拜毛利小五郎為師成為其弟子。" },
    { label: "當前時間線", content: "在「神祕列車」事件中正面對峙由怪盜基德假扮的雪莉，親口透露自己的代號為「波本」。" },
    { label: "當前時間線", content: "於緋色系列中，因推理出赤井秀一假死而包圍工藤家，卻被赤井反向揭穿其日本公安臥底本名「降谷零」。", targetId: "p8" },
    { label: "當前時間線", content: "受組織二把手朗姆的密令「Time is Money」要求，全力搜集並調查工藤新一的情報，為此夜襲工藤家，卻在客廳被工藤優作與有希子請坐喝茶談判。", targetId: "c1" },
    { label: "當前時間線", content: "近期，在一場野外事件中意外撿到了若狹留美不慎掉落的「角行」將棋棋子，回憶起這是羽田浩司遇害時失蹤的護身符，因而鎖定若狹留美進行暗中警戒，隨後在暗處被若狹留美偷襲擊暈並奪回棋子。", targetId: "p2" },
    { label: "當前時間線", content: "近期已被揭示出，安室透已完全察覺江戶川柯南的真實身分就是工藤新一。", targetId: "p4" }
  ],
  relationships: [
    { targetId: "p10", summary: "童年玩伴兼警校同期，最信賴的公安臥底戰友。" },
    { targetId: "p8", summary: "組織時期的臥底同僚，因諸伏景光的殉職事件，遭到安室透極深的誤解與深入骨髓的仇恨。" },
    { targetId: "p4", summary: "已察覺其真實身分，並受組織指令要求調查他。" },
    { targetId: "c1", summary: "其在組織內的直接上級，下令催促其提供工藤新一的情報。" },
    { targetId: "p6", summary: "童年時期的敷藥恩人，艾蓮娜是其最溫暖的心靈支柱與成為警察的動力。" },
    { targetId: "p2", summary: "因「角行」棋子而懷疑其真實身分，並被其擊暈奪走棋子，兩人關係處於極度緊繃狀態。" }
  ],
  relatedItems: [
    { name: "角行將棋棋子", targetId: "i2" },
    "諸伏景光遺留的手機（安室暗中寄回給高明）"
  ],
  confirmedFacts: [
    "本名降谷零，公安 ZERO 臥底，代號波本，精通情報搜集與格鬥。",
    "已察覺柯南本體為工藤新一。"
  ],
  unconfirmed: [
    "他是否會將工藤新一與灰原哀（志保）依然存活的秘密上報給朗姆或公安高層。"
  ],
  sources: [
    { site: "Detective Conan Wiki", title: "Timeline", url: "https://www.detectiveconanworld.com/wiki/Timeline" }
  ]
};

evidenceDetails.p10 = {
  identity: "警視廳公安部的臥底搜查官，本名諸伏景光，在組織臥底時獲得代號「蘇格蘭」。",
  aliases: ["蘇格蘭（Scotch）", "諸伏景光（Morofushi Hiromitsu）", "景光（Hiro）"],
  affiliations: ["警視廳公安部", "黑衣組織（臥底）"],
  timeline: [
    { label: "7 年前", content: "與降谷零、松田陣平、研二及伊達航一同於警察學校學習並畢業。", targetId: "p9" },
    { label: "4 年前", content: "於火車站月台教導世良真純彈奏貝斯，當時降谷零在場，世良真純聽到了其代號「蘇格蘭」。", targetId: "p9" },
    { label: "約 3 年前", content: "臥底身分不慎暴露，在廢棄大樓面對赤井秀一時試圖奪槍自殺；赤井秀一雖表露 FBI 搜查官身分意圖救他，但因聽到安室透上樓的急促腳步聲，景光誤以為是組織追兵，開槍穿透存有家人與同僚線索的手機自盡殉職。", targetId: "p8" },
    { label: "當前時間線", content: "其沾有彈孔的手機被降谷零暗中寄回給其兄長諸伏高明，高明看過後確信弟弟已因公殉職。", targetId: "p9" },
    { label: "當前時間線", content: "群馬縣警山村操刑事看見諸伏高明的臉，回憶起景光是自己童年時期的玩伴，並得知其已加入公安並殉職的真相。" }
  ],
  relationships: [
    { targetId: "p9", summary: "童年玩伴兼警校同期，最信任與默契的公安戰友。" },
    { targetId: "p8", summary: "臥底時的同僚。赤井秀一極力阻止其自殺但因意外未能成功，其死因也成為赤井與安室之間無法消解的仇恨根源。" }
  ],
  relatedItems: [
    "沾有彈孔的手機",
    "貝斯"
  ],
  confirmedFacts: [
    "本名諸伏景光，長野縣警諸伏高明之弟，公安臥底，代號蘇格蘭。",
    "約 3 年前死於廢棄大樓的自殺事件。"
  ],
  unconfirmed: [
    "他臥底身分暴露的具體原因，以及組織二把手朗姆是否在當年直接或間接策劃了其身分曝光。"
  ],
  sources: [
    { site: "Detective Conan Wiki", title: "Timeline", url: "https://www.detectiveconanworld.com/wiki/Timeline" }
  ]
};

evidenceDetails.p11 = {
  identity: "日本的天才將棋棋手，擁有七冠王實力，17 年前在美國涉入酒店命案遇害。",
  aliases: ["不詳"],
  affiliations: ["羽田家", "將棋界"],
  timeline: [
    { label: "17 年前", content: "前往美國參加國際西洋棋比賽。在酒店內，為保護遭到組織二把手朗姆追殺的保鏢若狹留美（Asaka），將自己的「角行」將棋棋子作為護身符贈予她。隨後被朗姆灌下早期版本的 APTX 4869 毒殺。臨死前利用水杯、剪刀和手撕化妝鏡，留下了指向「ASACA RUM」的死前留言。", targetId: "c1" },
    { label: "當前時間線", content: "其死前留言被工藤優作完全破解為字母重組「CARASUMA」，判定組織首領即為大富豪烏丸蓮耶。", targetId: "p1" },
    { label: "當前時間線", content: "其遇害現場不慎遺落的護身符「角行」將棋棋子在現代事件中被安室透撿到，並進而懷疑若狹留美與黑田兵衛等人的動向。", targetId: "p9" }
  ],
  relationships: [
    { targetId: "p2", summary: "當年阿曼達的保鏢。浩司在房間內極力庇護她，兩人建立了深厚的牽絆，並將「角行」棋子贈予她，目前若狹留美誓死為其復仇。" },
    { targetId: "c1", summary: "殺害羽田浩司的直接兇手。" },
    { targetId: "p8", summary: "因浩司命案導致秀一父親赤井務武介入調查失蹤，間接促使秀一加入 FBI。" },
    { targetId: "p3", summary: "當年案發後首個抵達浩司房間的調查者，因救助 Asaka 發生車禍昏迷 10 年。" }
  ],
  relatedItems: [
    { name: "角行將棋棋子", targetId: "i2" },
    "手撕化妝鏡（死前留言）"
  ],
  confirmedFacts: [
    "天才將棋棋手，17 年前被朗姆以藥物殺害。",
    "死前留下了指向「CARASUMA」的臨終訊息。"
  ],
  unconfirmed: [
    "他遇害前與若狹留美對話的全部內容與細節。"
  ],
  sources: [
    { site: "Detective Conan Wiki", title: "Timeline", url: "https://www.detectiveconanworld.com/wiki/Timeline" }
  ]
};

evidenceDetails.p2 = {
  identity: "帝丹小學一年B班的副班導師。真實身分為 17 年前美國大富豪阿曼達·休斯的私人保鏢「蕾切爾·淺香（Rachel Asaka）」，右眼失明，具備頂尖格鬥與狙擊實力。",
  aliases: ["若狹留美（Wakasa Rumi）", "淺香（Asaka）", "蕾切爾·淺香（Rachel Asaka）"],
  affiliations: ["前阿曼達保鏢", "現為獨立復仇者", "帝丹小學教師"],
  timeline: [
    { label: "17 年前", content: "擔任美國富豪阿曼達·休斯的保鏢。在阿曼達被朗姆威脅自殺後，若狹留美逃至羽田浩司的房間並獲得其保護與贈予的「角行」將棋棋子。在浩司遇害後，她在前來接頭的黑田兵衛協助下逃離酒店，隨後消聲匿跡。", targetId: "p11" },
    { label: "當前時間線", content: "化名「若狹留美」入職帝丹小學，成為柯南班上的副班導師，暗中引導柯南解決多起案件。" },
    { label: "當前時間線", content: "在露營事件中對「義眼」一詞反應劇烈，柯南進而察覺其右眼失明。" },
    { label: "當前時間線", content: "在現代事件中不慎遺落了珍藏 17 年的「角行」棋子，隨後在暗中將拾獲棋子的安室透擊暈，強行奪回棋子。", targetId: "p9" },
    { label: "當前時間線", content: "近期，在帝丹小學找到了宮野明美的時空膠囊，其內心獨白透露出她深知宮野家族的存在，並驚訝於灰原哀就是繼承研究的宮野志保。", targetId: "p7" },
    { label: "當前時間線", content: "在海灘度假時，與化名沖矢昴的赤井秀一多次產生戒備與懷疑的對視。", targetId: "p8" },
    { label: "當前時間線", content: "於現代國際棋大會中被朗姆鎖定下落，面對組織狙擊手伏擊，她展現出恐怖的戰鬥力，反向開槍將兩名狙擊手擊傷。", targetId: "c1" }
  ],
  relationships: [
    { targetId: "p11", summary: "靈魂羈絆，浩司在遇害前將護身符棋子留給她以保全其生命，若狹攜帶此棋子 17 年作為復仇的執念。" },
    { targetId: "c1", summary: "殺害其僱主阿曼達與羽田浩司的死敵，兩人在現代展開激烈交鋒。" },
    { targetId: "p3", summary: "17 年前協助其逃離酒店的恩人，但兩人在車禍後失聯，現代重逢時均在互相試探與觀察。" },
    { targetId: "p9", summary: "因安室透撿到並調查「角行」棋子，若狹留美在暗處將其擊暈並強行取回遺物。" },
    { targetId: "p5", summary: "已知曉其真實身分為宮野志保，並因宮野夫婦的往事而對其密切關注，近期灰原對若狹展現出信任的笑容。" }
  ],
  relatedItems: [
    { name: "角行將棋棋子", targetId: "i2" }
  ],
  confirmedFacts: [
    "真實身分為蕾切爾·淺香，右眼失明，格鬥與狙擊實力極強。",
    "攜帶羽田浩司遺物棋子 17 年並誓死向朗姆報仇。"
  ],
  unconfirmed: [
    "她小時候的詳細背景（圖解中提及「淺香之父為庇護阿曼達而死」），以及她與宮野夫婦過去的具體因緣。"
  ],
  sources: [
    { site: "Detective Conan Wiki", title: "Timeline", url: "https://www.detectiveconanworld.com/wiki/Timeline" }
  ]
};

evidenceDetails.p3 = {
  identity: "警視廳刑事部搜查一課管理官。17 年前曾為警察廳搜查官，因涉入羽田浩司案遭遇嚴重車禍而昏迷 10 年，醒後頭髮全白且右眼失明。",
  aliases: ["黑田管理官"],
  affiliations: ["警視廳（現職）", "前警察廳警備局（裏公安高層）"],
  timeline: [
    { label: "17 年前", content: "作為警察廳搜查官前往美國。抵達酒店後，發現了阿曼達與羽田浩司的屍體，並在浩司房內找到了遺留的臨終訊息。隨後他幫助失控的保鏢若狹留美上車逃亡，但在路上遭遇了極其嚴重的交通車禍，導致其右眼失明、白髮並昏迷了將近 10 年。", targetId: "e2" },
    { label: "當前時間線", content: "從長野縣警調回東京警視廳，接替晉升的松本清長擔任搜查一課管理官。" },
    { label: "當前時間線", content: "在新聞中注意到若狹留美，並開始暗中重啟 17 年前羽田浩司命案的調查。", targetId: "p2" },
    { label: "當前時間線", content: "近期在國際棋大會解決命案後，主動向工藤新一拼湊並詳細還原了 17 年前案發現場的所有細節。", targetId: "p4" },
    { label: "當前時間線", content: "曾與大岡家執事伊織無我秘密會面，以其臥底時期的代號「榊原」稱呼他，展現出極深的公安背景。" }
  ],
  relationships: [
    { targetId: "p2", summary: "17 年前協助其逃離命案現場的恩人，現代重逢後一直在暗中調查與試探其是否為消失的 Asaka。" },
    { targetId: "p4", summary: "已知曉柯南是「睡眠小五郎」幕後的真正大腦，並主動聯手其調查羽田浩司案。" },
    { targetId: "c1", summary: "17 年前案發現場的對手。" }
  ],
  relatedItems: [
    "常年配戴黑墨鏡"
  ],
  confirmedFacts: [
    "17 年前為警察廳官員，在美國酒店發現羽田浩司與阿曼達遺體。",
    "因車禍白髮、失明並昏迷 10 年，現正全力追查當年懸案。"
  ],
  unconfirmed: [
    "17 年前那場導致他白髮與右眼失明的嚴重車禍是否為黑衣組織或朗姆刻意策劃的謀殺。"
  ],
  sources: [
    { site: "Detective Conan Wiki", title: "Timeline", url: "https://www.detectiveconanworld.com/wiki/Timeline" }
  ]
};

evidenceDetails.i2 = {
  identity: "天才將棋棋手羽田浩司生前隨身攜帶的「角行」將棋棋子（主教），是其視為生命好運的護身符，也是 17 年前命案現場失蹤的致命物證。",
  aliases: ["主教棋子（Bishop shogi piece）", "浩司的護身符"],
  affiliations: ["羽田浩司遺物"],
  timeline: [
    { label: "17 年前", content: "羽田浩司在美國酒店遇害前，為了庇護與祝福阿曼達的保鏢若狹留美（Asaka），在房間內將這枚護身符棋子交予她。浩司被害後，該棋子在警方的現場調查紀錄中被標示為「失蹤」。", targetId: "p11" },
    { label: "當前時間線", content: "被若狹留美貼身隨身攜帶 17 年之久，作為其對組織進行復仇的執念與護身符。", targetId: "p2" },
    { label: "當前時間線", content: "在一場野外事件中，若狹留美不慎將棋子掉落，隨後被在場的安室透無意中拾獲。", targetId: "p9" },
    { label: "當前時間線", content: "安室透看過這枚「角行」棋子，並回憶起羽田浩司案的失蹤物證檔案，判斷這曾屬於羽田浩司，並將若狹留美的手機照片與棋子照片儲存在手機中進行高度警戒。" },
    { label: "當前時間線", content: "若狹留美為了奪回這枚視若生命的浩司遺物，不惜在暗處下手將安室透擊暈，強行將這枚「角行」棋子奪回並重新隨身攜帶。", targetId: "p2" }
  ],
  relationships: [
    { targetId: "p11", summary: "棋子的原始主人，將其視為自己的好運護身符。" },
    { targetId: "p2", summary: "被浩司贈予該棋子，貼身攜帶 17 年，對其而言是生命中最寶貴的浩司遺物與牽絆。" },
    { targetId: "p9", summary: "曾短暫拾獲此棋子，並依此棋子確認了若狹留美與 17 年前羽田浩司案有著非同尋常的密切關係。" }
  ],
  relatedItems: [
    { name: "羽田浩司命案", targetId: "e2" }
  ],
  confirmedFacts: [
    "原本為羽田浩司的將棋護身符，案發當天贈予 Asaka，在現場記錄為失蹤。",
    "現為若狹留美奪回並貼身攜帶，是破解 17 年前命案的最關鍵實物證據。"
  ],
  unconfirmed: [
    "這枚棋子除了作為浩司與 Asaka 的生命牽絆外，是否還隱藏著其他未被發掘的組織解密代碼。"
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
