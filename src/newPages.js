const fs = require('fs')
const pages = require('./router')
const tabBar = require('./utils/tabBar')
const data = {
  easycom: {
    '^u-(.*)': 'uview-ui/components/u-$1/u-$1.vue'
  },
  pages: pages,
  globalStyle: {
    maxWidth: 500,
    rpxCalcMaxDeviceWidth: 375,
    // #ifndef APP-PLUS
    navigationStyle: 'custom',
    // #endif
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: '#FFFFFF',
    backgroundColor: '#FFFFFF'
  },
  tabBar: {
    color: '#808b9a',
    selectedColor: '#4FC3FF',
    borderStyle: 'white',
    fontSize: '12px',
    backgroundColor: '#f9fafc',
    list: tabBar
  }
}
fs.writeFile(
  `${__dirname}/pages.json`,
  JSON.stringify(data),
  e => (e ? console.error(e) : console.log('pages.json 配置文件更新成功'))
)
