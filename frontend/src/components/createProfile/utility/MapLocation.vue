<script setup lang="ts">
import L from 'leaflet'
import "leaflet/dist/leaflet.css";
import {
  LMap,
  LTileLayer,
  LMarker,
} from "@vue-leaflet/vue-leaflet";
import {onMounted, ref} from 'vue'
import {fetchReverseGeocoding} from "@/api/reverse_geocoding";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader, DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {useField} from 'vee-validate'

const {value, setValue} = useField('location')
const isLoading = ref(true);
const formattedLocation = ref<string | null>(null)
const markerPosition = ref(null as any);

// Utility
async function reverseGeoCode(lat: number, lng: number) {
  const location = await fetchReverseGeocoding(lat, lng);
  return [location?.address?.road, location?.address?.municipality, location?.address?.country, location?.address?.postcode]
      .filter(Boolean)
      .join(', ');
}

// OnMounted
onMounted(async () => {
  if (!value.value?.lat || !value.value?.lng) {
    isLoading.value = false;
    return ;
  }
  formattedLocation.value = await reverseGeoCode(value.value.lat, value.value.lng);
  isLoading.value = false;
});

// Reactive
async function onMapClicked(e: any) {
  setValue(location);
  markerPosition.value = e.latlng;
  formattedLocation.value = await reverseGeoCode(location.lat, location.lng);
}

function resetLocation() {
  setValue(null);
  markerPosition.value = null;
  formattedLocation.value = null;
}

</script>

<template>
  <FormField name="location">
    <FormItem class="flex flex-col">
      <FormLabel>Location</FormLabel>
      <Dialog>
        <DialogTrigger as-child>
          <FormControl>
            <Button variant="outline" class="text-sm px-3 justify-start">
              <p v-if="formattedLocation" class="text-dark">
                {{ formattedLocation}}
              </p>
              <p v-else-if="!isLoading">
                    <span class="font-semibold">
                      Choose location
                    </span>
                No location chosen
              </p>
              <p v-else>
                ...
              </p>
            </Button>
            <input hidden/>
          </FormControl>
        </DialogTrigger>
        <DialogContent class="p-4 mr-4 max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              <span v-if="!value">Choose location</span>
              <span v-else>Save location</span>
            </DialogTitle>
            <DialogDescription>
              <span v-if="!value">Click on the map to select your location</span>
              <span v-else>
                  Done selecting your location? Click the button below to save it
                </span>
            </DialogDescription>
          </DialogHeader>
          <div class="w-full h-96">
            <l-map ref="map" :zoom="5" :center="[46.603354, 1.888334]" @click="onMapClicked" class="cursor-pointer" :use-global-leaflet="false">
              <l-tile-layer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  layer-type="base"
                  name="OpenStreetMap"
              ></l-tile-layer>
              <l-marker v-if="markerPosition"  :lat-lng="markerPosition"></l-marker>
            </l-map>
          </div>
          <p v-if="value">
            Location : {{formattedLocation}}
          </p>
          <div class="flex justify-evenly my-2" v-if="value">
            <Button class="px-12" variant="secondary" @click="resetLocation">
              Reset location
            </Button>
            <DialogClose as-child>
              <Button class="px-12">
                Save location
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      <FormMessage />
    </FormItem>
  </FormField>
</template>