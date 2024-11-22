<script setup lang="ts">
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import TableProfile from "@/components/profile/TableProfile.vue";
import {useUserActions} from "@/composables/useUserActions";
import Loading from "@/components/icons/Loading.vue";
import {computed} from "vue";

const userActions = useUserActions();
const usersLikes = computed(() => (userActions.interactions.value.filter(interaction => interaction.action_type === "like").map(interaction => interaction.user)));
const usersViews = computed(() => (userActions.interactions.value.filter(interaction => interaction.action_type === "viewed").map(interaction => interaction.user)));
const userMatches = computed(() => (userActions.interactions.value.filter(interaction => interaction.action_type === "match").map(interaction => interaction.user)));
</script>

<template>
  <section>
    <h2 class="flex items-center m-4 text-gradient-primary">
      <font-awesome-icon icon="bolt" class="w-6 h-6 mr-2 text-accent background-gradient-primary bg-clip-text" />
      Activités
    </h2>
    <Loading v-if="userActions.isLoading?.value" />
    <Tabs default-value="likes" class="w-full" v-else>
      <TabsList class="w-full justify-start">
        <TabsTrigger value="likes">
          {{usersLikes.length}} Like{{usersLikes.length > 1 ? 's' : ''}}
        </TabsTrigger>
        <TabsTrigger value="views">
          {{usersViews.length}} View{{usersViews.length > 1 ? 's' : ''}}
        </TabsTrigger>
        <TabsTrigger value="matches">
          {{userMatches.length}} Matche{{userMatches.length > 1 ? 's' : ''}}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="likes">
        <TableProfile :users="usersLikes"/>
      </TabsContent>
      <TabsContent value="views">
        <TableProfile :users="usersViews"/>
      </TabsContent>
      <TabsContent value="matches">
        <TableProfile :users="userMatches"/>
      </TabsContent>
    </Tabs>
  </section>
</template>