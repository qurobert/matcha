<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from "@/components/MainHeader.vue";
import Footer from "@/components/MainFooter.vue";
import {Toaster, ToastProvider} from "@/components/ui/toast";
import {useRoute} from "vue-router";
import {useAuthStore} from "@/stores/userStore";

const route = useRoute();
const authStore = useAuthStore();
</script>

<template>
  <ToastProvider>
    <div class="h-screen flex flex-col"
    :class="{
      'bg-home bg-bottom': route.name === 'home' && !authStore.is_connected
    }"
    >
      <AppHeader />
      <main class="flex-1">
        <RouterView />
      </main>
      <Footer/>
      <Toaster />
    </div>
  </ToastProvider>
</template>