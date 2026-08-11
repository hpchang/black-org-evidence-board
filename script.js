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
// emptyDetails() 先為每個節點建立完整欄位骨架，再由下方已策展的
// evidenceDetails 依 ID 覆寫。未來新增或缺資料的節點仍會使用空骨架
// 作為 fallback（UI 對空欄位不渲染，全部為空時顯示 DETAILS_PLACEHOLDER）。
// 絕不自行編造劇情設定。
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

// ── 已策展的詳細情報（依可核實來源整理、改寫，並附來源）────────
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

// ── 卡片插畫（內嵌 SVG 字串）─────────────────────────────────────
// 風格：原創 Noir 漫畫線稿，統一使用 240 × 200 畫布、淺米主線與灰色象徵物。
// 人物以髮型、輪廓與案件物件建立辨識度，不直接重製動畫／漫畫官方圖像。
// 此表屬展示層資產，不進 data.json／black-org-evidence-data.json。
const cardArt = {
  // 人物：原創卷宗肖像
  p1: '<svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#d8d4cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M88 180v-17c0-14 12-23 27-25l5-12 5 12c16 2 27 11 27 25v17"/><path d="M98 74c0-28 12-45 29-45 18 0 29 17 29 45v23c0 18-13 31-29 31-17 0-29-13-29-31z"/><path d="M100 68c14-5 28-17 38-31 6 10 11 20 18 27"/><path d="M111 82h9m14 0h8"/><circle cx="117" cy="84" r="1.7" fill="#d8d4cc"/><circle cx="137" cy="84" r="1.7" fill="#d8d4cc"/><path d="M125 94c3 3 7 3 10 0m-18 16c7 7 18 7 25 0m-14 18v10m-26 6 25 20 25-20"/></g><g stroke="#9a958b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M41 62c7-15 22-20 34-11 8 6 8 19 1 27-8 9-22 8-30 2"/><path d="M44 64c8 0 14 4 18 10m12-20 9-10m-30 38-8 17m17-21 13 13m-21 7c-8 6-12 14-12 24m19-21c9 2 15 9 17 17"/><circle cx="59" cy="62" r="2" fill="#9a958b"/></g></svg>',
  p2: '<svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#d8d4cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M91 180v-17c0-14 11-22 25-25l4-12 5 12c15 3 25 11 25 25v17"/><path d="M98 71c0-25 10-40 27-40 18 0 28 15 28 40v24c0 18-13 31-28 31-16 0-27-13-27-31z"/><path d="M99 67c8-3 16-12 22-25 8 13 20 21 32 25"/><path d="M103 78h18v12h-18zm26 0h18v12h-18zm-8 6h8"/><circle cx="113" cy="84" r="1.5" fill="#d8d4cc"/><circle cx="137" cy="84" r="1.5" fill="#d8d4cc"/><path d="M122 96c3 2 6 2 9 0m-16 14c6 4 14 4 20 0m-10 16v12"/></g><g stroke="#9a958b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M48 108h42l-5 48H53z"/><path d="M53 108l5-20h23l5 20m-23 16h14m-12 11h10m-19 21 13 14 13-14"/><circle cx="69" cy="100" r="3"/><path d="M160 44l14 7 13-9 4 15 14 7-12 10 2 15-16-5-13 10-2-16-14-7 12-10z"/></g></svg>',
  p3: '<svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#d8d4cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M83 180v-19c0-13 13-21 29-24l5-10 6 10c18 3 31 11 31 24v19"/><path d="M92 68c0-24 13-39 31-39s31 15 31 39v27c0 19-14 32-31 32S92 114 92 95z"/><path d="M93 62c14-1 27-7 39-20 8 8 14 16 22 20"/><path d="M101 79h18m14 0h14"/><path d="M102 77l-4 13h23l-2-13m14 0-2 13h20l-3-13m-17 6h-12"/><circle cx="111" cy="84" r="1.5" fill="#d8d4cc"/><path d="M127 94c3 2 6 2 9 0m-18 17c7 4 15 4 22-1m-18 17v10m-30 9 31 18 31-18m-32-66 18 28"/></g><g stroke="#9a958b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M43 80h31v84H43zM48 72h21l5 8H43z"/><path d="M51 94h15m-15 14h15m-15 14h15m-15 14h15m-8-42v42"/><path d="M169 122h32v42h-32zm5-8h22l5 8h-32z"/></g></svg>',
  p4: '<svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#d8d4cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M89 180v-17c0-13 11-21 26-24l5-11 5 11c15 3 26 11 26 24v17"/><path d="M98 74c0-25 9-41 27-41 17 0 27 16 27 41v21c0 18-12 31-27 31-16 0-27-13-27-31z"/><path d="M99 68c11-2 19-9 25-23 8 13 17 20 28 23"/><path d="M103 78h17v12h-17zm27 0h17v12h-17zm-10 6h10"/><circle cx="112" cy="84" r="1.5" fill="#d8d4cc"/><circle cx="139" cy="84" r="1.5" fill="#d8d4cc"/><path d="M122 96c2 2 5 2 8 0m-15 14c6 5 14 5 20 0m-10 16v13m-21 4 21 21 20-21"/></g><g stroke="#9a958b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="57" cy="112" r="24"/><circle cx="57" cy="112" r="17"/><path d="M74 129l22 22m-52-55 13 16 16-9"/><path d="M173 50h29v29h-29zM178 55h19v19h-19zm-5 29 29-39"/></g></svg>',
  p5: '<svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#d8d4cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M91 180v-16c0-14 11-22 25-25l4-11 5 11c15 3 25 11 25 25v16"/><path d="M97 72c0-25 10-40 28-40 17 0 28 15 28 40v23c0 19-13 32-28 32-16 0-28-13-28-32z"/><path d="M98 67c11-3 20-11 27-25 7 13 17 21 28 25m-52-13c-6 17-6 36-2 51m51-52c6 18 7 36 2 52"/><path d="M106 82h10m18 0h10"/><circle cx="112" cy="84" r="1.6" fill="#d8d4cc"/><circle cx="139" cy="84" r="1.6" fill="#d8d4cc"/><path d="M122 96c3 2 6 2 9 0m-15 15c6 3 13 3 19 0m-10 16v12m-19 5 19 20 18-20"/></g><g stroke="#9a958b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M45 72h28m-20 0v20l-13 39c-4 12 3 20 16 20h15c13 0 20-8 16-20L74 92V72"/><path d="M47 121h33m-25 13h18"/><circle cx="64" cy="109" r="3"/><circle cx="76" cy="101" r="2"/><path d="M173 63h29m-25 0v22l-10 33c-3 10 3 17 13 17h15"/></g></svg>',
  p6: '<svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#d8d4cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M47 180v-16c0-12 9-20 22-23l4-10 5 10c14 3 23 11 23 23v16"/><path d="M53 78c0-23 9-37 25-37s25 14 25 37v20c0 17-11 29-25 29S53 115 53 98z"/><path d="M54 73c10-2 18-10 24-22 6 11 14 18 25 22"/><circle cx="70" cy="86" r="1.5" fill="#d8d4cc"/><circle cx="87" cy="86" r="1.5" fill="#d8d4cc"/><path d="M75 99c3 2 6 2 8 0m-11 14c5 3 10 3 15 0m-9 14v14"/><path d="M116 180v-16c0-12 10-20 23-23l4-10 5 10c14 3 24 11 24 23v16"/><path d="M122 77c0-23 10-37 26-37s26 14 26 37v21c0 17-12 29-26 29-15 0-26-12-26-29z"/><path d="M123 71c11-3 19-10 25-22 7 12 15 19 26 22"/><circle cx="140" cy="85" r="1.5" fill="#d8d4cc"/><circle cx="157" cy="85" r="1.5" fill="#d8d4cc"/><path d="M145 98c3 2 6 2 8 0m-12 14c5 4 11 4 16 0m-9 15v14"/></g><g stroke="#9a958b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M188 49h20v104h-20zM184 44h28v9h-28z"/><path d="M192 70h12m-12 16h12m-12 16h12m-12 16h12m-12 16h12"/><circle cx="198" cy="162" r="12"/><path d="M107 44v83m-8-71h16m-16 17h16m-16 17h16"/></g></svg>',
  p7: '<svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#d8d4cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M89 180v-17c0-13 11-21 26-24l5-11 5 11c15 3 26 11 26 24v17"/><path d="M98 73c0-25 10-40 27-40s27 15 27 40v22c0 18-12 31-27 31-16 0-27-13-27-31z"/><path d="M99 68c10-3 18-11 25-24 7 13 17 20 28 24m-49-15c-7 17-7 34-3 50m48-50c7 17 7 34 3 50"/><path d="M106 82h10m18 0h10"/><circle cx="112" cy="84" r="1.5" fill="#d8d4cc"/><circle cx="140" cy="84" r="1.5" fill="#d8d4cc"/><path d="M122 96c3 2 6 2 9 0m-15 15c6 5 13 5 19 0m-10 15v13m-20 5 20 20 20-20"/></g><g stroke="#9a958b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M40 105h45v50H40zM45 98h35l5 7H40z"/><circle cx="63" cy="130" r="11"/><path d="M63 119v22m-11-11h22m-30 25 7 13h24l7-13"/><path d="M175 76h24v60h-24zM179 70h16l4 6h-24zm2 19h12m-12 12h12m-12 12h12"/></g></svg>',
  p8: '<svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#d8d4cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M87 180v-18c0-13 12-21 27-24l5-11 5 11c16 3 28 11 28 24v18"/><path d="M96 72c0-24 10-39 28-39 17 0 28 15 28 39v23c0 18-13 31-28 31-16 0-28-13-28-31z"/><path d="M96 59c8-16 48-20 56 1l-4-19c-15-10-35-10-49 0z"/><path d="M105 81h11m18 0h10"/><circle cx="112" cy="83" r="1.6" fill="#d8d4cc"/><circle cx="140" cy="83" r="1.6" fill="#d8d4cc"/><path d="M121 95c3 2 6 2 9 0m-14 15c6 4 13 4 19 0m-11 16v12m-22 6 22 20 22-20"/></g><g stroke="#9a958b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="55" cy="94" r="24"/><circle cx="55" cy="94" r="13"/><circle cx="55" cy="94" r="3" fill="#9a958b"/><path d="M55 66v56m-28-28h56m-13 22 33 48m-26-57 33 49"/><path d="M176 64l29 17-10 17-29-17zM168 81l-11 81m42-64-27 64"/></g></svg>',
  p9: '<svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#d8d4cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M88 180v-17c0-13 12-21 27-24l5-11 5 11c16 3 27 11 27 24v17"/><path d="M97 72c0-25 10-40 28-40 17 0 28 15 28 40v23c0 18-13 31-28 31-16 0-28-13-28-31z"/><path d="M98 65c10-5 19-13 26-25 8 12 18 20 29 25m-51-9c-5 12-6 24-5 37"/><path d="M106 81h11m18 0h10"/><circle cx="112" cy="83" r="1.6" fill="#d8d4cc"/><circle cx="141" cy="83" r="1.6" fill="#d8d4cc"/><path d="M122 95c3 2 6 2 9 0m-15 15c6 4 13 4 19 0m-10 16v13m-22 5 22 20 22-20"/></g><g stroke="#9a958b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="44" y="80" width="42" height="72" rx="4"/><path d="M51 91h28v42H51zM58 142h14"/><path d="M65 101l5 8-5 8-5-8z"/><path d="M177 68h25v38h-25zm4 7h17m-17 8h17m-17 8h11m-3 15v54m-8-45h16"/></g></svg>',
  p10: '<svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#d8d4cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M88 180v-18c0-13 12-21 27-24l5-11 5 11c16 3 27 11 27 24v18"/><path d="M97 72c0-25 10-40 28-40 17 0 28 15 28 40v23c0 18-13 31-28 31-16 0-28-13-28-31z"/><path d="M98 64c11-4 20-12 27-24 8 12 17 20 28 24m-51-10c-6 14-7 28-5 42"/><path d="M106 81h10m19 0h10"/><circle cx="112" cy="83" r="1.6" fill="#d8d4cc"/><circle cx="141" cy="83" r="1.6" fill="#d8d4cc"/><path d="M122 95c3 2 6 2 9 0m-15 15c6 4 13 4 19 0m-10 16v12m-21 6 21 20 21-20"/></g><g stroke="#9a958b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M48 62c17 12 28 26 34 42m-33-42c-5 17-5 35 1 54m0-54c13 4 24 12 33 23"/><path d="M38 62h22m-18-8h14"/><circle cx="65" cy="126" r="20"/><circle cx="65" cy="126" r="12"/><path d="M65 106v40m-20-20h40"/><path d="M178 56h22v86h-22zM174 50h30v10h-30zm8 24h14m-14 15h14m-14 15h14m-14 15h14"/></g></svg>',
  p11: '<svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#d8d4cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M88 180v-17c0-13 12-21 27-24l5-11 5 11c16 3 27 11 27 24v17"/><path d="M97 72c0-25 10-40 28-40 17 0 28 15 28 40v23c0 18-13 31-28 31-16 0-28-13-28-31z"/><path d="M98 65c11-3 20-12 27-25 8 13 17 22 28 25"/><path d="M106 81h10m19 0h10"/><circle cx="112" cy="83" r="1.6" fill="#d8d4cc"/><circle cx="141" cy="83" r="1.6" fill="#d8d4cc"/><path d="M122 95c3 2 6 2 9 0m-15 15c6 4 13 4 19 0m-10 16v13m-22 5 22 20 22-20"/></g><g stroke="#9a958b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M39 75h48l-6 55c-2 17-12 26-18 26s-16-9-18-26zM45 75l5-22h26l5 22"/><path d="M51 95h24m-20 13h16m-12 13h8"/><path d="M174 48h32l-4 50c-1 14-8 22-12 22s-11-8-12-22zM178 48l4-18h16l4 18"/><path d="M184 68h12m-10 12h8m-4 40v46m-14-23h28"/></g></svg>',
  // 代號：酒器符號
  c1: '<svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#d8d4cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M84 50h72l-10 36c-4 14-4 26 0 40l6 30c2 12-6 24-16 24h-32c-10 0-18-12-16-24l6-30c4-14 4-26 0-40z"/><path d="M84 50h72"/><path d="M96 96h48"/><path d="M120 50v150"/></g><g stroke="#9a958b" stroke-width="1.5" fill="none" stroke-linecap="round"><path d="M108 120v-6"/><path d="M132 120v-6"/><path d="M108 140v-6"/><path d="M132 140v-6"/></g></svg>',
  c2: '<svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#d8d4cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M104 44h32l4 12h-40z"/><path d="M100 56h40l-4 50c-2 16-2 30 0 46l4 30c2 12-4 18-14 18h-12c-10 0-16-6-14-18l4-30c2-16 2-30 0-46z"/><path d="M104 44h32"/><path d="M120 56v124"/></g><g stroke="#9a958b" stroke-width="1.5" fill="none" stroke-linecap="round"><path d="M112 100v-6"/><path d="M128 100v-6"/><path d="M112 124v-6"/><path d="M128 124v-6"/></g></svg>',
  c3: '<svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#d8d4cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M96 40h48l-4 14h-40z"/><path d="M96 54l-4 110c-1 16 12 28 28 28s29-12 28-28l-4-110z"/><path d="M96 40h48"/><path d="M120 40v152"/></g><g stroke="#9a958b" stroke-width="1.5" fill="none" stroke-linecap="round"><rect x="108" y="80" width="24" height="50"/><path d="M112 92h16"/><path d="M112 110h16"/></g></svg>',
  c4: '<svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#d8d4cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M88 44h64l-6 14h-52z"/><path d="M88 58h64l-6 40c-2 14-2 26 0 40l6 34c2 12-4 24-16 24h-28c-12 0-18-12-16-24l6-34c2-14 2-26 0-40z"/><path d="M88 44h64"/><path d="M120 58v118"/></g><g stroke="#9a958b" stroke-width="1.5" fill="none" stroke-linecap="round"><path d="M108 92h24"/><path d="M108 106h24"/><path d="M108 120h24"/></g></svg>',
  // 事件：場景符號
  e1: '<svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#d8d4cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M120 40v40"/><path d="M108 80h24l20 60c4 12-4 20-16 20h-24c-12 0-20-8-16-20z"/><path d="M112 96h16"/><path d="M104 120h32"/></g><g stroke="#9a958b" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="170" cy="50" r="4"/><circle cx="186" cy="66" r="4"/><circle cx="178" cy="82" r="4"/><path d="M174 54l8 8"/><path d="M182 70l-8 8"/><path d="M170 54l8 16"/><circle cx="196" cy="120" r="4"/><circle cx="206" cy="108" r="4"/><path d="M200 116l4-8"/><circle cx="60" cy="140" r="4"/><circle cx="50" cy="128" r="4"/><circle cx="70" cy="128" r="4"/><path d="M64 136l4-6"/><path d="M56 132l8-2"/><path d="M66 132l4 6"/></g></svg>',
  e2: '<svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#d8d4cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M48 160h144l6-10h-156z"/><path d="M54 150l8-26h124l8 26"/><path d="M62 124l4-14h108l4 14"/><circle cx="92" cy="138" r="7"/><circle cx="120" cy="138" r="7"/><circle cx="148" cy="138" r="7"/><circle cx="106" cy="108" r="7"/><circle cx="134" cy="108" r="7"/></g><g stroke="#9a958b" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M84 80c4-20 20-30 36-30s32 10 36 30"/><path d="M96 84c2-10 10-16 20-16"/><path d="M120 84c2-8 8-14 16-14"/><path d="M84 80c-6 4-8 10-4 16"/><circle cx="120" cy="48" r="5"/><path d="M120 53l-2 12"/></g></svg>',
  // 物品
  i1: '<svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#d8d4cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M90 70c-6 0-10 4-10 10v40c0 22 18 40 40 40s40-18 40-40V80c0-6-4-10-10-10z"/><path d="M90 70h60"/><path d="M84 86h-14c-4 0-6 2-6 6v16c0 4 2 6 6 6h14"/><path d="M156 86h14c4 0 6 2 6 6v16c0 4-2 6-6 6h-14"/><path d="M120 70v90"/></g><g stroke="#9a958b" stroke-width="1.5" fill="none" stroke-linecap="round"><path d="M104 96h32"/><path d="M104 112h32"/><text x="120" y="120" font-size="10" fill="#9a958b" text-anchor="middle" font-family="monospace">4869</text></g></svg>',
  i2: '<svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#d8d4cc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M90 96h60v36c0 16-12 28-30 28s-30-12-30-28z"/><path d="M90 96l8-40h44l8 40"/><path d="M98 56h44"/><path d="M120 96v64"/></g><g stroke="#9a958b" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M104 120h32"/><path d="M104 132h32"/><path d="M120 96v-40"/></g></svg>'
};

