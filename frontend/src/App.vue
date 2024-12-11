<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from "@/components/MainHeader.vue";
import Footer from "@/components/MainFooter.vue";
import {Toaster, ToastProvider} from "@/components/ui/toast";
import {useRoute} from "vue-router";
import {useAuthStore} from "@/stores/authStore";

const route = useRoute();
const authStore = useAuthStore();
</script>

<template>
  <ToastProvider>
    <div class="h-screen flex flex-col"
    :class="{
      'bg-home bg-bottom mix-blend-overlay bg-cover': route.name === 'home' && !authStore.is_connected
    }"
    >
      <!-- Overlay uniquement si on est sur la page home et non connecté -->
      <div
          v-if="route.name === 'home' && !authStore.is_connected"
          class="absolute inset-0 bg-black/10 backdrop-blur-sm"
      ></div>
      <div v-if="route.name === 'home' && !authStore.is_connected" class="absolute bg-gradient-to-t from-[rgba(255,255,255,0)] to-black w-full h-full"></div>
<!--      -->
      <AppHeader />
      <main class="flex-1">
        <RouterView />
      </main>
      <Footer/>
      <Toaster />
    </div>
  </ToastProvider>
</template>
