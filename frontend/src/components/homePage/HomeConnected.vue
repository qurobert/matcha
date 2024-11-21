<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {Badge} from "@/components/ui/badge";
import HomeProfileImage from "@/components/homePage/HomeProfileImage.vue";
import {useUserStore} from "@/stores/userStore";
import {useRouter} from "vue-router";
import moment from "moment";
import LikeDislikeButton from "@/components/homePage/LikeDislikeButton.vue";

const router = useRouter();
const userStore = useUserStore();
const user = userStore.getUser;
const age = moment().diff(user.date_of_birth, 'years');

function redirectToHomeProfile() {
  router.push({name: "public-profile", params: {id: user.id}});
}
</script>

<template>
  <div class="h-full flex flex-col items-center justify-center px-4">
    <HomeProfileImage :images="user.pictures" class="rounded-md h-[90%]">
      <div class="absolute bottom-0 left-0 w-full p-4 text-white">
        <div class="justify-between flex items-center mb-2">
          <h1 class="text-3xl font-bold">{{user.first_name}} {{user.last_name}} {{age}}</h1>
          <font-awesome-icon icon="circle-info" class="text-white text-2xl cursor-pointer " @click="redirectToHomeProfile"/>
        </div>
        <div class="flex items-center mb-2">
          <font-awesome-icon icon="location-dot" class="text-white mr-2"/>
          <p class="text-lg">{{user.location.split(",")?.[0]}}</p>
        </div>
        <div>
          <Badge v-for="interest in user.interests.slice(0, 6)" :key="interest" variant="gray" class="m-0.5">
            {{interest}}
          </Badge>
        </div>
      </div>
    </HomeProfileImage>
    <LikeDislikeButton class="h-[10%]"/>
  </div>
</template>

