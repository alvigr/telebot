<template>
    <div>
        <div class="form">
            <form>
                <select v-model="type" v-bind:disabled="addInProgress">
                    <option>Income</option>
                    <option>Expense</option>
                </select>
                <input class="amount" v-model="amount" type="number" placeholder="amount" v-bind:disabled="addInProgress"/>
                <input v-model="comment" type="text" placeholder="tags" v-bind:disabled="addInProgress"/>
                <button v-on:click="add">add</button>
            </form>
        </div>
        <History v-bind:transactions="transactions"></History>
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
</template>

<script>

  import History from './History'
  const sum = (sum, trans) => {
    return sum + trans.amount
  }


  export default {
    name: 'Transactions',
    components: { History },
    data: () => {
      return {
        type: 'Income',
        amount: null,
        comment: null,
        transactions: [],
        addInProgress: false,
      }
    },
    computed: {
      expense: function () {
        return this.transactions.filter(trans => trans.amount < 0)
      },
      income: function () {
        return this.transactions.filter(trans => trans.amount > 0)
      },
      totalExpense: function () {
        return this.expense.reduce(sum, 0) * (-1)
      },
      totalIncome: function () {
        return this.income.reduce(sum, 0)
      },
    },
    mounted: function () {
      this.loadTransactions()
    },
    methods: {
      add: function (event) {
        event.preventDefault()
        if (this.addInProgress) {
          return
        }
        console.log('add', this.type)
        if (this.amount === null || this.amount === '') {
          alert('You should set amount!')
          return
        }
        this.addInProgress = true
        let amount = this.amount * 1
        if (this.type === 'Expense') {
          amount = amount * (-1)
        }
        this.postTransaction({amount, comment: this.comment}).then((result) => {
          console.log('Clear')
          if (result !== false) {
            this.amount = null
            this.comment = null
          }
        })
      },
      loadTransactions: function () {
        console.log('Запрос стартовал')
        fetch('http://127.0.0.1:3000/transactions', {headers: {'Secret': this.$user.username + ':' + this.$user.key}}).then((response) => {
          response.json().then((data) => {
            this.transactions = data
          })
        } ).catch((error) => {
          alert('Произошла ошибка при загрузке данных')
          console.log(error)
        })
      },
      postTransaction: function (transaction) {
        console.log('Start')
        return  fetch('http://127.0.0.1:3000/transactions', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Secret': this.$user.username + ':' + this.$user.key
          },
          body: JSON.stringify(transaction)
        }).then((response) => {
          console.log('Добавлена запись')
          this.addInProgress = false
          this.loadTransactions()
          return response
        }).catch((error) => {
          this.addInProgress = false
          alert('Произошла ошибка при добавлении данных')
          console.log(error)
          return false
        })
      },
    }
  }
</script>

<style>
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
        min-width: 64px;
        color: #fff;
        background-color: #36ba53;
    }
    .summary {
        text-align: right;
    }
</style>
