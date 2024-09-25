<script setup lang="ts">
import CreateProfileFormPage from "@/components/createProfile/utility/FormPageCreateProfile.vue";
import {useInterestCreateProfile} from "@/composables/useCreateProfile";
import * as yup from "yup";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Badge} from "@/components/ui/badge";
import {capitalize} from "../../lib/utils";
const interestSchema = yup.object().shape({
  interests: yup.array().of(yup.string().required("You need to choose one of this field")).min(1, "You need to choose one of this field").required("You need to choose one of this field"),
})

const {onSubmit, values, setFieldValue} = useInterestCreateProfile(interestSchema);

const interests = [
  'rock', 'electro', 'cooking', 'video games', 'science fiction',
  'book', 'drawing', 'yoga', 'jazz', 'comedy', 'gardening', 'politic',
    'museum', 'humor', 'history', 'mode', 'trip', 'action movie', 'boards games', 'horror', 'pop', 'painting', 'documentary'
]

function onInterestClick(interest: string) {
  if (!values.interests) {
    setFieldValue('interests', [interest]);
    return;
  }
  const index = values.interests.findIndex((interestLoop: any) => interestLoop === interest);
  if (index === -1) {
    setFieldValue('interests', [...values.interests, interest]);
  } else {
    setFieldValue('interests', values.interests.filter((_: any, i: number) => i !== index));
  }
}
</script>

<template>
  <CreateProfileFormPage :onsubmit="onSubmit" class="w-auto m-4 md:w-2/3 px-5 lg:w-1/3 flex justify-center flex-col">
    <FormField name="interests">
      <FormItem>
        <FormLabel>Interests *</FormLabel>
        <FormControl >
          <div class="flex flex-wrap w-full">
          <Badge v-for="interest in interests" :key="interest" @click="onInterestClick(interest)" :variant="values?.interests?.includes(interest) ? 'default' : 'outline'" class="m-1 cursor-pointer">
            {{ capitalize(interest) }}
          </Badge>
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

  </CreateProfileFormPage>
</template>

<style scoped>

</style>