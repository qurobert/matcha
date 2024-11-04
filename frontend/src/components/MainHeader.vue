<script setup lang="ts">
import {useAuthStore} from "@/stores/userStore";
import {computed} from "vue";
import {useRoute} from "vue-router";
import HeaderConnected from "@/components/headers/HeaderConnected.vue";
import HeaderGlobal from "@/components/headers/HeaderGlobal.vue";

const authStore = useAuthStore();
const route = useRoute();

const hideHeaderChildren = computed(() => {
  return route.meta.hideHeaderInfo || false;
})
</script>

<template>
  <HeaderGlobal class-for-nav='justify-center' class="bg-transparent">
    <template v-if="!hideHeaderChildren">
      <HeaderConnected v-if="authStore.is_connected" />
    </template>
  </HeaderGlobal>
</template>