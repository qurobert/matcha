<script setup lang="ts">
import {capitalizeFirstLetter} from "@/lib/utils";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Badge} from "@/components/ui/badge";

const genderOptions = ['man', 'woman'];
import { useField } from 'vee-validate';

const { value, setValue } = useField('gender');
function onGenderClick(gender: string) {
  setValue(gender);
}
</script>

<template>
  <FormField name="gender">
    <FormItem>
      <FormLabel>Gender *</FormLabel>
      <FormControl>
        <br/>
        <Badge
            v-for="gender in genderOptions"
            :variant="value === gender ? 'default' : 'outline'"
            @click="() => onGenderClick(gender)"
            class="cursor-pointer mr-2 text-sm px-6"
        >
          {{ capitalizeFirstLetter(gender) }}
        </Badge>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>