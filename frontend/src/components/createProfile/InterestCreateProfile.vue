<script setup lang="ts">
import CreateProfileFormPage from "@/components/createProfile/utility/FormPageCreateProfile.vue";
import {useInterestCreateProfile} from "@/composables/useCreateProfile";
import * as yup from "yup";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Badge} from "@/components/ui/badge";
import {capitalizeFirstLetter} from "../../lib/utils";
import {useYup} from "@/composables/useYup";
import {useInterest} from "@/composables/useInterest";
import FormFieldInterests from "@/components/formField/FormFieldInterests.vue";

const {onSubmit, interests} = useInterest();
</script>

<template>
  <CreateProfileFormPage :onsubmit="onSubmit" class="w-auto m-4 md:w-2/3 px-5 lg:w-1/3 flex justify-center flex-col">
    <FormFieldInterests :interests="interests"/>

  </CreateProfileFormPage>
</template>

<style scoped>

</style>