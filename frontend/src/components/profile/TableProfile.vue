<script setup lang="ts">
import moment from "moment";
import {TypeTableProfile} from "@/types/table_profile";
import {useFakeUser} from "@/composables/useFakeUser";

const fakeUsers = useFakeUser(4);
defineProps({
  type: {
    type: String as () => TypeTableProfile,
    required: true
  }
})

const url = "http://localhost:3000/uploads/";
</script>

<template>
  <section class="w-full flex justify-center">
    <section class="flex flex-wrap justify-center gap-4 mt-2 w-full">
      <RouterLink to="/home"
          v-for="user in fakeUsers" :key="user.first_name" class="w-44 h-60 relative cursor-pointer"
      >
        <img :src="url + user.pictures[0]" alt="profile picture" class="rounded-md w-full h-full object-cover mix-blend-overlay	" />
        <div class="absolute bottom-0 left-0 z-10 w-full h-full bg-gradient-to-b from-[rgba(255,255,255,0)] via-[rgba(125,132,144,0)] to-black	"></div>
        <div class="absolute bottom-0 left-0 w-full p-4 text-white z-20">
          <p class="text-md">
            {{ user.first_name }} {{ user.last_name }}, {{ moment().diff(user.date_of_birth, 'years', false) }}
          </p>
          <p class="truncate text-sm">
            {{ user.biography}}
          </p>
        </div>
      </RouterLink>
    </section>
  </section>

</template>