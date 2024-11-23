<template>
  <div>
    <div class="mb-6 flex justify-between items-center">
      <h1 class="text-2xl font-semibold">Cleaning Requests</h1>
      <div class="flex space-x-4">
        <input
          type="text"
          v-model="search"
          placeholder="Search requests..."
          class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <select
          v-model="statusFilter"
          class="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="accepted">Accepted</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
    </div>

    <div class="bg-white shadow-sm rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Client
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Service Type
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="request in filteredRequests" :key="request.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ request.clientName }}</div>
              <div class="text-sm text-gray-500">{{ request.clientEmail }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ request.serviceType }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(request.date) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="[
                statusClasses[request.status],
                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full'
              ]">
                {{ request.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${{ request.amount.toFixed(2) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <NuxtLink
                :to="`/requests/${request.id}`"
                class="text-blue-600 hover:text-blue-900"
              >
                View Details
              </NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const search = ref('')
const statusFilter = ref('')

const statusClasses = {
  new: 'bg-yellow-100 text-yellow-800',
  accepted: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800'
}

const requests = ref([
  {
    id: 1,
    clientName: 'John Smith',
    clientEmail: 'john@example.com',
    serviceType: 'Regular Cleaning',
    date: '2024-04-01',
    status: 'new',
    amount: 150.00
  },
  {
    id: 2,
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah@example.com',
    serviceType: 'Deep Cleaning',
    date: '2024-03-28',
    status: 'completed',
    amount: 280.00
  }
])

const filteredRequests = computed(() => {
  return requests.value.filter(request => {
    const matchesSearch = search.value === '' || 
      request.clientName.toLowerCase().includes(search.value.toLowerCase()) ||
      request.serviceType.toLowerCase().includes(search.value.toLowerCase())
    
    const matchesStatus = statusFilter.value === '' || request.status === statusFilter.value
    
    return matchesSearch && matchesStatus
  })
})
</script>