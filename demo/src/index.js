
// import { other } from "./js/ohter";
// import './css/base.css'
// console.log('hello 153');
// other()

// 在配置文件中开启tree-shaking后,此时编译完成后文件为有这么一句注释
// /* unused harmony export add2 */
// 表示add2没有使用,这个注释能被Terser解析,比如这里写着num2无效,若设置了terser后,num2这个定义的代码也会删掉。
import { add1, add2 } from "./js/operation";

add1()