<script setup lang="ts">
import * as yup from "yup";
import InputForm from "@/components/forms/InputTextForm.vue";

const schema = {
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  location: yup.string().required("Location is required"),
};
</script>

<template>
  <div class="flex md:w-auto w-full">
    <InputForm label="First name" name="firstName" placeholder="First name" class="md:mr-8" size="md" mandatory :yup-schema="schema.first_name" />
    <InputForm label="Last name" name="lastName" placeholder="Last name" size="md" mandatory :yup-schema="schema.last_name"/>
  </div>
  <InputForm label="Your location" name="location" :yup-schema="schema.location" placeholder="Enter your location" mandatory />
  <div class="flex">
<!--    <InputDate />-->
  </div>
</template>

<style scoped>

</style>