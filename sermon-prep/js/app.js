/**
 * 我就是復活和生命｜講章研究工作區
 * 支援：頁面路由切換、LocalStorage 讀寫、即時文字編輯、視覺化新增/編輯神學氣泡、搜尋與 JSON 完整匯出入
 */

const STORAGE_KEY = 'clc_john11_notes_v4';
const THEO_STORAGE_KEY = 'clc_john11_theo_v4';
const THEME_KEY = 'clc_john11_theme_v2';

const PAGE_LABELS = {
  overview: '系列總覽',
  s1: '01 愛與死亡',
  s2: '02 盼望與眼淚',
  s3: '03 信心與榮耀',
  notes: '神學備忘'
};

// ==========================================================================
// 預設福音派／保守學者釋經神學資料庫
// ==========================================================================
const defaultTheoNotes = {
  john20_31: {
    title: '約 20:31｜約翰福音的寫作目的與「信」的時態爭議',
    html: `
      <div class="theo-consensus">
        <strong>福音派學者共同核心立場（D. A. Carson, Leon Morris）：</strong>
        約翰全書的神蹟（<em>sēmeia</em>，記號）並非單純展示超自然能力，而是指向耶穌彌賽亞與神兒子的身分；人唯獨透過對基督位格與救贖工作的信靠，才能得著屬靈的新生命（永生）。
      </div>
      <div class="theo-views">
        <strong>希臘文時態的兩種重要解釋（文本鑑別與語法）：</strong>
        <ul>
          <li><strong>現在虛擬語氣（<em>pisteuēte</em>，「繼續相信」）：</strong>D. A. Carson 等學者指出，若採此抄本讀法，本書主要對象是教會信徒，目的是在逼迫與異端中堅固他們的信心。</li>
          <li><strong>不定過去虛擬語氣（<em>pisteusēte</em>，「開始相信」）：</strong>許多福音派護教與佈道學者強調此讀法，認為本書兼具福音佈道目的，引領未信者（包括散居猶太人與外邦慕道友）歸信基督。</li>
        </ul>
        <p><small>※ Carson 總結：兩者在神學上並不衝突，約翰的福音敘事同時能領人歸信，也能造就信徒扎根。</small></p>
      </div>
    `
  },
  resurrection_cases: {
    title: '聖經中死人復生與復活的主要記載｜經文註腳',
    html: `
      <div class="theo-consensus">
        <strong>主要經文（按事件分為10組）：</strong>
        <p><strong>① 舊約（3例）：</strong>撒勒法寡婦之子（王上17:17–24）、書念婦人之子（王下4:18–37）、觸及以利沙骸骨的死人（王下13:20–21）。</p>
        <p><strong>② 福音書（3例）：</strong>睚魯的女兒（可5:21–43）、拿因城寡婦的兒子（路7:11–17）、拉撒路（約11:1–44）。</p>
        <p><strong>③ 耶穌受難與復活（2組）：</strong>耶穌第三日復活（太28:1–10；約20:1–18）；許多已睡聖徒的身體復活，並於耶穌復活後進城顯現（太27:50–53）。</p>
        <p><strong>④ 使徒行傳（2例）：</strong>大比大／多加（徒9:36–42）、猶推古（徒20:7–12）。</p>
      </div>
      <p><strong>神學註記：</strong>以上是10組主要記載，並非只有10個人復活。一般死人復生是恢復今生的生命；耶穌的復活則是進入永不再死的榮耀生命（羅6:9；林前15:20）。馬太福音27章沒有交代復活聖徒後來的情況，不宜直接歸為一般復生。</p>
    `
  },
  seventh_sign: {
    title: '第七個神蹟與「我是」(Egō Eimi) 神性宣告',
    html: `
      <div class="theo-consensus">
        <strong>福音派共同認同（Andreas Köstenberger, D. A. Carson）：</strong>
        <ul>
          <li><strong>神蹟的高峰（第七個記號）：</strong>拉撒路復活是約翰福音上半部「神蹟之書」（1–12章）的最高峰，直接觸發公會殺害耶穌的決議（11:47–53），成為邁向十字架的歷史轉折點。</li>
          <li><strong>「我是」（<em>Egō Eimi</em>）的神性宣告：</strong>直接呼應出埃及記 3:14 耶和華的聖名「自有永有者」。耶穌不僅賜下生命，祂自己就是生命與復活的源頭。</li>
        </ul>
      </div>
    `
  },
  incarnation_grace_truth: {
    title: '約 1:14｜道成肉身與「恩典和真理」',
    html: `
      <div class="theo-consensus">
        <strong>保守派釋經共識（D. A. Carson, John Stott）：</strong>
        「充充滿滿的有恩典有真理」呼應舊約出埃及記 34:6 耶和華向摩西宣告的立約屬性——「有豐盛的慈愛（<em>ḥesed</em>）和誠實（<em>ʾĕmet</em>）」。
      </div>
      <p><strong>神學意義：</strong>在舊約，神的榮光與恩典透過會幕與律法彰顯；如今道成肉身的耶穌親自「支搭帳幕」在人中間，恩典與真理在祂裡面達到最終極的成全，既不妥協聖潔的真理，也滿溢救贖的恩慈。</p>
    `
  },
  s1_p1_delay: {
    title: '約 11:1–6｜神的主權、受苦與「愛的延遲」',
    html: `
      <div class="theo-consensus">
        <strong>福音派釋經核心（D. A. Carson, John Stott）：</strong>
        第 5–6 節的連接詞「所以／因此」（<em>oun</em>）極具神學張力：「耶穌素來愛馬大和他妹子並拉撒路。<strong>所以</strong>聽見拉撒路病了，就在所居之地仍住了兩天。」耶穌的延遲<strong>不是因為冷漠，恰恰是出於神聖的愛</strong>——祂要賜給他們比「單純病得醫治」更深、更榮耀的啟示。
      </div>
      <div class="theo-views">
        <strong>關於「這病不至於死，乃是為神的榮耀」（11:4）的兩層釋經重點：</strong>
        <ul>
          <li><strong>終極結果而非過程：</strong>拉撒路確實經歷了肉身死亡，但死亡不是這件事的「終局」；神在苦難中擁有至高主權，能使苦難成為彰顯神榮耀的舞台。</li>
          <li><strong>雙重榮耀的弔詭（約翰神學特有主題）：</strong>「叫神的兒子因此得榮耀」不僅指行神蹟的能力，更預表耶穌因這神蹟被宗教領袖定罪，最終在<strong>十字架上得榮耀</strong>（12:23；13:31）。</li>
        </ul>
      </div>
    `
  },
  s1_p2_light: {
    title: '約 11:7–10｜白日十二小時與在神旨意中行走',
    html: `
      <div class="theo-consensus">
        <strong>保守派共同解釋（Leon Morris, D. A. Carson）：</strong>
        猶太人將白晝分為十二小時。耶穌以此比喻表明：父神為祂所定的事工時間表（時刻 <em>hōra</em>）尚未結束，只要祂行在父神的旨意中（白日），仇敵就無法提前奪去祂的性命。
      </div>
      <p><strong>門徒身分的神學應用（John Stott）：</strong>門徒若跟隨基督（世界的光）行在神的旨意裡，同樣享有神主權的保守，直到完成神託付的使命；相反地，離開基督的亮光憑己意行事，便會陷入屬靈的黑暗與跌倒。</p>
    `
  },
  s1_p3_sleep_thomas: {
    title: '約 11:11–16｜「睡了」的聖經神學與多馬的忠心',
    html: `
      <div class="theo-consensus">
        <strong>「睡了」與靈魂狀態的福音派共識：</strong>
        聖經常將信徒的死亡比喻為「睡了」（如帖前 4:13–15；林前 15:51），強調死亡在神大能面前只是暫時的，將來必有身體復活的甦醒。
      </div>
      <div class="theo-views">
        <strong>神學界線提醒（反對「靈魂睡眠說 Soul Sleep」）：</strong>
        保守派福音派神學（如 Wayne Grudem, John Stott）一致指出，「睡了」是從地上活人視角對<strong>肉身死亡</strong>的委婉說法，並不代表信徒死後靈魂失去意識；新約明言信徒離世是「與基督同在」（腓 1:23；林後 5:8）。
      </div>
      <p><strong>多馬的宣告（11:16）：</strong>「我們也去和他同死吧」展現了多馬雖未完全明白復活大能，卻具備極真實的勇氣與對主至死忠心的委身（D. A. Carson 稱之為「悲觀卻忠誠的勇氣」）。</p>
    `
  },
  s2_p1_iam: {
    title: '約 11:17–27｜「復活在我，生命也在我」與馬大的認信',
    html: `
      <div class="theo-consensus">
        <strong>福音派核心神學（D. A. Carson, John Stott）：</strong>
        <ul>
          <li><strong>從「末日事件」轉向「基督位格」：</strong>馬大相信正統猶太教法利賽派的「末日復活」教義（11:24），但耶穌將復活從遙遠的未來事件，拉回到此時此刻站在她面前的基督自己身上。沒有基督，就沒有復活與永生。</li>
          <li><strong>已然與未然（Already / Not Yet）的張力：</strong>「信我的人雖然死了，也必復活」（末日身體復活）；「凡活著信我的人必永遠不死」（信徒此刻已擁有不被肉身死亡切斷的屬靈永生）。</li>
        </ul>
      </div>
      <div class="theo-views">
        <strong>猶太傳統「四天」背景（補充背景）：</strong>
        拉比傳統認為靈魂在人死後會在墳墓旁徘徊三天，第四天身體開始腐爛便徹底絕望。約翰刻意強調「四天」（11:17、39），突顯拉撒路已完全進入死亡權勢之下，唯獨創造主的大能能逆轉。
      </div>
    `
  },
  s2_p2_wept: {
    title: '約 11:28–37｜「耶穌哭了」與「心裡悲嘆」的深層神學',
    html: `
      <div class="theo-consensus">
        <strong>福音派共同持守的基督論真理：</strong>
        短短兩個字（希臘文 <em>edakrysen</em>，流淚）是聖經中耶穌<strong>完全真實人性</strong>的最有力見證。道成肉身的主並非冷漠無情的神明，祂真實體恤人的軟弱與喪親之痛（來 4:15）。
      </div>
      <div class="theo-views">
        <strong>「心裡悲嘆，又甚憂愁」（<em>embrimaomai</em>，11:33, 38）的重要學術討論：</strong>
        <ul>
          <li><strong>立場一｜對罪惡與死亡權勢的義怒（B. B. Warfield, D. A. Carson, Leon Morris 極力主張）：</strong>希臘文 <em>embrimaomai</em> 在古典與新約希臘文中原意帶有「噴鼻息、憤怒、嚴厲責備」的強烈情緒。耶穌看見罪與死亡對神所愛之人的摧殘，內心湧起聖潔的義怒，視死亡為必須親手摧毀的仇敵（林前 15:26）。</li>
          <li><strong>立場二｜深沉的悲慟與同理之愛（John Stott 及傳統牧養釋經）：</strong>在哀傷群眾的環繞下，耶穌因深深愛這一家人（11:36 旁人見證「你看他愛這人是何等懇切」）而內心劇烈翻騰、與哀哭的人同哭（羅 12:15）。</li>
          <li><strong>立場三｜因眾人不信的嘆息（部分早期教父與解經家）：</strong>針對部分猶太人質疑祂「豈不能叫這人不死嗎」（11:37）的屬靈盲目而嘆息。</li>
        </ul>
        <p><small>※ Carson 總結：義怒與慈愛並不排斥——正是因為耶穌深深愛人，祂才對吞噬生命的死亡權勢感到無比憤怒。</small></p>
      </div>
    `
  },
  s3_p1_stone: {
    title: '約 11:38–39｜死亡的腐朽現實與人的有限',
    html: `
      <div class="theo-consensus">
        <strong>保守派釋經觀察（Leon Morris, Andreas Köstenberger）：</strong>
        馬大在 27 節剛發出偉大的信心認信，到了墳墓前卻本能地提醒「主啊，他現在必是臭了」（11:39）。這真實呈現了信徒在殘酷現實面前的軟弱與掙扎——信仰從不否認死亡的真實與可怕。
      </div>
      <p><strong>神學細節：</strong>耶穌吩咐人「把石頭挪開」（39節）與「解開，叫他走」（44節），顯示神在行超自然神蹟時，仍樂意讓軟弱的人參與在見證與服事的過程中。</p>
    `
  },
  s3_p2_glory: {
    title: '約 11:40–42｜「你若信，就必看見神的榮耀」與耶穌的禱告',
    html: `
      <div class="theo-consensus">
        <strong>福音派共同警告（防範成功神學誤用，D. A. Carson）：</strong>
        耶穌說「你若信，就必看見神的榮耀」，這裡的「神的榮耀」是指<strong>認識基督就是復活與生命、看見父差子來的救贖啟示</strong>，絕非一張「只要信心夠大，任何病患或亡者今生都必定奇蹟痊癒」的空白支票。
      </div>
      <p><strong>子與父的合一關係（11:41–42）：</strong>耶穌在公開禱告中先感謝父「已經聽我」，表明聖子與聖父在旨意上完全合一；祂公開出聲禱告不是為了說服神，而是為了讓周圍眾人確信祂的權柄完全出於天父。</p>
    `
  },
  s3_p3_command: {
    title: '約 11:43–44｜創造主的大能命令與「復生」vs「復活」',
    html: `
      <div class="theo-consensus">
        <strong>關鍵系統神學區分（John Stott, Wayne Grudem, D. A. Carson）：</strong>
        <ul>
          <li><strong>拉撒路的「復生」（Resuscitation）：</strong>拉撒路是帶著原來的血肉之軀走出來，他還需要人解開裹屍布，並且<strong>將來仍會再次經歷肉身死亡</strong>。</li>
          <li><strong>基督的「復活」（Resurrection）：</strong>耶穌自己從死裡復活時，裹屍布整齊留在原地（約 20:6–7），祂領受的是榮耀、不朽壞、永不再死的屬靈身體（林前 15:42–44），成為一切信徒將來復活的「初熟果子」（林前 15:20）。</li>
        </ul>
      </div>
      <p><strong>神話語的創造權柄（11:43）：</strong>奧古斯丁與保守派釋經家常指出，耶穌必須指名喊「拉撒路出來」，因為祂的聲音帶著創世記「神說有就有」的權柄，若不指名，墳墓裡所有的死人都會起來。</p>
    `
  }
};

