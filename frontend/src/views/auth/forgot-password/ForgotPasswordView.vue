<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {useForgotPassword} from "@/composables/useForgotPassword";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import CenterDiv from "@/components/utility/CenterDiv.vue";

const {onSubmit} = useForgotPassword();
</script>

<template>
  <CenterDiv>
    <form class="" @click.prevent="onSubmit">
      <h1 class="text-3xl text-center">Forgot password</h1>
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="Enter your email" v-bind="componentField" type="email" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="flex justify-center mt-8">
        <Button type="submit" size="sm" class="px-20">
          Reset password
        </Button>
      </div>
    </form>

    <p class="text-gray-100 mt-6 text-center">
      <span class="whitespace-pre">
        Remember your password ?
      </span>
      <RouterLink class="text-secondary underline" to="/login">Log in here</RouterLink>
    </p>
  </CenterDiv>

</template>

<style scoped>

</style>