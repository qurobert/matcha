<script setup lang="ts">
import CenterDiv from "@/components/_global/CenterDiv.vue";
import CreateProfileInfo from "@/components/createProfile/CreateProfileInfo.vue";
import CreateProfileInterest from "@/components/createProfile/CreateProfileInterest.vue";
import CreateProfileBiography from "@/components/createProfile/CreateProfileBiography.vue";
import CreateProfilePicture from "@/components/createProfile/CreateProfilePicture.vue";
import PrimaryButton from "@/components/button/PrimaryButton.vue";
import {ref} from 'vue';
import SecondaryButton from "@/components/button/SecondaryButton.vue";

const index_page = ref(0);
const max_page = 3;
const increment_or_submit = () => {
  if (index_page.value === max_page) {
    console.log("Submit");
  } else {
    index_page.value++;
  }
};
const decrement = () => {
  if (index_page.value > 0) {
    index_page.value--;
  }
};
</script>

<template>
  <CenterDiv>
    <h1 class="text-center text-3xl">Create Profile</h1>
<!--    <form>-->
      <!--  All pages  -->
      <CreateProfileInfo v-if="index_page == 0" />
      <CreateProfileInterest v-else-if="index_page == 1" />
      <CreateProfileBiography v-else-if="index_page == 2" />
      <CreateProfilePicture v-else-if="index_page == 3" />

      <!--  Footer Create profile and submission -->
      <div class="mt-8">
        <div class="flex flex-col md:flex-row justify-between px-5 md:px-0">
          <SecondaryButton text="Back" :disabled="index_page === 0" :on-click="decrement" class="md:mr-4 mb-4 md:mb-0"/>
          <PrimaryButton :text="index_page == max_page ? 'Submit' : 'Next'" :on-click="increment_or_submit" is-submit/>
        </div>
        <p class="text-center text-lg mt-4">{{index_page + 1}} / {{max_page + 1}}</p>
      </div>
<!--    </form>-->

  </CenterDiv>
</template>
