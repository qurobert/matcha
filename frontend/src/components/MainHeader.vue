<script setup lang="ts">
import {useAuthStore} from "@/stores/authStore";
import IconLogo from "@/components/icons/IconLogo.vue";
import HeaderConnected from "@/components/headers/HeaderConnected.vue";
import {useRoute} from "vue-router";
const authStore = useAuthStore();

const route = useRoute();
</script>

<template>
  <nav class="flex p-4 sticky top-0 bg-light z-50 items-center" :class="authStore.is_connected ? 'justify-between' : 'justify-center bg-transparent'" v-if="route.meta.hideHeader !== true">
    <RouterLink to="/" class="flex justify-center">
      <IconLogo :size="30" class="mr-2"/>
      <span class="text-gradient-primary text-3xl">Matcha</span>
    </RouterLink>

    <HeaderConnected v-if="authStore.is_connected" />
  </nav>
</template>