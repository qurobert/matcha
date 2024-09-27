<script setup lang="ts">
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";

withDefaults(defineProps<{
  size: string,
}>(), {
  size: "w-96"
})
</script>

<template>
  <FormField v-slot="{ componentField }" name="biography">
    <FormItem>
      <FormLabel>Biography *</FormLabel>
      <FormControl>
          <Textarea
              placeholder="Tell us a little bit about yourself"
              class="resize w-96 h-44"
              :class="size"
              v-bind="componentField"
          />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>