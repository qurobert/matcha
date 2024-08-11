<script setup lang="ts">
import InputForm from "@/components/forms/InputForm.vue";
import PrimaryButton from "@/components/_global/PrimaryButton.vue";
import {useLogin} from "@/composables/useLogin"

const {
  username,
  password,
  usernameAttrs,
  passwordAttrs,
  errors,
  onSubmit
} = useLogin()
</script>

<template>
  <div class="relative">
    <form class="absolute top-[50%] md:left-[50%] w-full flex flex-col md:translate-x-[-50%] translate-y-[-50%] items-center" @submit.prevent="onSubmit">
    <h1 class="text-3xl text-center mt-4">Log in</h1>
      <InputForm
          mandatory
          type="text"
          name="username"
          label="Username"
          placeholder="Enter your username"
          v-model="username"
          :bind="usernameAttrs"
          :error-message="errors.username"
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
      <PrimaryButton text="Log in" is-submit class="mt-6"/>
      <p class="text-gray-100 mt-6">
        <span class="whitespace-pre">Forgot password ? </span>
        <RouterLink class="text-secondary underline" to="/forgot-password">Reset password here</RouterLink>
      </p>
    </form>
  </div>
</template>