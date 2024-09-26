<script setup lang="ts">
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import TableProfile from "@/components/profile/TableProfile.vue";
import {TypeTableProfile} from "@/types/table_profile";
</script>

<template>
  <section>
    <h2 class="flex items-center m-4 text-gradient-primary">
      <font-awesome-icon icon="bolt" class="w-6 h-6 mr-2 text-accent background-gradient-primary bg-clip-text" />
      Activités
    </h2>
    <Tabs default-value="likes" class="w-full">
      <TabsList class="w-full justify-start">
        <TabsTrigger value="likes">
          10 Likes
        </TabsTrigger>
        <TabsTrigger value="views">
          5 Views
        </TabsTrigger>
        <TabsTrigger value="matches">
          3 Matches
        </TabsTrigger>
      </TabsList>
      <TabsContent value="likes">
        <TableProfile :type="TypeTableProfile.likes"/>
      </TabsContent>
      <TabsContent value="views">
        <TableProfile :type="TypeTableProfile.views"/>
      </TabsContent>
      <TabsContent value="matches">
        <TableProfile :type="TypeTableProfile.matches"/>
      </TabsContent>
    </Tabs>
  </section>
</template>