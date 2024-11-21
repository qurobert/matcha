<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {useResetPassword} from "@/composables/useForgotPassword";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import CenterDiv from "@/components/utility/CenterDiv.vue";

const {onSubmit, errorOnSubmit} = useResetPassword();

</script>

<template>
    <CenterDiv>
      <form @click.prevent="onSubmit">
        <h1 class="text-3xl text-center">Forgot password</h1>
        <p class="text-gray-100 mt-6 text-center w-80">
          If this email address was used to create an account, instructions to reset your password will be sent to you. Please check your email.
        </p>
        <FormField v-slot="{ componentField }" name="code">
          <FormItem>
            <FormLabel>Code</FormLabel>
            <FormControl>
              <Input placeholder="Enter the code sent by email" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input placeholder="Enter your password" v-bind="componentField" type="password" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="confirm_password">
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input placeholder="Enter again your password" v-bind="componentField" type="password" />
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

      <p class="text-destructive mt-2" v-if="errorOnSubmit">
        {{errorOnSubmit}}
      </p>

      <p class="text-gray-100 mt-6 text-center">
        <span class="whitespace-pre">
          Remember your password ?
        </span>
        <RouterLink class="text-secondary underline" to="/login">Log in here</RouterLink>
      </p>
    </CenterDiv>

</template>