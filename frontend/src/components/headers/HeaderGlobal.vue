<script setup lang="ts">
import IconLogo from "@/components/icons/IconLogo.vue";

defineProps({
  classForNav: {
    type: String,
    default: "justify-center",
  },
})
</script>

<template>
  <nav class="flex p-4 sticky top-0 bg-light" :class="classForNav">
    <RouterLink to="/" class="flex flex-col">
      <IconLogo :size="30" class="mr-2"/>
      <span class="text-gradient-primary text-5xl">Matcha</span>
    </RouterLink>

    <slot></slot>
  </nav>
</template>

<style scoped>

</style>