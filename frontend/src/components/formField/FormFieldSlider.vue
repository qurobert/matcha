<script setup lang="ts">
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Slider} from "@/components/ui/slider";
import {useField} from 'vee-validate'
import _ from 'lodash';
const props = defineProps({

  name: String,
  label: String,
  min: Number,
  max: Number,
  step: Number,
  prefixValue: {
    type: String,
    required: false
  }
});
const {value} = useField(props.name ?? '');

</script>

<template>
  <div class="my-8">
    <FormField  v-slot="{ componentField }" :name="name ?? ''">
      <FormItem>
        <div class="w-full flex justify-between">
          <FormLabel>{{label}}</FormLabel>
          <p class="text-sm text-gray">
            {{_.isArray(value) ? value.join('-') : value }}
            {{prefixValue ? prefixValue : ''}}
          </p>
        </div>
        <FormControl>
          <Slider class="w-full" :default-value="_.toArray(value)" :min=min :max=max :step=step v-bind="componentField"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </div>
</template>