// ==========================================================================
// 預設講章研究資料內容
// ==========================================================================
const defaultContent = {
  overview: `
    <h2>系列總覽</h2>
    <p>主題：<strong>我就是復活和生命</strong>。本系列以約翰福音11章為主軸，三篇信息彼此連結：前篇種下問題，後篇深化並帶向基督的死與復活。</p>
    <div class="scripture">
      <strong>每篇信息共同起點｜<button type="button" class="theo-term" data-theo="john20_31">約 20:31</button>（和合本）</strong>
      但記這些事要叫你們信耶穌是基督，是神的兒子，並且叫你們信了他，就可以因他的名得生命。
    </div>
    <div class="theo-footer-bar">
      <button type="button" class="theo-tag" data-theo="john20_31">✦ 神學重點：約 20:31 寫作目的與「信」的希臘文時態</button>
    </div>

    <h3>三篇信息</h3>
    <div class="subnav">
      <a href="#s1" data-goto="s1">01 愛與死亡</a>
      <a href="#s2" data-goto="s2">02 盼望與眼淚</a>
      <a href="#s3" data-goto="s3">03 信心與榮耀</a>
      <a href="#notes" data-goto="notes">神學備忘</a>
    </div>

    <h4>01｜愛與死亡（約 11:1–16）</h4>
    <p><strong>如果上帝愛我們，為什麼要讓我們有死亡？</strong></p>

    <h4>02｜盼望與眼淚（約 11:17–37）</h4>
    <p><strong>既然有復活的盼望，為什麼還會流淚？</strong></p>

    <h4>03｜信心與榮耀（約 11:38–44）</h4>
    <p><strong>我相信，但為什麼我所愛的人還是死了，神的榮耀在哪裡？</strong></p>

    <h3>系列推進</h3>
    <p>死亡的困惑 → 死亡中的哀傷 → 死亡與信仰的衝突 → 基督的死與復活所帶來的終極盼望。</p>

    <details class="fold">
      <summary>系列整體提醒（收合）</summary>
      <ul>
        <li>三篇信息要彼此連結，不切割成互不相關的主題；前篇種下的問題，後篇深化並回應。</li>
        <li>第一篇約11:4先種下「榮耀」伏筆，第三篇再進一步展開，不在第一篇完全解答。</li>
        <li>每篇從約20:31的信心與生命出發，最後以耶穌基督為中心。</li>
        <li>不把拉撒路的神蹟變成「信心夠大就保證親人今生復活」的公式。</li>
      </ul>
    </details>

    <h3>信息之間的承接</h3>
    <details class="fold">
      <summary>第一篇如何連到第二篇</summary>
      <p>第一篇的延遲、危險與死亡問題，帶進馬大、馬利亞真實面對失去的處境。未解的「主為何延遲／死亡意味著什麼」，深化成「既然有復活盼望，為什麼仍會流淚？」</p>
    </details>
    <details class="fold">
      <summary>前兩篇如何連到第三篇</summary>
      <p>第一篇種下主的愛與延遲；第二篇揭示復活盼望，並呈現耶穌與人同哭。第三篇整合：即使相信耶穌是復活和生命、相信神愛我，所愛的人仍然死亡，神的榮耀在哪裡？故事最終不能只停在拉撒路的神蹟，而要指向耶穌自己的死與復活。</p>
    </details>
  `,

  s1: `
    <h2>01｜愛與死亡</h2>
    <p><span class="chip">約翰福音 11:1–16</span><span class="chip">系列第一篇</span></p>

    <h3>核心問題</h3>
    <p><strong>如果上帝愛我們，為什麼要讓我們有死亡？</strong></p>

    <h3>信息開場（原稿｜保留原文）</h3>
    <p>當我們談信耶穌，信的是什麼？</p>
    <div class="scripture">
      <strong><button type="button" class="theo-term" data-theo="john20_31">約 20:31</button></strong>
      但記這些事要叫你們信耶穌是基督，是神的兒子，並且叫你們信了他，就可以因他的名得生命。
    </div>
    <p>但如果是新朋友，你覺得這節經文他看的懂嗎？所以只跟人講神學，甚至用各種辦法去證明耶穌是神，如果他感受不到，那都是沒有用的，所以我們通常鼓勵人信耶穌都會說：「耶穌愛你，所以你要信祂。」</p>
    <p>可是如果我們不只談愛，談祝福這樣就夠了嗎？因為妳也可以相信你的父母愛你、老師愛你，但他們不能讓你得生命AMEN?</p>
    <p>所以認識耶穌是誰很重要，經歷他的愛也很重要，這是我們在說「信耶穌的時候無法分割的兩件事」。今天我們Believe「相信」系列信息，來到約翰福音第11章，讓我們再次看見耶穌的<button type="button" class="theo-term" data-theo="incarnation_grace_truth">恩典與真理</button>相遇的時刻。[1] 就是約翰福音的<button type="button" class="theo-term" data-theo="seventh_sign">第七個神蹟和第三個真神宣告</button>。</p>
    <div class="scripture">
      <strong>[1] 約 1:14</strong>
      道成了肉身，住在我們中間，充充滿滿的有恩典有真理。我們也見過他的榮光，正是父獨生子的榮光。
    </div>
    <div class="theo-footer-bar">
      <button type="button" class="theo-tag" data-theo="incarnation_grace_truth">✦ 神學重點：約 1:14 恩典與真理</button>
      <button type="button" class="theo-tag" data-theo="seventh_sign">✦ 神學重點：第七個記號與「我是」宣告</button>
    </div>

    <h3>段落大綱</h3>
    <h4>
      <span>一、延遲背後有深愛（約 11:1–6）</span>
      <button type="button" class="theo-tag" data-theo="s1_p1_delay">✦ 本段神學重點</button>
    </h4>
    <p><em>We don’t like delays.</em></p>
    <div class="scripture">
      <strong>約 11:1–6（和合本）</strong>
      <span class="v-num">1</span> 有一個患病的人，名叫拉撒路，住在伯大尼，就是馬利亞和他姊姊馬大的村莊。<span class="v-num">2</span> 這馬利亞就是那用香膏抹主，又用頭髮擦他腳的；患病的拉撒路是他的兄弟。<span class="v-num">3</span> 他姊妹兩個就打發人去見耶穌，說：「主啊，你所愛的人病了。」<span class="v-num">4</span> 耶穌聽見，就說：「<button type="button" class="theo-term" data-theo="s1_p1_delay">這病不至於死，乃是為神的榮耀，叫神的兒子因此得榮耀</button>。」<span class="v-num">5</span> 耶穌素來愛馬大和他妹子並拉撒路。<span class="v-num">6</span> 聽見拉撒路病了，<button type="button" class="theo-term" data-theo="s1_p1_delay">就在所居之地仍住了兩天</button>。
    </div>
    <div class="theo-footer-bar">
      <button type="button" class="theo-tag" data-theo="s1_p1_delay">✦ 神學議題：神的主權與「愛的延遲」、十字架的雙重榮耀</button>
    </div>

    <h4>
      <span>二、危險之中主同行（約 11:7–10）</span>
      <button type="button" class="theo-tag" data-theo="s1_p2_light">✦ 本段神學重點</button>
    </h4>
    <p><em>We don’t like danger.</em></p>
    <div class="scripture">
      <strong>約 11:7–10（和合本）</strong>
      <span class="v-num">7</span> 然後對門徒說：「我們再往猶太去吧。」<span class="v-num">8</span> 門徒說：「拉比，猶太人近來要拿石頭打你，你還往那裡去嗎？」<span class="v-num">9</span> 耶穌回答說：「<button type="button" class="theo-term" data-theo="s1_p2_light">白日不是有十二小時嗎？人在白日走路，就不至跌倒，因為看見這世上的光</button>。<span class="v-num">10</span> 若在黑夜走路，就必跌倒，因為他沒有光。」
    </div>
    <div class="theo-footer-bar">
      <button type="button" class="theo-tag" data-theo="s1_p2_light">✦ 神學議題：父神的時刻表（Hōra）與在神旨意中行走</button>
    </div>

    <h4>
      <span>三、絕望之處要順服（約 11:11–16）</span>
      <button type="button" class="theo-tag" data-theo="s1_p3_sleep_thomas">✦ 本段神學重點</button>
    </h4>
    <p><em>We don’t like death.</em></p>
    <div class="scripture">
      <strong>約 11:11–16（和合本）</strong>
      <span class="v-num">11</span> 耶穌說了這話，隨後對他們說：「我們的朋友拉撒路<button type="button" class="theo-term" data-theo="s1_p3_sleep_thomas">睡了</button>，我去叫醒他。」<span class="v-num">12</span> 門徒說：「主啊，他若睡了，就必好了。」<span class="v-num">13</span> 耶穌這話是指著他死說的，他們卻以為是說照常睡了。<span class="v-num">14</span> 耶穌就明明的告訴他們說：「拉撒路死了。<span class="v-num">15</span> 我沒有在那裡就歡喜，這是為你們的緣故，好叫你們相信。如今我們可以往他那裡去吧。」<span class="v-num">16</span> 多馬，又稱為低土馬，就對那同作門徒的說：「<button type="button" class="theo-term" data-theo="s1_p3_sleep_thomas">我們也去和他同死吧</button>。」
    </div>
    <div class="theo-footer-bar">
      <button type="button" class="theo-tag" data-theo="s1_p3_sleep_thomas">✦ 神學議題：死亡「睡了」的聖經神學（反對靈魂睡眠說）與多馬的委身</button>
    </div>

    <details class="fold">
      <summary>段落提醒／釋經備忘（收合，不屬主文）</summary>
      <h4>11:1–6｜延遲背後有深愛</h4>
      <ul>
        <li>耶穌愛這一家，卻延遲前往；呈現主的愛與人期待立即介入之間的張力。</li>
        <li>11:4「榮耀」先作伏筆，不在本篇完全解答。</li>
        <li>不要推成所有延遲、疾病、失去或死亡都有同一原因，或都會在今生出現可見神蹟。</li>
      </ul>
      <h4>11:7–10｜危險之中主同行</h4>
      <ul>
        <li>猶太地的危險真實存在；耶穌按父的旨意與時機行動，不是魯莽。</li>
        <li>不要泛化成信徒都應主動置身危險。</li>
      </ul>
      <h4>11:11–16｜絕望之處要順服</h4>
      <ul>
        <li>「睡了」被耶穌解明為死亡；門徒在不明白中跟隨，多馬的話表達畏懼與同行的決心。</li>
        <li>避免宣講成「順服就必保證神蹟或死亡逆轉」。</li>
      </ul>
      <p><strong>段落推進：</strong>延遲引發愛的疑問 → 危險與跟隨 → 面對死亡的絕望，留下問題進入第二篇。</p>
    </details>

    <h3>連結下一篇</h3>
    <p>延遲與死亡的困惑，進入家人失去親人的真實哀傷。<br>
    <button data-goto="s2" class="inlinegoto">前往第二篇：盼望與眼淚 →</button></p>
  `,

  s2: `
    <h2>02｜盼望與眼淚</h2>
    <p><span class="chip">約翰福音 11:17–37</span><span class="chip">系列第二篇</span></p>

    <h3>核心問題</h3>
    <p><strong>既然有復活的盼望，為什麼還會流淚？</strong></p>

    <h3>段落大綱（目前已討論）</h3>
    <h4>
      <span>一、死亡的真實與復活的盼望（約 11:17–27）</span>
      <button type="button" class="theo-tag" data-theo="s2_p1_iam">✦ 本段神學重點</button>
    </h4>
    <p>馬大承認末日復活的盼望；耶穌將盼望的中心從一個未來事件帶到祂自己，宣告：<strong>「<button type="button" class="theo-term" data-theo="s2_p1_iam">復活在我，生命也在我</button>。」</strong></p>
    <div class="scripture">
      <strong>約 11:17–27（和合本）</strong>
      <span class="v-num">17</span> 耶穌到了，就知道拉撒路在墳墓裡<button type="button" class="theo-term" data-theo="s2_p1_iam">已經四天了</button>。<span class="v-num">18</span> 伯大尼離耶路撒冷不遠，約有六里路。<span class="v-num">19</span> 有好些猶太人來看馬大和馬利亞，要為他們的兄弟安慰他們。<span class="v-num">20</span> 馬大聽見耶穌來了，就出去迎接他；馬利亞卻仍然坐在家裡。<span class="v-num">21</span> 馬大對耶穌說：「主啊，你若早在這裡，我兄弟必不死。<span class="v-num">22</span> 就是現在，我也知道，你無論向神求什麼，神也必賜給你。」<span class="v-num">23</span> 耶穌說：「你兄弟必然復活。」<span class="v-num">24</span> 馬大說：「我知道在末日復活的時候，他必復活。」<span class="v-num">25</span> 耶穌對他說：「<button type="button" class="theo-term" data-theo="s2_p1_iam">復活在我，生命也在我。信我的人雖然死了，也必復活；26 凡活著信我的人必永遠不死</button>。你信這話嗎？」<span class="v-num">27</span> 馬大說：「主啊，是的，我信你是基督，是神的兒子，就是那要臨到世界的。」
    </div>
    <div class="theo-footer-bar">
      <button type="button" class="theo-tag" data-theo="s2_p1_iam">✦ 神學議題：「復活在我，生命也在我」與終末論的「已然／未然」</button>
    </div>

    <h4>
      <span>二、復活盼望中的哀傷與眼淚（約 11:28–37）</span>
      <button type="button" class="theo-tag" data-theo="s2_p2_wept">✦ 本段神學重點</button>
    </h4>
    <p>馬利亞與在場的人哀哭；耶穌深受觸動，也哭了。復活盼望沒有抹去當下真實的悲傷。</p>
    <div class="scripture">
      <strong>約 11:28–37（和合本）</strong>
      <span class="v-num">28</span> 馬大說了這話，就回去暗暗的叫他妹子馬利亞，說：「夫子來了，叫你。」<span class="v-num">29</span> 馬利亞聽見了，就急忙起來，到耶穌那裡去。<span class="v-num">30</span> 那時，耶穌還沒有進村子，仍在馬大迎接他的地方。<span class="v-num">31</span> 那些同馬利亞在家裡安慰他的猶太人，見他急忙起來出去，就跟著他，以為他要往墳墓那裡去哭。<span class="v-num">32</span> 馬利亞到了耶穌那裡，看見他，就俯伏在他腳前，說：「主啊，你若早在這裡，我兄弟必不死。」<span class="v-num">33</span> 耶穌看見他哭，並看見與他同來的猶太人也哭，就<button type="button" class="theo-term" data-theo="s2_p2_wept">心裡悲嘆，又甚憂愁</button>，<span class="v-num">34</span> 便說：「你們把他安放在哪裡？」他們回答說：「請主來看。」<span class="v-num">35</span> <button type="button" class="theo-term" data-theo="s2_p2_wept">耶穌哭了</button>。<span class="v-num">36</span> 猶太人就說：「你看他愛這人是何等懇切。」<span class="v-num">37</span> 其中有人說：「他既然開了瞎子的眼睛，豈不能叫這人不死嗎？」
    </div>
    <div class="theo-footer-bar">
      <button type="button" class="theo-tag" data-theo="s2_p2_wept">✦ 神學議題：「耶穌哭了」的基督人性與「心裡悲嘆」（義怒 vs 同理）三種學術立場</button>
    </div>

    <details class="fold">
      <summary>段落提醒／神學備忘（收合）</summary>
      <ul>
        <li>耶穌的眼淚呈現祂的人性、同理與愛；也可能包含對死亡及其破壞的憤慨（11:33、38相關用詞）。</li>
        <li>不要用復活教義要求哀傷者停止哭泣，也不要暗示悲傷代表信心不足。</li>
        <li>11:35理解方向：愛與同理是經文情境清楚支持；對死亡權勢的憤慨是有力但需謹慎表述的解讀。經文沒有明確指出唯一原因。</li>
        <li>本篇承接第一篇「主延遲／死亡」的疑問，深化成「既有復活盼望，為何仍有眼淚？」</li>
      </ul>
    </details>

    <h3>連結前後篇</h3>
    <p>第二篇回望第一篇所提出的死亡疑問，也將復活盼望與眼淚放在一起；下一篇把問題帶到信心、所愛之人的死亡與神的榮耀。<br>
    <button data-goto="s1" class="inlinegoto">← 回第一篇</button>
    <button data-goto="s3" class="inlinegoto">前往第三篇 →</button></p>
  `,

  s3: `
    <h2>03｜信心與榮耀</h2>
    <p><span class="chip">約翰福音 11:38–44</span><span class="chip">系列第三篇｜尚待深化</span></p>

    <h3>核心問題（目前討論版本）</h3>
    <p><strong>我相信，但為什麼我所愛的人還是死了，神的榮耀在哪裡？</strong></p>

    <h3>段落觀察（初步整理，不是定稿講章）</h3>
    <h4>
      <span>一、死亡已成事實，人無法挽回（約 11:38–39）</span>
      <button type="button" class="theo-tag" data-theo="s3_p1_stone">✦ 本段神學重點</button>
    </h4>
    <p>拉撒路已死四天，死亡的現實與人的有限不能被輕描淡寫。</p>
    <div class="scripture">
      <strong>約 11:38–39（和合本）</strong>
      <span class="v-num">38</span> 耶穌又心裡悲嘆，來到墳墓前；那墳墓是個洞，有一塊石頭擋著。<span class="v-num">39</span> 耶穌說：「<button type="button" class="theo-term" data-theo="s3_p1_stone">你們把石頭挪開</button>。」那死人的姊姊馬大對他說：「主啊，<button type="button" class="theo-term" data-theo="s3_p1_stone">他現在必是臭了，因為他死了已經四天了</button>。」
    </div>
    <div class="theo-footer-bar">
      <button type="button" class="theo-tag" data-theo="s3_p1_stone">✦ 神學議題：信徒面對死亡現實的軟弱與神人同工的呼召</button>
    </div>

    <h4>
      <span>二、信心與看見神的榮耀（約 11:40–42）</span>
      <button type="button" class="theo-tag" data-theo="s3_p2_glory">✦ 本段神學重點</button>
    </h4>
    <p>耶穌的禱告顯明祂與父的關係，也指出這神蹟的啟示目的。</p>
    <div class="scripture">
      <strong>約 11:40–42（和合本）</strong>
      <span class="v-num">40</span> 耶穌說：「<button type="button" class="theo-term" data-theo="s3_p2_glory">我不是對你說過，你若信，就必看見神的榮耀嗎？</button>」<span class="v-num">41</span> 他們就把石頭挪開。耶穌舉目望天，說：「<button type="button" class="theo-term" data-theo="s3_p2_glory">父啊，我感謝你，因為你已經聽我</button>。<span class="v-num">42</span> 我也知道你常聽我，但我說這話是為周圍站著的眾人，叫他們信是你差了我來。」
    </div>
    <div class="theo-footer-bar">
      <button type="button" class="theo-tag" data-theo="s3_p2_glory">✦ 神學議題：「信心與榮耀」的真義（防範成功神學誤用）與聖子禱告</button>
    </div>

    <h4>
      <span>三、耶穌的命令與死亡權柄（約 11:43–44）</span>
      <button type="button" class="theo-tag" data-theo="s3_p3_command">✦ 本段神學重點</button>
    </h4>
    <p>耶穌呼叫拉撒路出來，顯明祂對死亡的權柄。</p>
    <div class="scripture">
      <strong>約 11:43–44（和合本）</strong>
      <span class="v-num">43</span> 說了這話，就大聲呼叫說：「<button type="button" class="theo-term" data-theo="s3_p3_command">拉撒路出來！</button>」<span class="v-num">44</span> 那死人就出來了，手腳裹著布，臉上包著手巾。耶穌對他們說：「解開，叫他走！」
    </div>
    <div class="theo-footer-bar">
      <button type="button" class="theo-tag" data-theo="s3_p3_command">✦ 神學議題：拉撒路的「復生」與基督「終極復活」的本質區別</button>
    </div>

    <details class="fold">
      <summary>討論提醒（收合；尚非講章結論）</summary>
      <ul>
        <li>核心問題是整個系列前兩篇的延續，不必硬說它是38–44節逐節直接提出的問句。</li>
        <li>拉撒路被恢復肉身生命，仍會再次死亡；耶穌自己的復活才是救贖歷史的核心勝利。</li>
        <li>信徒現在已在基督裡得新生命，但將來身體復活仍是盼望，呈現「已然／未然」。</li>
        <li>不要把神蹟套成信心公式，也不要責怪沒有經歷神蹟的人信心不足。</li>
        <li>釋經仍需處理馬大對墓穴的提醒、耶穌「相信就必看見神的榮耀」的話、祂的禱告、呼叫拉撒路，以及神蹟引向耶穌自己的死與復活。</li>
        <li>第三篇尚未完整定稿；此處只整理已討論方向，不先替講章下結論。</li>
      </ul>
    </details>

    <h3>與前兩篇的整合</h3>
    <p>第一篇種下主的愛與延遲；第二篇揭示復活盼望，並呈現耶穌與人同哭。第三篇整合：即使相信耶穌是復活和生命、相信神愛我，所愛的人仍然死亡，神的榮耀在哪裡？最終需要連到耶穌自己的死與復活，而非只停在拉撒路的神蹟。</p>
    <p><button data-goto="notes" class="inlinegoto">查看神學備忘 →</button></p>
  `,

  notes: `
    <h2>神學討論備忘</h2>
    <p>此頁是研究與講章提醒，預設不放進講章正文；內容尚未討論定案的部分保留為備忘，不自行補成講章結論。</p>

    <h3>
      <span>約 11:35「耶穌哭了」｜五種傳統解釋方向</span>
      <button type="button" class="theo-tag" data-theo="s2_p2_wept">✦ 氣泡摘要</button>
    </h3>
    <div class="scripture">
      <strong>約 11:33–35（和合本）</strong>
      <span class="v-num">33</span> 耶穌看見他哭，並看見與他同來的猶太人也哭，就<button type="button" class="theo-term" data-theo="s2_p2_wept">心裡悲嘆，又甚憂愁</button>，<span class="v-num">34</span> 便說：「你們把他安放在哪裡？」他們回答說：「請主來看。」<span class="v-num">35</span> <button type="button" class="theo-term" data-theo="s2_p2_wept">耶穌哭了</button>。
    </div>
    <details class="fold" open>
      <summary>五種解釋（點擊收合）</summary>
      <ol>
        <li><strong>因愛與友誼而哭：</strong>上下文的愛、馬利亞與群眾哭泣、旁人對耶穌愛拉撒路的反應，支持同理與哀傷的理解。早期教會與改革宗傳統（如加爾文、John Stott）中也可見此解釋。</li>
        <li><strong>對罪與死亡權勢的憤慨：</strong>「心裡悲嘆／激動」（<em>embrimaomai</em>）相關用詞帶有強烈情緒，B. B. Warfield、D. A. Carson、Leon Morris 等學者理解為對死亡破壞的義怒；但不能僅憑字義斷定單一情緒對象。</li>
        <li><strong>因人的不信或硬心：</strong>存在於解釋傳統中，但約翰沒有明說不信是耶穌哭泣的主要原因；11:33直接情境是哀哭的人群。</li>
        <li><strong>拉撒路被召回有限、受苦的生命：</strong>部分古代傳統曾如此理解，但經文沒有明確說明，也不是敘事主要方向。</li>
        <li><strong>預想到自己的十字架：</strong>可從全書脈絡及11:45–53的反應連結救贖歷史，但11:35本身沒有明說這是哭泣原因。</li>
      </ol>
      <p><strong>謹慎總結：</strong>愛與同理有明確上下文支持；對死亡破壞的憤慨是值得考慮的解釋，但不宜說學界一致認定唯一原因。</p>
    </details>

    <h3>
      <span>系列核心的神學界線</span>
      <button type="button" class="theo-tag" data-theo="s3_p3_command">✦ 復生 vs 復活</button>
    </h3>
    <details class="fold" open>
      <summary>已然／未然、拉撒路與耶穌的復活</summary>
      <ul>
        <li>拉撒路的復生是恢復今生生命的神蹟，並非終極、永不死亡的復活。</li>
        <li>耶穌的死與復活才是救贖歷史中心與死亡最終被勝過的根據。</li>
        <li>信徒已在基督裡得生命；身體復活仍在未來盼望中（<button type="button" class="theo-term" data-theo="s2_p1_iam">已然／未然</button>）。</li>
        <li>神蹟不能被轉化為今生必然獲得相同結果的保證（<button type="button" class="theo-term" data-theo="s3_p2_glory">約 11:40 釋經界線</button>）。</li>
      </ul>
    </details>

    <h3>系列連結與待討論</h3>
    <details class="fold">
      <summary>三篇的進程</summary>
      <p>死亡的困惑 → 死亡中的哀傷 → 死亡與信仰的衝突 → 基督的死與復活所帶來的終極盼望。</p>
    </details>
    <details class="fold">
      <summary>尚待進一步討論</summary>
      <ul>
        <li>第三篇完整論述、結尾與應用。</li>
        <li>如何把第三篇的「神的榮耀在哪裡」最終連到基督的十字架與復活。</li>
        <li>三篇彼此承接的過渡句與系列結尾。</li>
        <li>未來擴充：經文觀察、講章稿、引用資料、講道應用與版本紀錄。</li>
      </ul>
    </details>

    <p><button data-goto="overview" class="inlinegoto">回系列總覽</button></p>
  `
};

