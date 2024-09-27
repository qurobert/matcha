<script setup lang="ts">
import {capitalizeFirstLetter} from "@/lib/utils";
const interestedInOptions = ['men', 'women', 'both'];

const props = defineProps<{values: any, setFieldValue: Function}>();
function onInterestedInClick(interestedIn: string) {
  props.setFieldValue('interestedIn', interestedIn);
}
</script>

<template>
  <FormField name="interestedIn">
    <FormItem>
      <FormLabel>Interested in *</FormLabel>
      <FormControl>
        <br/>
        <Badge
            v-for="interestedIn in interestedInOptions"
            :variant="values.interestedIn === interestedIn ? 'default' : 'outline'"
            @click="() => onInterestedInClick(interestedIn)"
            class="cursor-pointer mr-2 text-sm px-6"
        >
          {{ capitalizeFirstLetter(interestedIn) }}
        </Badge>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>