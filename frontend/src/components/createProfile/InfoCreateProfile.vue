<script setup lang="ts">
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useYup} from "@/composables/useYup";
import * as yup from "yup";
import CreateProfileFormPage from "@/components/createProfile/utility/FormPageCreateProfile.vue";

const {usernameSchema, dateSchema} = useYup();
const profileInfoSchema = yup.object().shape({
  first_name: usernameSchema,
  last_name: usernameSchema,
  date: dateSchema
})

</script>

<template>
  <CreateProfileFormPage :schema="profileInfoSchema">
    <div class="flex flex-col lg:flex-row md:w-auto w-full">
      <FormField v-slot="{ componentField }" name="first_name">
        <FormItem class="lg:pr-1">
          <FormLabel>First name</FormLabel>
          <FormControl>
            <Input placeholder="First name" v-bind="componentField" type="text"/>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="last_name">
        <FormItem class="lg:pl-1">
          <FormLabel>Last name</FormLabel>
          <FormControl>
            <Input placeholder="Last name" v-bind="componentField" type="text"/>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <FormField name="date" v-slot="{componentField}">
      <FormItem class="flex flex-col">
        <FormLabel>Date of birth</FormLabel>
        <FormControl>
          <Input placeholder="DD/MM/YYYY" v-bind="componentField" type="text"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </CreateProfileFormPage>
</template>