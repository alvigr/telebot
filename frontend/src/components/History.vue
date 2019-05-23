<template>
    <div class="history">
        <h2>History</h2>
        <TypeFilter v-on:select="onSelectType" :selected-type="selectedType"></TypeFilter>
        <ul>
            <li v-for="transaction in filteredTransactions">
                {{ transaction.amount }}
                <span v-if="transaction.comment">({{ transaction.comment }})</span>
            </li>
        </ul>
    </div>
</template>

<script>
  import TypeFilter from './TypeFilter'

  export default {
    name: 'History',
    components: { TypeFilter },
    props: ['transactions'],
    data: function () {
      return {
        selectedType: 'All',
      }
    },
    computed: {
      expense: function () {
        return this.transactions.filter(trans => trans.amount < 0)
      },
      income: function () {
        return this.transactions.filter(trans => trans.amount > 0)
      },
      filteredTransactions: function () {
        if (this.selectedType === 'Income') {
          return this.income
        }
        if (this.selectedType === 'Expense') {
          return this.expense
        }
        return this.transactions
      },
    },
    methods: {
      onSelectType: function (type) {
        this.selectedType = type
      }
    }
  }
</script>

<style scoped>

</style>