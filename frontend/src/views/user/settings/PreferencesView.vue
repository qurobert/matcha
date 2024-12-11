<script setup lang="ts">

import {usePreferences} from "@/composables/usePreferences";
import FormFieldInterestsWithPopup from "@/components/formField/FormFieldInterestsWithPopup.vue";
import HeaderChildrenProfilePage from "@/components/headers/HeaderSettingsPages.vue";
import FormFieldSlider from "@/components/formField/FormFieldSlider.vue";
import {Button} from "@/components/ui/button";
import MyContainer from "@/components/utility/MyContainer.vue";
const {onSubmit, isValid, hasWritten} = usePreferences();
</script>

<template>
  <MyContainer>
    <form @submit="onSubmit">
      <HeaderChildrenProfilePage :on-submit="onSubmit" :is-valid="isValid" :has-written="hasWritten" text="Preferences" />

      <FormFieldSlider :min="18" :max="75" name="age" :step="1" label="Age" />
      <FormFieldSlider :min="0" :max="100" name="fame_rating" :step="1" label="Fame rating" prefix-value="%" />
      <FormFieldSlider :min="1" :max="200" name="distance" :step="1" label="Distance preference" prefix-value="km" />
      <FormFieldInterestsWithPopup name="interests_preferences" />
      <div class="flex justify-center">
        <Button type="submit" size="sm" class="px-20 mt-4" :disabled="!hasWritten" :variant="hasWritten ? 'default' : 'secondary'">
          Save
        </Button>
      </div>
    </form>
  </MyContainer>
</template>