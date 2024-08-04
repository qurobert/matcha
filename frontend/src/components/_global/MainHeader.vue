<script setup lang="ts">
import {RouterLink} from "vue-router";
import IconLogo from "@/components/icons/IconLogo.vue";
</script>

<template>
    <nav class="flex justify-center py-3 sticky top-0 bg-light">
    <RouterLink to="/" class="flex">
        <IconLogo :size="30" class="mr-2"/>
        <span class="text-gradient-primary text-3xl">Matcha</span>
      </RouterLink>
    </nav>
</template>

<style scoped>

</style>