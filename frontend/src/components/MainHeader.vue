<script setup lang="ts">
import {useAuthStore} from "@/stores/userStore";
import HeaderConnected from "@/components/headers/HeaderConnected.vue";
import HeaderGlobal from "@/components/headers/HeaderGlobal.vue";

const authStore = useAuthStore();

</script>

<template>
  <HeaderGlobal :class-for-nav="authStore.is_connected ? 'justify-between' : 'justify-center bg-transparent'">
      <HeaderConnected v-if="authStore.is_connected" />
  </HeaderGlobal>
</template>