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

/*
    Compiler 对象包含了 Webpack 环境所有的的配置信息，包含 options，loaders，plugins 这些信息，这个对象在 Webpack 启动时候被实例化，
    它是全局唯一的，可以简单地把它理解为 Webpack 实例；上面提到的 apply 方法传入的参数就是它

    Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等。当 Webpack 以开发模式运行时，每当检测到一个文件变化，一次新的 Compilation 将被创建。
    Compilation 对象也提供了很多事件回调供插件做扩展。通过 Compilation 也能读取到 Compiler 对象。

    Compiler 和 Compilation 的区别在于：
        Compiler 代表了整个 Webpack 从启动到关闭的生命周期，而 Compilation 只是代表了一次新的编译。

        源代码发生改变的时候就需要重新编译模块，但是compiler可以继续使用
        如果使用compiler则需要重新初始化注册所有plugin，但是plugin没必要重新注册
        (因为plugin主要是为了解决loader无法解决的事,loader一般用于将模块进行编译,而插件并不需要编译模块代码,所以对项目的代码并没有影响,所以不用重新初始化插件)
        这时候就需要创建一个新的compilation对象
        而只有修改新的webpack配置才需要重新运行 npm run build 来重新生成 compiler对象
*/

class BasicPlugin {
    static _defaultOptions = {}
    constructor(options) {
        this.options = {
            ...BasicPlugin._defaultOptions,
            ...options,
        }
    }
    // 其中必须实现一个 apply 方法，apply 方法接收 webpack 的 compiler 对象
    apply(compiler) {
        /**
         * 在compiler.hooks中可以找到webpack在运行过程中每个阶段的钩子函数()
         */
        console.log();
        // compiler.hooks.compilation.tap('BasicPlugin', (compilation) => {
        //     compilation.hooks.optimize.tap("BasicPlugin", () => {
        //         console.log('plugin is running...');
        //         console.log('read options', this.options);
        //         console.log('end');
        //     })
        // })
    }
}

module.exports = BasicPlugin