export const getQueryStringArgs = () => {
  const qs = (location.search.length > 0 ? location.search.substring(1) : '')
  // 保存数据的对象
  const args = {}
  // 取得每一项
  const items = qs.length ? qs.split('&') : []
  let item = null
  let name = null
  let value = null
  // 在 for 循环中使用
  let i = 0
  const len = items.length
  // 逐个将每一项添加到 args 对象中
  for (i = 0; i < len; i++) {
    item = items[i].split('=')
    name = decodeURIComponent(item[0])
    value = decodeURIComponent(item[1])
    if (name.length) {
      args[name] = value
    }
  }
  return args
}