// ==========================================================================
// 應用程式狀態與 DOM 參考
// ==========================================================================
let activePage = 'overview';
let isEditMode = false;
let store = loadStore();
let theoNotes = loadTheoNotes();

// 氣泡編輯器暫存狀態
let editingTheoState = {
  mode: 'view',       // 'view' | 'edit' | 'create-term' | 'create-tag'
  key: null,
  triggerEl: null,
  savedRange: null
};

const articleEl = document.querySelector('#article');
const editBarEl = document.querySelector('#edit-bar');
const editBtn = document.querySelector('#edit');
const saveBtn = document.querySelector('#save');
const themeBtn = document.querySelector('#theme');
const exportBtn = document.querySelector('#export');
const importBtn = document.querySelector('#import');
const fileInput = document.querySelector('#file');

// 氣泡彈出視窗 DOM
const theoBackdrop = document.querySelector('#theo-backdrop');
const theoBubble = document.querySelector('#theo-bubble');
const theoBadge = document.querySelector('#theo-badge');
const theoClose = document.querySelector('#theo-close');

const theoViewMode = document.querySelector('#theo-view-mode');
const theoTitle = document.querySelector('#theo-title');
const theoBody = document.querySelector('#theo-body');
const theoViewActions = document.querySelector('#theo-view-actions');
const theoSwitchEditBtn = document.querySelector('#theo-switch-edit');

