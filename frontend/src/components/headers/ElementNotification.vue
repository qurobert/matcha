<script setup lang="ts">
import {type Notification, NotificationType} from "@/types/notification";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

const url = "http://localhost:3000/uploads/";

defineProps<{
  notifications: Notification[],
}>()
</script>

<template>
  <p v-if="!notifications || !notifications.length">No notifications</p>
  <div v-for="notification in notifications" :key="notification.id" class="my-2">
    <div class="flex">
      <Avatar class="w-6 h-6 mr-2">
        <AvatarImage :src="url + notification.target_user.pictures?.[0]" alt="user profile" />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
      <p>
        <span v-if="notification.notification_type === NotificationType.like">Likes</span>
        <span v-if="notification.notification_type === NotificationType.unlike">He unlikes</span>
        <span v-if="notification.notification_type === NotificationType.viewed">Viewed your profile</span>
        <span v-if="notification.notification_type === NotificationType.match">It's a match </span>
        <span v-if="notification.notification_type === NotificationType.message">You receive a message</span>
      </p>
    </div>
    <hr class="bg-gray-light h-0.5 w-full border-0 rounded-md my-2">
  </div>
</template>