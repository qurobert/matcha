<script setup lang="ts">
import {FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import CreateProfileFormPage from "@/components/createProfile/utility/FormPageCreateProfile.vue";
import {usePictureCreateProfile} from "@/composables/useCreateProfile";
import * as yup from "yup";
import {ref} from 'vue'
import {useYup} from "@/composables/useYup";
import FormFieldPictures from "@/components/formField/FormFieldPictures.vue";


const {picturesSchema} = useYup();
const schema = yup.object().shape({
  pictures: picturesSchema
})

const {onSubmit, setFieldValue, values} = usePictureCreateProfile(schema);
</script>

<template>
  <p class="text-gray my-4">
    Upload 1 photo to start. Add 4 more to make your profile stand out
  </p>
  <CreateProfileFormPage :onsubmit="onSubmit" class="w-1/3">
    <FormFieldPictures :set-field-value="setFieldValue" :values="values" />
  </CreateProfileFormPage>
</template>