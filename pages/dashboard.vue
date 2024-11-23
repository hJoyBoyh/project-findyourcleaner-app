<template>
  <div>
    <h1 class="text-2xl font-semibold mb-6">Dashboard</h1>
    
    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div v-for="stat in stats" :key="stat.name" class="bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <dt class="text-sm font-medium text-gray-500 truncate">{{ stat.name }}</dt>
          <dd class="mt-1 text-3xl font-semibold text-gray-900">{{ stat.value }}</dd>
        </div>
      </div>
    </div>

    <!-- Recent Requests -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h2 class="text-lg font-medium text-gray-900">Recent Requests</h2>
      </div>
      <div class="border-t border-gray-200">
        <ul role="list" class="divide-y divide-gray-200">
          <li v-for="request in recentRequests" :key="request.id" class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">{{ request.client }}</p>
                <p class="text-sm text-gray-500">{{ request.service }}</p>
              </div>
              <div class="flex items-center">
                <span :class="[
                  statusClasses[request.status],
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full'
                ]">
                  {{ request.status }}
                </span>
                <button class="ml-4 text-sm font-medium text-blue-600 hover:text-blue-500">
                  View details
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const stats = ref([
  { name: 'New Requests', value: '12' },
  { name: 'Active Jobs', value: '4' },
  { name: 'Revenue (Month)', value: '$2,450' }
])

const statusClasses = {
  new: 'bg-yellow-100 text-yellow-800',
  active: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800'
}

const recentRequests = ref([
  {
    id: 1,
    client: 'John Smith',
    service: 'Regular Cleaning',
    status: 'new'
  },
  {
    id: 2,
    client: 'Sarah Johnson',
    service: 'Deep Cleaning',
    status: 'active'
  },
  {
    id: 3,
    client: 'Mike Brown',
    service: 'Move-out Cleaning',
    status: 'completed'
  }
])
</script>