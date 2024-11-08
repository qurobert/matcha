<script setup lang="ts">

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {useUserStore} from "@/stores/userStore";
import {useToast} from "@/components/ui/toast";
import {fetchDislikeUser, fetchLikeUser} from "@/api/actions";
const userStore = useUserStore();
const user = userStore.getUser;
function dislikeUser() {
  fetchDislikeUser(user.id)
  const {toast} = useToast();
  toast({
    title: 'Dislike User',
  })
}

function likeUser() {
  fetchLikeUser(user.id)
  const {toast} = useToast();
  toast({
    title: 'Like User',
  })
}
</script>

<template>
  <div class="flex justify-center items-center w-full m-2">
    <button class="w-16 h-16 rounded-full shadow-xl flex justify-center items-center mr-12 bg-white" @click="dislikeUser">
      <font-awesome-icon icon="xmark" class="w-8 h-8 text-accent" />
    </button>
    <button class="w-16 h-16 rounded-full shadow-xl flex justify-center items-center ml-12 bg-white" @click="likeUser">
      <font-awesome-icon icon="heart" class="text-success w-8 h-8" />
    </button>
  </div>
</template>

<style scoped>

</style>