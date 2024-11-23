<template>
  <div class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Our Services
        </h2>
        <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Choose from our range of professional cleaning services
        </p>
      </div>

      <div class="mt-16">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="service in services" :key="service.name" class="pt-6">
            <div class="flow-root bg-white rounded-lg shadow-lg px-6 pb-8">
              <div class="-mt-6">
                <div class="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg transform -translate-y-1/2">
                  <component 
                    :is="service.icon"
                    class="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <h3 class="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                  {{ service.name }}
                </h3>
                <p class="mt-5 text-base text-gray-500">
                  {{ service.description }}
                </p>
                <div class="mt-5">
                  <NuxtLink
                    to="/contact"
                    class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Learn more
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  HomeIcon,
  BuildingOfficeIcon,
  TruckIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  middleware: 'auth'
})

const services = [
  {
    name: 'Residential Cleaning',
    description: 'Professional cleaning services for homes and apartments, including regular maintenance and deep cleaning options.',
    icon: HomeIcon
  },
  {
    name: 'Commercial Cleaning',
    description: 'Comprehensive cleaning solutions for offices, retail spaces, and commercial properties.',
    icon: BuildingOfficeIcon
  },
  {
    name: 'Move In/Out Cleaning',
    description: 'Specialized cleaning services for property transitions, ensuring spaces are ready for new occupants.',
    icon: TruckIcon
  }
]
</script>