<script setup lang="ts">
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {fetchMarkAsReadNotifications, fetchNotifications} from "@/api/notifications";
import {type Notification} from "@/types/notification";
import ElementNotification from "@/components/headers/ElementNotification.vue";
import {ref, computed} from 'vue'

const notifications = ref<Notification[]>([]);
const unreadNotifications = computed(() => notifications.value.filter((notif) => !notif.is_read));
const readNotifications = computed(() => notifications.value.filter((notif) => notif.is_read));

async function isOpen(open: boolean) {
  if (open) {
    notifications.value = (await fetchNotifications())?.notifications
    await fetchMarkAsReadNotifications()
  }
}
</script>

<template>
  <DropdownMenu @update:open="isOpen">
    <DropdownMenuTrigger class="h-6">
      <font-awesome-icon icon="fa-regular fa-bell" class="mr-4 w-6 h-6"/>
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