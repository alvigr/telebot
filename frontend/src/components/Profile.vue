<template>
    <div class="profile">
        <p>
            {{ $user.username }}
            <button v-on:click="logout">Logout</button>
        </p>
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
.profile {
    text-align: right;
}
</style>