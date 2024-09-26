<script setup lang="ts">
const props = defineProps<{
  text: String;
  isValid: boolean;
  onSubmit: any;
}>();

</script>

<template>
  <div class="m-4 flex justify-between">
    <RouterLink to="/profile">
      <font-awesome-icon icon="xmark" class="w-6 h-6"/>
    </RouterLink>
    <p class="text-3xl">
      {{ props.text }}
    </p>
      <p
          class="text-lg cursor-pointer"
          :class="isValid ? 'text-gradient-primary' : 'text-gray-light'"
          @click="onSubmit"
      >
        Done
      </p>
  </div>
</template>