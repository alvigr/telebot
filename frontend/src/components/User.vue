<template>
    <div class="user">
        <Profile v-if="$user.authenticated"></Profile>
        <Login v-if="!$user.authenticated"></Login>
    </div>
</template>

<script>
  import Profile from './Profile'
  import Login from './Login'
  export default {
    name: 'User',
    components: { Login, Profile },
  }
</script>

<style scoped>

</style>