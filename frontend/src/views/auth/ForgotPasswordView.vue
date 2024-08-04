<script setup lang="ts">

import ButtonForm from "@/components/forms/ButtonForm.vue";
import InputForm from "@/components/forms/InputForm.vue";
import {ref} from "vue";

const isSubmit = ref(false);
</script>

<template>
  <div class="relative">
    <h1 class="text-3xl text-center mt-4">Forgot password</h1>
    <div class="absolute top-[50%] md:left-[50%] w-full md:translate-x-[-50%] translate-y-[-50%]">
      <form v-if="!isSubmit" class="flex flex-col items-center">
        <InputForm
            mandatory
            type="email"
            name="email"
            label="Email"
            placeholder="Enter your email"
        />
        <ButtonForm text="Reset password"/>
      </form>
      <div v-else>
        <h2 class="text-xl">Email sent.</h2>
        <p class="text-center">If this email address was used to create an account, instructions to reset your password will be sent to you. Please check your email.</p>
      </div>
      <p class="text-gray-100 mt-6 text-center">
        <span class="whitespace-pre">
          Remember your password ?
        </span>
        <RouterLink class="text-secondary underline" to="/login">Log in here</RouterLink>
      </p>
    </div>

  </div>
</template>

<style scoped>

</style>