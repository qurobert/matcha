<script setup lang="ts">
import {capitalizeFirstLetter} from "@/lib/utils";
import { useFieldArray } from "vee-validate";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import FormFieldInterests from "@/components/formField/FormFieldInterests.vue";
import {Button} from "@/components/ui/button";
import {watch} from "vue";

const props = defineProps<{
  name: string;
}>();

const {fields} = useFieldArray(props.name);
console.log(fields.value);
console.log(props.name);

watch(() => fields.value, () => {
  console.log(fields.value);
}, {deep: true});

</script>

<template>
  <FormField :name=name>
    <FormItem>
      <FormLabel>Interests</FormLabel>
      <br />
      <Dialog>
        <DialogTrigger as-child>
          <FormControl>
            <Button size="sm" class="text-md" :variant="fields.length > 0 ? 'default' : 'secondary'" >
                <span class="max-w-lg truncate" v-if="fields.length">
                  {{fields.slice(0, 3).map((element) => capitalizeFirstLetter(element.value as string)).join(', ')}}
                  {{fields.length > 3 ? '...' : ''}}
                </span>
              <span v-else>Add interests</span>
              <font-awesome-icon icon="plus" class="w-4 h-4 ml-4"/>
            </Button>
            <FormMessage />

          </FormControl>
        </DialogTrigger>
        <DialogContent class="p-4 mr-4 max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              Interests
            </DialogTitle>
            <DialogDescription>
              Select your new interests
            </DialogDescription>
          </DialogHeader>
          <FormLabel>Interests</FormLabel>
          <FormFieldInterests :name="name" />
          <FormMessage />
        </DialogContent>
      </Dialog>

    </FormItem>
  </FormField>
</template>