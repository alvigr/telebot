<template>
  <div id="app">
    <div class="grid-container">
    <div class="header">
      <h1>MoneyTracker</h1>
    </div>
    <div class="form">
      <form>
        <select v-model="type">
          <option>Income</option>
          <option>Expense</option>
        </select>
        <input class="amount" v-model="amount" type="number" placeholder="amount"/>
        <input v-model="comment" type="text" placeholder="comment"/>
        <button v-on:click="add">add</button>
      </form>
    </div>
    <div class="history">
      <h2>History</h2>
        <ul>
          <li v-for="transaction in transactions">
            {{ transaction.amount }}
            <span v-if="transaction.comment">({{ transaction.comment }})</span>
          </li>
        </ul>
      </div>
    <div class="summary">
       <div class="total">
         <h2>Income</h2>
         <span>{{ totalIncome }}</span>
       </div>
       <div class="total">
         <h2>Expense</h2>
         <span>{{ totalExpense }}</span>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
  const sum = (sum, trans) => {
    return sum + trans.amount
  }


export default {
  name: 'app',
  data: () => {
    return {
      type: 'Income',
      amount: null,
      comment: null,
      transactions: []
    }
  },
  computed: {
    totalExpense: function () {
      return this.transactions.filter(trans => trans.amount < 0).reduce(sum, 0) * (-1)
    },
    totalIncome: function () {
      return this.transactions.filter(trans => trans.amount > 0).reduce(sum, 0)
    }
  },
  mounted: function () {
    this.loadTransactions()
  },
  methods: {
    add: function (event) {
      event.preventDefault()
      console.log('add', this.type)

      if (this.amount === null) {
        alert('You should set amount!')
        return
      }
      let amount = this.amount * 1
      if (this.type === 'Expense') {
        amount = amount * (-1)
      }
      this.postTransaction({amount, comment: this.comment})
    },
    loadTransactions: function () {
      console.log('Запрос стартовал')
      fetch('http://127.0.0.1:3000/transactions').then((response) => {
        response.json().then((data) => {
          this.transactions = data
        })
      } )
    },
    postTransaction: function (transaction) {
      fetch('http://127.0.0.1:3000/transactions', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction)
      }).then((response) => {
        console.log('Добавлена запись')
        this.loadTransactions()
      })
    }
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
.form { grid-area: form; }
.history { grid-area: history; }
.summary { grid-area: summary; }

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

.grid-container > div {
  font-size: 16px;
}
.form {
  border: solid 1px #ced7e0;
  border-radius: 4px;
  padding: 8px;
}
  select, input, button {
    margin: 4px;
    border-radius: 4px;
    border: solid 1px #ced7e0;
  }
  select {
    height: 32px;
    width: 80px;
    padding-left: 4px;
  }
  input {
    height: 28px;
    padding-left: 8px;
    width: calc(100% - 336px);
    min-width: 120px;
  }
  .amount {
    width: 140px;
  }
  button {
    height: 32px;
    width: 64px;
    color: #fff;
    background-color: #36ba53;
  }
  .summary {
    text-align: right;
  }
</style>
