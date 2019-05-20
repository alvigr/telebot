import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$user = new Vue({
  data: function () {
    return {
      username: null,
      key: null
    }
  },
  computed: {
    authenticated: function () {
      return this.username !== null
    }
  },
  methods: {
    setup: function (username, key) {
      this.username = username
      this.key = key
    },
    clear: function () {
      this.username = null
      this.key = null
    }
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
