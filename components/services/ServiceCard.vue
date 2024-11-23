<template>
  <div class="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
    <div class="px-4 py-5 sm:px-6">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <component 
            :is="icon"
            class="h-6 w-6 text-blue-600"
            aria-hidden="true"
          />
        </div>
        <div class="ml-4">
          <h3 class="text-lg font-medium text-gray-900">{{ title }}</h3>
          <p class="text-sm text-gray-500">{{ subtitle }}</p>
        </div>
      </div>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <div class="space-y-4">
        <p class="text-base text-gray-600">{{ description }}</p>
        <ul class="space-y-2">
          <li v-for="feature in features" :key="feature" class="flex items-center">
            <CheckCircleIcon class="h-5 w-5 text-green-500 mr-2" />
            <span class="text-sm text-gray-600">{{ feature }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="px-4 py-4 sm:px-6">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-blue-600">Starting from {{ price }}</span>
        <button class="btn-primary">Learn More</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckCircleIcon } from '@heroicons/vue/24/solid'

defineProps({
  icon: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  features: {
    type: Array,
    required: true
  },
  price: {
    type: String,
    required: true
  }
})
</script>