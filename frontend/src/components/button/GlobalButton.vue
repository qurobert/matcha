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
  button_class: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <button :type="isSubmit ? 'submit' : undefined"
          class="rounded-full text-xl"
          :class="{
            'px-10 py-1': size === 'sm',
            'px-16 py-2': size === 'md',
            [button_class]: button_class,
          }"
          @click="onClick"
  >
    {{text}}
  </button>
</template>

<style scoped>

</style>