<script setup lang="ts">
import type { PropType } from "vue";
import { useField, type YupSchema } from 'vee-validate'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  mandatory: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<"sm" | "md" | "lg">,
    default: "lg",
  },
  yupSchema: {
    type: Object as PropType<YupSchema>,
    required: true,
  },
});

const {value, errorMessage} = useField(props.name, props.yupSchema);
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
           rounded-full md:py-1 py-2 px-3 block w-full"
            :class="{
              'md:w-96': size === 'lg',
              'md:w-44': size === 'md',
            }"
           v-model="value"
    />
    <span class="mt-1.5 pl-3 text-primary-100" v-if="errorMessage">{{errorMessage}}</span>
  </div>
</template>