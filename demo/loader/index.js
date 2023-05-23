// 简单实现一个loader
// 定义好一个loader之后,需要在webpack.config.js中配置自定义loader的信息

// 不能是箭头函数,因为webpack在执行过程中,会改变loader的this指向loaderContext上下文,如果用箭头函数,this不会被修改
// 也因此loader中的this是有意义的
function loader(content, map, meta) {
    const logger = this.getLogger()
    logger.info('custom-loader is running')
    logger.info(content) // content就是所处理的文件中的内容
    this.callback(null, content, map, meta)
    return
}
module.exports = loader