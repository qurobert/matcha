<script setup lang="ts">
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Slider} from "@/components/ui/slider";
import _ from 'lodash';
defineProps({

  name: String,
  label: String,
  defaultValue: {
    type: Array<number>,
    required: true
  },
  min: Number,
  max: Number,
  step: Number,
  prefixValue: {
    type: String,
    required: false
  }
});

</script>

<template>
  <div class="my-8">
    <FormField v-slot="{ componentField }" :name="name ?? ''">
      <FormItem>
        <div class="w-full flex justify-between">
          <FormLabel>{{label}}</FormLabel>
          <p class="text-sm text-gray">
            {{_.isArray(defaultValue) ? defaultValue.join('-') : defaultValue }}
            {{prefixValue ? prefixValue : ''}}
          </p>
        </div>
        <FormControl>
          <Slider class="w-full" :default-value="defaultValue" :min=min :max=max :step=step v-bind="componentField"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </div>
</template>