<script setup lang="ts">
import {Button} from "@/components/ui/button";
import router from "@/router";
import CenterDiv from "@/components/utility/CenterDiv.vue";

const goToSignUp = () => {
  router.push("/signup");
}
const goToLogin = () => {
  router.push("/login");
}
</script>

<template>
<CenterDiv class="flex">
  <h1 class="text-9xl text-center pb-8 text-white font-bold">Swipe it</h1>
  <Button @click="goToSignUp" class="mb-4">
    Create an account
  </Button>
  <Button @click="goToLogin" size="sm">
    Login
  </Button>
</CenterDiv>
</template>
