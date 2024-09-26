<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import type { LabelProps } from 'radix-vue'
import { useFormField } from './useFormField'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

const props = withDefaults(defineProps<LabelProps & { class?: HTMLAttributes['class'], displayError?: boolean }>(), {
  displayError: true,
});
const { error, formItemId } = useFormField()
</script>

<template>
  <Label
    :class="cn(
      {
        'text-destructive': props.displayError && error,
      },
      props.class,
    )"
    :for="formItemId"
  >
    <slot />
  </Label>
</template>
