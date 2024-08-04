<script setup lang="ts">
import ButtonForm from "@/components/forms/ButtonForm.vue";
import InputForm from "@/components/forms/InputForm.vue";
import {useForm} from 'vee-validate';
import {ref} from "vue";
import * as yup from 'yup';
import {signup} from "@/services/authService";

const schema = yup.object({
  email: yup.string()
  .email()
  .required("Email is required"),
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
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [username, usernameAttrs] = defineField('username')

const isValidate = ref(false);
const errorSignupMessage = ref("");
const onSubmit = handleSubmit(values => {
  const {email, username, password} = values;

  signup(email, username, password).then(() => {
    isValidate.value = true;
  }).catch(err => {
    errorSignupMessage.value = err;
  });
});
</script>

<template>
  <div class="relative">
    <h1 class="text-3xl text-center mt-4">Create account</h1>
    <div class="absolute top-[50%] md:left-[50%] w-full  md:translate-x-[-50%] translate-y-[-50%]">
      <form v-if="!isValidate" class="flex flex-col items-center" @submit.prevent="onSubmit">
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
        <p class="text-primary-100 mt-2" v-if="errorSignupMessage">
          {{errorSignupMessage}}
        </p>
        <ButtonForm text="Create account"/>
      </form>
      <div v-else>
        <h2 class="text-xl text-center">Email sent.</h2>
        <p class="text-center text-gray-100 mt-2">Please check your email to confirm your account.</p>
      </div>
    </div>
  </div>
</template>