
require('./server/static-best.js') //主域名访问：最佳方式

var readFile = true;
var readpath = '/pages/d3-jt-book'
if(readFile){
    var fs = require('fs');
var path = require('path');
var _ = require('lodash');
 
function readFileList(dir, filesList = []) {
    const files = fs.readdirSync(dir);
    files.forEach((item, index) => {
        var fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {      
            readFileList(path.join(dir, item), filesList);  //递归读取文件
        } else {                
            filesList.push(fullPath);                     
        }        
    });
    return filesList;
}
 
var filesList = [];
readFileList(path.join(__dirname, readpath),filesList);
filesList=filesList.map(i=> i.split('d3-jt-book/')[1]).filter(i=>{
    return i.includes('.html') && i.includes('/')
});


filesList = filesList.reduce((acc, path)=>{
    const result = path.split('/').map((t,idx, originarr)=>{
        if(idx===0){
            return {id: t, pId: 0, name: t}
        }
        // console.log(idx)
        if(idx === originarr.length-1){
            console.log(path)
            return {id: path, pId: originarr[idx-1], name: t}
        }
        return {id: t, pId: originarr[idx-1], name: t}
    })
    acc = [...acc, ...result];
    return acc;
}, [])
console.log(filesList);

 //因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
 var str = JSON.stringify(filesList);
 fs.writeFile(path.resolve(__dirname, "pages/d3-jt-book/file.json"), str, function (err,                     
    data) {
   if (err) {
    //    pages/d3-jt-book/file.json
     console.error(err);
   }
   console.log('----------新增成功-------------');
 })
}

