<script setup lang="ts">
import { Button } from "@/components/ui/button";

const fakeUser = {
  name: "John Doe",
  age: 25,
  images: ["https://i.pinimg.com/736x/2f/05/d2/2f05d2e71dfa91b27b34b99fbcde60b9.jpg",
    "https://cdn.discordapp.com/attachments/773147506107613194/1303357699852996628/Capture_decran_2024-11-05_a_14.58.02.png?ex=672b75f2&is=672a2472&hm=72b141952f855f73a7cc288a9b9db3883f9b6483d1118498de630341790dfbf6&",
    "https://cdn.discordapp.com/attachments/773147506107613194/1303358053135159396/Capture_decran_2024-11-05_a_14.59.28.png?ex=672b7647&is=672a24c7&hm=b00526382937da7e21267ebc4774d390eb3460a9f832a6515557b6648501e3ec&",
    "https://i.pinimg.com/736x/2f/05/d2/2f05d2e71dfa91b27b34b99fbcde60b9.jpg",
    "https://cdn.discordapp.com/attachments/773147506107613194/1303358256835596318/Screenshot_2024-11-05_at_15.00.19.png?ex=672b7677&is=672a24f7&hm=7479079abf4071371471067e3f051664833b27f4d636304f8a0cd74adb0c6f34&"],
  location: "Paris",
  interests: ['Music', 'Sport', 'Cinema', 'Jesus', 'Sex', 'Drugs', 'Ethereum'],
}
</script>

<template>
  <div class="h-full flex justify-center">
  <div class="bg-no-repeat bg-cover md:w-2/3 lg:w-6/12 xl:w-1/3 w-full h-full bg-top relative" :style="'background-image: url(\'' + fakeUser.images[0] + '\')'">
    <div class="flex justify-center items-center absolute bottom-0 left-0 w-full mb-4">
      <button class="w-16 h-16 rounded-full shadow-xl flex justify-center items-center mr-12 bg-white">
        <font-awesome-icon icon="xmark" class="w-8 h-8 text-accent" />
      </button>
      <button class="w-16 h-16 rounded-full shadow-xl flex justify-center items-center ml-12 bg-white">
        <font-awesome-icon icon="heart" class="text-success w-8 h-8" />
      </button>
    </div>
  </div>
  <div class="flex justify-center absolute">
    <div v-for="image in fakeUser.images" :key="image" class="bg-white h-1 px-4" :class="'w-1/'+fakeUser.images.length">
    </div>
  </div>
  </div>
</template>

