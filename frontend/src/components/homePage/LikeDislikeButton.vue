<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {useUserTargetStore} from "@/stores/userTargetStore";
import {fetchDislikeUser, fetchLikeUser} from "@/api/actions";
import {useImageHomeStore} from "@/stores/imageHomeStore";
import {useToast} from "@/components/ui/toast";
import { useRoute, useRouter } from 'vue-router'
const imageHomeStore = useImageHomeStore();
const targetStore = useUserTargetStore();
const route = useRoute();
const router = useRouter();

function goToNext(message: string) {
  const {toast} = useToast();

  toast({
    title: message,
    duration: 1500,
  })
  imageHomeStore.reset()
  targetStore.goToNextUser()
  if (route.name !== 'home') {
    router.push({name: 'home'})
  }
}
function dislikeUser() {
  fetchDislikeUser(targetStore.activeUser.id).then(() => {
    goToNext(`Dislike ${targetStore.activeUser.first_name}`)
  })
}

function likeUser() {

  fetchLikeUser(targetStore.activeUser.id).then(() => {
    goToNext(`Like ${targetStore.activeUser.first_name}`)
  })
}
</script>

<template>
  <div class="flex justify-center items-center w-full m-2" v-if="!targetStore.isLoading">
    <button class="w-16 h-16 rounded-full shadow-xl flex justify-center items-center mr-12 bg-white" @click="dislikeUser">
      <font-awesome-icon icon="xmark" class="w-8 h-8 text-accent" />
    </button>
    <button class="w-16 h-16 rounded-full shadow-xl flex justify-center items-center ml-12 bg-white" @click="likeUser">
      <font-awesome-icon icon="heart" class="text-success w-8 h-8" />
    </button>
  </div>
</template>