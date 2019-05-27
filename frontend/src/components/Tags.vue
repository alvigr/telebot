<template>
    <div>
        <h2>Tags</h2>
        <div>
            <button
                    v-for="tag in tags"
                    v-on:click="select(tag)"
                    :class="{selected: tag === selectedTag}"
            >{{ tag }}</button>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Tags',
    props: ['selectedTag', 'tags'],
    methods: {
      select: function (tag) {
        this.$emit('select', tag)
      }
    }
  }
</script>

<style scoped>
    .selected {
        background-color: cornflowerblue;
    }
</style>