/*
 * @Author: your name
 * @Date: 2021-11-01 15:58:31
 * @LastEditTime: 2022-08-08 11:17:19
 * @LastEditors: ss shangs@schbrain.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /uni-module/src/newPages.js
 */
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
