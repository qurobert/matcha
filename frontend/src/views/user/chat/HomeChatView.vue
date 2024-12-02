<script setup lang="ts">
import MyContainer from "@/components/utility/MyContainer.vue";
import AvatarWithStatus from "@/components/ui/avatar/AvatarWithStatus.vue";
import moment from "moment";
import {useHomeChat} from "@/composables/useHomeChat";
import Loading from "@/components/icons/Loading.vue";
const homeChat = useHomeChat();
</script>

<template>
  <MyContainer>
    <h1 class="text-center text-3xl">Chat</h1>
    <Loading v-if="homeChat.isLoading.value" />
    <p v-if="!homeChat.isLoading.value && !homeChat.users.value.length">No matches yet</p>
    <section class="m-4 mb-8" v-if="!homeChat.isLoading.value && homeChat.users.value.length">
      <h2 class="text-gradient-primary text-lg">Matches</h2>
      <div class="flex w-full overflow-x-auto whitespace-nowrap">
        <RouterLink v-for="(user, index) in homeChat.users.value" :key="user?.id" class="my-2 text-center"
             :class="{
                'mr-4': index === 0,
                'mx-4': index !== 0
             }"
                    :to="'/chat/' + user?.id"
        >
          <AvatarWithStatus :picture="user?.pictures?.[0]" :online="user?.is_online" />
          <p class="text-lg">{{user.username}}</p>
        </RouterLink>
      </div>
    </section>
    <section class="m-4" v-if="!homeChat.isLoading.value && homeChat.users.value.length">
      <h2 class="text-gradient-primary text-lg">Messages</h2>

        <RouterLink v-for="(user, index) in homeChat.users.value" :key="user.id" class="flex flex-nowrap cursor-pointer group"
             :class="{
                'mt-2 mb-6': index === 0,
                'my-6': index !== 0
             }"
                    :to="'/chat/' + user.id"
        >
          <AvatarWithStatus :picture="user?.pictures?.[0]" size="md" :online="user?.is_online"/>
          <div class="truncate px-4 group-hover:opacity-65">
            <p>
              {{
                user.first_name + ' ' +
                user.last_name + ' ' +
                moment().diff(user.date_of_birth, 'years', false)
              }}
            </p>
            <p class="truncate text-sm text-gray">
              {{user.message ?? 'Click to start a conversation'}}
            </p>
          </div>
        </RouterLink>
    </section>
  </MyContainer>
</template>