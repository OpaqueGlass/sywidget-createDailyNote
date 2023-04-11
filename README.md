## 顶栏日记、闪卡、设置入口
> 当前版本：v0.2 此版本加入了单文档日记适配（向打开的日记页面追加当日日期标题），并**默认启用**；您可以修改`src/config.js`以禁用此功能；

### 使用说明

将本文件夹下的所有文件放置在`${思源工作空间}/widgets/createDailyNote/`目录下。

编辑`./src/config.js`，可以修改按钮显示与否。

设置`Alt+P`---外观---代码片段---JS---添加JS，将以下内容粘贴在代码片段中，启用代码片段，确定。

```javascript
import("/widgets/createDailyNote/src/addBarButton.js");
```

如果您遇到任何问题，请在设置`Alt+P`---外观---代码片段---JS 中删除对应的代码片段，然后重启思源。

或见[首次发布地址](https://ld246.com/article/1674026309504)。


#### 单文档日记

使用此代码片段以帮助您在日记文档中自动插入当日日期标题；

1. 修改笔记本设置“新建日记存放位置”，使得每月或者每年的日记创建于同一文档（通过删除当日日期实现创建于同一文档）；
   
   示例：
   
   将`/daily note/{{now | date "2006/01"}}/{{now | date "2006-01-02"}}`更改为`/daily note/{{now | date "2006/01"}}`，以按照月生成日记文档；

2. 修改`src/config.js`，自定义插入内容和插入方式，尤其是修改生效笔记本id；

3. 右键点击顶栏日记按钮，快速创建日记；


### 参考 & 感谢

开发过程中参考了以下项目：

| 开发者       | 网页地址                                | 备注                         |
| ------------ | --------------------------------------- | ---------------------------- |
| BryceAndJuly | https://ld246.com/article/1662969146166 | 插入顶栏按钮、笔记本选择挂件 |
| Seven Chor   | https://github.com/svchord/Rem-Craft    | 插入顶栏按钮、笔记本选择挂件 |
|[leolee9086](https://github.com/leolee9086) | [cc-template](https://github.com/leolee9086/cc-template) | 文档跳转 |

