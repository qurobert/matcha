<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {type IconDefinition} from "@fortawesome/fontawesome-svg-core";

defineProps<{
  icon_content?: Object | Array<String> | String | IconDefinition,
  text_content?: String,
  icon_is_margin_right?: Boolean,
  text_is_title?: Boolean,
  text_is_bold?: Boolean,
}>()
</script>

<template>
  <div class="flex items-center" :class="{
    'font-bold': text_is_bold,
    'text-lg': text_is_title,
    'text-md': !text_is_title
  }">
    <font-awesome-icon v-if="icon_content" :icon="icon_content" class="w-6" :class="{
      'mr-2' : icon_is_margin_right,
      'mr-1' : !icon_is_margin_right
    }"/>
    <h2 v-if="text_is_title">{{text_content}}</h2>
    <p v-else>{{text_content}}</p>
  </div>
</template>