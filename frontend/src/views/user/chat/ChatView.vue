<script setup lang="ts">
import {fetchUserById} from "@/api/user";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import Loading from "@/components/icons/Loading.vue";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import URL from "@/helpers/URL";
import {sendMessage} from "@/api/chat";
import {useSocket} from "@/plugins/socket";
import {useAuthStore} from "@/stores/authStore";

const route = useRoute()
const router = useRouter()
const id = route.params.id as string;
const user = ref({} as User)
const isLoading = ref(true)
const message = defineModel();
const socket = useSocket();
const authStore = useAuthStore();

socket?.on(`message_${authStore.user.id}`, (data) => {
  console.log("Message received", data);
});

onMounted(async() => {
  user.value = (await fetchUserById(id)).user;
  isLoading.value = false;
});

function getBackToChats() {
  router.push({name: "home-chat"});
}

function goToProfile() {
  router.push({name: "public-profile", params: {id: user.value.id}});
}

function send() {
  console.log("Sending message");
  sendMessage(id, message.value);
  message.value = "";
}

</script>

<template>
  <Loading v-if="isLoading" />
    <div v-else class="flex h-full w-full flex-col items-center justify-center">
      <div class="w-full justify-between items-center flex p-3">
        <font-awesome-icon icon="chevron-left" class="w-6 h-6 cursor-pointer text-accent" @click="getBackToChats"/>
        <div class="flex items-center cursor-pointer" @click="goToProfile">
          <Avatar>
            <AvatarImage :src="URL + '/uploads/' + user.pictures[0]" alt="@radix-vue" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p class="ml-2 font-bold">{{user.first_name}}</p>
        </div>
        <div></div>
      </div>
      <div class="flex-1 h-full w-full overflow-y-scroll border-2 border-gray-light">
        <p>Yo</p>
      </div>
      <div class=" w-full flex py-2 px-4">
        <input v-model="message"  type="text" class="w-full p-2" placeholder="Type a message" @keyup.enter="send"/>
        <button class="pl-2 text-accent" @click="send" >Send</button>
      </div>
    </div>
</template>