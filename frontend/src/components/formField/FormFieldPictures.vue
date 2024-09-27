<script setup lang="ts">

import {FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {ref} from 'vue'

const numbersOfPictures = 6;
const props = defineProps<{
  setFieldValue: any;
  values: any;
}>();

let src = ref([] as (string | null)[])
for (let i = 0; i < numbersOfPictures; i++) {
  src.value.push(null);
}

// Fonction pour afficher l'aperçu de l'image sélectionnée
function previewImage(event: Event, index: any) {
  const input = event.target as HTMLInputElement;
  const file = input.files && input.files[0];

  if (!file)
    return ;

  src.value[index] = URL.createObjectURL(file);
  const pictures = props.values.pictures;
  if (!pictures)
    props.setFieldValue('pictures', [file]);
  else
    props.setFieldValue('pictures', [...pictures, file]);
}

function clearPicture(event: Event, index: any) {
  if (!src.value[index])
    return ;
  src.value[index] = null;
  event.preventDefault();
  const pictures = props.values.pictures;
  if (pictures && pictures.length === 1)
    props.setFieldValue('pictures', null);
  else
    props.setFieldValue('pictures', pictures.filter((_: any, i: number) => i !== index));
  const input = document.getElementById(`input-file${index}`) as HTMLInputElement;
  if (input)
    input.value = '';
}

</script>

<template>
  <FormField name="pictures">
    <FormItem>
      <FormLabel class="m-4">Photos *</FormLabel>
      <div class="flex flex-wrap justify-center lg:justify-start">
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
</template>