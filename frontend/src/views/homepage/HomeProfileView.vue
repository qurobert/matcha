<script setup lang="ts">
import HomeProfileImage from "@/components/homePage/HomeProfileImage.vue";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import IconPublicProfile from "@/components/profile/IconPublicProfile.vue";
import {Badge} from "@/components/ui/badge";
import LikeDislikeButton from "@/components/homePage/LikeDislikeButton.vue";
import Loading from "@/components/icons/Loading.vue";
import {useUserInfo} from "@/composables/useUserInfo";
import { useRoute, useRouter } from 'vue-router'
import { reactive } from 'vue'

const router = useRouter()
const route = useRoute();
const userInfo = reactive(useUserInfo(route.params.id));

function goBack() {
  router.back();
}

</script>

<template>
  <div class="flex items-center flex-col h-full">
    <Loading v-if="userInfo.isLoading"  class="mt-4 absolute left-1/2 top-1/2"/>
    <HomeProfileImage :images="userInfo.user?.pictures ?? []" class="h-[48rem]" v-else>
      <button class="absolute -bottom-6 right-6 background-gradient-primary rounded-full p-4 w-12 h-12 flex items-center justify-center" @click="goBack">
        <font-awesome-icon icon="arrow-down" class="text-white text-xl"/>
      </button>
    </HomeProfileImage>

    <div class="md:w-2/3 lg:w-6/12 xl:w-1/3 w-full py-2 px-4">
      <div v-if="!userInfo.isLoading">
        <!-- Name -->
        <h1 class="text-3xl font-bold">{{userInfo.user?.first_name}} {{userInfo.user?.last_name}} {{userInfo.user?.age}}</h1>

        <!-- Status -->
        <div class="flex items-center mb-4" :class="{
          'text-success': userInfo.user?.is_online,
          'text-warning': !userInfo.user?.is_online
        }">
          <font-awesome-icon icon="circle" class="mr-2" />
          <h2 class="text-md">{{userInfo.user?.is_online ? "Connected" : moment(userInfo.user?.last_connection).format("DD MMMM")}}</h2>
        </div>

        <!-- Biography -->
        <div class="mb-4">
          <IconPublicProfile
            text_content="About me"
            :text_is_title="true"
            :text_is_bold="true"
            icon_content="quote-right"
            :icon_is_margin_right="true"/>
          <p class="text-md">{{userInfo.user?.biography}}</p>
        </div>

        <!-- Info -->
        <div class="mb-4">
          <IconPublicProfile
              text_content="Info"
              :text_is_bold="true"
              :text_is_title="true"
              icon_content="user"
              :icon_is_margin_right="true"
          />
          <IconPublicProfile v-for="item in userInfo.user?.info" :key="item?.text"
              :text_content="item?.text"
              :icon_content="item?.icon"
              :class="item?.color"
          />
          <IconPublicProfile
              :text_content="'Fame rating: ' + (userInfo.user?.fame_rating ?? '0') + '%' "
              :text_is_bold="false"
              :text_is_title="false"
              icon_content="percent"
              :icon_is_margin_right="true"
          />
        </div>
        <!-- Interests -->
        <div class="mb-2">
          <IconPublicProfile
              text_content="Interests"
              :text_is_bold="true"
              :text_is_title="true"
              icon_content="shapes"
              :icon_is_margin_right="true"
          />
          <div class="flex flex-wrap mt-2">
            <Badge v-for="interest in userInfo.user?.interests?.slice(0, 6)" :key="interest" variant="outline" class="m-0.5 text-md">
              {{interest}}
            </Badge>
          </div>
        </div>
      </div>
    </div>

    <!-- User actions-->
    <button class="md:w-2/3 lg:w-6/12 xl:w-1/3 w-full text-gray-light flex items-center justify-center flex-col mt-4 cursor-pointer" v-for="(action, index) in userInfo.user?.actions" :key="action?.title" :class="{
      'mb-20': index + 1 === userInfo.user?.actions?.length
    }"
         @click="action?.click()"
    >
      <hr class="h-1 w-full mb-4">
      <h2 class="text-lg font-bold mb-2">{{action?.title}}</h2>
      <p class="w-5/6 text-center text-md">{{action?.description}}</p>
    </button>
    <LikeDislikeButton class="fixed bottom-0 left-0" v-if="!userInfo.isLoading && userInfo.fromHomePage"/>
  </div>
</template>