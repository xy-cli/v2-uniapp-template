/*
 * @Author: your name
 * @Date: 2021-11-19 12:53:39
 * @LastEditTime: 2021-11-26 13:50:31
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /uni-module/src/router/index.js
 */
const home = require('./path/home');
const common = require('./path/common');
const statistics = require('./path/statistics');
const profile = require('./path/profile');

module.exports = [
  ...home,
  ...common,
  ...statistics,
  ...profile,
]
