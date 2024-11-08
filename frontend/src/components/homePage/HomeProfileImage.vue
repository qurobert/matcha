<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {type Ref, ref} from "vue";

const imageIndex = ref(0);
const divRef: Ref<HTMLDivElement | null> = ref(null);

function changeMoiCetteImageMonBg(index: number) {
  imageIndex.value = index;
}
function handleClick(event: any) {
  const divOffsetHeight = divRef.value?.offsetHeight;
  const divWidth = event.currentTarget.offsetWidth;
  const clickX = event.offsetX

  if (divOffsetHeight && event.offsetY < divOffsetHeight) {
    return
  }

  if (clickX < divWidth / 2) {
    if (imageIndex.value !== 0) {
      imageIndex.value -= 1;
    }
  } else if (imageIndex.value !== props.images.length - 1) {
    imageIndex.value += 1;
  }
}

const props = defineProps({
  images: {
    type: Array as () => string[],
    required: true,
  },
})
</script>

<template>
  <div class="bg-no-repeat bg-cover md:w-2/3 lg:w-6/12 xl:w-1/3 w-full bg-top relative h-full"
       :style="'background-image: url(\'' + images[imageIndex] + '\')'"
       @click.prevent="handleClick">

    <div class="flex justify-center absolute w-full p-4" ref="divRef">
      <button v-for="(image, index) in images" :key="image" class="h-1 w-full" :class="{
          'mr-2' : images.length - 1 !== index,
          'bg-white': imageIndex === index,
          'bg-gray': imageIndex !== index,
        }" @click.prevent="changeMoiCetteImageMonBg(index)">
      </button>
    </div>

    <slot></slot>

  </div>
</template>