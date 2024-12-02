<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {Badge} from "@/components/ui/badge";
import HomeProfileImage from "@/components/homePage/HomeProfileImage.vue";
import {useRouter} from "vue-router";
import moment from "moment";
import LikeDislikeButton from "@/components/homePage/LikeDislikeButton.vue";
import Loading from "@/components/icons/Loading.vue";
import {useUserTargetStore} from "@/stores/userTargetStore";
import { onMounted } from "vue";
const router = useRouter();
const targetStore = useUserTargetStore();
onMounted(() => {
  if (!targetStore.activeUser)
    targetStore.fetchNewUsers();
})
function redirectToHomeProfile() {
  if (!targetStore.activeUser.id) return;
  router.push({name: "public-profile", params: {id: targetStore.activeUser.id}});
}

</script>

<template>
  <div class="h-full flex flex-col items-center justify-center px-4">
      <Loading v-if="targetStore.isLoading"/>
      <p v-if="!targetStore.isLoading && !targetStore.activeUser" class="text-center">
        No users found in your area. <br />
        Please try again later.

      </p>
      <HomeProfileImage :images="targetStore.activeUser?.pictures ?? []" class="rounded-md h-[90%]" v-if="!targetStore.isLoading && targetStore.activeUser">
        <div class="absolute bottom-0 left-0 w-full p-4 text-white z-10">
          <div class="justify-between flex items-center mb-2">
            <h1 class="text-3xl font-bold">{{targetStore.activeUser?.first_name}} {{targetStore.activeUser?.last_name}} {{moment().diff(targetStore.activeUser?.date_of_birth, 'years')}}</h1>
            <font-awesome-icon icon="circle-info" class="text-white text-2xl cursor-pointer " @click="redirectToHomeProfile"/>
          </div>
          <div class="flex items-center mb-2">
            <font-awesome-icon icon="location-dot" class="text-white mr-2"/>
            <p class="text-lg">{{targetStore.activeUser?.location?.split(",")?.[0] ?? "Location not found"}}</p>
          </div>
          <div>
            <Badge v-for="interest in targetStore.activeUser?.interests?.slice(0, 6)" :key="interest" variant="gray" class="m-0.5">
              {{interest}}
            </Badge>
          </div>
        </div>
      </HomeProfileImage>
      <LikeDislikeButton class="h-[10%]" v-if="!targetStore.isLoading && targetStore.activeUser"/>
  </div>
</template>

