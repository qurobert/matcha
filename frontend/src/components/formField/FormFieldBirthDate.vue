<script setup lang="ts">

import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
// moment(componentField, "DD/MM/YYYY", true)
</script>

<template>
  <FormField name="date" v-slot="{componentField}">
    <FormItem class="flex flex-col pb-4">
      <FormLabel>Date of birth *</FormLabel>
      <FormControl>
        <Input placeholder="DD/MM/YYYY" v-bind="componentField" type="text"/>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>