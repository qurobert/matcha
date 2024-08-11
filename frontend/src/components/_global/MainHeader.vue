<script setup lang="ts">
import {useAuthStore} from "@/stores/userStore";
import {ref, computed} from "vue";
import {useRoute} from "vue-router";
import HeaderConnected from "@/components/headers/HeaderConnected.vue";
import HeaderGlobal from "@/components/headers/HeaderGlobal.vue";
import HeaderDisconnected from "@/components/headers/HeaderDisconnected.vue";

const authStore = useAuthStore();
const route = useRoute();

const hideHeaderChildren = computed(() => {
  return route.meta.hideHeaderInfo || false;
})

</script>

<template>
  <HeaderGlobal :class-for-nav="hideHeaderChildren ? 'justify-center' : 'justify-between'">
    <template v-if="!hideHeaderChildren">
      <HeaderConnected v-if="authStore.is_connected" />
      <HeaderDisconnected v-else />
    </template>
  </HeaderGlobal>
</template>