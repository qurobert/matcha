<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from "@/components/_global/MainHeader.vue";
import Footer from "@/components/_global/MainFooter.vue";

</script>

<template>
  <div class="h-screen flex flex-col">
    <AppHeader />
    <RouterView class="flex-1"/>
    <Footer />
  </div>
</template>