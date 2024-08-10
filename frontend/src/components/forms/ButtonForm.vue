<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: "Submit",
  },
});
</script>

<template>
  <button type="submit" class="mt-6 background-gradient-primary text-light rounded-full py-2 px-16 text-xl">{{text}}</button>
</template>

<style scoped>

</style>