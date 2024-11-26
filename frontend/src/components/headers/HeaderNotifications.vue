<script setup lang="ts">
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {fetchMarkAsReadNotifications, fetchNotifications} from "@/api/notifications";
import {type Notification} from "@/types/notification";
import ElementNotification from "@/components/headers/ElementNotification.vue";
import {ref, computed, onMounted} from 'vue'
import {useSocket} from "@/plugins/socket";
import {useAuthStore} from "@/stores/authStore";

const authStore = useAuthStore();
const notifications = ref<Notification[]>([]);
const unreadNotifications = computed(() => notifications.value.filter((notif) => !notif.is_read));
const readNotifications = computed(() => notifications.value.filter((notif) => notif.is_read));
const hasUnreadNotifications = ref(false);

onMounted(async () => {
  notifications.value = (await fetchNotifications())?.notifications
  if (notifications.value?.some((notif) => !notif.is_read)) {
    hasUnreadNotifications.value = true
  }
})

async function isOpen(open: boolean) {
  if (open) {
    hasUnreadNotifications.value = false
    notifications.value = (await fetchNotifications())?.notifications
    await fetchMarkAsReadNotifications()
  }
}

const socket = useSocket();
socket?.on(`notification_${authStore.user.id}`, (...args: any[]) => {
  hasUnreadNotifications.value = true
})

</script>

<template>
  <DropdownMenu @update:open="isOpen">
    <DropdownMenuTrigger class="h-6 relative">
      <font-awesome-icon icon="bell" class="mr-4 w-6 h-6" />
      <div class="w-3.5 h-3.5 rounded-full bg-accent absolute -bottom-1 right-3.5 border-2 border-white" v-if="hasUnreadNotifications"/>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="min-w-96">
      <Tabs default-value="Unread" class="w-full">
        <TabsList class="w-full justify-start">
          <TabsTrigger value="Unread">
            All
          </TabsTrigger>
          <TabsTrigger value="read">
            Read
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Unread" class="p-2">
          <ElementNotification :notifications="unreadNotifications" />
        </TabsContent>
        <TabsContent value="read" class="p-2">
          <ElementNotification :notifications="readNotifications" />
        </TabsContent>
      </Tabs>
    </DropdownMenuContent>
  </DropdownMenu>
</template>