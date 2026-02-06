// 五代十国历史数据
const historyData = {
    // 时间范围
    startYear: 907,
    endYear: 960,
    
    // 五代（中央政权）
    fiveDynasties: {
        laterLiang: {
            id: 'laterLiang',
            name: '后梁',
            type: 'dynasty',
            color: '#8B4513',
            startYear: 907,
            endYear: 923,
            capital: '开封',
            rulers: [
                { 
                    name: '朱温', 
                    title: '太祖', 
                    reign: '907-912', 
                    eraNames: ['开平', '乾化'],
                    birthYear: 852,
                    deathYear: 912,
                    personality: '残暴多疑、荒淫无度',
                    biography: '朱温（852-912），砀山人，早年参加黄巢起义，后降唐。904年杀唐昭宗，907年废唐哀帝自立，建立后梁。在位期间穷兵黩武，与李克用连年征战。晚年荒淫残暴，被次子朱友珪所杀。',
                    achievements: '结束唐朝统治，建立五代第一个政权',
                    anecdotes: '朱温晚年召儿媳入宫侍寝，与诸子妻妾乱伦，最终被次子朱友珪刺杀身亡。'
                },
                { 
                    name: '朱友珪', 
                    title: '郢王', 
                    reign: '912-913', 
                    eraNames: ['乾化'],
                    birthYear: 884,
                    deathYear: 913,
                    personality: '阴险狠毒、弑父篡位',
                    biography: '朱友珪（884-913），朱温次子。因妻子张氏告密，得知朱温欲传位给养子朱友文，遂发动兵变弑父自立。在位仅十一个月，被弟弟朱友贞所杀。',
                    achievements: '无显著政绩',
                    anecdotes: '朱友珪弑父后，用破毡子包裹朱温尸体埋于宫中，秘不发丧。'
                },
                { 
                    name: '朱友贞', 
                    title: '末帝', 
                    reign: '913-923', 
                    eraNames: ['乾化', '贞明', '龙德'],
                    birthYear: 888,
                    deathYear: 923,
                    personality: '优柔寡断、用人不当',
                    biography: '朱友贞（888-923），朱温第四子。杀兄朱友珪自立，是为梁末帝。在位期间与后唐连年征战，国力耗尽。923年后唐庄宗攻入开封，朱友贞命部将皇甫麟将自己杀死，后梁灭亡。',
                    achievements: '无显著政绩',
                    anecdotes: '朱友贞临死前对皇甫麟说："我与晋人世仇，不可等其刀锯辱我。请你把我杀了！"'
                }
            ]
        },
        laterTang: {
            id: 'laterTang',
            name: '后唐',
            type: 'dynasty',
            color: '#8B4513',
            startYear: 923,
            endYear: 936,
            capital: '洛阳',
            rulers: [
                { 
                    name: '李存勖', 
                    title: '庄宗', 
                    reign: '923-926', 
                    eraNames: ['同光'],
                    birthYear: 885,
                    deathYear: 926,
                    personality: '英勇善战、宠信伶人',
                    biography: '李存勖（885-926），沙陀人，晋王李克用长子。自幼随父征战，骁勇善战，923年称帝建立后唐，同年灭后梁。初期励精图治，后期宠信伶人、宦官，横征暴敛，导致魏州兵变，被部下所杀。',
                    achievements: '灭后梁建后唐，统一北方大部分地区',
                    anecdotes: '李存勖酷爱戏曲，自取艺名"李天下"，常与伶人同台演出，最终因伶人郭门高作乱而死。'
                },
                { 
                    name: '李嗣源', 
                    title: '明宗', 
                    reign: '926-933', 
                    eraNames: ['天成', '长兴'],
                    birthYear: 867,
                    deathYear: 933,
                    personality: '宽厚仁慈、勤政爱民',
                    biography: '李嗣源（867-933），沙陀人，李克用养子。本为后唐大将，926年兵变中被推举为帝。在位期间革除庄宗弊政，减轻赋税，与民休息，是五代少有的明君，史称"小康之治"。',
                    achievements: '革除弊政，减轻赋税，使后唐出现小康局面',
                    anecdotes: '李嗣源即位时已60岁，目不识丁，但勤政爱民，每夜焚香祷告："某胡人，因乱被拥立，愿上天早生圣人，为万民之主。"'
                },
                { 
                    name: '李从厚', 
                    title: '闵帝', 
                    reign: '933-934', 
                    eraNames: ['应顺'],
                    birthYear: 914,
                    deathYear: 934,
                    personality: '年幼软弱、优柔寡断',
                    biography: '李从厚（914-934），李嗣源第三子。明宗死后继位，年仅20岁。在位仅五个月，因削藩引发潞王李从珂叛乱，兵败出逃，被姐夫石敬瑭囚禁后杀害。',
                    achievements: '无显著政绩',
                    anecdotes: '李从厚出逃时，百姓纷纷围观，说："这就是皇帝吗？"李从厚羞愧低头。'
                },
                { 
                    name: '李从珂', 
                    title: '末帝', 
                    reign: '934-936', 
                    eraNames: ['清泰'],
                    birthYear: 885,
                    deathYear: 936,
                    personality: '勇猛善战、猜忌多疑',
                    biography: '李从珂（885-936），本姓王，李嗣源养子。骁勇善战，934年因闵帝削藩起兵反叛，自立为帝。936年石敬瑭借契丹兵反叛，李从珂兵败，携全家自焚于洛阳玄武楼，后唐灭亡。',
                    achievements: '无显著政绩',
                    anecdotes: '李从珂自焚前，积薪于玄武楼，饮酣后纵火，与曹太后、刘皇后及诸子一同殉国。'
                }
            ]
        },
        laterJin: {
            id: 'laterJin',
            name: '后晋',
            type: 'dynasty',
            color: '#8B4513',
            startYear: 936,
            endYear: 947,
            capital: '开封',
            rulers: [
                { 
                    name: '石敬瑭', 
                    title: '高祖', 
                    reign: '936-942', 
                    eraNames: ['天福'],
                    birthYear: 892,
                    deathYear: 942,
                    personality: '隐忍狡诈、卖国求荣',
                    biography: '石敬瑭（892-942），沙陀人，后唐明宗女婿。936年因与后唐末帝不和，以割让燕云十六州、称契丹主为"父皇帝"为代价，借契丹兵灭后唐，建立后晋。在位期间对契丹卑躬屈膝，被称为"儿皇帝"。',
                    achievements: '建立后晋',
                    anecdotes: '石敬瑭对契丹使者跪拜受诏，称契丹主耶律德光为"父皇帝"，自称"儿皇帝"，成为千古笑柄。'
                },
                { 
                    name: '石重贵', 
                    title: '出帝', 
                    reign: '942-947', 
                    eraNames: ['天福', '开运'],
                    birthYear: 914,
                    deathYear: 964,
                    personality: '刚愎自用、不识时务',
                    biography: '石重贵（914-964），石敬瑭养子。942年继位，初期对契丹称"孙"不称臣，引发契丹不满。946年契丹大举南下，947年灭后晋，石重贵被掳至契丹，后死于建州。',
                    achievements: '无显著政绩',
                    anecdotes: '石重贵被掳北上时，与太后、妃子一路风餐露宿，受尽屈辱，史称"晋出帝北迁"。'
                }
            ]
        },
        laterHan: {
            id: 'laterHan',
            name: '后汉',
            type: 'dynasty',
            color: '#8B4513',
            startYear: 947,
            endYear: 951,
            capital: '开封',
            rulers: [
                { 
                    name: '刘知远', 
                    title: '高祖', 
                    reign: '947-948', 
                    eraNames: ['天福', '乾祐'],
                    birthYear: 895,
                    deathYear: 948,
                    personality: '沉稳果断、善于隐忍',
                    biography: '刘知远（895-948），沙陀人，后晋大将。947年契丹灭后晋，刘知远在太原称帝，建立后汉，后迁都开封。在位期间整顿吏治，但时间太短，仅一年即病逝。',
                    achievements: '建立后汉，收复中原',
                    anecdotes: '刘知远称帝时，有童谣云："赵王石，刘知远，沙陀儿，坐天下。"'
                },
                { 
                    name: '刘承祐', 
                    title: '隐帝', 
                    reign: '948-951', 
                    eraNames: ['乾祐'],
                    birthYear: 930,
                    deathYear: 951,
                    personality: '年轻气盛、猜忌功臣',
                    biography: '刘承祐（930-951），刘知远次子。18岁继位，年少气盛，猜忌大将郭威、史弘肇等。950年密谋诛杀郭威等人，事泄后郭威起兵反叛，刘承祐兵败被杀，后汉灭亡。',
                    achievements: '无显著政绩',
                    anecdotes: '刘承祐被杀前，曾问左右："郭威反乎？"左右答："然。"刘承祐叹曰："吾不用忠臣之言，以至于此！"'
                }
            ]
        },
        laterZhou: {
            id: 'laterZhou',
            name: '后周',
            type: 'dynasty',
            color: '#8B4513',
            startYear: 951,
            endYear: 960,
            capital: '开封',
            rulers: [
                { 
                    name: '郭威', 
                    title: '太祖', 
                    reign: '951-954', 
                    eraNames: ['广顺', '显德'],
                    birthYear: 904,
                    deathYear: 954,
                    personality: '节俭朴素、勤政爱民',
                    biography: '郭威（904-954），邢州人，后汉大将。951年因后汉隐帝猜忌起兵反叛，建立后周。在位期间崇尚节俭，减轻赋税，整顿吏治，为后周强盛奠定基础。',
                    achievements: '建立后周，革除弊政，为北宋统一奠定基础',
                    anecdotes: '郭威临终前嘱咐柴荣："我死，以纸衣瓦棺葬我，勿劳扰百姓。"是中国历史上最节俭的皇帝之一。'
                },
                { 
                    name: '柴荣', 
                    title: '世宗', 
                    reign: '954-959', 
                    eraNames: ['显德'],
                    birthYear: 921,
                    deathYear: 959,
                    personality: '雄才大略、励精图治',
                    biography: '柴荣（921-959），郭威养子，后周世宗。954年继位，是五代十国时期最有作为的皇帝。在位期间整顿军政，发展经济，三征南唐，北伐契丹，为北宋统一奠定基础。',
                    achievements: '整顿军政，发展经济，为北宋统一奠定基础',
                    anecdotes: '柴荣曾说："朕当以十年开拓天下，十年养百姓，十年致太平。"可惜仅在位五年即病逝，年仅38岁。'
                },
                { 
                    name: '柴宗训', 
                    title: '恭帝', 
                    reign: '959-960', 
                    eraNames: ['显德'],
                    birthYear: 953,
                    deathYear: 973,
                    personality: '年幼无知',
                    biography: '柴宗训（953-973），柴荣第四子。7岁继位，由符太后临朝听政。960年赵匡胤在陈桥发动兵变，黄袍加身，建立北宋，柴宗训被迫禅位，后周灭亡。',
                    achievements: '无显著政绩',
                    anecdotes: '柴宗训禅位后被封为郑王，973年病逝于房州，年仅20岁。'
                }
            ]
        }
    },
    
    // 十国（地方政权）
    tenKingdoms: {
        wu: {
            id: 'wu',
            name: '吴',
            type: 'kingdom',
            color: '#2E8B57',
            startYear: 902,
            endYear: 937,
            capital: '金陵',
            rulers: [
                { 
                    name: '杨行密', 
                    title: '太祖', 
                    reign: '902-905',
                    birthYear: 852,
                    deathYear: 905,
                    personality: '勇猛善战、有雄才大略',
                    biography: '杨行密（852-905），庐州人，唐末江淮地区割据军阀。902年被封为吴王，是吴国奠基人。在位期间保境安民，发展生产，使江淮地区免受战乱之苦。',
                    achievements: '奠定吴国基业，保境安民',
                    anecdotes: '杨行密身材高大，能手举百斤，军中号称"杨无敌"。'
                },
                { 
                    name: '杨渥', 
                    title: '烈祖', 
                    reign: '905-908',
                    birthYear: 886,
                    deathYear: 908,
                    personality: '荒淫无度、不理政事',
                    biography: '杨渥（886-908），杨行密长子。继位后荒淫无度，不理政事，被大将张颢、徐温杀害，年仅23岁。',
                    achievements: '无显著政绩',
                    anecdotes: '杨渥喜欢击球饮酒，日夜不休，被左右称为"击毬郎君"。'
                },
                { 
                    name: '杨隆演', 
                    title: '高祖', 
                    reign: '908-920',
                    birthYear: 897,
                    deathYear: 920,
                    personality: '年幼软弱、受制于权臣',
                    biography: '杨隆演（897-920），杨行密次子。908年继位，年仅12岁，大权旁落于徐温之手。在位期间吴国政治由徐温掌控，本人仅为傀儡。',
                    achievements: '无显著政绩',
                    anecdotes: '杨隆演曾被徐温之子徐知训当众羞辱，却敢怒不敢言。'
                },
                { 
                    name: '杨溥', 
                    title: '睿帝', 
                    reign: '920-937',
                    birthYear: 900,
                    deathYear: 938,
                    personality: '软弱无能、被迫禅位',
                    biography: '杨溥（900-938），杨行密四子。920年继位，937年被徐知诰（李昪）逼迫禅位，吴国灭亡。后被迁至海陵，不久被杀。',
                    achievements: '无显著政绩',
                    anecdotes: '杨溥禅位后，李昪封其为让皇，实则软禁，最终被害。'
                }
            ]
        },
        wuyue: {
            id: 'wuyue',
            name: '吴越',
            type: 'kingdom',
            color: '#2E8B57',
            startYear: 907,
            endYear: 978,
            capital: '杭州',
            rulers: [
                { 
                    name: '钱镠', 
                    title: '武肃王', 
                    reign: '907-932',
                    birthYear: 852,
                    deathYear: 932,
                    personality: '节俭务实、保境安民',
                    biography: '钱镠（852-932），杭州人，唐末吴越地区割据军阀。907年被后梁封为吴越王。在位期间修筑海塘，发展农业，使吴越成为五代十国中最富庶的地区之一。',
                    achievements: '修筑海塘，发展经济，保境安民',
                    anecdotes: '钱镠出身贫寒，曾以贩盐为生，后成为一方霸主，却始终保持节俭本色。'
                },
                { 
                    name: '钱元瓘', 
                    title: '文穆王', 
                    reign: '932-941',
                    birthYear: 887,
                    deathYear: 941,
                    personality: '文治武功、善于守成',
                    biography: '钱元瓘（887-941），钱镠第七子。932年继位，在位期间继续奉行保境安民政策，与中原王朝保持朝贡关系，使吴越国势稳定。',
                    achievements: '守成有道，维持吴越稳定',
                    anecdotes: '钱元瓘喜好文学，常与文人学士唱和，有"文穆"之谥。'
                },
                { 
                    name: '钱弘佐', 
                    title: '忠献王', 
                    reign: '941-947',
                    birthYear: 928,
                    deathYear: 947,
                    personality: '年幼聪慧、英年早逝',
                    biography: '钱弘佐（928-947），钱元瓘第六子。941年继位，年仅14岁。在位期间整顿吏治，发展生产，但年仅20岁即病逝。',
                    achievements: '整顿吏治，发展生产',
                    anecdotes: '钱弘佐虽年幼，却聪慧过人，能决断大事，被时人称为"神童"。'
                },
                { 
                    name: '钱弘倧', 
                    title: '忠逊王', 
                    reign: '947',
                    birthYear: 925,
                    deathYear: 971,
                    personality: '软弱无能、被迫退位',
                    biography: '钱弘倧（925-971），钱元瓘第七子。947年继位，因欲限制将领权力，被内牙统军使胡进思发动政变废黜，在位仅八个月。',
                    achievements: '无显著政绩',
                    anecdotes: '钱弘倧被废后，被软禁于明州，直至去世。'
                },
                { 
                    name: '钱弘俶', 
                    title: '忠懿王', 
                    reign: '947-978',
                    birthYear: 929,
                    deathYear: 988,
                    personality: '明智果断、顺应时势',
                    biography: '钱弘俶（929-988），钱元瓘第九子。947年继位，978年顺应历史潮流，纳土归宋，使吴越百姓免受战火之苦，被宋太宗封为淮海国王。',
                    achievements: '纳土归宋，保全百姓',
                    anecdotes: '钱弘俶纳土归宋时，吴越百姓夹道相送，哭声震天，感念钱氏保境安民之功。'
                }
            ]
        },
        min: {
            id: 'min',
            name: '闽',
            type: 'kingdom',
            color: '#2E8B57',
            startYear: 909,
            endYear: 945,
            capital: '福州',
            rulers: [
                { name: '王审知', title: '太祖', reign: '909-925' },
                { name: '王延翰', title: '嗣王', reign: '925-926' },
                { name: '王鏻', title: '惠宗', reign: '926-935' },
                { name: '王昶', title: '康宗', reign: '935-939' },
                { name: '王曦', title: '景宗', reign: '939-944' },
                { name: '王延政', title: '天德帝', reign: '943-945' }
            ]
        },
        chu: {
            id: 'chu',
            name: '楚',
            type: 'kingdom',
            color: '#2E8B57',
            startYear: 907,
            endYear: 951,
            capital: '潭州',
            rulers: [
                { name: '马殷', title: '武穆王', reign: '907-930' },
                { name: '马希声', title: '衡阳王', reign: '930-932' },
                { name: '马希范', title: '文昭王', reign: '932-947' },
                { name: '马希广', title: '废王', reign: '947-950' },
                { name: '马希萼', title: '恭孝王', reign: '950-951' },
                { name: '马希崇', title: '后主', reign: '951' }
            ]
        },
        southernHan: {
            id: 'southernHan',
            name: '南汉',
            type: 'kingdom',
            color: '#2E8B57',
            startYear: 917,
            endYear: 971,
            capital: '兴王府',
            rulers: [
                { name: '刘龑', title: '高祖', reign: '917-942' },
                { name: '刘玢', title: '殇帝', reign: '942-943' },
                { name: '刘晟', title: '中宗', reign: '943-958' },
                { name: '刘鋹', title: '后主', reign: '958-971' }
            ]
        },
        formerShu: {
            id: 'formerShu',
            name: '前蜀',
            type: 'kingdom',
            color: '#2E8B57',
            startYear: 907,
            endYear: 925,
            capital: '成都',
            rulers: [
                { 
                    name: '王建', 
                    title: '高祖', 
                    reign: '907-918',
                    birthYear: 847,
                    deathYear: 918,
                    personality: '雄才大略、善于用人',
                    biography: '王建（847-918），许州人，唐末西川节度使。907年在成都称帝，建立前蜀。在位期间招纳贤才，发展生产，使蜀中成为乱世中的乐土。',
                    achievements: '建立前蜀，保境安民',
                    anecdotes: '王建出身贫寒，曾以屠牛盗驴为生，后成为西川之主，被称为"贼王八"。'
                },
                { 
                    name: '王衍', 
                    title: '后主', 
                    reign: '918-925',
                    birthYear: 899,
                    deathYear: 926,
                    personality: '荒淫无度、昏庸无能',
                    biography: '王衍（899-926），王建幼子。918年继位，荒淫无度，不理政事。925年后唐庄宗派兵伐蜀，王衍投降，前蜀灭亡，后被杀于长安。',
                    achievements: '无显著政绩',
                    anecdotes: '王衍喜好游玩，曾在成都大修宫殿，与太后、太妃出游，百姓苦不堪言。'
                }
            ]
        },
        laterShu: {
            id: 'laterShu',
            name: '后蜀',
            type: 'kingdom',
            color: '#2E8B57',
            startYear: 934,
            endYear: 965,
            capital: '成都',
            rulers: [
                { 
                    name: '孟知祥', 
                    title: '高祖', 
                    reign: '934',
                    birthYear: 874,
                    deathYear: 934,
                    personality: '雄才大略、善于谋略',
                    biography: '孟知祥（874-934），邢州人，后唐西川节度使。934年在成都称帝，建立后蜀。同年病逝，在位仅七个月。',
                    achievements: '建立后蜀',
                    anecdotes: '孟知祥是晋王李克用的侄女婿，凭借这层关系逐渐掌握西川大权。'
                },
                { 
                    name: '孟昶', 
                    title: '后主', 
                    reign: '934-965',
                    birthYear: 919,
                    deathYear: 965,
                    personality: '前期勤政、后期荒淫',
                    biography: '孟昶（919-965），孟知祥第三子。934年继位，在位三十年。前期勤政爱民，后期沉湎酒色。965年宋军伐蜀，孟昶投降，后蜀灭亡。',
                    achievements: '统治蜀中三十年，使蜀中富庶',
                    anecdotes: '孟昶投降后被送至开封，七日后暴卒，传说被宋太祖毒杀。'
                }
            ]
        },
        jingnan: {
            id: 'jingnan',
            name: '荆南',
            type: 'kingdom',
            color: '#2E8B57',
            startYear: 924,
            endYear: 963,
            capital: '江陵',
            rulers: [
                { name: '高季兴', title: '武信王', reign: '924-928' },
                { name: '高从诲', title: '文献王', reign: '928-948' },
                { name: '高保融', title: '贞懿王', reign: '948-960' },
                { name: '高保勖', title: '侍中', reign: '960-962' },
                { name: '高继冲', title: '节度使', reign: '962-963' }
            ]
        },
        southernTang: {
            id: 'southernTang',
            name: '南唐',
            type: 'kingdom',
            color: '#2E8B57',
            startYear: 937,
            endYear: 975,
            capital: '金陵',
            rulers: [
                { 
                    name: '李昪', 
                    title: '烈祖', 
                    reign: '937-943',
                    birthYear: 888,
                    deathYear: 943,
                    personality: '节俭勤政、善于治国',
                    biography: '李昪（888-943），徐州人，本姓徐，名知诰，吴丞相徐温养子。937年废吴帝杨溥，建立南唐。在位期间与民休息，发展生产，是十国中少有的明君。',
                    achievements: '建立南唐，与民休息',
                    anecdotes: '李昪自称是唐宪宗之子李恪的后代，故改姓李，以彰显正统。'
                },
                { 
                    name: '李璟', 
                    title: '元宗', 
                    reign: '943-961',
                    birthYear: 916,
                    deathYear: 961,
                    personality: '好大喜功、不善治国',
                    biography: '李璟（916-961），李昪长子。943年继位，好大喜功，多次对外用兵，灭闽、楚，但国力大损。后期被迫向后周称臣，割让江北十四州。',
                    achievements: '灭闽、楚，扩展疆土',
                    anecdotes: '李璟好文学，与冯延巳等词人唱和，有"小楼吹彻玉笙寒"之名句。'
                },
                { 
                    name: '李煜', 
                    title: '后主', 
                    reign: '961-975',
                    birthYear: 937,
                    deathYear: 978,
                    personality: '才华横溢、不善政事',
                    biography: '李煜（937-978），李璟第六子。961年继位，是五代十国时期最著名的词人。975年宋军攻破金陵，李煜投降，南唐灭亡。978年被宋太宗毒杀。',
                    achievements: '千古词帝，留下大量传世词作',
                    anecdotes: '李煜被俘至开封后，写下"问君能有几多愁，恰似一江春水向东流"等千古名句，终因"故国不堪回首月明中"之词被宋太宗毒杀。'
                }
            ]
        },
        northernHan: {
            id: 'northernHan',
            name: '北汉',
            type: 'kingdom',
            color: '#2E8B57',
            startYear: 951,
            endYear: 979,
            capital: '太原',
            rulers: [
                { name: '刘崇', title: '世祖', reign: '951-954' },
                { name: '刘承钧', title: '睿宗', reign: '954-968' },
                { name: '刘继恩', title: '少主', reign: '968' },
                { name: '刘继元', title: '英武帝', reign: '968-979' }
            ]
        }
    },
    
    // 其他政权
    otherStates: {
        dingnan: {
            id: 'dingnan',
            name: '定难军',
            type: 'other',
            color: '#4682B4',
            startYear: 907,
            endYear: 960,
            capital: '夏州',
            rulers: [
                { name: '李思谏', reign: '907-908' },
                { name: '李思孝', reign: '908-910' },
                { name: '李仁福', reign: '910-933' },
                { name: '李彝超', reign: '933-935' },
                { name: '李彝殷', reign: '935-967' }
            ]
        },
        liao: {
            id: 'liao',
            name: '契丹/辽',
            type: 'other',
            color: '#6A5ACD',
            startYear: 907,
            endYear: 960,
            capital: '上京',
            rulers: [
                { 
                    name: '耶律阿保机', 
                    title: '太祖', 
                    reign: '907-926',
                    birthYear: 872,
                    deathYear: 926,
                    personality: '雄才大略、善于用人',
                    biography: '耶律阿保机（872-926），契丹迭剌部人。907年统一契丹各部，916年称帝，国号契丹。在位期间创制契丹文字，发展生产，是辽朝开国皇帝。',
                    achievements: '统一契丹，建立辽朝，创制契丹文字',
                    anecdotes: '耶律阿保机曾说："吾之得天下，非人力也，天授也。"'
                },
                { 
                    name: '耶律德光', 
                    title: '太宗', 
                    reign: '926-947',
                    birthYear: 902,
                    deathYear: 947,
                    personality: '雄才大略、好大喜功',
                    biography: '耶律德光（902-947），耶律阿保机次子。926年继位，938年改国号为辽。946年灭后晋，947年在开封称帝，后因中原人民反抗北返，途中病逝于栾城。',
                    achievements: '灭后晋，占据中原，改国号为辽',
                    anecdotes: '耶律德光死后，为防止尸体腐烂，被制成"帝羓"（木乃伊），运回上京。'
                },
                { 
                    name: '耶律阮', 
                    title: '世宗', 
                    reign: '947-951',
                    birthYear: 918,
                    deathYear: 951,
                    personality: '年轻有为、遇刺身亡',
                    biography: '耶律阮（918-951），耶律阿保机长孙。947年在镇州被将领拥立为帝。在位期间推行汉化政策，951年在归途中被耶律察割刺杀身亡。',
                    achievements: '推行汉化政策',
                    anecdotes: '耶律阮喜爱中原文化，常穿汉服，被契丹贵族视为"忘本"。'
                },
                { 
                    name: '耶律璟', 
                    title: '穆宗', 
                    reign: '951-969',
                    birthYear: 931,
                    deathYear: 969,
                    personality: '昏庸残暴、嗜酒如命',
                    biography: '耶律璟（931-969），耶律阿保机孙子。951年继位，嗜酒如命，不理政事，被称为"睡王"。969年被近侍刺杀身亡。',
                    achievements: '无显著政绩',
                    anecdotes: '耶律璟嗜酒，常彻夜饮酒，白天睡觉，被称为"睡王"。'
                }
            ]
        }
    },
    
    // 重要历史事件
    events: {
        907: { type: 'establish', kingdom: 'laterLiang', desc: '朱温建立后梁，五代开始' },
        907: { type: 'establish', kingdom: 'liao', desc: '耶律阿保机统一契丹各部，建立契丹国' },
        908: { type: 'establish', kingdom: 'wu', desc: '杨渥正式继承吴王' },
        909: { type: 'establish', kingdom: 'min', desc: '王审知被封闽王' },
        916: { type: 'event', kingdom: 'liao', desc: '耶律阿保机称帝，国号契丹' },
        917: { type: 'establish', kingdom: 'southernHan', desc: '刘龑称帝建立南汉' },
        923: { type: 'establish', kingdom: 'laterTang', desc: '李存勖灭后梁，建立后唐' },
        924: { type: 'establish', kingdom: 'jingnan', desc: '高季兴被封南平王' },
        925: { type: 'fall', kingdom: 'formerShu', desc: '后唐灭前蜀' },
        934: { type: 'establish', kingdom: 'laterShu', desc: '孟知祥建立后蜀' },
        936: { type: 'establish', kingdom: 'laterJin', desc: '石敬瑭建立后晋，割让燕云十六州给契丹' },
        937: { type: 'establish', kingdom: 'southernTang', desc: '李昪建立南唐，取代吴' },
        938: { type: 'event', kingdom: 'liao', desc: '契丹改国号为辽' },
        945: { type: 'fall', kingdom: 'min', desc: '南唐灭闽' },
        946: { type: 'event', kingdom: 'liao', desc: '辽太宗耶律德光灭后晋' },
        947: { type: 'establish', kingdom: 'laterHan', desc: '刘知远建立后汉' },
        947: { type: 'event', kingdom: 'liao', desc: '辽太宗耶律德光在开封称帝，改国号为辽' },
        951: { type: 'establish', kingdom: 'laterZhou', desc: '郭威建立后周' },
        951: { type: 'establish', kingdom: 'northernHan', desc: '刘崇建立北汉' },
        951: { type: 'fall', kingdom: 'chu', desc: '南唐灭楚' },
        955: { type: 'event', desc: '后周世宗柴荣即位' },
        958: { type: 'event', kingdom: 'liao', desc: '辽穆宗耶律璟在位，辽朝相对平稳' },
        960: { type: 'event', desc: '赵匡胤陈桥兵变，北宋建立，五代结束' }
    },
    
    // 年份详细信息
    yearDetails: {
        934: {
            eraName: '应顺二年',
            dynasty: 'laterTang',
            currentRuler: { name: '李从厚', title: '闵帝' },
            capital: '洛阳',
            eventTitle: '后蜀建立',
            eventRuler: '孟知祥 (后蜀高祖)',
            eventDesc: '孟知祥趁后唐内乱，在成都自立为帝，建立后蜀。后蜀继承前蜀版图，成为五代十国时期四川地区的主要政权。孟知祥同年病逝，其子孟昶继位。',
            historyTag: '后蜀繁华',
            historyRuler: '孟知祥',
            historyDesc: '孟知祥建后蜀，传子孟昶。孟昶在位三十年，蜀中富庶，"斗米三钱"，有"天府之国"美誉。'
        },
        923: {
            eraName: '同光元年',
            dynasty: 'laterTang',
            currentRuler: { name: '李存勖', title: '庄宗' },
            capital: '洛阳',
            eventTitle: '后唐建立',
            eventRuler: '李存勖 (后唐庄宗)',
            eventDesc: '李存勖在魏州称帝，建立后唐，同年灭后梁。后唐疆域广阔，是五代中版图最大的政权。',
            historyTag: '庄宗之治',
            historyRuler: '李存勖',
            historyDesc: '李存勖灭梁建唐，初期励精图治，后期宠信伶人，最终死于兵变。'
        },
        936: {
            eraName: '天福元年',
            dynasty: 'laterJin',
            currentRuler: { name: '石敬瑭', title: '高祖' },
            capital: '开封',
            eventTitle: '后晋建立',
            eventRuler: '石敬瑭 (后晋高祖)',
            eventDesc: '石敬瑭以割让燕云十六州为代价，借契丹兵灭后唐，建立后晋。',
            historyTag: '儿皇帝',
            historyRuler: '石敬瑭',
            historyDesc: '石敬瑭称契丹主耶律德光为"父皇帝"，自称"儿皇帝"，割让燕云十六州，为后世留下隐患。'
        },
        947: {
            eraName: '乾祐元年',
            dynasty: 'laterHan',
            currentRuler: { name: '刘知远', title: '高祖' },
            capital: '开封',
            eventTitle: '后汉建立',
            eventRuler: '刘知远 (后汉高祖)',
            eventDesc: '契丹灭后晋后北撤，刘知远在太原称帝，建立后汉，后迁都开封。',
            historyTag: '最短命的五代',
            historyRuler: '刘知远',
            historyDesc: '后汉仅存四年，是五代中存在时间最短的政权。'
        },
        951: {
            eraName: '广顺元年',
            dynasty: 'laterZhou',
            currentRuler: { name: '郭威', title: '太祖' },
            capital: '开封',
            eventTitle: '后周建立',
            eventRuler: '郭威 (后周太祖)',
            eventDesc: '郭威灭后汉，建立后周。后周是五代中最有作为的政权，为北宋统一奠定基础。',
            historyTag: '周世宗改革',
            historyRuler: '郭威',
            historyDesc: '郭威、柴荣父子推行改革，整顿吏治，发展经济，使后周成为五代中最强盛的政权。'
        },
        937: {
            eraName: '昇元元年',
            dynasty: 'southernTang',
            currentRuler: { name: '李昪', title: '烈祖' },
            capital: '金陵',
            eventTitle: '南唐建立',
            eventRuler: '李昪 (南唐烈祖)',
            eventDesc: '李昪废吴帝杨溥，建立南唐。南唐是十国中最强大的政权，文化繁荣。',
            historyTag: '南唐文化',
            historyRuler: '李昪',
            historyDesc: '南唐文化昌盛，李昪、李璟、李煜三代君主皆善诗词，李煜更是千古词帝。'
        },
        947: {
            eraName: '大同元年',
            dynasty: 'liao',
            currentRuler: { name: '耶律德光', title: '太宗' },
            capital: '开封',
            eventTitle: '辽灭后晋',
            eventRuler: '耶律德光 (辽太宗)',
            eventDesc: '辽太宗耶律德光率军南下，灭后晋，在开封称帝，改国号为辽。这是辽朝势力最盛时期，控制了中原大片地区。',
            historyTag: '辽朝鼎盛',
            historyRuler: '耶律德光',
            historyDesc: '耶律德光灭后晋后，在开封称帝，但因中原人民反抗，被迫北返，途中病逝。辽朝此后退出中原，但仍是北方最强大的政权。'
        }
    },

    // 历史地图数据（本地图片）
    historicalMaps: {
        // 后梁时期地图
        laterLiang: {
            url: './maps/laterLiang.png',
            years: [907, 908, 909, 910, 911, 912, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923],
            fallbackColor: '#8B4513'
        },
        // 后唐时期地图
        laterTang: {
            url: './maps/laterTang.png',
            years: [923, 924, 925, 926, 927, 928, 929, 930, 931, 932, 933, 934, 935, 936],
            fallbackColor: '#8B4513'
        },
        // 后晋时期地图
        laterJin: {
            url: './maps/laterJin.png',
            years: [936, 937, 938, 939, 940, 941, 942, 943, 944, 945, 946, 947],
            fallbackColor: '#8B4513'
        },
        // 后汉时期地图
        laterHan: {
            url: './maps/laterHan.png',
            years: [947, 948, 949, 950, 951],
            fallbackColor: '#8B4513'
        },
        // 后周时期地图
        laterZhou: {
            url: './maps/laterZhou.png',
            years: [951, 952, 953, 954, 955, 956, 957, 958, 959, 960],
            fallbackColor: '#8B4513'
        }
    },
    
    // 获取指定年份对应的历史地图URL
    getMapForYear: function(year) {
        for (const [period, mapData] of Object.entries(this.historicalMaps)) {
            if (mapData.years && mapData.years.includes(year)) {
                return mapData.url;
            }
        }
        // 默认返回最接近的时期的地图
        if (year >= 907 && year <= 923) return this.historicalMaps.laterLiang.url;
        if (year >= 923 && year <= 936) return this.historicalMaps.laterTang.url;
        if (year >= 936 && year <= 947) return this.historicalMaps.laterJin.url;
        if (year >= 947 && year <= 951) return this.historicalMaps.laterHan.url;
        if (year >= 951 && year <= 960) return this.historicalMaps.laterZhou.url;
        return this.historicalMaps.laterLiang.url;
    },
    
    // 获取指定年份对应的地图配置
    getMapConfigForYear: function(year) {
        for (const [period, mapData] of Object.entries(this.historicalMaps)) {
            if (mapData.years && mapData.years.includes(year)) {
                return mapData;
            }
        }
        // 默认返回最接近的时期的地图配置
        if (year >= 907 && year <= 923) return this.historicalMaps.laterLiang;
        if (year >= 923 && year <= 936) return this.historicalMaps.laterTang;
        if (year >= 936 && year <= 947) return this.historicalMaps.laterJin;
        if (year >= 947 && year <= 951) return this.historicalMaps.laterHan;
        if (year >= 951 && year <= 960) return this.historicalMaps.laterZhou;
        return this.historicalMaps.laterLiang;
    },
    
    // CHGIS 数据配置
    chgis: {
        enabled: true, // 设置为 true 启用 CHGIS 数据
        baseUrl: './chgis-data/processed',
        availableYears: [907, 923, 936, 947, 951, 960], // CHGIS 有关键数据的年份
        
        // 获取 CHGIS 数据 URL
        getDataUrl: function(year) {
            // 找到最接近的可用年份
            const closestYear = this.availableYears.reduce((prev, curr) => {
                return Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev;
            });
            return `${this.baseUrl}/${closestYear}.geojson`;
        },
        
        // 检查某年是否有 CHGIS 数据
        hasDataForYear: function(year) {
            // 找到最接近的年份
            return this.availableYears.find(y => Math.abs(y - year) <= 5);
        },
        
        // 获取最接近的年份
        getClosestYear: function(year) {
            return this.availableYears.reduce((prev, curr) => {
                return Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev;
            });
        }
    },
    
    // 地图区域定义（简化版）- 保留用于交互点击
    territories: {
        laterLiang: {
            name: '后梁',
            path: 'M380,250 L450,250 L480,280 L480,320 L450,350 L380,350 L350,320 L350,280 Z'
        },
        laterTang: {
            name: '后唐',
            path: 'M320,200 L420,200 L450,250 L450,320 L400,350 L320,350 L280,300 L280,250 Z'
        },
        laterJin: {
            name: '后晋',
            path: 'M350,250 L450,250 L480,280 L480,320 L450,350 L350,350 L320,320 L320,280 Z'
        },
        laterHan: {
            name: '后汉',
            path: 'M350,250 L450,250 L480,280 L480,320 L450,350 L350,350 L320,320 L320,280 Z'
        },
        laterZhou: {
            name: '后周',
            path: 'M350,250 L450,250 L480,280 L480,320 L450,350 L350,350 L320,320 L320,280 Z'
        },
        wu: {
            name: '吴',
            path: 'M500,320 L580,320 L600,350 L600,400 L550,420 L500,400 L480,360 Z'
        },
        wuyue: {
            name: '吴越',
            path: 'M580,300 L650,300 L670,330 L670,380 L620,400 L580,380 L560,340 Z'
        },
        min: {
            name: '闽',
            path: 'M560,400 L620,400 L640,430 L640,480 L600,500 L560,480 L540,440 Z'
        },
        chu: {
            name: '楚',
            path: 'M450,380 L520,380 L540,410 L540,460 L500,480 L450,460 L430,420 Z'
        },
        southernHan: {
            name: '南汉',
            path: 'M480,450 L560,450 L580,480 L580,550 L520,580 L480,560 L460,500 Z'
        },
        formerShu: {
            name: '前蜀',
            path: 'M250,300 L320,300 L340,330 L340,380 L300,400 L250,380 L230,340 Z'
        },
        laterShu: {
            name: '后蜀',
            path: 'M250,300 L320,300 L340,330 L340,380 L300,400 L250,380 L230,340 Z'
        },
        jingnan: {
            name: '荆南',
            path: 'M420,320 L480,320 L490,340 L490,370 L460,380 L420,370 L410,340 Z'
        },
        liao: {
            name: '契丹/辽',
            path: 'M400,50 L550,50 L600,100 L620,180 L580,220 L500,200 L450,180 L400,150 L380,100 Z'
        },
        northernHan: {
            name: '北汉',
            path: 'M360,180 L420,180 L440,210 L440,250 L400,270 L360,250 L340,220 Z'
        }
    },
    
    // 城市位置
    cities: {
        kaifeng: { name: '开封', x: 420, y: 280, type: 'capital' },
        luoyang: { name: '洛阳', x: 380, y: 290, type: 'capital' },
        jinling: { name: '金陵', x: 540, y: 360, type: 'capital' },
        hangzhou: { name: '杭州', x: 600, y: 350, type: 'capital' },
        fuzhou: { name: '福州', x: 580, y: 440, type: 'capital' },
        tanzhou: { name: '潭州', x: 470, y: 400, type: 'capital' },
        xingwang: { name: '兴王府', x: 500, y: 500, type: 'capital' },
        chengdu: { name: '成都', x: 270, y: 350, type: 'capital' },
        jiangling: { name: '江陵', x: 440, y: 340, type: 'capital' },
        taiyuan: { name: '太原', x: 400, y: 220, type: 'capital' },
        xiazhou: { name: '夏州', x: 340, y: 270, type: 'capital' },
        shangjing: { name: '上京', x: 520, y: 120, type: 'capital' }
    }
};

