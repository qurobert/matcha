<script setup lang="ts">
import {useRoute} from "vue-router";
import {ref, watch} from "vue";

const route = useRoute();
enum Path {
  GLOBAL = "/",
  LOGIN = "/login",
  SIGNUP = "/signup"
}
const path = ref<Path>(Path.GLOBAL);

watch(() => route.path, (newPath) => {
  if (newPath === "/login") {
    path.value = Path.LOGIN;
  } else if (newPath === "/signup") {
    path.value = Path.SIGNUP
  } else {
    path.value = Path.GLOBAL;
  }
});

</script>

<template>
  <footer class="flex justify-center py-3 text-gray-100">

    <!-- Login footer -->
    <span class="whitespace-pre" v-if="path === Path.LOGIN">Need an account ? </span>
    <RouterLink class="text-secondary underline" v-if="path === Path.LOGIN" to="/signup"> Sign up here</RouterLink>

    <!-- Signup footer -->
    <span class="whitespace-pre" v-if="path === Path.SIGNUP">Already have an account ? </span>
    <RouterLink class="text-secondary underline" v-if="path === Path.SIGNUP" to="/login"> Log in here</RouterLink>

    <!-- Global footer -->
    <span class="whitespace-pre" v-if="path === Path.GLOBAL">© Matcha - Ecole 42, 2024</span>
  </footer>
</template>

<style scoped>

</style>