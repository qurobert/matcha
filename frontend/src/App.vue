<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from "@/components/AppHeader.vue";
import Footer from "@/components/AppFooter.vue";

</script>

<template>
  <div class="h-screen flex flex-col">
    <AppHeader />
    <RouterView class="flex-1"/>
    <Footer />
  </div>
</template>