<script setup lang="ts">
import InputForm from "@/components/forms/InputTextForm.vue";
import PrimaryButton from "@/components/button/PrimaryButton.vue";
import {useLogin} from "@/composables/useLogin"
import CenterDiv from "@/components/_global/CenterDiv.vue";
import {useYup} from "@/composables/useYup";

const {onSubmit, globalError} = useLogin()
const {usernameSchema, passwordSchema} = useYup();

</script>

<template>
  <CenterDiv>
    <form @submit.prevent="onSubmit" class="">
      <h1 class="text-3xl text-center mt-4">Log in</h1>
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
      <div class="flex justify-center">
        <PrimaryButton text="Log in" is-submit class="mt-6"/>
      </div>
      <p class="text-primary-100 mt-2" v-if="globalError">
        {{globalError}}
      </p>
      <p class="text-gray-100 mt-6 text-center">
        <span class="whitespace-pre">Forgot password ? </span>
        <RouterLink class="text-secondary underline" to="/forgot-password">Reset password here</RouterLink>
      </p>
    </form>
  </CenterDiv>
</template>