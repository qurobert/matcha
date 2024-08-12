<script setup lang="ts">
import PrimaryButton from "@/components/button/PrimaryButton.vue";
import {useRouter} from "vue-router";

const router = useRouter();

const goToLogin = () => {

  router.push("/login");
}
</script>

<template>
  <PrimaryButton text="Login" :on-click="goToLogin" size="sm"/>
</template>

<style scoped>

</style>