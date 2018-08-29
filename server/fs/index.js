const fs = require("fs");
const { dealcText } = require("./cType");
const _ = require("lodash");
function dispatch(name){
    var data = fs.readFileSync(__dirname+`/../uploads/${name}.txt`,'utf8')
    var lines = data.split("\n");
     lines.splice(lines.length-1,1);
     const cDataArr = []; //c分类
     const eDataArr =[];  //信息抽取
     const commonArr = [] //数据公共的部分
    //对data进行分类处理
    data = lines.map((item,index)=>{
        let cArr = []; //c分类
        let eArr = []; //信息抽取
        let commonObj = {} //c分类信息抽取公共的部分
        item = _.attempt(JSON.parse.bind(null,item));
         //将对象值中为字符串的对象解析成对象
         _.forOwn(item,(value,key)=>{
             let cObj = {};
             let eObj = {};
             if(value.indexOf("analysisType")!==-1){
                 var tmpValue = _.attempt(JSON.parse.bind(null,value));
                 if(tmpValue.analysisType.toUpperCase() === 'C'){
                     cObj[key] = tmpValue;
                     cArr.push({commonObj,cObj});
                 }else if(tmpValue.analysisType.toUpperCase() === 'E'){
                     eObj[key] = tmpValue;
                     eArr.push({commonObj,eObj});
                 }
             }else{
                 commonObj[key] = value;
             }
         });
        cDataArr.push(cArr);
        eDataArr.push(eArr);
        // return JSON.parse(item);
    })
    dealcText(cDataArr,name)
}

module.exports = {
    dispatch
}