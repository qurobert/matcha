<script setup lang="ts">
const props = defineProps<{
  text: String;
  hasWritten: boolean;
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
          :class="{
             'text-gradient-primary' : isValid && hasWritten,
             'text-gray-light' : !isValid || !hasWritten,
          }"

          @click="onSubmit"
      >
        Done
      </p>
  </div>
</template>