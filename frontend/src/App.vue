<template>
  <div id="app">
    <div class="grid-container">
      <div class="header">
        <h1>MoneyTracker</h1>
      </div>
      <User v-on:login="onLogin" v-on:logout="onLogout"></User>
      <Transactions v-if="authenticated" :user="user"></Transactions>
    </div>
  </div>
</template>

<script>

  import Transactions from './components/Transactions'
  import User from './components/User'

export default {
  name: 'app',
  components: {Transactions, User},
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
    },
    onLogout: function () {
      this.user = {}
      this.authenticated = false
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  margin: 0;
}
.header { grid-area: header; }

.grid-container {
  display: grid;
  grid-template-areas:
          'header header header header header header header header'
          'form form form form form summary summary summary'
          'history history history history history summary summary summary';
  grid-gap: 16px;
  padding: 16px;
  max-width: 784px;
  margin: auto;
}

.grid-container {
  font-size: 16px;
}
</style>