const theoEditForm = document.querySelector('#theo-edit-form');
const theoInputLabel = document.querySelector('#theo-input-label');
const theoInputTitle = document.querySelector('#theo-input-title');
const theoInputConsensus = document.querySelector('#theo-input-consensus');
const theoInputViews = document.querySelector('#theo-input-views');
const theoDeleteBtn = document.querySelector('#theo-delete-btn');
const theoCancelBtn = document.querySelector('#theo-cancel-btn');

// ==========================================================================
// 資料存取與通知提示
// ==========================================================================

// 在原有頁面及已儲存在本機的舊版本中，補上復活經文註腳入口；不覆蓋使用者編輯的內容。
function addResurrectionFootnotes(pages) {
  const footnoteButton = '<button type="button" class="theo-tag" data-theo="resurrection_cases">✦ 註腳：聖經中死人復生與復活的主要記載</button>';
  const placements = {
    s1: '<button type="button" class="theo-tag" data-theo="seventh_sign">✦ 神學重點：第七個記號與「我是」宣告</button>',
    s2: '<button type="button" class="theo-tag" data-theo="s2_p1_iam">✦ 神學議題：「復活在我，生命也在我」與終末論的「已然／未然」</button>',
    notes: '    <h3>系列連結與待討論</h3>'
  };
  for (const [page, anchor] of Object.entries(placements)) {
    const html = pages[page];
    if (typeof html !== 'string' || html.includes('data-theo="resurrection_cases"') || !html.includes(anchor)) continue;
    if (page === 'notes') {
      pages[page] = html.replace(anchor,
        '    <h3>聖經中死人復生與復活的記載</h3>\n' +
        '    <div class="theo-footer-bar">' + footnoteButton + '</div>\n\n' + anchor);
    } else {
      pages[page] = html.replace(anchor, anchor + '\n      ' + footnoteButton);
    }
  }
  return pages;
}

