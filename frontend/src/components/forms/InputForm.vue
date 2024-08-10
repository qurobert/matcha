<script setup lang="ts">

defineProps({
  label: {
    type: String,
    default: "Label",
  },
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    default: "id_input",
  },
  placeholder: {
    type: String,
    default: "Placeholder",
  },
  mandatory: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: "",
  },
  bind: {
    type: Object,
    default: () => ({}),
  },
});

const model = defineModel();
</script>

<template>
  <div class="mt-6 w-full px-5 md:px-0 md:w-auto">
    <label :for="name"
           class="mb-2 block pl-3">
      {{label}}
      <span v-if="mandatory" class="text-secondary">*</span>
    </label>
    <input :type="type"
           :placeholder="placeholder"
           :name="name"
           class="border-2 border-gray-100 border-opacity-60
           placeholder:text-gray-0 placeholder:opacity-60
           rounded-full md:py-1 py-2 px-3 md:w-96 w-full block"
           v-model="model"
           v-bind="bind"
    />
    <span class="mt-1.5 pl-3 text-primary-100" v-if="errorMessage">{{errorMessage}}</span>
  </div>
</template>