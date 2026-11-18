約翰福音 11 章講章筆記網站 prototype

檔案：
- index.html：主頁
- js/app.js：頁面內容、切換、編輯、本機儲存、匯出/匯入

目前：
- 靜態 HTML/CSS/JS，無需 build
- 直接編輯模式：點「編輯」後點選文字，修改後按「儲存」
- 本機 localStorage 暫存
- JSON 匯出與匯入
- 深淺模式
- 手機/桌機 responsive
- 導覽、搜尋與 reminders/details 收合

未來資料庫：
目前的資料以 pages object / localStorage 儲存。Firebase Firestore 接入時，可將讀寫函式替換為 Firestore adapter，頁面 UI 不必重寫。建議每篇 sermon/page 以 key 儲存 HTML 或後續轉成 blocks 結構，保留 section/reminder 分層。

部署：直接放 Cloudflare Pages 或任意靜態主機即可。檔案路徑皆相對。
