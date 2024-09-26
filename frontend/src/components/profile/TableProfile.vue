<script setup lang="ts">
import moment from "moment";
import {TypeTableProfile} from "@/types/table_profile";

// TMP
function createFakeUser(firstName: string, lastName: string, dateOfBirth: string, pictures: string) {
  return {
    first_name: firstName,
    last_name: lastName,
    biography: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date_of_birth: dateOfBirth,
    pictures: [pictures],
    id: Math.random().toString(36).substr(2, 9)
  }
}

function shuffle(array: any) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

const fakeUsers = [
  createFakeUser("Jenna", "Joseph", "1993-01-01", "jenna_5.jpg"),
  createFakeUser("Jenna", "Joseph", "1991-01-01", "jenna_2.jpg"),
  createFakeUser("Jenna", "Joseph", "1995-01-01", "jenna_3.jpg"),
  createFakeUser("Jenna", "Joseph", "2006-01-01", "jenna_4.jpg"),
  createFakeUser("Jenna", "Joseph", "2006-01-01", "jenna_1.jpg"),
  createFakeUser("Jenna", "Joseph", "1992-01-01", "jenna_6.jpg"),
  createFakeUser("Jenna", "Joseph", "1993-01-01", "jenna_5.jpg"),
  createFakeUser("Jenna", "Joseph", "1991-01-01", "jenna_2.jpg"),
  createFakeUser("Jenna", "Joseph", "1995-01-01", "jenna_3.jpg"),
  createFakeUser("Jenna", "Joseph", "2006-01-01", "jenna_4.jpg"),
  createFakeUser("Jenna", "Joseph", "2006-01-01", "jenna_1.jpg"),
  createFakeUser("Jenna", "Joseph", "1992-01-01", "jenna_6.jpg"),
  createFakeUser("Jenna", "Joseph", "1993-01-01", "jenna_5.jpg"),
  createFakeUser("Jenna", "Joseph", "1991-01-01", "jenna_2.jpg"),
  createFakeUser("Jenna", "Joseph", "1995-01-01", "jenna_3.jpg"),
  createFakeUser("Jenna", "Joseph", "2006-01-01", "jenna_4.jpg"),
  createFakeUser("Jenna", "Joseph", "2006-01-01", "jenna_1.jpg"),
  createFakeUser("Jenna", "Joseph", "1992-01-01", "jenna_6.jpg"),
]

shuffle(fakeUsers);
// TMP

const props = defineProps({
  type: {
    type: String as () => TypeTableProfile,
    required: true
  }
})

const url = "http://localhost:3000/uploads/";
// <!--            name: props.type === TypeTableProfile.matches ? 'chat' : 'user-profile',-->
// <!--            params: { id: user.id }-->

</script>

<template>
  <section class="w-full flex justify-center">
    <section class="flex flex-wrap justify-center gap-4 mt-2 w-full">
      <RouterLink
          to="/profile"
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