function loadStore() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return addResurrectionFootnotes({ ...defaultContent, ...saved });
  } catch (e) {
    console.warn('讀取頁面儲存失敗，載入預設內容：', e);
    return addResurrectionFootnotes({ ...defaultContent });
  }
}

function loadTheoNotes() {
  try {
    const saved = JSON.parse(localStorage.getItem(THEO_STORAGE_KEY) || '{}');
    return { ...defaultTheoNotes, ...saved };
  } catch (e) {
    console.warn('讀取神學註記失敗，載入預設內容：', e);
    return { ...defaultTheoNotes };
  }
}

function saveStore() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function saveTheoNotes() {
  localStorage.setItem(THEO_STORAGE_KEY, JSON.stringify(theoNotes));
}

function showToast(message) {
  const toastEl = document.querySelector('#toast');
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.style.display = 'block';
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toastEl.style.display = 'none';
  }, 2200);
}

// ==========================================================================
// 畫面渲染與路由切換
// ==========================================================================
function render() {
  try {
    const pageHtml = store[activePage] || defaultContent[activePage] || '<h2>內容尚未建立</h2>';
    articleEl.innerHTML = pageHtml.trim()
      ? pageHtml
      : '<h2>內容尚未建立</h2><p>本頁目前沒有資料。</p>';

    // 編輯模式狀態控制
    articleEl.classList.toggle('editing', isEditMode);
    if (editBarEl) editBarEl.hidden = !isEditMode;

    if (isEditMode) {
      articleEl.contentEditable = 'true';
      articleEl.querySelectorAll('button').forEach(btn => {
        btn.contentEditable = 'false';
      });
    } else {
      articleEl.contentEditable = 'false';
    }

    // 更新導覽按鈕啟用狀態
    document.querySelectorAll('[data-page]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === activePage);
    });

    editBtn.hidden = isEditMode;
    saveBtn.hidden = !isEditMode;

    // 綁定文內頁面跳轉連結
    document.querySelectorAll('[data-goto]').forEach(link => {
      link.onclick = (e) => {
        e.preventDefault();
        if (isEditMode) {
          showToast('請先儲存或取消編輯');
          return;
        }
        navigateTo(link.dataset.goto);
      };
    });
  } catch (err) {
    console.error('Render error:', err);
    articleEl.innerHTML = `
      <h2>內容載入遇到問題</h2>
      <p>請重新整理頁面；如果問題持續，請匯出備份並檢查網站程式檔案。</p>
    `;
  }
}

