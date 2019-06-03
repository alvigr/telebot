<template>
  <div id="app">
    <div class="grid-container">
      <div class="header">
        <h1>MoneyTracker</h1>
      </div>
      <User class="user"></User>
      <Transactions v-if="$user.authenticated" class="transactions"></Transactions>
    </div>
  </div>
</template>

<script>

  import Transactions from './components/Transactions'
  import User from './components/User'

export default {
  name: 'app',
  components: {Transactions, User},
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
.header {
  grid-area: header;
}
.grid-container {
  display: grid;
  grid-template-columns: 65% auto;
  grid-template-rows: 124px auto;
  grid-template-areas:
          'header user'
          'transactions transactions';
  grid-gap: 16px;
  padding: 16px;
  max-width: 784px;
  margin: auto;
}
.grid-container {
  font-size: 16px;
}
</style>
