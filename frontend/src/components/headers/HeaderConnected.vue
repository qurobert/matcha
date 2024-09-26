<script setup lang="ts">
import {useAuthStore} from "@/stores/userStore";
import {useRouter} from "vue-router";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push("/")
}
const url = "http://localhost:3000/uploads/";
const user = useAuthStore().user;
</script>

<template>
  <div class="flex">
    <font-awesome-icon icon="fa-regular fa-bell" class="mr-4 w-6 h-6"/>
    <div class="relative w-6 h-6 mr-4">
      <font-awesome-icon icon="comments" class="w-6 h-6"/>
    </div>

    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar class="w-6 h-6">
          <AvatarImage :src="url + user.pictures[0]" alt="user profile" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <RouterLink to="/settings">
            <font-awesome-icon icon="sliders" class="mr-2"/>
            <span>Preferences</span>
          </RouterLink>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <RouterLink to="/profile">
            <font-awesome-icon icon="user" class="mr-2"/>
            <span>Profile</span>
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