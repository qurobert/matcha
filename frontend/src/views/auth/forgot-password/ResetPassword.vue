<script setup lang="ts">
import PrimaryButton from "@/components/_global/PrimaryButton.vue";
import InputForm from "@/components/forms/InputForm.vue";
import {useResetPassword} from "@/composables/useForgotPassword";

const {
  code,
  codeAttrs,
  onSubmit,
  password,
  passwordAttrs,
  confirmPassword,
  confirmPasswordAttrs,
  errors
} = useResetPassword();
</script>

<template>
  <div class="relative">
    <div class="absolute top-[50%] md:left-[50%] w-full md:translate-x-[-50%] translate-y-[-50%]">
      <h1 class="text-3xl text-center mt-4">Forgot password</h1>
      <form class="flex flex-col items-center" @click.prevent="onSubmit">
        <p class="text-gray-100 mt-6 text-center w-80">
          If this email address was used to create an account, instructions to reset your password will be sent to you. Please check your email.
        </p>
        <InputForm
            mandatory
            type="text"
            name="code"
            label="Code"
            placeholder="Enter the code sent to your email"
            v-model="code"
            :bind="codeAttrs"
            :error-message="errors.code"
        />
        <InputForm
            mandatory
            type="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            v-model="password"
            :bind="passwordAttrs"
            :error-message="errors.password"
        />
        <InputForm
            mandatory
            type="password"
            name="confirm_password"
            label="Confirm Password"
            placeholder="Enter again your password"
            v-model="confirmPassword"
            :bind="confirmPasswordAttrs"
            :error-message="errors.confirmPassword"
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