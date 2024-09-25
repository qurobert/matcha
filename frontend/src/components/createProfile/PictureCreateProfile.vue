<script setup lang="ts">
import {FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import CreateProfileFormPage from "@/components/createProfile/utility/FormPageCreateProfile.vue";
import {usePictureCreateProfile} from "@/composables/useCreateProfile";
import * as yup from "yup";
import {ref} from 'vue'

const numbersOfPictures = 5;
const minNumbersOfPictures = 1;

const schema = yup.object().shape({
  pictures: yup.array().of(yup.string())
  .min(minNumbersOfPictures, `You must upload at least ${minNumbersOfPictures} picture`)
  .required("Pictures are required"),
})

let src = ref([] as (string | null)[])
for (let i = 0; i < numbersOfPictures; i++) {
  src.value.push(null);
}

const {onSubmit, setFieldValue, values} = usePictureCreateProfile(schema);
// Fonction pour afficher l'aperçu de l'image sélectionnée
function previewImage(event: Event, index: any) {
  const input = event.target as HTMLInputElement;
  const file = input.files && input.files[0];

  if (!file)
    return ;

  src.value[index] = URL.createObjectURL(file);
  const pictures = values.pictures;
  if (!pictures)
    setFieldValue('pictures', [file]);
  else
    setFieldValue('pictures', [...pictures, file]);
}

function clearPicture(event: Event, index: any) {
  if (!src.value[index])
    return ;
  src.value[index] = null;
  event.preventDefault();
  const pictures = values.pictures;
  if (pictures && pictures.length === 1)
    setFieldValue('pictures', null);
  else
    setFieldValue('pictures', pictures.filter((_: any, i: number) => i !== index));
  const input = document.getElementById(`input-file${index}`) as HTMLInputElement;
  if (input)
    input.value = '';
}
</script>

<template>
  <p class="text-gray my-4">
    Upload 1 photo to start. Add 4 more to make your profile stand out
  </p>
  <CreateProfileFormPage :onsubmit="onSubmit" class="w-1/3">
    <FormField name="pictures">
      <FormItem>
        <FormLabel class="text-gray">Photos *</FormLabel>
        <div class="flex flex-wrap">
          <div v-for="picture in numbersOfPictures" :key="picture">
            <div class="relative w-32 h-48 border m-4 rounded-sm border-dashed border-2">
              <img
                  :ref="'image-picture' + picture"
                  v-if="src[picture]"
                  :src="src[picture]"
                  alt="Preview picture numero {{ picture }}"
                  class="w-full h-full object-cover"
              />
              <label :for="'input-file' + picture" class="absolute -bottom-4 -right-5">
                <font-awesome-icon
                    :icon="!src[picture] ? 'circle-plus' : 'circle-minus'"
                    class="text-primary cursor-pointer w-10 h-10 bg-light rounded-full"
                    @click="(event: Event) => clearPicture(event, picture)"
                />
              </label>
              <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="(event: Event) => previewImage(event, picture)"
                  :id="'input-file' + picture"
              />
            </div>
          </div>
        </div>
        <FormMessage />
      </FormItem>
    </FormField>

  </CreateProfileFormPage>
</template>