<template>
    <div>
        <Profile v-if="authenticated" :user="user" v-on:logout="onLogout"></Profile>
        <Login v-if="!authenticated" v-on:login="onLogin"></Login>
    </div>
</template>

<script>
  import Profile from './Profile'
  import Login from './Login'
  export default {
    name: 'User',
    components: { Login, Profile },
    data: () => {
      return {
        user: {},
        authenticated: false
      }
    },
    methods: {
      onLogin: function (user) {
        this.user = user
        this.authenticated = true
        this.$emit('login', user)
      },
      onLogout: function () {
        this.user = {}
        this.authenticated = false
        this.$emit('logout')
      }
    }
  }
</script>

<style scoped>

</style>