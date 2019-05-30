import Vue from 'vue'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default new Vue({
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
      cookies.set('token', {username, key});
    },
    clear: function () {
      this.username = null
      this.key = null
      cookies.remove('token')
    },
    checkCookies: function () {
      console.log('checkCookies')
      if (cookies.get('token')) {
        let {username, key} = cookies.get('token')
        this.setup(username, key)
      }
    }
  }
})