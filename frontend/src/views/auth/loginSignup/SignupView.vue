<script setup lang="ts">
import {useSignup} from "@/composables/useSignup";
import {Button} from "@/components/ui/button";
import CenterDiv from "@/components/utility/CenterDiv.vue";
import {Input} from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

const {
  onSubmit,
  errorOnSubmit
} = useSignup();


</script>

<template>
  <CenterDiv>
    <form @submit.prevent="onSubmit">
      <h1 class="text-3xl text-center">Create account</h1>
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="Enter your email" v-bind="componentField" type="email"/>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

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
          <FormLabel>Enter your password</FormLabel>
          <FormControl>
            <Input placeholder="Enter your password" v-bind="componentField" type="password" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="flex justify-center mt-8">
        <Button type="submit" size="sm" class="px-20">
          Create account
        </Button>
      </div>
      <p class="text-destructive mt-2" v-if="errorOnSubmit">
        {{errorOnSubmit}}
      </p>
    </form>
  </CenterDiv>
</template>