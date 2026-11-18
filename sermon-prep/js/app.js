/**
 * 我就是復活和生命｜講章研究工作區
 * 負責頁面路由切換、LocalStorage 讀寫、即時編輯、搜尋與 JSON 備份匯出入
 */

const STORAGE_KEY = 'clc_john11_notes_v2';
const THEME_KEY = 'clc_john11_theme_v2';

const PAGE_LABELS = {
  overview: '系列總覽',
  s1: '01 愛與死亡',
  s2: '02 盼望與眼淚',
  s3: '03 信心與榮耀',
  notes: '神學備忘'
};

const bibleLinks = {
  "約20:31": "https://www.bible.com/zh-TW/bible/",
  "約1:14": "https://www.bible.com/zh-TW/bible/",
  "約11": "https://www.bible.com/zh-TW/bible/"
};

// ==========================================================================
// 預設講章研究資料內容（經文均採用和合本並套用統一經文框樣式）
// ==========================================================================
const defaultContent = {
  overview: `
    <h2>系列總覽</h2>
    <p>主題：<strong>我就是復活和生命</strong>。本系列以約翰福音11章為主軸，三篇信息彼此連結：前篇種下問題，後篇深化並帶向基督的死與復活。</p>
    <div class="scripture">
      <strong>每篇信息共同起點｜約 20:31（和合本）</strong>
      但記這些事要叫你們信耶穌是基督，是神的兒子，並且叫你們信了他，就可以因他的名得生命。
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
      <strong>約 20:31</strong>
      但記這些事要叫你們信耶穌是基督，是神的兒子，並且叫你們信了他，就可以因他的名得生命。
    </div>
    <p>但如果是新朋友，你覺得這節經文他看的懂嗎？所以只跟人講神學，甚至用各種辦法去證明耶穌是神，如果他感受不到，那都是沒有用的，所以我們通常鼓勵人信耶穌都會說：「耶穌愛你，所以你要信祂。」</p>
    <p>可是如果我們不只談愛，談祝福這樣就夠了嗎？因為妳也可以相信你的父母愛你、老師愛你，但他們不能讓你得生命AMEN?</p>
    <p>所以認識耶穌是誰很重要，經歷他的愛也很重要，這是我們在說「信耶穌的時候無法分割的兩件事」。今天我們Believe「相信」系列信息，來到約翰福音第11章，讓我們再次看見耶穌的恩典與真理相遇的時刻。[1] 就是約翰福音的第七個神蹟和第三個真神宣告。</p>
    <div class="scripture">
      <strong>[1] 約 1:14</strong>
      道成了肉身，住在我們中間，充充滿滿的有恩典有真理。我們也見過他的榮光，正是父獨生子的榮光。
    </div>

    <h3>段落大綱</h3>
    <h4>一、延遲背後有深愛（約 11:1–6）</h4>
    <p><em>We don’t like delays.</em></p>
    <div class="scripture">
      <strong>約 11:1–6（和合本）</strong>
      <span class="v-num">1</span> 有一個患病的人，名叫拉撒路，住在伯大尼，就是馬利亞和他姊姊馬大的村莊。<span class="v-num">2</span> 這馬利亞就是那用香膏抹主，又用頭髮擦他腳的；患病的拉撒路是他的兄弟。<span class="v-num">3</span> 他姊妹兩個就打發人去見耶穌，說：「主啊，你所愛的人病了。」<span class="v-num">4</span> 耶穌聽見，就說：「這病不至於死，乃是為神的榮耀，叫神的兒子因此得榮耀。」<span class="v-num">5</span> 耶穌素來愛馬大和他妹子並拉撒路。<span class="v-num">6</span> 聽見拉撒路病了，就在所居之地仍住了兩天。
    </div>

    <h4>二、危險之中主同行（約 11:7–10）</h4>
    <p><em>We don’t like danger.</em></p>
    <div class="scripture">
      <strong>約 11:7–10（和合本）</strong>
      <span class="v-num">7</span> 然後對門徒說：「我們再往猶太去吧。」<span class="v-num">8</span> 門徒說：「拉比，猶太人近來要拿石頭打你，你還往那裡去嗎？」<span class="v-num">9</span> 耶穌回答說：「白日不是有十二小時嗎？人在白日走路，就不至跌倒，因為看見這世上的光。<span class="v-num">10</span> 若在黑夜走路，就必跌倒，因為他沒有光。」
    </div>

    <h4>三、絕望之處要順服（約 11:11–16）</h4>
    <p><em>We don’t like death.</em></p>
    <div class="scripture">
      <strong>約 11:11–16（和合本）</strong>
      <span class="v-num">11</span> 耶穌說了這話，隨後對他們說：「我們的朋友拉撒路睡了，我去叫醒他。」<span class="v-num">12</span> 門徒說：「主啊，他若睡了，就必好了。」<span class="v-num">13</span> 耶穌這話是指著他死說的，他們卻以為是說照常睡了。<span class="v-num">14</span> 耶穌就明明的告訴他們說：「拉撒路死了。<span class="v-num">15</span> 我沒有在那裡就歡喜，這是為你們的緣故，好叫你們相信。如今我們可以往他那裡去吧。」<span class="v-num">16</span> 多馬，又稱為低土馬，就對那同作門徒的說：「我們也去和他同死吧。」
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
    <h4>一、死亡的真實與復活的盼望（約 11:17–27）</h4>
    <p>馬大承認末日復活的盼望；耶穌將盼望的中心從一個未來事件帶到祂自己，宣告：<strong>「復活在我，生命也在我。」</strong></p>
    <div class="scripture">
      <strong>約 11:17–27（和合本）</strong>
      <span class="v-num">17</span> 耶穌到了，就知道拉撒路在墳墓裡已經四天了。<span class="v-num">18</span> 伯大尼離耶路撒冷不遠，約有六里路。<span class="v-num">19</span> 有好些猶太人來看馬大和馬利亞，要為他們的兄弟安慰他們。<span class="v-num">20</span> 馬大聽見耶穌來了，就出去迎接他；馬利亞卻仍然坐在家裡。<span class="v-num">21</span> 馬大對耶穌說：「主啊，你若早在這裡，我兄弟必不死。<span class="v-num">22</span> 就是現在，我也知道，你無論向神求什麼，神也必賜給你。」<span class="v-num">23</span> 耶穌說：「你兄弟必然復活。」<span class="v-num">24</span> 馬大說：「我知道在末日復活的時候，他必復活。」<span class="v-num">25</span> 耶穌對他說：「復活在我，生命也在我。信我的人雖然死了，也必復活；<span class="v-num">26</span> 凡活著信我的人必永遠不死。你信這話嗎？」<span class="v-num">27</span> 馬大說：「主啊，是的，我信你是基督，是神的兒子，就是那要臨到世界的。」
    </div>

    <h4>二、復活盼望中的哀傷與眼淚（約 11:28–37）</h4>
    <p>馬利亞與在場的人哀哭；耶穌深受觸動，也哭了。復活盼望沒有抹去當下真實的悲傷。</p>
    <div class="scripture">
      <strong>約 11:28–37（和合本）</strong>
      <span class="v-num">28</span> 馬大說了這話，就回去暗暗的叫他妹子馬利亞，說：「夫子來了，叫你。」<span class="v-num">29</span> 馬利亞聽見了，就急忙起來，到耶穌那裡去。<span class="v-num">30</span> 那時，耶穌還沒有進村子，仍在馬大迎接他的地方。<span class="v-num">31</span> 那些同馬利亞在家裡安慰他的猶太人，見他急忙起來出去，就跟著他，以為他要往墳墓那裡去哭。<span class="v-num">32</span> 馬利亞到了耶穌那裡，看見他，就俯伏在他腳前，說：「主啊，你若早在這裡，我兄弟必不死。」<span class="v-num">33</span> 耶穌看見他哭，並看見與他同來的猶太人也哭，就心裡悲嘆，又甚憂愁，<span class="v-num">34</span> 便說：「你們把他安放在哪裡？」他們回答說：「請主來看。」<span class="v-num">35</span> 耶穌哭了。<span class="v-num">36</span> 猶太人就說：「你看他愛這人是何等懇切。」<span class="v-num">37</span> 其中有人說：「他既然開了瞎子的眼睛，豈不能叫這人不死嗎？」
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
    <h4>一、死亡已成事實，人無法挽回（約 11:38–39）</h4>
    <p>拉撒路已死四天，死亡的現實與人的有限不能被輕描淡寫。</p>
    <div class="scripture">
      <strong>約 11:38–39（和合本）</strong>
      <span class="v-num">38</span> 耶穌又心裡悲嘆，來到墳墓前；那墳墓是個洞，有一塊石頭擋著。<span class="v-num">39</span> 耶穌說：「你們把石頭挪開。」那死人的姊姊馬大對他說：「主啊，他現在必是臭了，因為他死了已經四天了。」
    </div>

    <h4>二、信心與看見神的榮耀（約 11:40–42）</h4>
    <p>耶穌的禱告顯明祂與父的關係，也指出這神蹟的啟示目的。</p>
    <div class="scripture">
      <strong>約 11:40–42（和合本）</strong>
      <span class="v-num">40</span> 耶穌說：「我不是對你說過，你若信，就必看見神的榮耀嗎？」<span class="v-num">41</span> 他們就把石頭挪開。耶穌舉目望天，說：「父啊，我感謝你，因為你已經聽我。<span class="v-num">42</span> 我也知道你常聽我，但我說這話是為周圍站著的眾人，叫他們信是你差了我來。」
    </div>

    <h4>三、耶穌的命令與死亡權柄（約 11:43–44）</h4>
    <p>耶穌呼叫拉撒路出來，顯明祂對死亡的權柄。</p>
    <div class="scripture">
      <strong>約 11:43–44（和合本）</strong>
      <span class="v-num">43</span> 說了這話，就大聲呼叫說：「拉撒路出來！」<span class="v-num">44</span> 那死人就出來了，手腳裹著布，臉上包著手巾。耶穌對他們說：「解開，叫他走！」
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

    <h3>約 11:35「耶穌哭了」｜五種傳統解釋方向</h3>
    <div class="scripture">
      <strong>約 11:33–35（和合本）</strong>
      <span class="v-num">33</span> 耶穌看見他哭，並看見與他同來的猶太人也哭，就心裡悲嘆，又甚憂愁，<span class="v-num">34</span> 便說：「你們把他安放在哪裡？」他們回答說：「請主來看。」<span class="v-num">35</span> 耶穌哭了。
    </div>
    <details class="fold" open>
      <summary>五種解釋（點擊收合）</summary>
      <ol>
        <li><strong>因愛與友誼而哭：</strong>上下文的愛、馬利亞與群眾哭泣、旁人對耶穌愛拉撒路的反應，支持同理與哀傷的理解。早期教會與改革宗傳統中也可見此解釋。</li>
        <li><strong>對罪與死亡權勢的憤慨：</strong>「心裡悲嘆／激動」相關用詞可能帶有強烈情緒，部分解經者理解為對死亡破壞的憤怒；但不能僅憑字義斷定情緒對象。</li>
        <li><strong>因人的不信或硬心：</strong>存在於解釋傳統中，但約翰沒有明說不信是耶穌哭泣的主要原因；11:33直接情境是哀哭的人群。</li>
        <li><strong>拉撒路被召回有限、受苦的生命：</strong>部分古代傳統曾如此理解，但經文沒有明確說明，也不是敘事主要方向。</li>
        <li><strong>預想到自己的十字架：</strong>可從全書脈絡及11:45–53的反應連結救贖歷史，但11:35本身沒有明說這是哭泣原因。</li>
      </ol>
      <p><strong>謹慎總結：</strong>愛與同理有明確上下文支持；對死亡破壞的憤慨是值得考慮的解釋，但不宜說學界一致認定唯一原因。</p>
    </details>

    <h3>系列核心的神學界線</h3>
    <details class="fold">
      <summary>已然／未然、拉撒路與耶穌的復活</summary>
      <ul>
        <li>拉撒路的復生是恢復今生生命的神蹟，並非終極、永不死亡的復活。</li>
        <li>耶穌的死與復活才是救贖歷史中心與死亡最終被勝過的根據。</li>
        <li>信徒已在基督裡得生命；身體復活仍在未來盼望中。</li>
        <li>神蹟不能被轉化為今生必然獲得相同結果的保證。</li>
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

const articleEl = document.querySelector('#article');
const editBtn = document.querySelector('#edit');
const saveBtn = document.querySelector('#save');
const themeBtn = document.querySelector('#theme');
const exportBtn = document.querySelector('#export');
const importBtn = document.querySelector('#import');
const fileInput = document.querySelector('#file');

// ==========================================================================
// 資料存取與通知提示
// ==========================================================================
function loadStore() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return { ...defaultContent, ...saved };
  } catch (e) {
    console.warn('讀取本機儲存失敗，載入預設內容：', e);
    return { ...defaultContent };
  }
}

function saveStore() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function showToast(message) {
  const toastEl = document.querySelector('#toast');
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.style.display = 'block';
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toastEl.style.display = 'none';
  }, 1900);
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
  isEditMode = false;
  render();
  showToast('已儲存至本機瀏覽器');
}

// ==========================================================================
// 搜尋功能
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
    for (const [key, html] of Object.entries(store)) {
      const plainText = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
      const index = plainText.toLowerCase().indexOf(query);
      if (index >= 0) {
        const excerpt = plainText.slice(Math.max(0, index - 50), index + 110);
        found.push({ key, excerpt });
      }
    }

    if (found.length > 0) {
      box.innerHTML = found.map(item => `
        <button class="result" data-hit="${item.key}">
          <b>${PAGE_LABELS[item.key] || item.key}</b><br>
          <small>${escapeHtml(item.excerpt)}</small>
        </button>
      `).join('');
    } else {
      box.innerHTML = '<p class="notice">沒有找到符合的內容</p>';
    }

    box.style.display = 'block';

    box.querySelectorAll('[data-hit]').forEach(btn => {
      btn.onclick = () => {
        navigateTo(btn.dataset.hit);
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

  // 編輯與儲存
  editBtn.onclick = () => {
    isEditMode = true;
    render();
    showToast('可直接點選文字編輯；儲存後更新本機內容');
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

  // 匯出 JSON 備份
  exportBtn.onclick = () => {
    store[activePage] = articleEl.innerHTML;
    saveStore();
    const blob = new Blob([JSON.stringify(store, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'john11-sermon-workspace.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
    showToast('已匯出全部頁面備份');
  };

  // 匯入 JSON 備份
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
      store = { ...store, ...incoming };
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