function navigateTo(pageKey) {
  if (!PAGE_LABELS[pageKey]) return;
  activePage = pageKey;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function saveCurrentPage() {
  store[activePage] = articleEl.innerHTML;
  saveStore();
  saveTheoNotes();
  isEditMode = false;
  render();
  showToast('頁面與神學氣泡均已儲存至本機');
}

// ==========================================================================
// 神學氣泡視窗控制 (閱讀檢視 ＋ 視覺化新增/編輯)
// ==========================================================================
function parseHtmlToFormFields(htmlString) {
  const temp = document.createElement('div');
  temp.innerHTML = htmlString || '';

  let consensusText = '';
  const consensusEl = temp.querySelector('.theo-consensus');
  if (consensusEl) {
    const clone = consensusEl.cloneNode(true);
    const strong = clone.querySelector('strong');
    if (strong) strong.remove();
    consensusText = clone.textContent.trim();
    consensusEl.remove();
  }

  const viewsLines = [];
  const listItems = temp.querySelectorAll('li');
  if (listItems.length > 0) {
    listItems.forEach(li => viewsLines.push(li.textContent.trim()));
  } else {
    const remaining = temp.textContent.trim();
    if (remaining) viewsLines.push(remaining);
  }

  return {
    consensus: consensusText,
    views: viewsLines.join('\n')
  };
}

function buildHtmlFromFormFields(consensusText, viewsText) {
  let html = '';
  const cTrim = consensusText.trim();
  const vLines = viewsText.split('\n').map(s => s.trim()).filter(Boolean);

  if (cTrim) {
    html += `<div class="theo-consensus"><strong>核心釋經重點：</strong>${escapeHtml(cTrim)}</div>`;
  }

  if (vLines.length === 1) {
    html += `<p>${escapeHtml(vLines[0])}</p>`;
  } else if (vLines.length > 1) {
    html += `<div class="theo-views"><strong>不同學術立場／補充說明：</strong><ul>${vLines.map(line => `<li>${escapeHtml(line)}</li>`).join('')}</ul></div>`;
  }

  if (!html) {
    html = '<p>（尚未填寫詳細神學說明）</p>';
  }
  return html;
}

function openTheoBubble(theoKey, triggerEl = null) {
  const note = theoNotes[theoKey];
  if (!note || !theoBubble) return;

  editingTheoState = {
    mode: isEditMode ? 'edit' : 'view',
    key: theoKey,
    triggerEl: triggerEl,
    savedRange: null
  };

  if (isEditMode && triggerEl) {
    // 直接開啟編輯表單
    showTheoEditForm(
      triggerEl.textContent.trim(),
      note.title,
      note.html,
      true
    );
  } else {
    // 閱讀模式檢視
    theoBadge.textContent = '福音派釋經神學重點';
    theoTitle.textContent = note.title;
    theoBody.innerHTML = note.html;
    theoViewMode.hidden = false;
    theoEditForm.hidden = true;
    theoViewActions.hidden = true;

    theoBackdrop.hidden = false;
    theoBubble.hidden = false;
    theoClose.focus();
  }
}

function showTheoEditForm(labelText, titleText, htmlContent, allowDelete) {
  const parsed = parseHtmlToFormFields(htmlContent);

  theoBadge.textContent = allowDelete ? '編輯神學氣泡' : '新增神學氣泡';
  theoInputLabel.value = labelText;
  theoInputTitle.value = titleText;
  theoInputConsensus.value = parsed.consensus;
  theoInputViews.value = parsed.views;

  theoDeleteBtn.hidden = !allowDelete;
  theoViewMode.hidden = true;
  theoEditForm.hidden = false;

  theoBackdrop.hidden = false;
  theoBubble.hidden = false;
  theoInputTitle.focus();
}

function closeTheoBubble() {
  if (!theoBubble) return;
  theoBackdrop.hidden = true;
  theoBubble.hidden = true;
  editingTheoState = { mode: 'view', key: null, triggerEl: null, savedRange: null };
}

// ==========================================================================
// 編輯模式下：為選取文字加氣泡 / 插入神學標籤
// ==========================================================================
function getSelectionRangeInArticle() {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;
  const range = sel.getRangeAt(0);
  if (!articleEl.contains(range.commonAncestorContainer)) return null;
  return range;
}

function handleAddTermBubble() {
  const range = getSelectionRangeInArticle();
  const selectedText = range ? range.toString().trim() : '';
  if (!selectedText) {
    showToast('請先在文章中用滑鼠反白選取要加註解的詞句');
    return;
  }

  editingTheoState = {
    mode: 'create-term',
    key: 'custom_' + Date.now(),
    triggerEl: null,
    savedRange: range.cloneRange()
  };

  showTheoEditForm(selectedText, selectedText + '｜釋經神學註記', '', false);
}

function handleAddTagBubble() {
  const range = getSelectionRangeInArticle();
  editingTheoState = {
    mode: 'create-tag',
    key: 'custom_' + Date.now(),
    triggerEl: null,
    savedRange: range ? range.cloneRange() : null
  };

  showTheoEditForm('✦ 神學議題：', '本段神學重點討論', '', false);
}

// 表單送出：套用並儲存氣泡
theoEditForm.onsubmit = (e) => {
  e.preventDefault();
  const labelVal = theoInputLabel.value.trim();
  const titleVal = theoInputTitle.value.trim();
  if (!labelVal || !titleVal) return;

  const generatedHtml = buildHtmlFromFormFields(
    theoInputConsensus.value,
    theoInputViews.value
  );

  const { mode, key, triggerEl, savedRange } = editingTheoState;

  // 1. 寫入神學資料庫並存檔
  theoNotes[key] = {
    title: titleVal,
    html: generatedHtml
  };
  saveTheoNotes();

  // 2. 更新文章 DOM 節點
  if (mode === 'edit' && triggerEl) {
    triggerEl.textContent = labelVal;
  } else if (mode === 'create-term' && savedRange) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theo-term';
    btn.dataset.theo = key;
    btn.contentEditable = 'false';
    btn.textContent = labelVal;

    savedRange.deleteContents();
    savedRange.insertNode(btn);
  } else if (mode === 'create-tag') {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theo-tag';
    btn.dataset.theo = key;
    btn.contentEditable = 'false';
    btn.textContent = labelVal.startsWith('✦') ? labelVal : '✦ ' + labelVal;

    if (savedRange) {
      savedRange.collapse(false);
      savedRange.insertNode(btn);
    } else {
      const bar = document.createElement('div');
      bar.className = 'theo-footer-bar';
      bar.appendChild(btn);
      articleEl.appendChild(bar);
    }
  }

  // 同步更新當前頁面暫存
  store[activePage] = articleEl.innerHTML;
  saveStore();

  closeTheoBubble();
  showToast('神學氣泡已套用並儲存');
};

