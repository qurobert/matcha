<script setup lang="ts">
import CenterDiv from "@/components/utility/CenterDiv.vue";
import CreateProfileInfo from "@/components/createProfile/InfoCreateProfile.vue";
import CreateProfileInterest from "@/components/createProfile/InterestCreateProfile.vue";
import CreateProfileBiography from "@/components/createProfile/BiographyCreateProfile.vue";
import CreateProfilePicture from "@/components/createProfile/PictureCreateProfile.vue";
import {useFormStore} from "@/stores/formStore";
import { onBeforeMount } from "vue";
import Loading from "@/components/icons/Loading.vue";

const formStore = useFormStore();
onBeforeMount(() => {
  const formStore = useFormStore();
  formStore.setMaxPage(3);
})
</script>

<template>
  <CenterDiv>
    <h1 class="text-center text-3xl">Create Profile</h1>
      <CreateProfileInfo v-if="formStore.index_page == 0"/>
      <CreateProfileInterest v-else-if="formStore.index_page == 1" />
      <CreateProfileBiography v-else-if="formStore.index_page == 2" />
      <CreateProfilePicture v-else-if="formStore.index_page == 3" />
      <div v-else class="flex flex-col justify-center items-center">
        <p class="my-4 text-lg">Loading...</p>
        <Loading />
      </div>
      <!--  Footer Create profile and submission -->
  </CenterDiv>
</template>
