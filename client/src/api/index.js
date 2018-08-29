var baseUrl = 'http://127.0.0.1:7878';
if (process.env.NODE_ENV !== 'development') {
    baseUrl = 'http://192.168.181.159:7878'
}
module.exports = {
    baseUrl:baseUrl,
    getData:`${baseUrl}/getData`,
    uploadfile:`${baseUrl}/uploadfile`,
    download: `${baseUrl}/download`
}