// 刪除既有的神學氣泡（還原為純文字或移除標籤）
theoDeleteBtn.onclick = () => {
  const { triggerEl } = editingTheoState;
  if (!triggerEl) return;

  if (triggerEl.classList.contains('theo-term')) {
    const textNode = document.createTextNode(triggerEl.textContent);
    triggerEl.replaceWith(textNode);
  } else {
    triggerEl.remove();
  }

  store[activePage] = articleEl.innerHTML;
  saveStore();
  closeTheoBubble();
  showToast('已移除該神學氣泡標記');
};

theoCancelBtn.onclick = closeTheoBubble;

// ==========================================================================
// 搜尋功能（同時搜尋頁面內文與神學註記資料庫）
// ==========================================================================
function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return text.replace(/[&<>"']/g, char => map[char]);
}

function attachSearch(inputId, resultsId) {
  const input = document.querySelector('#' + inputId);
  const box = document.querySelector('#' + resultsId);
  if (!input || !box) return;

  input.oninput = (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      box.style.display = 'none';
      box.innerHTML = '';
      return;
    }

    const found = [];

    // 1. 搜尋頁面內容
    for (const [key, html] of Object.entries(store)) {
      const plainText = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
      const index = plainText.toLowerCase().indexOf(query);
      if (index >= 0) {
        const excerpt = plainText.slice(Math.max(0, index - 45), index + 105);
        found.push({ type: 'page', key, label: PAGE_LABELS[key] || key, excerpt });
      }
    }

    // 2. 搜尋神學氣泡註記
    for (const [tKey, note] of Object.entries(theoNotes)) {
      const plainNote = (note.title + ' ' + note.html).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
      const index = plainNote.toLowerCase().indexOf(query);
      if (index >= 0) {
        const excerpt = plainNote.slice(Math.max(0, index - 35), index + 95);
        found.push({ type: 'theo', key: tKey, label: '✦ 神學註記｜' + note.title, excerpt });
      }
    }

    if (found.length > 0) {
      box.innerHTML = found.map(item => `
        <button class="result" data-hit-type="${item.type}" data-hit="${item.key}">
          <b>${escapeHtml(item.label)}</b><br>
          <small>${escapeHtml(item.excerpt)}</small>
        </button>
      `).join('');
    } else {
      box.innerHTML = '<p class="notice">沒有找到符合的內容</p>';
    }

    box.style.display = 'block';

    box.querySelectorAll('[data-hit]').forEach(btn => {
      btn.onclick = () => {
        const hitType = btn.dataset.hitType;
        const hitKey = btn.dataset.hit;
        if (hitType === 'theo') {
          openTheoBubble(hitKey, null);
        } else {
          navigateTo(hitKey);
        }
        box.style.display = 'none';
        document.querySelectorAll('#search, #search-mobile').forEach(el => {
          el.value = '';
        });
      };
    });
  };
}

