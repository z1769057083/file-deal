const router = require('koa-router')()
const multer = require('koa-multer');
const path = require("path");
const fs = require("fs");
const upload = multer({ dest: __dirname+'/../uploads/' });
const { dispatch } = require("../fs");
var name = ''
    router.post('/uploadfile',upload.single('avatar'), async function(ctx,next) {
        const file = ctx.request.files.file; // 获取上传文件
        // const ext = file.name.split('.').pop(); // 获取上传文件扩展名
         name = new Date().getTime().toString();
       await new Promise((resolve,reject)=>{
            const reader = fs.createReadStream(file.path); // 创建可读流
            const upStream = fs.createWriteStream(__dirname + `/../uploads/${name}.txt`); // 创建可写流
            reader.pipe(upStream);
            upStream.on("close",()=>{
                resolve(name)
                console.log("文件创建完成")
            })
        }).then((resolve,reject)=>{
           dispatch(name);
        })
        ctx.response.type = 'json';
        ctx.response.body = {
            success: true,
            path: name+'.xlsx'
        }


});
router.get("/getData",(ctx,next)=>{
    const page = ctx.request.query.page-0;
    const pageSize = ctx.request.query.pageSize-0;
    try{
        const data = fs.readFileSync(__dirname+`/../uploads/${name}.txt`,'utf8');
        const lines = data.split("\n");
        var resData = lines.slice((page-1)*pageSize,page*pageSize)
        resData = resData.map((item,index)=>{
            if(item&&item.length !== 0){
                return JSON.parse(item);
            }
        });
        ctx.response.type = 'json';
        ctx.response.body  = {
            total:lines.length,
            data:resData,
            success:true
        }
    }catch(e){
        ctx.response.body  = {
            data:'文件已过期,请重新上传',
            success:false
        }
    }


});

module.exports = router
