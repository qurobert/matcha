<script setup lang="ts">
import HeaderChildrenProfilePage from "@/components/headers/HeaderChildrenProfilePage.vue";
import {useEditProfile} from "@/composables/useEditProfile";
import FormFieldPictures from "@/components/formField/FormFieldPictures.vue";
import FormFieldBiography from "@/components/formField/FormFieldBiography.vue";
import {Button} from "@/components/ui/button";
import {capitalizeFirstLetter} from "../../lib/utils";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import FormFieldFullName from "@/components/formField/FormFieldFullName.vue";
import MapLocation from "@/components/createProfile/utility/MapLocation.vue";
import FormFieldBirthDate from "@/components/formField/FormFieldBirthDate.vue";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import FormFieldInterests from "@/components/formField/FormFieldInterests.vue";
import FormFieldGender from "@/components/formField/FormFieldGender.vue";
import FormFieldInterestedIn from "@/components/formField/FormFieldInterestedIn.vue";
import { useFieldArray } from "vee-validate";
const {onSubmit, hasWritten, isValid} = useEditProfile();

const {fields} = useFieldArray('interests');
</script>

<template>
  <HeaderChildrenProfilePage :on-submit="onSubmit" :is-valid="isValid" :has-written="hasWritten" text="Edit info" />
  <div class="flex justify-center">
    <form @submit.prevent="onSubmit" class="w-full lg:w-1/2">

      <FormFieldPictures />
      <div class="m-4">
        <FormFieldBiography size="w-full" />


        <FormField name="interests">
          <FormItem>
            <FormLabel>Interests *</FormLabel>
            <br />
            <Dialog>
              <DialogTrigger as-child>
            <FormControl>
              <Button size="sm" class="text-md" >
                <span class="max-w-lg truncate" v-if="fields.length">
                  {{fields.slice(0, 3).map((element) => capitalizeFirstLetter(element.value as string)).join(', ')}}
                  {{fields.length > 3 ? '...' : ''}}
                </span>
                <span v-else>Add interests</span>
                <font-awesome-icon icon="plus" class="w-4 h-4 ml-4"/>
              </Button>
              <FormMessage />

            </FormControl>
              </DialogTrigger>
              <DialogContent class="p-4 mr-4 max-w-4xl">
                <DialogHeader>
                  <DialogTitle>
                    Interests
                  </DialogTitle>
                  <DialogDescription>
                    Select your new interests
                  </DialogDescription>
                </DialogHeader>
                <FormFieldInterests />
              </DialogContent>
            </Dialog>

          </FormItem>
        </FormField>

        <FormFieldFullName />

        <MapLocation />

        <FormFieldBirthDate />

        <FormFieldGender />

        <FormFieldInterestedIn  />

        <div class="flex justify-center mb-4">
          <Button type="submit" size="lg" :disabled="!hasWritten" :variant="hasWritten ? 'default' : 'secondary'">
            Save
          </Button>
        </div>
      </div>

    </form>
  </div>

</template>