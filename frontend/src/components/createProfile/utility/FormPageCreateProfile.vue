<script setup lang="ts">
import {type YupSchema} from 'vee-validate';
import {useCreateProfilePage} from "@/composables/useCreateProfilePage";
import FooterCreateProfile from "@/components/createProfile/utility/FooterCreateProfile.vue";

const props = defineProps<{
  schema: YupSchema
}>();

const {onSubmit} = useCreateProfilePage(props.schema);
</script>

<template>
  <form @submit.prevent="onSubmit">
    <slot />
    <FooterCreateProfile />
  </form>
</template>

<style scoped>

</style>