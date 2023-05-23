// loader本质上是一个函数
// loader有同步和异步loader
// 同步loader可以通过return 或this.callback来返回loader转换后的结果
/*
function loader(content, map, meta) {
  return syncFn(content)
}
或者

function loader(content, map, meta) {
  this.callback(null, syncFn(content), map, meta)
  return // 当调用 `this.callback()` 函数时，总是返回 undefined
}

*/
// 对于异步 loader 而言，使用 this.async() 来获取 callback() 函数，然后再返回结果的时候调用
/*
async function loader(content, map, meta) {
  const callback = this.async()

  let result
  try {
    result = await asyncFn(content)
  } catch (error) {
    callback(error)
  }

  callback(null, result, map, meta)
}

*/
// 不管是同步 Loader 还是异步 Loader，其回调函数 callback() 都使用 Error-First 风格，
// 即第一个参数为错误信息，如果没有错误，则设置为 null

