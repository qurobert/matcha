<script setup lang="ts">
import {computed} from "vue";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import moment from 'moment';
import { useField } from 'vee-validate';

const { value, setValue } = useField('date');
let isFirstTime = true
const formattedDate = computed(() => {
  if (!isFirstTime)
    return ;

  isFirstTime = false;
  return value.value ? moment(value.value, 'DD/MM/YYYY').format('DD/MM/YYYY') : '';
});

function update(payload: string | number) {
  setValue(payload);
}
</script>

<template>
  <FormField name="date">
    <FormItem class="flex flex-col pb-4">
      <FormLabel>Date of birth *</FormLabel>
      <FormControl>
        <Input placeholder="DD/MM/YYYY" type="text" :modelValue="formattedDate" @update:modelValue="update"/>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>