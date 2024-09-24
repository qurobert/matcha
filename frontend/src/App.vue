<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from "@/components/MainHeader.vue";
import Footer from "@/components/MainFooter.vue";

</script>

<template>
  <div class="h-screen flex flex-col">
    <AppHeader />
    <RouterView class="flex-1"/>
    <Footer />
  </div>
</template>