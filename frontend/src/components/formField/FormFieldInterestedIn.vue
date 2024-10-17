<script setup lang="ts">
import {capitalizeFirstLetter} from "@/lib/utils";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Badge} from "@/components/ui/badge";
import { useField } from 'vee-validate';


const interestedInOptions = ['men', 'women', 'both'];
const { value, setValue } = useField('interested_in');
function onInterestedInClick(interestedIn: string) {
  setValue(interestedIn);
}
</script>

<template>
  <FormField name="interested_in">
    <FormItem>
      <FormLabel>Interested in *</FormLabel>
      <FormControl>
        <br/>
        <Badge
            v-for="interestedIn in interestedInOptions"
            :variant="value === interestedIn ? 'default' : 'outline'"
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