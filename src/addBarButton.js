/**
 * addBarButton.js
 * 为顶栏增加数据历史、日记、闪卡按钮，点击后模拟快捷键按下对应按键
 * 挂件模式支持右键点击日记图片列出笔记本。
 */
import { setting } from "./config.js";
let g_addDailyNote = setting.addDailyNote;
let g_addFlashCard = setting.addFlashCard;
let g_addSetting = setting.addSetting;
let g_addHistory = setting.addHistory;
let g_dailyNoteLeftClick = setting.dailyNoteLeftClick; // 左键点击日记按钮直接创建日记，为false则左键点击弹出选择

// 插入按钮
// 插入日历笔记本选择挂件 
// Refer: https://ld246.com/article/1662969146166  OriginAuthor: BryceAndJuly
// Refer: https://github.com/svchord/Rem-Craft OriginAuthor: Seven Chor
function addDailyNote() {
  let barSync = document.getElementById("barSync");
  barSync.insertAdjacentHTML(
    "afterEnd",
    '<div id="barDailyNote_simulate" class="toolbar__item b3-tooltips b3-tooltips__se" aria-label="日记/DailyNote" ></div>'
  );
  let dailyNoteBtn = document.getElementById("barDailyNote_simulate");
  dailyNoteBtn.innerHTML = `<svg><use xlink:href="#iconCalendar"></use></svg>`;



  document.body.insertAdjacentHTML(
    "beforeend",
    ` 
        <div
            data-node-index="1"
            data-type="NodeWidget"
            class="iframe"
            data-subtype="widget"
            id="dailyNotePanelOuterDiv"
        >
            <div class="iframe-content">
                <iframe 
                    id="dailyNotePanel" 
                    style="
                        display: none;
                        position: fixed; 
                        z-index: 1000; 
                        top: 130px; 
                        width: 200px; 
                        height: 200px; 
                        background-color: var(--b3-theme-background);
                        box-shadow: var(--b3-dialog-shadow); 
                        border:none; 
                        border-radius: 5px; 
                        transform: translate(-50%, -50%); 
                        overflow: auto;" 
                    src="/widgets/createDailyNote" 
                    data-src="/widgets/createDailyNote" 
                    data-subtype="widget" 
                >
                </iframe>
            </div>
        </div>
        `
  );
  let dailyNotePanel = document.getElementById("dailyNotePanel");
  dailyNoteBtn.addEventListener(
    "mousedown",
    function (e) {
      if (e.buttons == 2) {
        if (g_dailyNoteLeftClick) {
          let dailyNotePanel = document.getElementById("dailyNotePanel");
          if (dailyNotePanel.style.display === "none") {
            adjustPanelPosition(dailyNoteBtn, dailyNotePanel);
            dailyNotePanel.style.display = "block";
            window.addEventListener("click", hideDailyNodePanel, false);
          } else {
            dailyNotePanel.style.display = "none";
            window.removeEventListener("click", hideDailyNodePanel, false);
          }
        }else{
          dispatchKeyEvent("dailyNote");
        }
      }
    },
    false
  );

  dailyNoteBtn.addEventListener(
    "click",
    function (e) {
      if (g_dailyNoteLeftClick) {
        dispatchKeyEvent("dailyNote");
      }else{
        let dailyNotePanel = document.getElementById("dailyNotePanel");
        if (dailyNotePanel.style.display == "none") {
          adjustPanelPosition(dailyNoteBtn, dailyNotePanel);
          dailyNotePanel.style.display = "block";
          // 否则新设定的listener会捕捉到点击然后隐藏
          e.stopPropagation();
          window.addEventListener("click", hideDailyNodePanel, false);
        } else {
          dailyNotePanel.style.display = "none";
          e.stopPropagation();
          window.removeEventListener("click", hideDailyNodePanel, false);
        }
      }
    },
    false
  );

}

/**
 * 面板位置调整，尽力调整到面板居中显示在按钮下方
 * @param {*} btnElem 
 * @param {*} panelElem 
 */
function adjustPanelPosition(btnElem, panelElem) {
  // 计算右侧是否有足够空间居中显示，值>0表示不足，需要另外占据左侧空间以便全部显示
  let rightNeedSpare = panelElem.clientWidth / 2 - (window.innerWidth - btnElem.offsetLeft - btnElem.clientWidth / 2);
  let pannelRightSpace = 0;
  // 当调整后右侧贴边时，到右侧留下补充距离
  if (rightNeedSpare >= 0) {
      pannelRightSpace = 20;
  } else {
      // 右侧不需要其他空间，置0
      rightNeedSpare = 0;
  }
  // 计算左侧距离
  let calculateLeft = btnElem.offsetLeft + btnElem.clientWidth / 2 - rightNeedSpare - pannelRightSpace;
  // 总距离不足
  if (calculateLeft < 0) {
      calculateLeft = 0;
      if (window.innerWidth < panelElem.clientWidth / 2) {
          panelElem.style.width = window.innerWidth + "px";
      }
  }
  panelElem.style.left = calculateLeft + "px";
  let calculateTop = btnElem.offsetTop + btnElem.clientHeight
      + parseInt(panelElem.style.height.substring(0, panelElem.style.height.length)) / 2;
  panelElem.style.top = calculateTop + "px";
}


