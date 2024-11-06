<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {type Ref, ref} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {Badge} from "@/components/ui/badge";

const fakeUser = {
  name: "John Doe",
  age: 25,
  images: ["bgé.jpg", "cagoulé.png", "mocheté.png", "prisonnié.png"],
  location: "Paris",
  interests: ['Music', 'Sport', 'Cinema', 'Jesus', 'Sex', 'Drugs', 'Ethereum'],
}
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
  } else if (imageIndex.value !== fakeUser.images.length - 1) {
      imageIndex.value += 1;
    }
}

</script>

<template>
  <div class="h-full flex flex-col items-center justify-center px-4">
    <div class="bg-no-repeat bg-cover md:w-2/3 lg:w-6/12 xl:w-1/3 w-full bg-top relative h-[90%] rounded-md"
         :style="'background-image: url(\'' + fakeUser.images[imageIndex] + '\')'"
         @click.prevent="handleClick">

      <div class="flex justify-center absolute w-full p-4" ref="divRef">
        <button v-for="(image, index) in fakeUser.images" :key="image" class="h-1 w-full" :class="{
          'mr-2' : fakeUser.images.length - 1 !== index,
          'bg-white': imageIndex === index,
          'bg-gray': imageIndex !== index,
        }" @click.prevent="changeMoiCetteImageMonBg(index)">
        </button>
      </div>

      <div class="absolute bottom-0 left-0 w-full p-4 text-white">
        <div class="justify-between flex items-center mb-2">
          <h1 class=" text-3xl font-bold">{{fakeUser.name}} {{fakeUser.age}}</h1>
          <font-awesome-icon icon="circle-info" class="text-white text-xl"/>
        </div>
        <div class="flex items-center mb-2">
          <font-awesome-icon icon="location-dot" class="text-white mr-2"/>
          <p class="text-lg">{{fakeUser.location}}</p>
        </div>
        <div>
          <Badge v-for="interest in fakeUser.interests.slice(0, 6)" :key="interest" variant="gray" class="m-0.5">
            {{interest}}
          </Badge>
        </div>
      </div>

    </div>

    <div class="flex justify-center items-center w-full m-2 h-[10%]">
      <button class="w-16 h-16 rounded-full shadow-xl flex justify-center items-center mr-12 bg-white">
        <font-awesome-icon icon="xmark" class="w-8 h-8 text-accent" />
      </button>
      <button class="w-16 h-16 rounded-full shadow-xl flex justify-center items-center ml-12 bg-white">
        <font-awesome-icon icon="heart" class="text-success w-8 h-8" />
      </button>
    </div>
  </div>
</template>

