<template>
    <div>
        <h4>{{ $user.username }}</h4>
        <button v-on:click="logout">Logout</button>
    </div>
</template>

<script>
  export default {
    name: 'Profile',
    methods: {
      logout: function () {
        this.$user.clear()
      }
    }
  }
</script>

<style scoped>

</style>