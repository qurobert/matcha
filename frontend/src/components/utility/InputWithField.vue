<script setup lang="ts">

import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
const props = withDefaults(defineProps<{
  name: string,
  label: string,
  placeholder: string
  type: string,
  class?: string,
  displayError?: boolean,
}>(), {
  displayError: true
});
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name" :class="props.class">
    <FormItem>
      <FormLabel :display-error="displayError">{{label}}</FormLabel>
      <FormControl>
        <Input :placeholder="placeholder"
               v-bind="componentField"
               :type="type"
               :autocomplete="type === 'password' ? 'new-password' : 'on'"
        />
      </FormControl>
      <FormMessage v-if="displayError"/>
    </FormItem>
  </FormField>
</template>