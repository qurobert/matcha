<script setup lang="ts">
import type { PropType } from 'vue';

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
  <button :type="isSubmit ? 'submit' : undefined"
          class="background-gradient-primary text-light rounded-full text-xl"
          :class="{
            'px-10 py-1 text-lg': size === 'sm',
            'px-16 py-2 text-xl': size === 'md',
          }"
  @click="onClick"
  >
    {{text}}
  </button>

</template>

<style scoped>

</style>