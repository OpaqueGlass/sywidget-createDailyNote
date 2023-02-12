import { postRequest } from "./API.js";


let g_notebooks = window.top.siyuan.notebooks;
function __init() {
    if (window.top.siyuan.config.appearance.mode == 1) {
        document.getElementsByTagName("body")[0].setAttribute("darkmode", "true");
    }
    __main();
}

function __main() {
    g_notebooks = window.top.siyuan.notebooks;
    document.getElementById("notebooklist").innerHTML = "";
    for (let notebook of g_notebooks) {
        if (notebook.closed == true) continue;
        let liElem = document.createElement("li");
        liElem.setAttribute("name", notebook.name);
        liElem.setAttribute("notebookid", notebook.id);
        liElem.innerText = notebook.name;
        if (window.top.siyuan.storage["local-dailynoteid"] == notebook.id) {
            liElem.classList.add("defaultnotebook");
        }
        document.getElementById("notebooklist").appendChild(liElem);
    }
    document.getElementById("notebooklist").addEventListener("click", clickListItemHandler);
}

function clickListItemHandler(tagetElem) {
    let srcElem = tagetElem.srcElement;
    postRequest({app: getAppId(), notebook: srcElem.getAttribute("notebookid")}, "/api/filetree/createDailyNote");
    postRequest({app: getAppId(), key: "local-dailynoteid", "val": srcElem.getAttribute("notebookid")}, "/api/storage/setLocalStorageVal");
    window.top.siyuan.storage["local-dailynoteid"] = srcElem.getAttribute("notebookid");
    // 关闭后刷新挂件笔记本列表
    __main();
    if (window.top.document.getElementById("dailyNotePanel")) {
        window.top.document.getElementById("dailyNotePanel").style.display = "none";
    }
    
}

function getAppId() {
    let wsurl = window.top.siyuan.ws.ws.url;
    let appIdMatchResult = wsurl.match(new RegExp(`(\\?app=|&app=)[^&]+`, "g"));
    if (appIdMatchResult.length == 1){
        return appIdMatchResult[0].substring(5);
    }else if (appIdMatchResult.length > 1) {
        console.warn("正则获取appId错误", appIdMatchResult);
        return appIdMatchResult[0].substring(5);
    }else {
        console.error("正则获取appId错误", appIdMatchResult);
        return "";
    }
    
}

window.top.document.getElementById("barDailyNote_simulate")?.addEventListener(
    "mousedown",
    function (e) {
      if (e.buttons == 2) {
        __main();
      }
    },
    false
  );

__init();