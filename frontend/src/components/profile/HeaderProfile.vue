<script setup lang="ts">

import {capitalizeFirstLetter} from "@/lib/utils";
import {useAuthStore} from "@/stores/authStore";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import moment from "moment";
import URL from "@/helpers/URL";

const useUserStore = useAuthStore();
const user = useUserStore.user;
const age = moment().diff(user.date_of_birth, 'years', false);
const url = URL + "/uploads/";


</script>

<template>
  <section class="flex flex-col items-center">

    <h1 class="text-center text-4xl mt-8">Account</h1>

    <Avatar class="w-24 h-24 my-8">
      <AvatarImage v-if="user.pictures?.[0]" :src="url + user.pictures?.[0]" alt="user profile" />
      <AvatarFallback>Auth</AvatarFallback>
    </Avatar>
    <p class="text-lg">{{ capitalizeFirstLetter(user.first_name) + ' ' + capitalizeFirstLetter(user.last_name) }}, {{ age }}</p>
    <div class="lg:w-1/2 md:w-2/3 sm:w-full flex justify-between p-4 w-full">

      <RouterLink to="/profile/preferences" class="flex items-center flex-col">
        <div class="w-16 h-16 rounded-full shadow-xl flex justify-center items-center">
          <font-awesome-icon icon="sliders" class=" w-8 h-8" />
        </div>
        <span class="mt-2">Preferences</span>
      </RouterLink>

      <RouterLink to="/profile/settings" class="flex items-center flex-col">
        <div class="w-16 h-16 rounded-full shadow-xl flex justify-center items-center self-end mt-8">
          <font-awesome-icon icon="gear" class="w-8 h-8" />
        </div>
        <span class="mt-2">Settings</span>
      </RouterLink>

      <RouterLink to="/profile/edit" class="flex items-center flex-col">
        <div class="w-16 h-16 rounded-full shadow-xl flex justify-center items-center">
          <font-awesome-icon icon="pencil" class="w-8 h-8" />
        </div>
        <span class="mt-2">Edit profile</span>
      </RouterLink>
    </div>
  </section>
</template>