// ── 提案用官方角色／事件圖片 ──────────────────────────────────────
// 圖片皆保存為本地資產，來源與版權狀態記錄於 assets/card-art/SOURCES.json。
// 原創 Noir SVG 保留為離線載入失敗時的 fallback。
const cardImages = {
  p1: { src: "./assets/card-art/p1.jpg", alt: "烏丸蓮耶的角色形象", position: "50% 50%" },
  p2: { src: "./assets/card-art/p2.png", alt: "若狹留美的角色形象", position: "50% 0%" },
  p3: { src: "./assets/card-art/p3.png", alt: "黑田兵衛的角色形象", position: "50% 0%" },
  p4: { src: "./assets/card-art/p4.png", alt: "江戶川柯南的角色形象", position: "50% 0%" },
  p5: { src: "./assets/card-art/p5.jpg", alt: "灰原哀的角色形象", position: "50% 50%" },
  p6: { src: "./assets/card-art/p6.jpg", alt: "宮野厚司與宮野艾蓮娜同框的動畫畫面", position: "43% 50%" },
  p7: { src: "./assets/card-art/p7.png", alt: "宮野明美的角色形象", position: "50% 0%" },
  p8: { src: "./assets/card-art/p8.png", alt: "赤井秀一的角色形象", position: "50% 0%" },
  p9: { src: "./assets/card-art/p9.png", alt: "安室透的角色形象", position: "50% 0%" },
  p10: { src: "./assets/card-art/p10.png", alt: "諸伏景光以蘇格蘭身分登場的角色形象", position: "50% 0%" },
  p11: { src: "./assets/card-art/p11.jpg", alt: "羽田浩司命案相關的角色特寫", position: "55% 45%" },
  c1: { src: "./assets/card-art/c1.png", alt: "脇田兼則的角色形象", position: "50% 0%" },
  c2: { src: "./assets/card-art/c2.png", alt: "琴酒的角色形象", position: "50% 0%" },
  c3: { src: "./assets/card-art/c3.jpg", alt: "伏特加的角色特寫", position: "50% 50%" },
  c4: { src: "./assets/card-art/c4.jpg", alt: "苦艾酒的角色特寫", position: "50% 50%" },
  e1: { src: "./assets/card-art/e1.png", alt: "宮野艾蓮娜的角色形象，代表組織藥物研究計畫", position: "50% 0%" },
  e2: { src: "./assets/card-art/e2.jpg", alt: "羽田浩司命案調查相關的動畫畫面", position: "50% 50%" },
  i1: { src: "./assets/card-art/i1.jpg", alt: "APTX 4869 藥物的動畫畫面", position: "50% 50%" },
  i2: { src: "./assets/card-art/i2.jpg", alt: "刻有角行字樣的將棋棋子", position: "50% 60%" }
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

// P0-A：mobile compact 起始座標。pinboard 仍是固定 1800×1240 邏輯畫布，
// 但行動版初始把 5 張核心卡收攏到 ~360×520 內，390×844 首屏即可完整看見。
const MOBILE_INITIAL_POSITIONS = {
  p1: { x: 120, y: 70 },
  c1: { x: 26, y: 250 },
  c2: { x: 214, y: 250 },
  p4: { x: 120, y: 430 },
  i1: { x: 120, y: 320 }
};

const MOBILE_BREAKPOINT_QUERY = "(max-width: 620px)";

function isMobileBoard() {
  return window.matchMedia(MOBILE_BREAKPOINT_QUERY).matches;
}

// 各 layout 獨立保存位置與自動配置紀錄，避免 mobile 覆寫 desktop 已整理的位置。
// `positions` 與 `autoPositionedNodeIds` 始終是當前 active layout map 的別名，
// 既有 renderBoard / preserveRenderedPositions / clamp / seed / drag 不需改 signature。
const positionsByLayout = {
  desktop: clonePositions(INITIAL_POSITIONS),
  mobile: clonePositions(MOBILE_INITIAL_POSITIONS)
};
const autoPositionedByLayout = {
  desktop: new Set(),
  mobile: new Set()
};
let activeLayoutKey = isMobileBoard() ? "mobile" : "desktop";
let positions = positionsByLayout[activeLayoutKey];
let autoPositionedNodeIds = autoPositionedByLayout[activeLayoutKey];

let activeNodeId = null;
let currentFilter = "all";
let viewMode = "local"; // P0-C：local | all
const expandedNodeIds = new Set();
const CARD_EDGE_MARGIN = 18;
const COUNTER_URL = "https://eaawlrtrxwyurcfnekat.supabase.co";
const COUNTER_PUBLISHABLE_KEY = "sb_publishable_zS96EY5Uddhaq06hjt04sQ_E8WarUjc";
const COUNTER_SLUG = "black-org-evidence-board";
const COUNTER_STORAGE_KEY = `hits-counted:${COUNTER_SLUG}`;
const COUNTER_TIMEOUT_MS = 8000;
let resizeFrameId = null;

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
  // P0-C：visibility 規則為可測純邏輯，renderBoard／drawConnections／count 共用此結果。
  if (viewMode === "all") {
    return new Set(evidenceData.map((node) => node.id));
  }

  if (isMobileBoard()) {
    // mobile local：未選取顯示 5 張核心卡；已選取只顯示 active + 一階關聯。
    if (activeNodeId) {
      const active = getNode(activeNodeId);
      if (active) return new Set([active.id, ...active.connections]);
    }
    return new Set(CORE_NODE_IDS);
  }

  // desktop local：保留既有 core + expanded + active 探索能力。
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

function safeSessionGet(key) {
  try {
    return window.sessionStorage.getItem(key);
  } catch (_error) {
    return null;
  }
}

function safeSessionSet(key, value) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch (_error) {
    // Storage may be unavailable in private or restricted browser contexts.
  }
}

