<script setup lang="ts">

import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
</script>

<template>
  <div class="flex flex-col lg:flex-row md:w-auto w-full justify-between my-0">
    <FormField v-slot="{ componentField }" name="first_name">
      <FormItem class="lg:pr-1 lg:w-1/2">
        <FormLabel>First name *</FormLabel>
        <FormControl>
          <Input placeholder="First name" v-bind="componentField" type="text"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="last_name">
      <FormItem class="lg:pl-1 lg:w-1/2">
        <FormLabel>Last name *</FormLabel>
        <FormControl>
          <Input placeholder="Last name" v-bind="componentField" type="text"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </div>
</template>