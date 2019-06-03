<template>
    <div>
        <div>
            <h2>Income</h2>
            <span>{{ totalIncome }}</span>
        </div>
        <div>
            <h2>Expense</h2>
            <span>{{ totalExpense }}</span>
        </div>
    </div>
</template>

<script>
  const sum = (sum, trans) => {
    return sum + trans.amount
  }

  export default {
    name: 'Total',
    props: ['transactions'],
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
    }
  }
</script>

<style scoped>

</style>