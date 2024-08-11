<script setup lang="ts">
defineProps({
  url_image: {
    type: String,
    default: 'https://www.gravatar.com/avatar/',
  }
});
</script>

<template>
    <img :src="url_image" alt="avatar" :class="`w-6 h-6 rounded-full`"/>
</template>