function initCounter() {
  const line = document.getElementById("hits-line");
  const output = document.getElementById("hits");
  if (!line || !output || !window.fetch || !window.AbortController) return;

  const seen = safeSessionGet(COUNTER_STORAGE_KEY) === "1";
  const rpcName = seen ? "read_hits" : "bump_hits";
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), COUNTER_TIMEOUT_MS);

  window.fetch(`${COUNTER_URL}/rest/v1/rpc/${rpcName}`, {
    method: "POST",
    signal: controller.signal,
    headers: {
      apikey: COUNTER_PUBLISHABLE_KEY,
      Authorization: `Bearer ${COUNTER_PUBLISHABLE_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ page_slug: COUNTER_SLUG })
  })
    .then((response) => response.ok ? response.json() : Promise.reject(response.status))
    .then((count) => {
      if (typeof count !== "number" || !Number.isFinite(count)) return;
      output.textContent = count.toLocaleString("zh-TW");
      line.hidden = false;
      if (!seen) safeSessionSet(COUNTER_STORAGE_KEY, "1");
    })
    .catch(() => {
      // The counter is an online enhancement; failures must not affect the board.
    })
    .finally(() => window.clearTimeout(timer));
}

function init() {
  renderBoard({ preserve: false });
  setupFilters();
  setupResetLayout();
  setupViewMode();
  setupBoardPan();
  setupSheetHandle();
  updateRecordClock();
  initCounter();

  // P0-A：resize 跨越 620px breakpoint 時切換 layout map，避免 SVG 線與 clamp 錯畫布。
  window.addEventListener("resize", () => {
    if (resizeFrameId !== null) {
      window.cancelAnimationFrame(resizeFrameId);
    }

    resizeFrameId = window.requestAnimationFrame(() => {
      handleLayoutSwitchIfNeeded();
      clampRenderedCards();
      drawConnections();
      resizeFrameId = null;
    });
  });
  window.setInterval(updateRecordClock, 60000);

  window.requestAnimationFrame(() => {
    boardWrapper.scrollTo(getInitialBoardScroll());
  });
}

function getInitialBoardScroll() {
  // P0-A：desktop 沿用既有 offset；mobile 不繼承 desktop 座標，回到 compact 起始。
  if (isMobileBoard()) {
    return { left: MOBILE_INITIAL_POSITIONS.p1.x - 110, top: MOBILE_INITIAL_POSITIONS.p1.y - 30, behavior: "auto" };
  }
  return { left: 70, top: 24, behavior: "auto" };
}

// P0-A：切換 desktop/mobile 時，先把舊 layout 的拖曳位置保存進它自己的 map，
// 再把別名指向新 layout 的 map，最後重新 render（不 preserve，以免把新 map 蓋成舊值）。
function handleLayoutSwitchIfNeeded() {
  const nextKey = isMobileBoard() ? "mobile" : "desktop";
  if (nextKey === activeLayoutKey) return;

  preserveRenderedPositions();
  activeLayoutKey = nextKey;
  positions = positionsByLayout[activeLayoutKey];
  autoPositionedNodeIds = autoPositionedByLayout[activeLayoutKey];
  setViewMode(viewMode, { skipRender: true });
  renderBoard({ preserve: false });
}

// P0-C：切換 view mode。進入 mobile local 時清掉 expanded（mobile 不用累積展開）。
function setViewMode(mode, { skipRender = false } = {}) {
  viewMode = mode;
  document.querySelectorAll("[data-view-mode]").forEach((button) => {
    const isActive = button.dataset.viewMode === mode;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (mode === "local" && isMobileBoard()) {
    expandedNodeIds.clear();
  }

  if (!skipRender) renderBoard({ preserve: false });
}

function setupViewMode() {
  document.querySelectorAll("[data-view-mode]").forEach((button) => {
    button.addEventListener("click", () => setViewMode(button.dataset.viewMode));
  });
}

function renderBoard({ preserve = true } = {}) {
  if (preserve) preserveRenderedPositions();
  pinboard.querySelectorAll(".node-card").forEach((card) => card.remove());

  const visibleIds = getVisibleNodeIds();
  const displayedNodes = evidenceData.filter((node) => {
    const matchesFilter = currentFilter === "all" || node.type === currentFilter;
    return visibleIds.has(node.id) && matchesFilter;
  });

  displayedNodes.forEach((node) => {
    if (!positions[node.id]) {
      positions[node.id] = findFallbackPosition(node.id);
      autoPositionedNodeIds.add(node.id);
    }
    pinboard.appendChild(createNodeCard(node));
  });

  // P0-C：visible-count 必須反映實際 rendered card 數（filter 後），與板面一致。
  visibleCount.textContent = String(pinboard.querySelectorAll(".node-card").length);
  resolveAutoPositionedCardOverlaps();
  clampRenderedCards();
  updateCardVisuals();
  drawConnections();
}

function getCardPlacementBounds(card, margin = CARD_EDGE_MARGIN) {
  return {
    minX: margin,
    minY: margin,
    maxX: Math.max(margin, pinboard.clientWidth - card.offsetWidth - margin),
    maxY: Math.max(margin, pinboard.clientHeight - card.offsetHeight - margin)
  };
}

function setCardPosition(card, x, y) {
  card.style.left = `${x}px`;
  card.style.top = `${y}px`;
  positions[card.dataset.nodeId] = { x, y };
}

function clampRenderedCards() {
  pinboard.querySelectorAll(".node-card").forEach((card) => {
    const bounds = getCardPlacementBounds(card);
    const nextX = clamp(Number.parseFloat(card.style.left), bounds.minX, bounds.maxX);
    const nextY = clamp(Number.parseFloat(card.style.top), bounds.minY, bounds.maxY);
    setCardPosition(card, nextX, nextY);
  });
}

function resolveAutoPositionedCardOverlaps() {
  const cards = [...pinboard.querySelectorAll(".node-card")];
  const occupiedCards = cards.filter((card) => !autoPositionedNodeIds.has(card.dataset.nodeId));

  cards.forEach((card) => {
    const nodeId = card.dataset.nodeId;
    if (!autoPositionedNodeIds.has(nodeId)) return;

    const originX = card.offsetLeft;
    const originY = card.offsetTop;
    const bounds = getCardPlacementBounds(card);
    let placement = null;

    for (let radius = 0; radius <= 520 && !placement; radius += 38) {
      const steps = radius === 0 ? 1 : 16;
      for (let step = 0; step < steps; step += 1) {
        const angle = (step / steps) * Math.PI * 2;
        const x = clamp(originX + Math.cos(angle) * radius, bounds.minX, bounds.maxX);
        const y = clamp(originY + Math.sin(angle) * radius, bounds.minY, bounds.maxY);
        const overlaps = occupiedCards.some((otherCard) => cardsOverlapAt(card, x, y, otherCard, 16));

        if (!overlaps) {
          placement = { x, y };
          break;
        }
      }
    }

    if (placement) {
      setCardPosition(card, placement.x, placement.y);
      autoPositionedNodeIds.delete(nodeId);
    }

    occupiedCards.push(card);
  });
}

function cardsOverlapAt(card, x, y, otherCard, gap) {
  return !(
    x + card.offsetWidth + gap <= otherCard.offsetLeft ||
    x >= otherCard.offsetLeft + otherCard.offsetWidth + gap ||
    y + card.offsetHeight + gap <= otherCard.offsetTop ||
    y >= otherCard.offsetTop + otherCard.offsetHeight + gap
  );
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

  const art = createArtFigure(node.id, "card-art");

  meta.append(type, id);
  footer.append(connectionCount, expandStatus);
  card.append(meta);
  if (art) card.append(art);
  card.append(title, footer);

  // P0-D：container 不再是 button。選取與拖曳由兩個 sibling button 分別承擔，
  // 不巢狀、不互相遮蔽熱區。select overlay 在最下層、drag handle 在最上層。
  const selectAction = document.createElement("button");
  selectAction.type = "button";
  selectAction.className = "card-select-action";
  selectAction.dataset.nodeId = node.id;
  selectAction.setAttribute("aria-label", `${node.name}，${TYPE_LABELS[node.type]}，${node.connections.length} 個直接關聯，點擊開啟卷宗`);
  selectAction.setAttribute("aria-pressed", String(activeNodeId === node.id));
  selectAction.setAttribute("aria-controls", "case-file-sidebar");
  selectAction.setAttribute("aria-expanded", String(expandedNodeIds.has(node.id)));
  selectAction.addEventListener("click", () => selectNode(node));

  const dragHandle = document.createElement("button");
  dragHandle.type = "button";
  dragHandle.className = "card-drag-handle";
  dragHandle.dataset.nodeId = node.id;
  dragHandle.setAttribute("aria-label", `拖曳移動 ${node.name}`);
  dragHandle.setAttribute("aria-keyshortcuts", "方向鍵:移動10px Shift+方向鍵:移動40px");
  // 僅標示；keyboard 重排見 makeElementInteractive。

  card.append(selectAction, dragHandle);

  makeElementInteractive(card, node, dragHandle);
  return card;
}

function makeElementInteractive(card, node, dragHandle) {
  // P0-D：拖曳只綁在 drag handle 上。pointer capture／5px threshold／pointercancel／
  // 拖曳即時 drawConnections 全數保留；pointerup 不再誤觸 select（select 由 overlay button 處理）。
  let pointerId = null;
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;
  let hasMoved = false;

  dragHandle.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    event.preventDefault();
    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    startLeft = card.offsetLeft;
    startTop = card.offsetTop;
    hasMoved = false;
    dragHandle.setPointerCapture(pointerId);
    card.classList.add("dragging");
  });

  dragHandle.addEventListener("pointermove", (event) => {
    if (event.pointerId !== pointerId) return;

    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    if (!hasMoved && Math.hypot(deltaX, deltaY) < 5) return;

    hasMoved = true;

    const bounds = getCardPlacementBounds(card);
    const nextX = clamp(startLeft + deltaX, bounds.minX, bounds.maxX);
    const nextY = clamp(startTop + deltaY, bounds.minY, bounds.maxY);

    autoPositionedNodeIds.delete(node.id);
    setCardPosition(card, nextX, nextY);
    drawConnections();
  });

  const finishPointer = (event) => {
    if (event.pointerId !== pointerId) return;

    if (dragHandle.hasPointerCapture(pointerId)) {
      dragHandle.releasePointerCapture(pointerId);
    }

    card.classList.remove("dragging");
    pointerId = null;
    // 不在此 select；選取由 .card-select-action 處理。
  };

  dragHandle.addEventListener("pointerup", finishPointer);
  dragHandle.addEventListener("pointercancel", (event) => {
    if (event.pointerId !== pointerId) return;
    if (dragHandle.hasPointerCapture(pointerId)) {
      dragHandle.releasePointerCapture(pointerId);
    }
    card.classList.remove("dragging");
    pointerId = null;
  });

  // P0-D：handle 必須是有效 keyboard target，不可為 dead focus。
  // 方向鍵 10px、Shift+方向鍵 40px 移動卡片並即時更新紅線。
  dragHandle.addEventListener("keydown", (event) => {
    const step = event.shiftKey ? 40 : 10;
    let dx = 0;
    let dy = 0;
    switch (event.key) {
      case "ArrowLeft": dx = -step; break;
      case "ArrowRight": dx = step; break;
      case "ArrowUp": dy = -step; break;
      case "ArrowDown": dy = step; break;
      default: return;
    }
    event.preventDefault();
    const bounds = getCardPlacementBounds(card);
    autoPositionedNodeIds.delete(node.id);
    setCardPosition(
      card,
      clamp(card.offsetLeft + dx, bounds.minX, bounds.maxX),
      clamp(card.offsetTop + dy, bounds.minY, bounds.maxY)
    );
    drawConnections();
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
    const radiusX = 235 + (index % 2) * 40;
    const radiusY = 220 + ((index + 1) % 2) * 35;

    positions[connectionId] = {
      x: clamp(parentPosition.x + Math.cos(angle) * radiusX, 32, pinboard.clientWidth - 220),
      y: clamp(parentPosition.y + Math.sin(angle) * radiusY, 42, pinboard.clientHeight - 230)
    };
    autoPositionedNodeIds.add(connectionId);
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
    // 點同一張：desktop 切換展開／收合；mobile local 不用累積展開，僅保留 active。
    if (isMobileBoard()) {
      // mobile：維持 active，不擴張狀態（visibility 已由 active+connections 提供）。
    } else if (expandedNodeIds.has(node.id)) {
      expandedNodeIds.delete(node.id);
    } else {
      expandedNodeIds.add(node.id);
      seedConnectedPositions(node);
    }
  } else {
    // 切換 active：mobile 清掉舊展開以避免網絡無聲膨脹；desktop 保留累積探索。
    if (isMobileBoard()) {
      expandedNodeIds.clear();
    }
    activeNodeId = node.id;
    if (!isMobileBoard()) {
      expandedNodeIds.add(node.id);
      seedConnectedPositions(node);
    } else {
      // mobile 仍需為一階關聯產生位置，但 expanded 不作為 visibility 來源。
      seedConnectedPositions(node);
    }
  }

  renderBoard({ preserve: false });
  populateSidebar(node);
  setSidebarSheetState("expanded");
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
    const isExpanded = expandedNodeIds.has(node.id);
    const selectAction = card.querySelector(".card-select-action");
    if (selectAction) {
      selectAction.setAttribute("aria-expanded", String(isExpanded));
      selectAction.setAttribute("aria-pressed", String(activeNodeId === node.id));
    }

    const status = card.querySelector(".expand-status");
    if (status) {
      status.textContent = isExpanded ? "− 收合" : "+ 展開";
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

  // P0-F：關聯資訊提到大型插畫之前，讓手機第一個 viewport 先看到摘要、關聯數與前幾個 CTA。
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

  // P0-E/F：「回到板面」緊接關聯 CTA，收合 bottom sheet 但保留 active card。
  const backToBoard = document.createElement("button");
  backToBoard.type = "button";
  backToBoard.className = "back-to-board-btn";
  backToBoard.textContent = "回到板面";
  backToBoard.setAttribute("aria-label", "收合卷宗回到證據板");
  backToBoard.addEventListener("click", () => {
    setSidebarSheetState("collapsed");
    // 保留 activeNodeId；只收合 sheet，讓使用者回到板面操作。
  });

  const art = createDetailArt(node.id);

  classification.append(type, recordId);
  descriptionBlock.append(descriptionLabel, description);
  relationsHeading.append(relationsTitle, relationsCount);
  relations.append(relationsHeading, relationsList, backToBoard);

  // P0-F：DOM 順序 = 分類 → 名稱 → 摘要 → 關聯數/CTA → 回到板面 → 完整情報 → 大圖。
  // 手機首屏先看到下一步；大型 hero 移到最後（CSS 另外限高）。
  detail.append(classification, name, descriptionBlock, relations, createDetailsDisclosure(node));
  if (art) detail.append(art);
  sidebarContent.replaceChildren(detail);
}

// ── 卡片插畫：本地提案圖片，載入失敗時退回原創 Noir SVG ──────────────
function createArtFigure(nodeId, className) {
  const imageAsset = cardImages[nodeId];
  const fallbackSvg = cardArt[nodeId];
  if (!imageAsset && !fallbackSvg) return null;

  const isCardThumbnail = className === "card-art";
  const figure = document.createElement("figure");
  figure.className = className;

  if (isCardThumbnail) {
    figure.setAttribute("aria-hidden", "true");
  }

  const renderFallback = () => {
    if (!fallbackSvg) {
      figure.classList.add("art-load-failed");
      figure.replaceChildren();
      return;
    }

    figure.classList.add("art-fallback");
    figure.replaceChildren();
    figure.innerHTML = fallbackSvg;

    if (!isCardThumbnail && imageAsset?.alt) {
      figure.setAttribute("role", "img");
      figure.setAttribute("aria-label", imageAsset.alt);
    }
  };

  if (!imageAsset) {
    renderFallback();
    return figure;
  }

  figure.style.setProperty("--art-position", imageAsset.position || "50% 50%");

  const image = document.createElement("img");
  image.src = imageAsset.src;
  image.alt = isCardThumbnail ? "" : imageAsset.alt;
  image.decoding = "async";
  if (isCardThumbnail) image.loading = "lazy";
  image.addEventListener("error", renderFallback, { once: true });
  figure.appendChild(image);

  return figure;
}

function createDetailArt(nodeId) {
  return createArtFigure(nodeId, "detail-art");
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

  // P0-C：relation 跨 filter 時先更新 filter state，不產生中間 render。
  if (currentFilter !== "all" && currentFilter !== node.type) {
    setActiveFilter("all");
  }

  // mobile local 切換 active 清掉舊展開；desktop 保留既有累積行為。
  if (isMobileBoard()) {
    expandedNodeIds.clear();
  } else {
    expandedNodeIds.add(node.id);
  }
  activeNodeId = node.id;
  seedConnectedPositions(node);
  renderBoard({ preserve: false });
  populateSidebar(node);
  setSidebarSheetState("expanded");

  window.requestAnimationFrame(() => {
    const card = document.getElementById(`node-${node.id}`);
    if (!card) return;
    scrollCardIntoView(card);
    const selectAction = card.querySelector(".card-select-action");
    selectAction?.focus({ preventScroll: true });
  });
}

// P0-D：只調整 boardWrapper 內部 scroll，不用未限制的 scrollIntoView（會牽動 body）。
function scrollCardIntoView(card) {
  const cardRect = card.getBoundingClientRect();
  const wrapperRect = boardWrapper.getBoundingClientRect();
  const cardCenterX = cardRect.left + cardRect.width / 2;
  const cardCenterY = cardRect.top + cardRect.height / 2;
  const wrapperCenterX = wrapperRect.left + wrapperRect.width / 2;
  const wrapperCenterY = wrapperRect.top + wrapperRect.height / 2;
  boardWrapper.scrollBy({
    left: cardCenterX - wrapperCenterX,
    top: cardCenterY - wrapperCenterY,
    behavior: "smooth"
  });
}

// P0-E：bottom sheet 狀態。peek=未選取、expanded=已選取、collapsed=回到板面。
function setSidebarSheetState(state) {
  const sidebar = document.getElementById("case-file-sidebar");
  if (!sidebar) return;
  // 桌面不使用 sheet 行為；僅在 <=620 套用視覺。狀態仍記錄供 CSS 判讀。
  sidebar.dataset.sheetState = state;
  const handle = sidebar.querySelector(".sheet-handle");
  if (handle) {
    handle.setAttribute("aria-expanded", String(state === "expanded"));
  }
}

function setupSheetHandle() {
  const sidebar = document.getElementById("case-file-sidebar");
  const handle = sidebar?.querySelector(".sheet-handle");
  if (!handle) return;
  // 點 handle：collapsed ↔ expanded 切換（保留 active）。
  handle.addEventListener("click", () => {
    if (sidebar.dataset.sheetState === "expanded") {
      setSidebarSheetState("collapsed");
    } else {
      setSidebarSheetState(activeNodeId ? "expanded" : "peek");
    }
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
  setSidebarSheetState("peek");
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
    // P0-G：重置整個視圖——清除兩個 layout 的位置、自動配置、選取、展開、篩選、view mode。
    positionsByLayout.desktop = clonePositions(INITIAL_POSITIONS);
    positionsByLayout.mobile = clonePositions(MOBILE_INITIAL_POSITIONS);
    autoPositionedByLayout.desktop.clear();
    autoPositionedByLayout.mobile.clear();
    positions = positionsByLayout[activeLayoutKey];
    autoPositionedNodeIds = autoPositionedByLayout[activeLayoutKey];
    expandedNodeIds.clear();
    activeNodeId = null;
    setActiveFilter("all");
    viewMode = "local";
    document.querySelectorAll("[data-view-mode]").forEach((button) => {
      const isActive = button.dataset.viewMode === "local";
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    resetSidebar();
    renderBoard({ preserve: false });
    boardWrapper.scrollTo(getInitialBoardScroll());
  });
}

// P0-D：拖曳 pinboard 空白處平移 board，不動卡片座標。
// 只接受 pinboard 背景／SVG 為來源，排除卡片與 HUD/controls。
function setupBoardPan() {
  let pointerId = null;
  let startX = 0;
  let startY = 0;
  let startScrollLeft = 0;
  let startScrollTop = 0;
  let panning = false;

  pinboard.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".node-card") || event.target.closest(".board-hud")) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;

    pointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    startScrollLeft = boardWrapper.scrollLeft;
    startScrollTop = boardWrapper.scrollTop;
    panning = false;
    pinboard.setPointerCapture(pointerId);
  });

  pinboard.addEventListener("pointermove", (event) => {
    if (event.pointerId !== pointerId) return;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    if (!panning && Math.hypot(deltaX, deltaY) < 5) return;
    panning = true;
    pinboard.classList.add("panning");
    boardWrapper.scrollLeft = startScrollLeft - deltaX;
    boardWrapper.scrollTop = startScrollTop - deltaY;
  });

  const endPan = (event) => {
    if (event.pointerId !== pointerId) return;
    if (pinboard.hasPointerCapture(pointerId)) {
      pinboard.releasePointerCapture(pointerId);
    }
    pinboard.classList.remove("panning");
    pointerId = null;
    panning = false;
  };

  pinboard.addEventListener("pointerup", endPan);
  pinboard.addEventListener("pointercancel", endPan);
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
