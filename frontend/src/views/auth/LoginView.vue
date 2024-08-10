<script setup lang="ts">

import ButtonForm from "@/components/forms/ButtonForm.vue";
import InputForm from "@/components/forms/InputForm.vue";
import {useForm} from 'vee-validate';
import * as yup from 'yup';
import {login} from "@/services/auth";
import {useRouter} from "vue-router";

const router = useRouter();
const schema = yup.object({
  username: yup.string()
  .min(1, "Minimum 1 characters")
  .max(15, "Maximum 15 characters")
  .required("Username is required"),
  password: yup.string()
  .min(8, "Minimum 8 characters")
  .matches(/[A-Z]/, 'Minimum 1 uppercase letter')
  .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Minimum 1 special character')
  .required("Password is required"),
})
const {defineField, errors, handleSubmit} = useForm({
  validationSchema: schema
});

const [username, usernameAttrs] = defineField('username');
const [password, passwordAttrs] = defineField('password');

const onSubmit = handleSubmit(values => {
  const {username, password} = values;

  login(username, password).then(() => {
    router.push({name: 'profile'});
  }).catch(err => {
    console.log(err);
  });
});
</script>

<template>
  <div class="relative">
    <h1 class="text-3xl text-center mt-4">Log in</h1>
    <form class="absolute top-[50%] md:left-[50%] w-full flex flex-col md:translate-x-[-50%] translate-y-[-50%] items-center" @submit.prevent="onSubmit">
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
      <ButtonForm text="Log in"/>
      <p class="text-gray-100 mt-6">
        <span class="whitespace-pre">Forgot password ? </span>
        <RouterLink class="text-secondary underline" to="/forgot-password">Reset password here</RouterLink>
      </p>
    </form>
  </div>
</template>