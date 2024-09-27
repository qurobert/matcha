<script setup lang="ts">
import {capitalizeFirstLetter} from "@/lib/utils";
const genderOptions = ['man', 'woman'];

const props = defineProps<{values: any, setFieldValue: Function}>();

function onGenderClick(gender: string) {
  props.setFieldValue('gender', gender);
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
            :variant="values.gender === gender ? 'default' : 'outline'"
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