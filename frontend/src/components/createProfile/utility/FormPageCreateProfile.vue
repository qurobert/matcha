<script setup lang="ts">
import FooterCreateProfile from "@/components/createProfile/utility/FooterCreateProfile.vue";

defineEmits(['submit']);
</script>

<template>
  <form @submit.prevent="onSubmit">
    <slot />
    <FooterCreateProfile />
  </form>
</template>

<style scoped>

</style>