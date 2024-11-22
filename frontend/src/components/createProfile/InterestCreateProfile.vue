<script setup lang="ts">
import CreateProfileFormPage from "@/components/createProfile/utility/FormPageCreateProfile.vue";
import FormFieldInterests from "@/components/formField/FormFieldInterests.vue";
import {FormControl, FormField, FormItem, FormMessage, FormLabel} from "@/components/ui/form";
import {useInterestCreateProfile} from "@/composables/useCreateProfile";
import {useYup} from "@/composables/useYup";
import * as yup from "yup";

const {interestsSchema} = useYup();
const interestCreateProfileSchema = yup.object().shape({
  interests: interestsSchema,
});
const {onSubmit} = useInterestCreateProfile(interestCreateProfileSchema);
</script>

<template>
  <CreateProfileFormPage :onsubmit="onSubmit" class="w-auto m-4 md:w-2/3 px-5 lg:w-1/3 flex justify-center flex-col">

    <FormField name="interests">
      <FormItem class="flex flex-col pb-4">
        <FormLabel>Interests *</FormLabel>
        <FormControl>
          <FormFieldInterests name="interests"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

  </CreateProfileFormPage>
</template>

<style scoped>

</style>