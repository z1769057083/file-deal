const router = require('koa-router')()
const multer = require('koa-multer');
const upload = multer({ dest: 'uploads/' });
router.post('/uploadfile',upload.single('avatar'), async function(ctx,next) {
    ctx.body = 'this is a users/bar response'
    console.log(123)
});
router.get('/download', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
})

module.exports = router
