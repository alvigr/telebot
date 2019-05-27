<template>
    <div class="history">
        <h2>History</h2>
        <TypeFilter v-on:select="onSelectType" :selected-type="selectedType"></TypeFilter>
        <Tags v-on:select="onSelectTag" :selected-tag="selectedTag" :tags="tags"></Tags>
        <div v-for="[month, transactions] in groupedByMonths">
            <h4>{{ month }}</h4>
            <ul>
                <li v-for="transaction in transactions">
                    {{ transaction.amount }}
                    <span v-if="transaction.comment">({{ transaction.comment }})</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
  import TypeFilter from './TypeFilter'
  import moment from 'moment'
  import Tags from './Tags'

  export default {
    name: 'History',
    components: { Tags, TypeFilter },
    props: ['transactions'],
    data: function () {
      return {
        selectedType: 'All',
        selectedTag: 'food',
      }
    },
    computed: {
      expense: function () {
        return this.transactionsWithTags.filter(trans => trans.amount < 0)
      },
      income: function () {
        return this.transactionsWithTags.filter(trans => trans.amount > 0)
      },
      filteredByType: function () {
        if (this.selectedType === 'Income') {
          return this.income
        }
        if (this.selectedType === 'Expense') {
          return this.expense
        }
        return this.transactionsWithTags
      },
      groupedByMonths: function () {
        const map = new Map()
        for (let transaction of this.filteredByTag) {
          let month = moment(transaction.created).format('MMMM YYYY')
          if (!map.has(month)) {
            map.set(month, [])
          }
          map.get(month).push(transaction)
        }
        return map
      },
      transactionsWithTags: function () {
        return this.transactions.map(transaction => {
          let comment = transaction.comment
          let tags = []
          if (comment === null || comment === '') {
            tags.push('none')
          } else {
            comment.split(', ').forEach( (tag) => {
              tags.push(tag)
            })
          }
          transaction.tags = tags
          return transaction
        })
      },
      tags: function () {
        const tagsSet = new Set()
        for (let {tags} of this.filteredByType) {
            tags.forEach((tag) => {
              tagsSet.add(tag)
            })
        }
        return tagsSet
      },
      filteredByTag: function () {
        return this.filteredByType.filter(transaction => transaction.tags.includes(this.selectedTag))
      },
    },
    methods: {
      onSelectType: function (type) {
        this.selectedType = type
      },
      onSelectTag: function (tag) {
        this.selectedTag = tag
      }
    }
  }
</script>

<style scoped>

</style>