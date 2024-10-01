<script setup lang="ts">
import {ref, onMounted} from "vue";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import moment from 'moment';
import { useField } from 'vee-validate';
const { value, setValue } = useField('date_of_birth');
const formattedDate = ref<string>('');
onMounted(() => {
  formattedDate.value = value.value ? moment(value.value, 'YYYY-MM-DD').format('DD/MM/YYYY') : '';
});

function update(payload: string | number) {
  setValue(moment(payload, 'DD/MM/YYYY').format('YYYY-MM-DD'));
}
</script>

<template>
  <FormField name="date_of_birth">
    <FormItem class="flex flex-col pb-4">
      <FormLabel>Date of birth *</FormLabel>
      <FormControl>
        <Input placeholder="DD/MM/YYYY" type="text" :modelValue="formattedDate" @update:modelValue="update"/>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>