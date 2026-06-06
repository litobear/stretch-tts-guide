# AI 開發與架構指南 (GEMINI.md)

這份文件是專為未來的 AI 助理（如 Gemini、Claude、ChatGPT）以及接手的開發人員所撰寫的。在修改本專案前，請務必先閱讀此文件以理解本專案的架構設計與慣例。

## 🏗️ 架構設計理念 (Architecture Philosophy)

ZenStretch 是一個**無依賴重型 UI 框架 (No Vue/React/Svelte)** 的 Vanilla JS 專案。
為了在純 JS 下維持高可讀性與擴充性，我們採用了「模組化切割」與「關注點分離」：

1. **HTML 拆分 (HTML Partials)**
   - 我們使用了 `vite-plugin-html-inject`。
   - **禁止直接在 `index.html` 中加入大量 DOM**。所有的畫面 (`screens/`) 與對話框 (`modals/`) 都被拆分到 `src/partials/` 資料夾中。
   - `index.html` 僅作為匯入點 (`<load src="..." />`)。

2. **JS 模組化與 Facade 模式**
   - 核心邏輯 (State、Data、Sync) 位於 `src/modules/` 根目錄 (`engine.js`, `stretches.js`, `tts.js`)。
   - UI 操作位於 `src/modules/ui/`，並透過 `src/modules/ui.js` 作為 **門面 (Facade)** 匯出單一的 `initUI()`。
   - **請勿建立 God Object**。新增 UI 功能時，請在 `src/modules/ui/` 下新增對應檔案，再由 `ui.js` 組合。

## 🧠 核心模組介紹 (Core Modules)

### 1. `engine.js` (運動狀態機)
這是整個運動流程的心臟。它不碰觸 DOM，而是拋出 Callbacks 讓 UI 知道狀態改變了。
- **狀態枚舉 (States)**：`IDLE` -> `PREPARE` (準備) -> `EXPLANATION` (解說) -> `STRETCHING` (動作中) -> `REST` (組間休息) -> `COMPLETED` (完成)。
- 開發時，如果需要改變運動的倒數邏輯，請修改此處。

### 2. `stretches.js` (資料層)
負責管理「內建流程 (Presets)」與「自訂流程 (Custom Routines)」。
- 預設儲存於 `localStorage`。
- 如果有觸發雲端同步 (`firebase.js`)，這裡的資料會被覆蓋或上傳。

### 3. `ui/workout.js` (UI 監聽者)
這個檔案負責實作 `engine.js` 所需的 Callback (`onStateChange`, `onTick`, `onBreathing` 等)，並更新 `screen-workout` 畫面上的 DOM（包含圓環進度條、秒數等）。

### 4. `firebase.js` (雲端同步)
負責 Google Login 以及 Firestore 的雙向同步。
- 同步策略非常簡單：雲端有一份 JSON，本地有一份 JSON。以「最後更新時間 (timestamp)」來決定誰覆蓋誰。

## ⚠️ 開發守則與慣例 (Rules for Agents)

1. **禁止使用行內事件監聽器 (No Inline Handlers)**：
   不要在 HTML 內寫 `onclick="doSomething()"`。請一律在 JS 檔案中使用 `element.addEventListener` 進行綁定。
2. **安全字串插入**：
   在將使用者輸入寫入 DOM 前（例如動作名稱、說明），請務必使用 `src/modules/ui/utils.js` 中的 `escapeHTML()` 以防範 XSS 攻擊。
3. **新增依賴套件請謹慎**：
   目前專案保持輕巧，如需引入新套件（特別是會影響 bundle size 的套件），請先確保無法以 Vanilla JS 輕鬆實作，並需與使用者確認。
4. **CSS 樣式管理**：
   樣式放置於 `src/styles/`。`themes.css` 控管全局變數 (Variables) 與深淺色模式，`main.css` 控管排版。

## 🧩 AI JSON 匯入格式參考
當擴充或修改 AI 匯入功能時 (`src/modules/ui/builder.js`)，系統預期的 JSON 格式如下：
```json
{
  "name": "流程名稱",
  "description": "流程描述",
  "steps": [
    {
      "name": "動作名稱",
      "duration": 30,
      "repeat": 1,
      "bilateral": false,
      "description": "語音解說..."
    }
  ]
}
```
