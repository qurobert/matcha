<script setup lang="ts">
import {useFakeUser} from "@/composables/useFakeUser";
import MyContainer from "@/components/utility/MyContainer.vue";
import AvatarWithStatus from "@/components/ui/avatar/AvatarWithStatus.vue";
import moment from "moment";
import _ from "lodash";
const fakeUsers = useFakeUser(1);
</script>

<template>
  <MyContainer>
    <h1 class="text-center text-3xl">Chat</h1>
    <section class="m-4 mb-8">
      <h2 class="text-gradient-primary text-lg">Matches</h2>
      <div class="flex w-full overflow-x-auto whitespace-nowrap">
        <RouterLink v-for="(fakeUser, index) in fakeUsers" :key="fakeUser.id" class="my-2"
             :class="{
                'mr-1': index === 0,
                'mx-1': index !== 0
             }"
                    :to="'/chat/' + fakeUser.id"
        >
          <AvatarWithStatus :picture="fakeUser.pictures?.[0]" />
          <p class="text-lg">{{fakeUser.username}}</p>
        </RouterLink>
      </div>
    </section>
    <section class="m-4">
      <h2 class="text-gradient-primary text-lg">Messages</h2>

        <RouterLink v-for="(fakeUser, index) in _.shuffle(fakeUsers)" :key="fakeUser.id" class="flex flex-nowrap cursor-pointer group"
             :class="{
                'mt-2 mb-6': index === 0,
                'my-6': index !== 0
             }"
                    :to="'/chat/' + fakeUser.id"
        >
          <AvatarWithStatus :picture="fakeUser.pictures?.[0]" size="md"/>
          <div class="truncate px-4 group-hover:opacity-65">
            <p>
              {{
                fakeUser.first_name + ' ' +
                fakeUser.last_name + ' ' +
                moment().diff(fakeUser.date_of_birth, 'years', false)
              }}
            </p>
            <p class="truncate ">
              {{
                fakeUser.biography
              }}
            </p>
          </div>
        </RouterLink>
    </section>
  </MyContainer>
</template>