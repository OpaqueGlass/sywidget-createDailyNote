/**
 * config.js 配置文件
 */
// 全局设置
let setting = {
    addSetting: true, // 添加设置
    addDailyNote: true, // 添加日记
    addFlashCard: true, // 添加闪卡
    addHistory: true, // 添加数据历史
    dailyNoteLeftClick: false, // 交换左右键点击功能，为true左键点击直接创建日记；
    dailyNote_singleFileMode: true, // 单文档日记模式：启用/禁用
    dailyNote_singleFileMode_prepend: false, // 单文档日记模式：今日日记在文件开头创建
    dailyNote_singleFileMode_titleTemplate: "## MM月dd日\n ", // 单文档日记模式：今日日记在文件开头创建。示例 yyyy-MM-dd
    dailyNote_singleFileMode_notebookids: ["20210821105258-irgl53w", "20210821105258-gxyqc9t"], // 如果只对部分笔记本使用单文档日记模式，则在这里填写笔记本id
};
// api token
let token = "";

export {setting, token};