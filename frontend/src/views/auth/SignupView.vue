<script setup lang="ts">
import InputForm from "@/components/forms/InputTextForm.vue";
import {useSignup} from "@/composables/useSignup";
import PrimaryButton from "@/components/button/PrimaryButton.vue";
import CenterDiv from "@/components/_global/CenterDiv.vue";
import {useYup} from "@/composables/useYup";
const {
  onSubmit,
  globalError
} = useSignup();

const {emailSchema, usernameSchema, passwordSchema} = useYup();
</script>

<template>
  <CenterDiv>
    <h1 class="text-3xl text-center mt-4">Create account</h1>
    <form class="flex flex-col items-center" @submit.prevent="onSubmit">
      <InputForm
          mandatory
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          :yup-schema="emailSchema"
      />
      <InputForm
          mandatory
          type="text"
          name="username"
          label="Username"
          placeholder="Enter your username"
          :yup-schema="usernameSchema"
      />
      <InputForm
          mandatory
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          :yup-schema="passwordSchema"
      />
      <p class="text-primary-100 mt-2" v-if="globalError">
        {{globalError}}
      </p>
      <PrimaryButton text="Create account" is-submit class="mt-6"/>
    </form>
  </CenterDiv>
</template>