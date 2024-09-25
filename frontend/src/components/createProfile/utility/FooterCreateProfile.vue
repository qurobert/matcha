<script setup lang="ts">
import {useFormStore} from "@/stores/formStore";
import {Button} from "@/components/ui/button";

const formStore = useFormStore();
const index_page = formStore.index_page;
const decrement = formStore.decrementPageIndex;
const max_page = formStore.max_page;
</script>

<template>
  <div class="mt-8">
    <div class="flex flex-col md:flex-row justify-center px-5 md:px-0">
<!--      <Button variant="secondary" :disabled="index_page === 0" @click="decrement" class="md:mr-4 mb-4 md:mb-0">-->
<!--        Back-->
<!--      </Button>-->
      <Button type="submit">
        {{index_page == max_page ? 'Submit' : 'Next'}}
      </Button>
    </div>
    <p class="text-center text-lg mt-4">
      {{index_page + 1}} / {{max_page + 1}}
    </p>
  </div>

</template>

<style scoped>

</style>