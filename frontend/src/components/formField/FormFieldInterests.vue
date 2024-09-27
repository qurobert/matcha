<script setup lang="ts">
import {capitalizeFirstLetter} from "@/lib/utils";
import {useInterest} from "@/composables/useInterest";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Badge} from "@/components/ui/badge";
const {interests, onInterestClick, values} = useInterest();
</script>

<template>
  <FormField name="interests">
    <FormItem>
      <FormLabel>Interests *</FormLabel>
      <FormControl >
        <div class="flex flex-wrap w-full">
          <Badge v-for="interest in interests" :key="interest" @click="onInterestClick(interest)" :variant="values?.interests?.includes(interest) ? 'default' : 'outline'" class="m-1 cursor-pointer">
            {{ capitalizeFirstLetter(interest) }}
          </Badge>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>