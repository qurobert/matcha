<script setup lang="ts">
import {type Notification, NotificationType} from "@/types/notification";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {capitalizeFirstLetter} from "../../lib/utils";
import URL from "@/helpers/URL";

const url = URL + "/uploads/";

defineProps<{
  notifications: Notification[],
}>()
</script>

<template>
  <p v-if="!notifications || !notifications.length">No notifications</p>
  <div v-for="(notification, index) in notifications" :key="notification.id" :class="{
    'mt-4': index !== 0,
  }">
    <div class="flex">
      <Avatar class="w-6 h-6 mr-2">
        <AvatarImage :src="notification.target_user.pictures?.[0] ?? ''" alt="user profile" />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
      <p class="max-w-80 truncate">
        <span v-if="notification.notification_type === NotificationType.like">
          <span class="font-bold">
            {{ capitalizeFirstLetter(notification.target_user.first_name?.toLowerCase() ?? "") }}
            {{ capitalizeFirstLetter(notification.target_user.last_name?.toLowerCase() ?? "") }}
          </span>
          likes your account
        </span>
        <span v-if="notification.notification_type === NotificationType.unlike">
          <span class="font-bold">
            {{ capitalizeFirstLetter(notification.target_user.first_name?.toLowerCase() ?? "") }}
            {{ capitalizeFirstLetter(notification.target_user.last_name?.toLowerCase() ?? "") }}
          </span>
        unlikes you
        </span>
        <span v-if="notification.notification_type === NotificationType.viewed">
          <span class="font-bold">
            {{ capitalizeFirstLetter(notification.target_user.first_name?.toLowerCase() ?? "") }}
            {{ capitalizeFirstLetter(notification.target_user.last_name?.toLowerCase() ?? "") }}
          </span>
          has viewed your profile
        </span>
        <span v-if="notification.notification_type === NotificationType.match">
          You matched with
           <span class="font-bold">
            {{ capitalizeFirstLetter(notification.target_user.first_name?.toLowerCase() ?? "") }}
            {{ capitalizeFirstLetter(notification.target_user.last_name?.toLowerCase() ?? "") }}
          </span>
        </span>
        <span v-if="notification.notification_type === NotificationType.message">
           <span class="font-bold">
            {{ capitalizeFirstLetter(notification.target_user.first_name?.toLowerCase() ?? "") }}
            {{ capitalizeFirstLetter(notification.target_user.last_name?.toLowerCase() ?? "") }}
          </span>
          send you a message
        </span>
        <span v-if="notification.notification_type === NotificationType.unmatch">
           <span class="font-bold">
            {{ capitalizeFirstLetter(notification.target_user.first_name?.toLowerCase() ?? "") }}
            {{ capitalizeFirstLetter(notification.target_user.last_name?.toLowerCase() ?? "") }}
          </span>
          unmatches you
        </span>
      </p>
    </div>
  </div>
</template>