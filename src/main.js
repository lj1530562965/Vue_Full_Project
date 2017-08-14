// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Validator from 'vue-validator'
Vue.use(Validator)
// 添加一个密码验证
// 匹配6-20位的任何字类字符，包括下划线。与“[A-Za-z0-9_]”等效。
Vue.validator('passw', function (val) {
  return /^(\w){6,20}$/.test(val)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
