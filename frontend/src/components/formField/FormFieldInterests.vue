<script setup lang="ts">
import {capitalizeFirstLetter} from "@/lib/utils";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Badge} from "@/components/ui/badge";
import { useFieldArray } from "vee-validate";
import {useFields} from "@/composables/useInterest";
import {computed} from 'vue'

const allFields = useFields();
const {fields, insert, remove} = useFieldArray('interests');

console.log(fields.value);
function isInterestSelected(interest: string) {
  return computed(() => fields.value.some((element) => element.value === interest));
}

function onInterestClick(interest: string) {
  const index = fields.value.findIndex((element) => element.value === interest);

  index !== -1 ?
      remove(index) :
      insert(fields.value.length, interest);
}

</script>

<template>
      <FormLabel>Interests *</FormLabel>
        <div class="flex flex-wrap w-full">
          <Badge v-for="interest in allFields" :key="interest" @click.prevent="onInterestClick(interest)" :variant="isInterestSelected(interest).value ? 'default' : 'outline'" class="m-1 cursor-pointer">
            {{ capitalizeFirstLetter(interest) }}
          </Badge>
        </div>
      <FormMessage />
</template>