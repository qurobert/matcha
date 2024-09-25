<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {useLogin} from "@/composables/useLogin"
import CenterDiv from "@/components/utility/CenterDiv.vue";
import {Input} from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const {onSubmit, errorOnSubmit} = useLogin()


</script>

<template>
  <CenterDiv>
    <form @submit.prevent="onSubmit">
      <h1 class="text-3xl text-center">Log in</h1>

      <FormField v-slot="{ componentField }" name="username">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="Enter your username" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input placeholder="Enter your password" v-bind="componentField" type="password"/>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="flex justify-center mt-8">
        <Button type="submit" size="sm" class="px-20">
          Log in
        </Button>
      </div>

      <p class="text-destructive mt-2" v-if="errorOnSubmit">
        {{errorOnSubmit}}
      </p>
      <p class="text-gray-100 mt-6 text-center">
        <span class="whitespace-pre">Forgot password ? </span>
        <RouterLink class="text-secondary underline" to="/forgot-password">Reset password here</RouterLink>
      </p>
    </form>
  </CenterDiv>
</template>