<script setup lang="ts">
import {
  LMap,
  LTileLayer,
  LMarker,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import {ref} from 'vue'
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

const location = ref(null as string | null);
const updateLocation = (value: string) => {
  location.value = value;
}
const props = defineProps<{setFieldValue: Function}>();
const markerPosition = ref(null as any);

async function reverseGeoCode(lat: number, lng: number) {
  const location = await fetchReverseGeocoding(lat, lng);
  return [location?.address?.road, location?.address?.municipality, location?.address?.country, location?.address?.postcode]
      .filter(Boolean)
      .join(', ');
}
function onLocationSelected(location: { lat: string, lng: string }) {
  props.setFieldValue('location', location);
}

async function onMapClicked(e: any) {
  markerPosition.value = e.latlng;
  const newLocation = await reverseGeoCode(e.latlng.lat, e.latlng.lng);

  updateLocation(newLocation);
  onLocationSelected({ lat: e.latlng.lat, lng: e.latlng.lng })
}

function resetLocation() {
  markerPosition.value = null;
  location.value = null;
  updateLocation('');
}
// {{// await reverseGeoCode(componentField.modelValue.lat, componentField.modelValue.lng)}}
</script>

<template>
  <FormField name="location" v-slot="{ componentField }">
    <FormItem class="flex flex-col">
      <FormLabel>Location</FormLabel>
      <Dialog>
        <DialogTrigger as-child>
          <FormControl>
            <Button variant="outline" class="text-sm px-3 justify-start">
              <p v-if="componentField.modelValue" class="text-dark">
                {{ componentField.modelValue}}
              </p>
              <p v-else>
                    <span class="font-semibold">
                      Choose location
                    </span>
                No location chosen
              </p>
            </Button>
            <input hidden/>
          </FormControl>
        </DialogTrigger>
        <DialogContent class="p-4 mr-4 max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              <span v-if="!location">Choose location</span>
              <span v-else>Save location</span>
            </DialogTitle>
            <DialogDescription>
              <span v-if="!location">Click on the map to select your location</span>
              <span v-else>
                  Done selecting your location? Click the button below to save it
                </span>
            </DialogDescription>
          </DialogHeader>
          <div class="w-full h-96">
            <l-map ref="map" :zoom="5" :center="[46.603354, 1.888334]" @click="onMapClicked" class="cursor-pointer">
              <l-tile-layer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  layer-type="base"
                  name="OpenStreetMap"
              ></l-tile-layer>
              <l-marker v-if="markerPosition"  :lat-lng="markerPosition"></l-marker>
            </l-map>
          </div>
          <p v-if="location">
            Location : {{location}}
          </p>
          <div class="flex justify-evenly my-2" v-if="location">
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