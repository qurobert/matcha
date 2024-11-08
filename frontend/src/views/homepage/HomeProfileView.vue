<script setup lang="ts">
import {useUserStore} from "@/stores/userStore";
import HomeProfileImage from "@/components/homePage/HomeProfileImage.vue";
import {useRouter} from "vue-router";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import IconLogo from "@/components/icons/IconLogo.vue";
import IconPublicProfile from "@/components/profile/IconPublicProfile.vue";
import {Badge} from "@/components/ui/badge";
import LikeDislikeButton from "@/components/homePage/LikeDislikeButton.vue";
import {fetchViewedProfile} from "@/api/notifications";
import {onMounted} from "vue"

const router = useRouter()
const userStore = useUserStore();
const user = userStore.getUser;
const age = moment().diff(user.date_of_birth, 'years');
let jesuis = ''

if (user.interested_in === 'both') {
  jesuis = 'Bisexual'
}
else if (user.interested_in == user.gender) {
  jesuis = 'Gay'
}
else {
  jesuis = 'Straight'
}

function goBack() {
  router.back();
}

const userInfo: {
  icon: string,
  text: string,
  color?: string
}[] = [
  {
    icon: "venus-mars",
    text: jesuis + ' ' + user.gender
  },
  {
    icon: "location-dot",
    text: user.location
  }
]

if (user.viewed) {
  userInfo.unshift({
    icon: "eye",
    text: "Viewed your profile",
    color: "text-accent"
  })
}
if (user.liked) {
  userInfo.unshift({
    icon: "heart",
    text: "Likes you",
    color: "text-accent"
  })
}

const userActions = [
  {
    title: 'Unlike',
    description: 'No longer interested ? Remove this profile from your likes'
  },
  {
    title: 'Unmatch',
    description: 'No longer interested ? Remove this profile from your matches'
  },
  {
    title: 'Block User',
    description: 'Block this user and prevent them from contacting you'
  },
  {
    title: 'Report User',
    description: 'Report this user for inappropriate behavior'
  }
]

onMounted(() => {
  fetchViewedProfile(user.id);
})

</script>

<template>
  <div class="flex items-center flex-col h-full">
    <HomeProfileImage :images="user.pictures" class="h-[48rem]">
      <button class="absolute -bottom-6 right-6 background-gradient-primary rounded-full p-4 w-12 h-12 flex items-center justify-center" @click="goBack">
        <font-awesome-icon icon="arrow-down" class="text-white text-xl"/>
      </button>
    </HomeProfileImage>
    <div class="md:w-2/3 lg:w-6/12 xl:w-1/3 w-full py-2 px-4">
      <!-- Name -->
      <h1 class="text-3xl font-bold">{{user.first_name}} {{user.last_name}} {{age}}</h1>

      <!-- Status -->
      <div class="flex items-center mb-4" :class="{
        'text-success': user.online,
        'text-warning': !user.online
      }">
        <font-awesome-icon icon="circle" class="mr-2" />
        <h2 class="text-md">{{user.online ? "Connected" : moment(user.last_connection).format("DD MMMM YY")}}</h2>
      </div>

      <!-- Biography -->
      <div class="mb-4">
        <IconPublicProfile
          text_content="About me"
          :text_is_title="true"
          :text_is_bold="true"
          icon_content="quote-right"
          :icon_is_margin_right="true"/>
        <p class="text-md">{{user.biography}}</p>
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
        <IconPublicProfile v-for="item in userInfo" :key="item.text"
            :text_content="item.text"
            :icon_content="item.icon"
            :class="item.color"
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
          <Badge v-for="interest in user.interests.slice(0, 6)" :key="interest" variant="outline" class="m-0.5 text-md">
            {{interest}}
          </Badge>
        </div>
      </div>
    </div>
    <!-- User actions-->
    <div class="md:w-2/3 lg:w-6/12 xl:w-1/3 w-full text-gray-light flex items-center justify-center flex-col mt-4 cursor-pointer" v-for="(action, index) in userActions" :key="action.title" :class="{
      'mb-20': index === userActions.length - 1
    }">
      <hr class="h-1 w-full mb-4">
      <h2 class="text-lg font-bold mb-2">{{action.title}}</h2>
      <p class="w-5/6 text-center text-md">{{action.description}}</p>
    </div>
    <LikeDislikeButton class="fixed bottom-0 left-0"/>
  </div>
</template>