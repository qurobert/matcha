<script setup lang="ts">
import { onMounted, ref } from 'vue';

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
onMounted(() => {
  document.addEventListener('click', (e) => {
    // @ts-ignore
    if (!e.target.closest('.relative')) {
      isOpen.value = false;
    }
  });
});

</script>

<template>
  <div class="relative">
    <button @click="toggleDropdown" type="button" class="">
        <slot name="default"></slot>
    </button>
    <div v-if="isOpen" class="absolute flex flex-col right-0 z-10 mt-2 w-56 py-2 origin-top-right rounded-md bg-light shadow-lg focus:outline-none">
        <slot name="dropdown-content"></slot>
    </div>
  </div>
</template>