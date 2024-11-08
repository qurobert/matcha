<script setup lang="ts">
import {type Notification} from "@/types/notification";

defineProps<{
  notifications: Notification[],
}>()
</script>

<template>
  <p v-if="!notifications || !notifications.length">No notifications</p>
  <div v-for="notification in notifications" :key="notification.id">
    {{notification.notification_type}}
  </div>
</template>