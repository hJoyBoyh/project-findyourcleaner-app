<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <div>
        <NuxtLink to="/requests" class="text-blue-600 hover:text-blue-800 flex items-center">
          <ChevronLeftIcon class="h-5 w-5 mr-1" />
          Back to Requests
        </NuxtLink>
        <h1 class="text-2xl font-semibold mt-2">Request Details</h1>
      </div>
      <div class="flex space-x-3">
        <button 
          v-if="request.status === 'new'"
          @click="updateStatus('accepted')" 
          class="btn-primary"
        >
          Accept Request
        </button>
        <button 
          v-if="['new', 'accepted'].includes(request.status)"
          @click="updateStatus('completed')" 
          class="btn-secondary"
        >
          Mark as Completed
        </button>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg">
      <!-- Request Info -->
      <div class="px-4 py-5 sm:p-6">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Client Information</h3>
            <dl class="grid grid-cols-1 gap-4">
              <div>
                <dt class="text-sm font-medium text-gray-500">Name</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ request.client.name }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Email</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ request.client.email }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Phone</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ request.client.phone }}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Service Details</h3>
            <dl class="grid grid-cols-1 gap-4">
              <div>
                <dt class="text-sm font-medium text-gray-500">Service Type</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ request.serviceType }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Date</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDate(request.date) }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Status</dt>
                <dd class="mt-1">
                  <span :class="[
                    statusClasses[request.status],
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full'
                  ]">
                    {{ request.status }}
                  </span>
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Amount</dt>
                <dd class="mt-1 text-sm text-gray-900">${{ request.amount.toFixed(2) }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Service Location -->
        <div class="mt-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Service Location</h3>
          <p class="text-sm text-gray-600">{{ request.location.address }}</p>
          <p class="text-sm text-gray-600">{{ request.location.city }}, {{ request.location.state }} {{ request.location.zip }}</p>
        </div>

        <!-- Special Instructions -->
        <div class="mt-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Special Instructions</h3>
          <p class="text-sm text-gray-600">{{ request.instructions }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ChevronLeftIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const id = route.params.id

const statusClasses = {
  new: 'bg-yellow-100 text-yellow-800',
  accepted: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800'
}

// Mock data - In real app, fetch from Supabase
const request = ref({
  id: 1,
  client: {
    name: 'John Smith',
    email: 'john@example.com',
    phone: '(555) 123-4567'
  },
  serviceType: 'Regular Cleaning',
  date: '2024-04-01',
  status: 'new',
  amount: 150.00,
  location: {
    address: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    zip: '62701'
  },
  instructions: 'Please pay extra attention to the kitchen and bathrooms. We have pets, so thorough vacuuming is required.'
})

const updateStatus = async (newStatus) => {
  try {
    // In real app, update Supabase
    request.value.status = newStatus
    // Show success message
  } catch (error) {
    console.error('Error updating status:', error)
  }
}
</script>