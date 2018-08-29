const fs = require("fs");
function delFile(){
    var dirArr = fs.readdirSync(__dirname+'/../static/download');
    var invalidArr = [];
    dirArr.forEach((item,index)=>{
        var name = item.split(".")[0] - 0;
       var timeDiff = new Date().getTime() - name;
       var validTime = 4*60*60*1000; //默认四个小时文件过期
       if(timeDiff>validTime){
            invalidArr.push(name);
       };
    });
        invalidArr.forEach((item,index)=>{
            //删除xls文件
           fs.unlinkSync(__dirname+'/../static/download/'+item+'.xlsx');
           // 删除txt文件
            fs.unlinkSync(__dirname+'/../uploads/'+item);
        });
}
module.exports = {
    delFile
}