<script setup lang="ts">

import ButtonForm from "@/components/forms/ButtonForm.vue";
import InputForm from "@/components/forms/InputForm.vue";
</script>

<template>
  <div class="relative">
    <h1 class="text-3xl text-center mt-4">Log in</h1>
    <form class="absolute top-[50%] md:left-[50%] w-full flex flex-col md:translate-x-[-50%] translate-y-[-50%] items-center">
      <InputForm
          mandatory
          type="text"
          name="username"
          label="Username"
          placeholder="Enter your username"
      />
      <InputForm
          mandatory
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
      />
      <ButtonForm text="Log in"/>
      <p class="text-gray-100 mt-6">
        <span class="whitespace-pre">Forgot password ? </span>
        <RouterLink class="text-secondary underline" to="/forgot-password">Reset password here</RouterLink>
      </p>
    </form>
  </div>
</template>