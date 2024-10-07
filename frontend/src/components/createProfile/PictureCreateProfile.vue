<script setup lang="ts">
import CreateProfileFormPage from "@/components/createProfile/utility/FormPageCreateProfile.vue";
import {usePictureCreateProfile} from "@/composables/useCreateProfile";
import * as yup from "yup";
import {useYup} from "@/composables/useYup";
import FormFieldPictures from "@/components/formField/FormFieldPictures.vue";

const {picturesSchema} = useYup();
const schema = yup.object().shape({
  pictures: picturesSchema
})

const {onSubmit} = usePictureCreateProfile(schema);
</script>

<template>
  <p class="text-gray my-4 text-center">
    Upload 1 photo to start. Add 4 more to make your profile stand out
  </p>
  <CreateProfileFormPage :onsubmit="onSubmit">
    <FormFieldPictures max-height/>
  </CreateProfileFormPage>
</template>