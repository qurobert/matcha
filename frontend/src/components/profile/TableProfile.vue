<script setup lang="ts">
import {getSrcImageFromPicture} from "@/helpers/getSrcImageFromPicture";
defineProps<{
  users: User[];
}>()
</script>

<template>
  <section class="w-full flex justify-center">
    <section class="flex flex-wrap justify-center gap-4 mt-2 w-full">
      <RouterLink
          :to="{
          name: 'public-profile',
          params: { id: user.id }
      }"
          v-for="user in users" :key="user.first_name" class="w-44 h-60 relative cursor-pointer"
      >
        <img :src="getSrcImageFromPicture(user?.pictures?.[0])" alt="profile picture" class="rounded-md w-full h-full object-cover mix-blend-overlay	" />
        <div class="absolute bottom-0 left-0 z-10 w-full h-full bg-gradient-to-b from-[rgba(255,255,255,0)] via-[rgba(125,132,144,0)] to-black	"></div>
        <div class="absolute bottom-0 left-0 w-full p-4 text-white z-20">
          <p class="text-md">
            {{ user.first_name }} {{ user.last_name }}
          </p>
          <p class="truncate text-sm">
            {{user.biography}}
          </p>
        </div>
      </RouterLink>
    </section>
  </section>

</template>