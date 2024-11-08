<script setup lang="ts">
import HomeDisconnected from "@/components/homePage/HomeDisconnected.vue";
import HomeConnected from "@/components/homePage/HomeConnected.vue";
import {useAuthStore} from "@/stores/authStore";

const authStore = useAuthStore();

</script>

<template>
  <home-disconnected v-if="!authStore.is_connected"/>
  <home-connected v-else/>
</template>
