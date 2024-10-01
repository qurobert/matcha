<script setup lang="ts">
import {capitalizeFirstLetter} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";
import { useFieldArray } from "vee-validate";
import {computed} from 'vue'

const allFields = [
  'rock', 'electro', 'cooking', 'video games', 'science fiction',
  'book', 'drawing', 'yoga', 'jazz', 'comedy', 'gardening', 'politic',
  'museum', 'humor', 'history', 'mode', 'trip', 'action movie', 'boards games', 'horror', 'pop', 'painting', 'documentary'
];
const {fields, push, remove} = useFieldArray('interests');

console.log(fields.value);
function isInterestSelected(interest: string) {
  return computed(() => fields.value.some((element) => element.value === interest));
}

function onInterestClick(interest: string) {
  console.log(interest);
  const index = fields.value.findIndex((element) => element.value === interest);

  index !== -1 ?
      remove(index) :
      push(interest);
}

</script>

<template>
  <div class="flex flex-wrap w-full">
    <Badge v-for="interest in allFields" :key="interest" @click.prevent="onInterestClick(interest)" :variant="isInterestSelected(interest)?.value ? 'default' : 'outline'" class="m-1 cursor-pointer">
      {{ capitalizeFirstLetter(interest) }}
    </Badge>
  </div>
</template>