// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import verify from 'vue-verify-plugin'
var myRules = {
  max6: {
    test: function (val) {
      if (val.length > 6) {
        return false
      }
      return true
    },
    message: '最大为6位'
  },
  phone: {
    test: /^1[34578]\d{9}$/,
    message: '电话号码格式不正确'
  }
}
Vue.use(verify, {
  rules: myRules, // 自定义验证方法
  blur: true // 失去焦点时 是否开启验证
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
