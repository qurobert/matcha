<script setup lang="ts">
import {useAuthStore} from "@/stores/userStore";

const authStore = useAuthStore();
</script>

<template>
  <main>
    <h1 class="text-3xl text-center mt-4">Home</h1>
    <RouterLink to="/login" class="block text-gradient-primary cursor-pointer">Log in</RouterLink>
    <RouterLink to="/signup" class="block text-gradient-primary cursor-pointer">Sign up</RouterLink>
    <div v-if="authStore.email">
      {{authStore.email}}
      {{authStore.username}}
      {{authStore.verify_email}}
    </div>
    <div v-else>
      Not connected
    </div>
  </main>
</template>
