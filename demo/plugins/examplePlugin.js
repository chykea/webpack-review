// plugin本质上是一个类
// 与loader别区别?
/**
 * 1. 执行的时机不同
 *  loader: 从编译入口出发开始构建依赖,对每一个文件都会进行下面的顺序
 *          - 调用NormalModule.build() 构建模块(每引用一个文件就是一个模块)
 *          - 对每一个模块调用runLoaders执行模块所匹配的loaders,获取经过loader处理后的模块源码
 *          - 调用this.parser.parse()解析处理后的模块源码,提取模块依赖
 *          - 对提取的模块依赖,再重复以上步骤
 *  plugin: 调用的时机比较灵活,实际上webpack在整个运行过程中,都会调用相应的钩子,可以选择对应的钩子去执行plugin
 *          - 在配置文件中,一般都是需要new一个Plugin的实例,在webpack读取配置文件时,会去获取这些实例
 *             
 *  2. loader一般是一个函数,plugin一般是一个对象
 */


/*
    一个最基本的 plugin 需要包含这些部分，在开发插件时需要注意：

        一个 JavaScript 类
        
        一个 apply 方法，apply 方法在 webpack 装载这个插件的时候被调用，并且会传入 compiler 对象。
        只要能拿到 Compiler 或 Compilation 对象，就能广播出新的事件，所以在新开发的插件中也能广播出事件，给其它插件监听使用。
        
        使用不同的 webpack 提供的 hooks 来指定自己需要发生的处理行为

        在异步调用时，异步的事件会附带两个参数，第二个参数为回调函数 callback，在插件处理完任务时需要调用回调函数通知 Webpack，才会进入下一处理流程。
        或者需要通过 return Promise 的方式。在下面会介绍 tapAsync 和 tapPromise 
*/


class BasicPlugin {
    constructor(options) {

    }
    // 其中必须实现一个 apply 方法，apply 方法接收 webpack 的 compiler 对象
    apply(compiler) {
        compiler.hooks.complication.tap('BasicPlugin', (complication) => {
            complication.hooks.optimize.tap("BasicPlugin", () => {
                console.log('plugin is running...');
                console.log('end');
            })
        })
    }
}

module.exports = BasicPlugin