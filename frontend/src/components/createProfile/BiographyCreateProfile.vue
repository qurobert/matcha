<script setup lang="ts">
import CreateProfileFormPage from "@/components/createProfile/utility/FormPageCreateProfile.vue";
import {useBiographyCreateProfile} from "@/composables/useCreateProfile";
import * as yup from "yup";
import FormFieldBiography from "@/components/formField/FormFieldBiography.vue";

const schema = yup.object().shape({
  biography: yup.string().required("Biography is required").min(10, "Biography must be at least 10 characters"),
})

const {onSubmit} = useBiographyCreateProfile(schema);
</script>

<template>
  <CreateProfileFormPage :onsubmit="onSubmit">
    <FormFieldBiography />
  </CreateProfileFormPage>
</template>

<style scoped>

</style>