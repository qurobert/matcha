<script setup lang="ts">
import { type HTMLAttributes, computed, onMounted, ref } from 'vue'
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from 'radix-vue'
import { cn } from '@/lib/utils'
import {TabsContent} from "@/components/ui/tabs";

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
const forwardedProps = useForwardProps(delegatedProps)

</script>

<template>
  <TabsTrigger
      v-bind="forwardedProps"
    :class="cn(
      'inline-flex items-center justify-center whitespace-nowrap mx-3 py-1.5 ' +
       'text-sm font-medium ring-offset-background transition-all ' +
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ' +
         'disabled:pointer-events-none disabled:opacity-50 ' +
          'data-[state=active]:text-gradient-primary relative',
      props.class,
    )"
  >
    <TabsContent :value="props.value">
      <div class="background-gradient-primary w-full h-1 absolute -bottom-1 rounded-full"></div>
    </TabsContent>

    <span class="truncate">
      <slot />
    </span>
  </TabsTrigger>
</template>
