<script setup lang="ts">
import CreateProfileFormPage from "@/components/createProfile/utility/FormPageCreateProfile.vue";
import {useBiographyCreateProfile} from "@/composables/useCreateProfile";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import * as yup from "yup";

const schema = yup.object().shape({
  biography: yup.string().required("Biography is required").min(10, "Biography must be at least 10 characters"),
})

const {onSubmit} = useBiographyCreateProfile(schema);
</script>

<template>
  <CreateProfileFormPage :onsubmit="onSubmit">
    <FormField v-slot="{ componentField }" name="biography">
      <FormItem>
        <FormLabel>Biography *</FormLabel>
        <FormControl>
          <Textarea
              placeholder="Tell us a little bit about yourself"
              class="resize w-96 h-44"
              v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </CreateProfileFormPage>
</template>

<style scoped>

</style>