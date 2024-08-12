<script setup lang="ts">
import type { PropType } from 'vue';
import GlobalButton from "@/components/button/GlobalButton.vue";

defineProps({
  text: {
    type: String,
    default: "Submit",
  },
  isSubmit: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<"sm" | "md">,
    default: "md",
  },
  onClick: {
    type: Function as PropType<(payload: MouseEvent) => void>,
    default: () => {},
  },
});
</script>

<template>
  <GlobalButton :text="text" :is-submit="isSubmit" :size="size" :on-click="onClick" button_class="background-gradient-primary text-light"/>
</template>

<style scoped>

</style>