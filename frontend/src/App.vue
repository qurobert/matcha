<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from "@/components/MainHeader.vue";
import Footer from "@/components/MainFooter.vue";
import {Toaster, ToastProvider} from "@/components/ui/toast";

</script>

<template>
  <ToastProvider>
    <div class="h-screen flex flex-col ">
      <AppHeader />
      <main class="flex-1">
        <RouterView />
      </main>
      <Footer/>
      <Toaster />
    </div>
  </ToastProvider>
</template>