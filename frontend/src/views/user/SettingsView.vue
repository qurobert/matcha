<script setup lang="ts">
import HeaderChildrenProfilePage from "@/components/headers/HeaderChildrenProfilePage.vue";
import {useSettings} from "@/composables/useSubProfile";
import InputWithField from "@/components/utility/InputWithField.vue";
import {useAuthStore} from "@/stores/userStore";
import {Button} from "@/components/ui/button";
import { watch, ref } from "vue";
import { Separator } from '@/components/ui/separator'


const {onSubmit, validate, values, errors} = useSettings();
const userStore = useAuthStore();
const isValid = ref(false);
const hasWritten = ref(false);

watch(() => values, async () => {
  if (!hasWritten.value && (values.password || values.confirm_password || values.email || values.username))
    hasWritten.value = true;

  const { valid } = await validate();
  if (valid) {
    isValid.value = true;
  }
  else if (isValid.value) {
    isValid.value = false;
  }

}, { deep: true });
</script>

<template>
  <HeaderChildrenProfilePage text="Settings" :is-valid="isValid" :on-submit="onSubmit"/>
  <div class="flex justify-center">
    <form @submit.prevent="onSubmit" class="m-4 w-full md:w-1/2 lg:w-1/3">
      <InputWithField name="username" label="Username" :placeholder="userStore.username" type="text" />
      <Separator class="mt-6 mb-4" label="And / Or" />
      <InputWithField name="email" label="Email" :placeholder="userStore.email" type="email" />
      <Separator class="mt-6 mb-4" label="And / Or" />
      <InputWithField name="password" label="Password" placeholder="*******" type="password" />
      <InputWithField name="confirm_password" label="Confirm password" placeholder="*******" type="password" />
      <p v-if="errors[''] && hasWritten" class="text-destructive">
         {{errors['']}}
      </p>
      <div class="flex justify-center">
          <Button type="submit" size="sm" class="px-20 mt-4">
            Save
          </Button>
      </div>
    </form>
  </div>
</template>