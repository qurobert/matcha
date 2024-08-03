<script setup lang="ts">

</script>

<template>
  <h1 class="text-3xl text-center mt-4">Log in</h1>
  <form class="flex flex-col items-center w-100 ">
    <label for="username" class="sr-only">Username</label>
    <input type="text" placeholder="Enter your username" id="username"/>
    <label for="password" class="sr-only">Password</label>
    <input type="password" placeholder="Password" id="password"/>
    <button type="submit" class="btn btn-primary">Log in</button>
  </form>
</template>

<style scoped>

</style>