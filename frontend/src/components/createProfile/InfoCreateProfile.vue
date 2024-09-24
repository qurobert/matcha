<script setup lang="ts">
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useYup} from "@/composables/useYup";
import * as yup from "yup";
import CreateProfileFormPage from "@/components/createProfile/utility/FormPageCreateProfile.vue";
import MapLocation from "@/components/createProfile/utility/MapLocation.vue";
import {useInfoCreateProfile} from "@/composables/useCreateProfile";

const {usernameSchema, dateSchema} = useYup();
const profileInfoSchema = yup.object().shape({
  first_name: usernameSchema,
  last_name: usernameSchema,
  date: dateSchema,
  location: yup.object().shape({
    lat: yup.number(),
    lng: yup.number(),
  })
})

const {onSubmit, setFieldValue} = useInfoCreateProfile(profileInfoSchema);

function onLocationSelected(location: string) {
  setFieldValue('location', location);
}
</script>

<template>
  <CreateProfileFormPage :onsubmit="onSubmit">
    <div class="flex flex-col lg:flex-row md:w-auto w-full justify-between my-0">
      <FormField v-slot="{ componentField }" name="first_name">
        <FormItem class="lg:pr-1">
          <FormLabel>First name *</FormLabel>
          <FormControl>
            <Input placeholder="First name" v-bind="componentField" type="text"/>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="last_name">
        <FormItem class="lg:pl-1">
          <FormLabel>Last name *</FormLabel>
          <FormControl>
            <Input placeholder="Last name" v-bind="componentField" type="text"/>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <FormField name="date" v-slot="{componentField}">
      <FormItem class="flex flex-col pb-4">
        <FormLabel>Date of birth *</FormLabel>
        <FormControl>
          <Input placeholder="DD/MM/YYYY" v-bind="componentField" type="text"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <MapLocation @location-selected="onLocationSelected"/>
  </CreateProfileFormPage>
</template>