// ==========================================================================
// 事件監聽與初始化
// ==========================================================================
function init() {
  // 導覽列切換
  document.querySelectorAll('[data-page]').forEach(btn => {
    btn.onclick = () => {
      if (isEditMode) {
        showToast('請先儲存本頁');
        return;
      }
      navigateTo(btn.dataset.page);
    };
  });

  // 事件委派：點擊文中詞條 (.theo-term) 或段落備註記號 (.theo-tag)
  // 閱讀模式開啟氣泡；編輯模式開啟該氣泡的修改表單
  articleEl.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-theo]');
    if (!trigger) return;
    e.preventDefault();
    e.stopPropagation();
    openTheoBubble(trigger.dataset.theo, trigger);
  });

  // 編輯工具列按鈕
  const addTermBtn = document.querySelector('#add-theo-term');
  const addBlockBtn = document.querySelector('#add-theo-block');
  if (addTermBtn) addTermBtn.onclick = handleAddTermBubble;
  if (addBlockBtn) addBlockBtn.onclick = handleAddTagBubble;

  // 關閉神學氣泡視窗
  if (theoClose) theoClose.onclick = closeTheoBubble;
  if (theoBackdrop) theoBackdrop.onclick = closeTheoBubble;

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && theoBubble && !theoBubble.hidden) {
      closeTheoBubble();
    }
  });

  // 編輯與儲存
  editBtn.onclick = () => {
    isEditMode = true;
    render();
    showToast('已進入編輯模式：可修改文字、反白加新氣泡，或點擊既有「✦」修改');
  };

  saveBtn.onclick = saveCurrentPage;

  // 深淺色主題切換
  if (localStorage.getItem(THEME_KEY) === 'dark') {
    document.documentElement.classList.add('dark');
  }

  themeBtn.onclick = () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  };

  // 匯出 JSON 備份（同時打包 pages 與 custom theoNotes）
  exportBtn.onclick = () => {
    store[activePage] = articleEl.innerHTML;
    saveStore();
    saveTheoNotes();

    const backupPayload = {
      version: 4,
      exportedAt: new Date().toISOString(),
      pages: store,
      theoNotes: theoNotes
    };

    const blob = new Blob([JSON.stringify(backupPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'john11-sermon-workspace-backup.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
    showToast('已匯出全部頁面與神學氣泡備份');
  };

  // 匯入 JSON 備份（相容舊版與 v4 新版格式）
  importBtn.onclick = () => fileInput.click();

  fileInput.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const text = await file.text();
      const incoming = JSON.parse(text);
      if (typeof incoming !== 'object' || !incoming) {
        throw new Error('無效的 JSON 格式');
      }

      if (incoming.pages) {
        store = { ...store, ...incoming.pages };
        if (incoming.theoNotes) {
          theoNotes = { ...theoNotes, ...incoming.theoNotes };
          saveTheoNotes();
        }
      } else {
        // 相容舊版單層 JSON
        store = { ...store, ...incoming };
      }

      saveStore();
      render();
      showToast('備份匯入完成');
    } catch {
      showToast('匯入失敗：請選擇此網站匯出的 JSON 備份');
    }
    fileInput.value = '';
  };

  // 鍵盤快捷鍵 (Ctrl/Cmd + S 儲存)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      e.preventDefault();
      if (isEditMode) {
        saveCurrentPage();
      } else {
        store[activePage] = articleEl.innerHTML;
        saveStore();
        saveTheoNotes();
        showToast('本頁已更新保存');
      }
    }
  });

  // 綁定桌面端與手機端搜尋框
  attachSearch('search', 'results');
  attachSearch('search-mobile', 'results-mobile');

  // 初始渲染
  render();
}

init();
