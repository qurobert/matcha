<script setup lang="ts">
import {useVerifyEmail} from "@/composables/useVerifyEmail";
import CenterDiv from "@/components/_global/CenterDiv.vue";

const {resendMail} = useVerifyEmail();
</script>

<template>
  <CenterDiv>
      <h1 class="text-3xl text-center my-4">Verification email</h1>
      <p class="text-gray-100 mt-2">
        Please check your email to confirm your account.<br>
        This page will refresh automatically once your email has been verified.
      </p>
      <p class="text-secondary underline mt-2 cursor-pointer" @click="resendMail">
        Resend email
      </p>
  </CenterDiv>
</template>