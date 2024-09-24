<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {useRouter} from "vue-router";

const router = useRouter();

const goToLogin = () => {

  router.push("/login");
}
</script>

<template>
  <Button @click="goToLogin" size="sm">
    Login
  </Button>
</template>

<style scoped>

</style>