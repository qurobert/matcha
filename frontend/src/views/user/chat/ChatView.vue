<script setup lang="ts">
import {fetchUserById} from "@/api/user";
import {nextTick, onMounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import Loading from "@/components/icons/Loading.vue";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {fetchMessages, sendMessage} from "@/api/chat";
import {useSocket} from "@/plugins/socket";
import {useAuthStore} from "@/stores/authStore";
import {useToast} from "@/components/ui/toast";
import {getSrcImageFromPicture} from "@/helpers/getSrcImageFromPicture";
import {fetchMatches} from "@/api/actions";

const route = useRoute()
const router = useRouter()
const id = route.params.id as string;
const user = ref({} as User)
const isLoading = ref(true)
const message = defineModel();
const socket = useSocket();
const authStore = useAuthStore();
const messages = ref([] as { id: string, message: string }[]);

socket?.on(`message_${authStore.user.id}`, (data) => {
  messages.value.push(data)
});

onMounted(async() => {
  try {
    const dataMatches = await fetchMatches();
    if (!dataMatches.matches.find((match: any) => match.user.id == id)) {
      throw new Error("User not found");
    }
    const dataUsers = await fetchUserById(id);
    const dataMessages = await fetchMessages(id);

    user.value = dataUsers.user;
    messages.value = dataMessages.messages;
    isLoading.value = false;

  } catch {
    router.push({name: "home-chat"});
  }
});

function getBackToChats() {
  router.push({name: "home-chat"});
}

function goToProfile() {
  router.push({name: "public-profile", params: {id: user.value.id}});
}

function send() {
  messages.value.push({
    id: authStore.user.id,
    message: message.value as string
  })
  sendMessage(id, message.value as string);
  message.value = "";
}

</script>

<template>
    <div class="h-full w-full flex flex-col items-center justify-center mt-16">
      <Loading v-if="isLoading" />
      <div class="w-full flex justify-between items-center fixed top-0 left-0 p-3 bg-white border-b-2 border-gray-light" v-if="!isLoading">
        <font-awesome-icon icon="chevron-left" class="w-6 h-6 cursor-pointer text-accent" @click="getBackToChats"/>
        <div class="flex items-center cursor-pointer" @click="goToProfile">
          <Avatar>
            <AvatarImage :src="getSrcImageFromPicture(user.pictures?.[0])" alt="@radix-vue" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p class="ml-2 font-bold">{{user.first_name}}</p>
        </div>
        <div></div>
      </div>
      <div class="h-full w-full overflow-y-scroll border-gray-light pt-4 text-white p-2 " v-if="!isLoading">
        <div v-for="message in messages" :key="message.message" class="mb-4 flex" :class="message.id === authStore.user.id ? 'w-full justify-end' : 'text-left'">
            <p :class="message.id == authStore.user.id ? 'bg-blue rounded-br-none' : 'background-gradient-primary rounded-bl-none'" class="p-2 rounded-md max-w-96">
              {{ message.message}}
            </p>
        </div>
      </div>
      <div class="w-full fixed bottom-0 left-0 flex py-2 px-4 bg-white border-t-2 border-gray-light" v-if="!isLoading">
        <input v-model="message"  type="text" class="w-full p-2" placeholder="Type a message" @keyup.enter="send"/>
        <button class="pl-2 text-accent" @click="send" >Send</button>
      </div>
    </div>
</template>