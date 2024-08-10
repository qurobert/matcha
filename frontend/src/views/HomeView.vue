<script setup lang="ts">
import {useAuthStore} from "@/stores/userStore";
import {ref} from "vue";

const authStore = useAuthStore();

const [access_token, _ ] = authStore.token
const user = ref({
  email: authStore.email,
  username: authStore.username,
  verify_email: authStore.verify_email,
  token: !!access_token
});
</script>

<template>
  <main>
    <h1 class="text-3xl text-center mt-4">Home</h1>
    <RouterLink to="/login" class="block text-gradient-primary cursor-pointer">Log in</RouterLink>
    <RouterLink to="/signup" class="block text-gradient-primary cursor-pointer">Sign up</RouterLink>
    <p>
      {{user.email ? user : "No connected" }}
    </p>
  </main>
</template>