// 获取指定年份存在的所有政权
function getExistingKingdoms(year) {
    const kingdoms = [];
    
    // 检查五代
    for (const [key, dynasty] of Object.entries(historyData.fiveDynasties)) {
        if (year >= dynasty.startYear && year <= dynasty.endYear) {
            kingdoms.push({ ...dynasty, isMain: true });
        }
    }
    
    // 检查十国
    for (const [key, kingdom] of Object.entries(historyData.tenKingdoms)) {
        if (year >= kingdom.startYear && year <= kingdom.endYear) {
            kingdoms.push({ ...kingdom, isMain: false });
        }
    }
    
    // 检查其他政权
    for (const [key, state] of Object.entries(historyData.otherStates)) {
        if (year >= state.startYear && year <= state.endYear) {
            kingdoms.push({ ...state, isMain: false });
        }
    }
    
    return kingdoms;
}

// 获取指定年份的当前中央政权
function getCurrentDynasty(year) {
    for (const [key, dynasty] of Object.entries(historyData.fiveDynasties)) {
        if (year >= dynasty.startYear && year <= dynasty.endYear) {
            return dynasty;
        }
    }
    return null;
}

// 获取指定年份的统治者
function getCurrentRuler(year, kingdom) {
    if (!kingdom || !kingdom.rulers) return null;
    
    for (const ruler of kingdom.rulers) {
        const [start, end] = ruler.reign.split('-').map(Number);
        if (year >= start && year <= end) {
            return ruler;
        }
    }
    return null;
}

// 获取年份详细信息
function getYearDetails(year) {
    return historyData.yearDetails[year] || null;
}

// 获取年份事件
function getYearEvents(year) {
    return historyData.events[year] || null;
}

// 获取时期名称
function getPeriodName(year) {
    const dynasty = getCurrentDynasty(year);
    if (dynasty) {
        return dynasty.name + '时期';
    }
    return '五代十国';
}

// 将数据和函数挂载到 window 对象（浏览器环境）
if (typeof window !== 'undefined') {
    window.historyData = historyData;
    window.getExistingKingdoms = getExistingKingdoms;
    window.getCurrentDynasty = getCurrentDynasty;
    window.getCurrentRuler = getCurrentRuler;
    window.getYearDetails = getYearDetails;
    window.getYearEvents = getYearEvents;
    window.getPeriodName = getPeriodName;
}

// 导出数据（如果在模块环境中）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        historyData,
        getExistingKingdoms,
        getCurrentDynasty,
        getCurrentRuler,
        getYearDetails,
        getYearEvents,
        getPeriodName
    };
}
