<script setup lang="ts">

import {FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {ref} from 'vue'
import {useFieldArray} from 'vee-validate'

const MAX_PICTURES_FIELDS = 5;
const {fields, update, insert, push} = useFieldArray('pictures')
type FormFile = {
  url?: string
  file?: string
} | null
let src = ref([] as (string | null)[])
for (let i = 0; i < fields.value.length; i++) {
  if ((fields.value[i].value as FormFile)?.url)
    src.value.push("http://localhost:3000/uploads/" + (fields.value[i].value as FormFile | null)?.url);
  else
    src.value.push(null)
}

// Fonction pour afficher l'aperçu de l'image sélectionnée
function previewImage(event: Event, index: any) {
  const input = event.target as HTMLInputElement;
  const file = input.files && input.files[0];

  if (!file)
    return ;

  src.value[index] = URL.createObjectURL(file);
  if (fields.value.length === 0)
    push({file})
  else if (fields.value.length <= index)
    insert(index, {file})
  else
    update(index, {file});
}

function clearPicture(event: Event, index: any) {
  if (!src.value[index])
    return ;
  src.value[index] = null;
  event.preventDefault();
  update(index, {});
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
        <div v-for="(_, index) in Array(MAX_PICTURES_FIELDS).fill(null)" :key="index">
          <div class="relative w-32 h-48 border m-4 rounded-sm border-dashed border-2">
            <img
                :ref="'image-picture' + index"
                v-if="src[index]"
                :src="src[index]"
                alt="Preview picture numero {{ picture }}"
                class="w-full h-full object-cover"
            />
            <label :for="'input-file' + index" class="absolute -bottom-4 -right-5">
              <font-awesome-icon
                  :icon="!src[index] ? 'circle-plus' : 'circle-minus'"
                  class="text-primary cursor-pointer w-10 h-10 bg-light rounded-full"
                  @click="(event: Event) => clearPicture(event, index)"
              />
            </label>
            <input
                type="file"
                accept="image/*"
                class="hidden"
                @change="(event: Event) => previewImage(event, index)"
                :id="'input-file' + index"
            />
          </div>
        </div>
      </div>
      <FormMessage />
    </FormItem>
  </FormField>
</template>