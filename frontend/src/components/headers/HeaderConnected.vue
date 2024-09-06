<script setup lang="ts">

import DropdownUtility from "@/components/_global/DropdownUtility.vue";
import IconAvatar from "@/components/icons/IconAvatar.vue";
import {useAuthStore} from "@/stores/userStore";
import {useRouter} from "vue-router";

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push("/")
}
</script>

<template>
  <div class="flex">
    <font-awesome-icon icon="fa-regular fa-bell" class="mr-4 w-6 h-6"/>
    <div class="relative w-6 h-6 mr-4">
      <font-awesome-icon icon="comments" class="w-6 h-6"/>
    </div>

    <DropdownUtility>
      <template #default>
        <IconAvatar class="w-6 h-6"/>
      </template>

      <template #dropdown-content>
        <RouterLink to="/settings" class="text-gray-100 hover:text-dark px-4 py-1">
          <font-awesome-icon icon="sliders" class="mr-2"/>
          <span>Preferences</span>
        </RouterLink>

        <RouterLink to="/profile" class="text-gray-100 hover:text-dark px-4 py-1">
          <font-awesome-icon icon="user" class="mr-2"/>
          <span>Profile</span>
        </RouterLink>

        <button @click="logout" to="/logout" class="text-gray-100 hover:text-dark px-4 py-1 w-full text-left">
          <font-awesome-icon icon="sign-out-alt" class="mr-2"/>
          <span>Logout</span>
        </button>
      </template>
    </DropdownUtility>
  </div>
</template>

<style scoped>

</style>