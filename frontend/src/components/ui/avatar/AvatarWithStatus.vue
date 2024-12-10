<script setup lang="ts">
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar/index";
import {getSrcImageFromPicture} from "@/helpers/getSrcImageFromPicture";
defineProps({
  picture: {
    type: String,
    required: false
  },
  size: {
    type: String,
    default: "lg",
  },
  online: {
    type: Boolean,
    default: false,
  }
})
</script>

<template>
  <div class="relative" :class="{
    'w-24 h-24': size === 'lg',
    'w-14 h-14': size === 'md',
    'w-8 h-8': size === 'sm',
    'w-6 h-6': size === 'xs',
  }">
    <Avatar :class="{
      'w-24 h-24': size === 'lg',
      'w-14 h-14': size === 'md',
      'w-8 h-8': size === 'sm',
      'w-6 h-6': size === 'xs',
    }">
      <AvatarImage v-if="picture" :src="getSrcImageFromPicture(picture)" alt="user profile" :class="{
      'w-24 h-24': size === 'lg',
      'w-14 h-14': size === 'md',
      'w-8 h-8': size === 'sm',
      'w-6 h-6': size === 'xs',
    }"/>
      <AvatarFallback>User</AvatarFallback>
      <div class="absolute border-white right-0 rounded-full z-10"
           :class="{
              'w-7 h-7 outline-2 border-4 bottom-1': size === 'lg',
              'w-4 h-4 outline-1 border-2 bottom-0.5': size === 'md',
              'w-2 h-2 outline-1 border-2 bottom-0.5': size === 'sm',
              'w-1 h-1 outline-1 border-2 bottom-0.5': size === 'xs',
              'bg-success': online,
              'bg-warning': !online
           }"
      ></div>
    </Avatar>
  </div>
</template>