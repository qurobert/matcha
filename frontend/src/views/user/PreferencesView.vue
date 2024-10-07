<script setup lang="ts">

import {Slider} from "@/components/ui/slider";
import {usePreferences} from "@/composables/usePreferences";
const {onSubmit} = usePreferences();
</script>

<template>
  <form @submit="onSubmit">
    <Slider class="w-32" :default-value="[18, 30]" :min=0 :step="1"/>
  </form>
</template>