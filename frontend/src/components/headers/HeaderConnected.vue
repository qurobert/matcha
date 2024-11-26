<script setup lang="ts">
import {useAuthStore} from "@/stores/authStore";
import {useRouter} from "vue-router";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import HeaderNotifications from "@/components/headers/HeaderNotifications.vue";
const authStore = useAuthStore()
const router = useRouter()
import {getSrcImageFromPicture} from "@/helpers/getSrcImageFromPicture";

const logout = () => {
  authStore.logout()
  router.push("/")
}
</script>

<template>
  <div class="flex">
    <HeaderNotifications />

    <RouterLink class="relative w-6 h-6 mr-4" :to="{
      name: 'home-chat'
    }">
      <font-awesome-icon icon="comments" class="w-6 h-6"/>
    </RouterLink>

    <DropdownMenu>
      <DropdownMenuTrigger class="h-6">
        <Avatar class="w-6 h-6 flex justify-start">
          <AvatarImage v-if="authStore.is_connected" :src="getSrcImageFromPicture(authStore?.user.pictures?.[0])" alt="user profile" />
          <AvatarFallback>Auth</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>

        <DropdownMenuItem>
          <RouterLink to="/profile">
            <font-awesome-icon icon="user" class="mr-2"/>
            <span>Profile</span>
          </RouterLink>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <RouterLink to="/profile/settings">
            <font-awesome-icon icon="gear" class="mr-2"/>
            <span>Settings</span>
          </RouterLink>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <RouterLink to="/profile/preferences">
            <font-awesome-icon icon="sliders" class="mr-2"/>
            <span>Preferences</span>
          </RouterLink>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <button @click="logout" to="/logout">
            <font-awesome-icon icon="sign-out-alt" class="mr-2"/>
            <span>Logout</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>