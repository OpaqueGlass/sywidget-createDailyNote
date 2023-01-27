## 顶栏日记、闪卡、设置入口

### 使用说明

将本文件夹下的所有文件放置在`${思源工作空间}/widgets/createDailyNote/`目录下。

编辑`./src/config.js`，可以修改按钮显示与否。

设置`Alt+P`---外观---代码片段---JS---添加JS，将以下内容粘贴在代码片段中，启用代码片段，确定。

```javascript
import("/widgets/createDailyNote/src/addBarButton.js");
```

如果您遇到任何问题，请在设置`Alt+P`---外观---代码片段---JS 中删除对应的代码片段，然后重启思源。

或见[首次发布地址](https://ld246.com/article/1674026309504)。

### 参考 & 感谢

开发过程中参考了以下项目：

| 开发者       | 网页地址                                | 备注                         |
| ------------ | --------------------------------------- | ---------------------------- |
| BryceAndJuly | https://ld246.com/article/1662969146166 | 插入顶栏按钮、笔记本选择挂件 |
| Seven Chor   | https://github.com/svchord/Rem-Craft    | 插入顶栏按钮、笔记本选择挂件 |

