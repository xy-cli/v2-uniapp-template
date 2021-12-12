/* eslint-disable */
const findEle = (parent, type) => {
  return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type)
}

const trigger = (el, type) => {
  const e = document.createEvent('HTMLEvents')
  e.initEvent(type, true, true)
  el.dispatchEvent(e)
}

const emoji = {
  bind: function (el, binding, vnode) {
    // 正则规则可根据需求自定义
    // const regRule = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig
    const regList = [
      { name: 'emoji', reg: /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\（\(\）\)]/g },
      { name: 'isNumAlphaCn', reg: /[^\a-\z\A-\Z0-9\u4E00-\u9FA5\（\(\）\)\,\，\、]/g },
      { name: 'isNumAlpha', reg: /[^\a-\z\A-\Z0-9]/g }
    ]
    const regName = binding.value ? binding.value.split(',').map(item => item.trim()) : ['emoji']
    const reg = regList.filter(item => regName.includes(item.name)) || regList[0]
    let $inp = findEle(el, 'input')
    if ($inp === null) {
      $inp = findEle(el, 'textarea')
    }
    el.$inp = $inp
    $inp.handle = function () {
      let val = $inp.value
      for (const item of reg) {
        val = val.replace(item.reg, '')
      }
      $inp.value = val
      trigger($inp, 'input')
    }
    $inp.addEventListener('blur', $inp.handle)
  },
  unbind: function (el) {
    el.$inp.removeEventListener('blur', el.$inp.handle)
  }
}

export default emoji
