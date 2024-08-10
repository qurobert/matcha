<script setup lang="ts">
import {useVerifyEmail} from "@/composables/useVerifyEmail";

const {resendMail} = useVerifyEmail();
</script>

<template>
  <div class="relative">
    <h1 class="text-3xl text-center my-4">Verification email</h1>
    <div class="absolute top-[50%] md:left-[50%] w-full  md:translate-x-[-50%] translate-y-[-50%] text-center">
      <p class="text-gray-100 mt-2">
        Please check your email to confirm your account.<br>
        This page will refresh automatically once your email has been verified.
      </p>
      <p class="text-secondary underline mt-2 cursor-pointer" @click="resendMail">
        Resend email
      </p>
    </div>
  </div>
</template>