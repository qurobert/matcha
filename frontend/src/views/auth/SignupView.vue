<script setup lang="ts">
import ButtonForm from "@/components/forms/ButtonForm.vue";
import InputForm from "@/components/forms/InputForm.vue";
import {useSignup} from "@/composables/useSignup";
const {
  email,
  emailAttrs,
  username,
  usernameAttrs,
  password,
  passwordAttrs,
  onSubmit,
  errors,
  globalError
} = useSignup();
</script>

<template>
  <div class="relative">
    <h1 class="text-3xl text-center mt-4">Create account</h1>
    <div class="absolute top-[50%] md:left-[50%] w-full  md:translate-x-[-50%] translate-y-[-50%]">
      <form class="flex flex-col items-center" @submit.prevent="onSubmit">
        <InputForm
            mandatory
            type="email"
            name="email"
            label="Email"
            placeholder="Enter your email"
            v-model="email"
            :bind="emailAttrs"
            :error-message="errors.email"
        />
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
        <p class="text-primary-100 mt-2" v-if="globalError">
          {{globalError}}
        </p>
        <ButtonForm text="Create account"/>
      </form>
    </div>
  </div>
</template>