<script setup lang="ts">
import {useYup} from "@/composables/useYup";
import * as yup from "yup";
import CreateProfileFormPage from "@/components/createProfile/utility/FormPageCreateProfile.vue";
import MapLocation from "@/components/createProfile/utility/MapLocation.vue";
import {useInfoCreateProfile} from "@/composables/useCreateProfile";
import FormFieldFullName from "@/components/formField/FormFieldFullName.vue";
import FormFieldBirthDate from "@/components/formField/FormFieldBirthDate.vue";
import FormFieldGender from "@/components/formField/FormFieldGender.vue";
import FormFieldInterestedIn from "@/components/formField/FormFieldInterestedIn.vue";

const {usernameSchema, dateSchema} = useYup();
const profileInfoSchema = yup.object().shape({
  first_name: usernameSchema,
  last_name: usernameSchema,
  date: dateSchema,
  location: yup.object().shape({
    lat: yup.number(),
    lng: yup.number(),
  }),
  interestedIn: yup.string().required("You need to choose one of this field"),
  gender: yup.string().required("You need to choose one of this field"),
})

const {onSubmit, setFieldValue, values} = useInfoCreateProfile(profileInfoSchema);

</script>

<template>
  <CreateProfileFormPage :onsubmit="onSubmit">
    <FormFieldFullName />

    <FormFieldBirthDate />

    <MapLocation />

    <FormFieldInterestedIn :values="values" :set-field-value="setFieldValue" />

    <FormFieldGender :values="values" :set-field-value="setFieldValue"/>
  </CreateProfileFormPage>
</template>