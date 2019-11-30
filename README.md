## d3-demo

### 介绍
本项目为日常学习d3的练习demo

### 启动
```
npm start
```
### 自动更新最新目录
#### 修改下面文件的内容：
```js
//nodemon-server-template/start.js
var readFile = false; //--> true,不更新正常启动时，请置为false
var readpath = '/pages/d3-jt-book'  //--> 要读取的目录
var outportJson = 'pages/d3-jt-book/file.json' //--> 读取的目录数据存放地址
```
#### 使用jquery的tree插件，生产目录树，详细参考下面文件：
```js
//nodemon-server-template/pages/d3-jt-book/index.html
 $.getJSON("file.json", "", function(data) {　 
        var zNodes = _.uniqWith(data, _.isEqual);
        var t = $("#tree");
        $.fn.zTree.init(t, setting, zNodes);
      });
```