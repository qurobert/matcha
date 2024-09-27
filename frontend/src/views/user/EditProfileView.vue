<script setup lang="ts">
import HeaderChildrenProfilePage from "@/components/headers/HeaderChildrenProfilePage.vue";
import {useEditProfile} from "@/composables/useEditProfile";
import FormFieldPictures from "@/components/formField/FormFieldPictures.vue";
import FormFieldBiography from "@/components/formField/FormFieldBiography.vue";
import {Button} from "@/components/ui/button";
import {capitalizeFirstLetter} from "../../lib/utils";
import {FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
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
const {onSubmit, hasWritten, initialValues, values, isValid, setFieldValue} = useEditProfile();

console.log(initialValues);
</script>

<template>
  <HeaderChildrenProfilePage :on-submit="onSubmit" :is-valid="isValid" text="Edit info" />
  <div class="flex justify-center">
    <form @submit.prevent="onSubmit" class="w-full lg:w-1/2">
      <!--    Add autocomplete for formFieldPicture -->
      <FormFieldPictures :set-field-value="setFieldValue" :values="values" />
      <div class="m-4">
        <FormFieldBiography size="w-full" />


        <FormField v-slot="{ componentField }" name="interests">
          <FormItem>
            <FormLabel>Interests *</FormLabel>
            <br />
            <Dialog>
              <DialogTrigger as-child>
            <FormControl>
              <Button size="sm" class="text-md">
                <span class="max-w-lg truncate">{{initialValues?.interests?.map(capitalizeFirstLetter).join(', ')}}</span>
                <font-awesome-icon icon="plus" class="w-4 h-4 ml-4"/>
              </Button>
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

        <MapLocation :set-field-value="setFieldValue"/>

        <FormFieldBirthDate />

        <div class="flex justify-center mb-4">
          <Button type="submit" :disabled="!hasWritten" :variant="hasWritten ? 'default' : 'secondary'" size="lg">
            Save
          </Button>
        </div>
      </div>

    </form>
  </div>

</template>