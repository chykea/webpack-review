
function loader(content) {
    const logger = this.getLogger()
    logger.info('style-loader is running');
    let script = `let style = document.createElement("style");
        style.innerHTML = ${JSON.stringify(content)}; document.head.appendChild(style);`
    return script;
}



// 当文件经过该loader进行处理时,会先执行pitch(loader-pitch),该方法绑定在loader身上
// 当pitch返回一个非空的值时,将会跳过后面的loader.pitch的执行
// 然后loader也从终端这里开始进行输出(中断这里的loader不会执行)
loader.pitch = function (remainingRequest, precedingRequest, data) {
    // 可以共享前面执行过的pitch-loader的信息
    const logger = this.getLogger()
    logger.info(1, remainingRequest)  // 请求路径,即处理文件的路径
    logger.info(2, precedingRequest)  // 
    logger.info(3, data)
}
module.exports = loader