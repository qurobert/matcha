<script setup lang="ts">
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useYup} from "@/composables/useYup";
import * as yup from "yup";
import CreateProfileFormPage from "@/components/createProfile/utility/FormPageCreateProfile.vue";
import MapLocation from "@/components/createProfile/utility/MapLocation.vue";
import {useInfoCreateProfile} from "@/composables/useCreateProfile";
import {Badge} from "@/components/ui/badge";
import {capitalize} from "@/lib/utils";

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

function onLocationSelected(location: string) {
  setFieldValue('location', location);
}

const interestedInOptions = ['men', 'women', 'both'];
const genderOptions = ['man', 'woman'];

function onInterestedInClick(interestedIn: string) {
  setFieldValue('interestedIn', interestedIn);
}

function onGenderClick(gender: string) {
  setFieldValue('gender', gender);
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

    <FormField name="interestedIn">
      <FormItem>
        <FormLabel>Interested in *</FormLabel>
        <FormControl>
          <br/>
          <Badge
              v-for="interestedIn in interestedInOptions"
              :variant="values.interestedIn === interestedIn ? 'default' : 'outline'"
              @click="() => onInterestedInClick(interestedIn)"
              class="cursor-pointer mr-2 text-sm px-6"
          >
            {{capitalize(interestedIn)}}
          </Badge>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField name="gender">
      <FormItem>
        <FormLabel>Gender *</FormLabel>
        <FormControl>
          <br/>
          <Badge
              v-for="gender in genderOptions"
              :variant="values.gender === gender ? 'default' : 'outline'"
              @click="() => onGenderClick(gender)"
              class="cursor-pointer mr-2 text-sm px-6"
          >
            {{capitalize(gender)}}
          </Badge>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </CreateProfileFormPage>
</template>