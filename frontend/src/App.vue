<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from "@/components/MainHeader.vue";
import Footer from "@/components/MainFooter.vue";

</script>

<template>
  <div class="h-screen flex flex-col ">
    <AppHeader />
    <main class="flex-1">
      <RouterView class="flex-grow"/>
    </main>
    <Footer/>
  </div>
</template>