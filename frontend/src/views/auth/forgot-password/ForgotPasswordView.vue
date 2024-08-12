<script setup lang="ts">
import InputForm from "@/components/forms/InputTextForm.vue";
import PrimaryButton from "@/components/button/PrimaryButton.vue";
import {useForgotPassword} from "@/composables/useForgotPassword";
import {useYup} from "@/composables/useYup";

const {onSubmit} = useForgotPassword();
const {emailSchema} = useYup();
</script>

<template>
  <div class="relative">
    <div class="absolute top-[50%] md:left-[50%] w-full md:translate-x-[-50%] translate-y-[-50%]">
      <h1 class="text-3xl text-center mt-4">Forgot password</h1>
      <form class="flex flex-col items-center" @click.prevent="onSubmit">
        <InputForm
            mandatory
            type="email"
            name="email"
            label="Email"
            placeholder="Enter your email"
            :yup-schema="emailSchema"
        />
        <PrimaryButton text="Reset password" is-submit  class="mt-6" />
      </form>
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