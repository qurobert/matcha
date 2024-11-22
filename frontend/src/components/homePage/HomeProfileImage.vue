<script setup lang="ts">
import {Button} from "@/components/ui/button";
import {type Ref, ref} from "vue";
import {useImageHomeStore} from "@/stores/imageHomeStore";


const imageHomeStore = useImageHomeStore();
const divRef: Ref<HTMLDivElement | null> = ref(null);

function changeMoiCetteImageMonBg(index: number) {
  imageHomeStore.setIndex(index)
}

function handleClick(event: any) {
  const divOffsetHeight = divRef.value?.offsetHeight;
  const divWidth = event.currentTarget.offsetWidth;
  const clickX = event.offsetX

  if (divOffsetHeight && event.offsetY < divOffsetHeight) {
    return
  }

  if (clickX < divWidth / 2) {
    if (imageHomeStore.getCurrentIndex !== 0) {
      imageHomeStore.decrement();
    }
  } else if (imageHomeStore.getCurrentIndex !== props.images.length - 1) {
    imageHomeStore.increment();
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
  <div class="bg-no-repeat bg-cover md:w-2/3 lg:w-6/12 xl:w-1/3 w-full bg-top relative"
       :style="'background-image: url(\'' + images[imageHomeStore.getCurrentIndex] + '\')'"
       @click.prevent="handleClick">

    <div class="flex justify-center absolute w-full p-4" ref="divRef">
      <button v-for="(image, index) in images" :key="image" class="h-1 w-full" :class="{
          'mr-2' : images.length - 1 !== index,
          'bg-white': imageHomeStore.getCurrentIndex === index,
          'bg-gray': imageHomeStore.getCurrentIndex !== index,
        }" @click.prevent="changeMoiCetteImageMonBg(index)">
      </button>
    </div>

    <div class="absolute bg-gradient-to-b from-[rgba(255,255,255,0)] via-[rgba(125,132,144,0)] to-black w-full h-full"></div>
    <slot></slot>
  </div>
</template>