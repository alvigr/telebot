import Vue from 'vue'
import App from './App.vue'
import User from './user'

Vue.config.productionTip = false
Vue.prototype.$user = User

new Vue({
  created: function () {
    this.$user.checkCookies()
  },
  render: h => h(App),
}).$mount('#app')