function addFlashCard() {
  let barSync = document.getElementById("barSync");
  barSync.insertAdjacentHTML(
    "afterEnd",
    '<div id="barFlashCard_simulate" class="toolbar__item b3-tooltips b3-tooltips__se" aria-label="闪卡/FlashCards" ></div>'
  );
  let flashCardBtn = document.getElementById("barFlashCard_simulate");
  flashCardBtn.innerHTML = `<svg><use xlink:href="#iconRiffCard"></use></svg>`;

  flashCardBtn.addEventListener(
    "click",
    function (e) {
      dispatchKeyEvent("riffCard");
    },
    false
  );
}
function addSetting() {
  let barMode = document.getElementById("barMode");
  barMode.insertAdjacentHTML(
    "afterend",
    '<div id="barSetting_simulate" class="toolbar__item b3-tooltips b3-tooltips__se" aria-label="设置/Settings" ></div>'
  );
  let settingBtn = document.getElementById("barSetting_simulate");
  settingBtn.innerHTML = `<svg><use xlink:href="#iconSettings"></use></svg>`;

  settingBtn.addEventListener(
    "click",
    function (e) {
      dispatchKeyEvent("config");
    },
    false
  );
}

function addHistory() {
  let barSync = document.getElementById("barSync");
  barSync.insertAdjacentHTML(
    "afterend",
    '<div id="barHistory_simulate" class="toolbar__item b3-tooltips b3-tooltips__se" aria-label="数据历史/History" ></div>'
  );
  let historyBtn = document.getElementById("barHistory_simulate");
  historyBtn.innerHTML = `<svg><use xlink:href="#iconHistory"></use></svg>`;

  historyBtn.addEventListener(
    "click",
    function (e) {
      dispatchKeyEvent("dataHistory");
    },
    false
  );
}

function hideDailyNodePanel(e) {
  dailyNotePanel.style.display = "none";
  window.removeEventListener("click", hideDailyNodePanel, false);
  e.stopPropagation();
}

/**
 * 
 */
function dispatchKeyEvent(functionName) {
  let keyInit = parseHotKeyStr(window.top.siyuan.config.keymap.general[functionName].custom);
  keyInit["bubbles"] = true;
  let keydownEvent = new KeyboardEvent('keydown', keyInit);
  document.getElementsByTagName("body")[0].dispatchEvent(keydownEvent);
  let keyUpEvent = new KeyboardEvent('keyup', keyInit);
  document.getElementsByTagName("body")[0].dispatchEvent(keyUpEvent);
}

/**
 * 
 * @param {*} hotkeyStr 思源hotkey格式 Refer: https://github.com/siyuan-note/siyuan/blob/d0f011b1a5b12e5546421f8bd442606bf0b5ad86/app/src/protyle/util/hotKey.ts#L4
 * @returns KeyboardEventInit Refer: https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/KeyboardEvent
 */
function parseHotKeyStr(hotkeyStr) {
  let result = {
    ctrlKey: false,
    altKey: false,
    metaKey: false,
    shiftKey: false,
    key: 'A'
  }
  if (hotkeyStr == "" || hotkeyStr == undefined || hotkeyStr == null) {
    console.error("解析快捷键设置失败", hotkeyStr);
    throw new Error("解析快捷键设置失败");
  }
  let onlyKey = hotkeyStr;
  if (hotkeyStr.indexOf("⌘") != -1) {
    result.ctrlKey = true;
    onlyKey = onlyKey.replace("⌘", "");
  }
  if (hotkeyStr.indexOf("⌥") != -1) {
    result.altKey = true;
    onlyKey = onlyKey.replace("⌥", "");
  }
  if (hotkeyStr.indexOf("⇧") != -1) {
    result.shiftKey = true;
    onlyKey = onlyKey.replace("⇧", "");
  }
  // 未处理 windows btn （MetaKey） 
  result.key = onlyKey;
  switch (result.key) {
    case "→": {
      result.key = "ArrowRight";
      break;
    }
    case "←": {
      result.key = "ArrowLeft";
      break;
    }
    case "↑": {
      result.key = "ArrowUp";
      break;
    }
    case "↓": {
      result.key = "ArrowDown";
      break;
    }
    case "⌦": {
      result.key = "Delete";
      break;
    }
    case "⌫": {
      result.key = "Backspace";
      break;
    }
    case "↩": {
      result.key = "Enter";
      break;
    }
  }
  return result;
}

if (g_addFlashCard) addFlashCard();
if (g_addDailyNote) addDailyNote();
if (g_addHistory) addHistory();
if (g_addSetting) addSetting();
