## d3-demo

### 介绍
本项目为日常学习d3的练习demo

### 启动
```
npm start
```
### 自动生成与更新最新目录
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
#### 生成目录方案
- node端：

//参考 d3-note-demo/start.js

fs获取本地目录文件夹内所有的html文件；

并通过小算法，将html文件按照 jquery.ztree 的要求转换成特定格式数据；

将数据生成json文件，以后web端ajax请求获取；

- web端：

//参考 d3-jt-book/index.html

通过ajax请求上面的json文件，获取文件信息；

渲染成目录树；

jquery.ztree给目录树每个节点都集成了点击事件；

在点击事件中 creatElement a节点，href属性定义为html的相对路径，触发click；

就跳转到指定的html显示；







