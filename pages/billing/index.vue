<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-semibold">Billing History</h1>
      <p class="text-gray-600">View and download your transaction history</p>
    </div>

    <!-- Billing Summary -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div v-for="stat in billingStats" :key="stat.name" class="bg-white rounded-lg shadow px-6 py-4">
        <dt class="text-sm font-medium text-gray-500">{{ stat.name }}</dt>
        <dd class="mt-1 text-2xl font-semibold text-gray-900">{{ stat.value }}</dd>
      </div>
    </div>

    <!-- Transactions List -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h2 class="text-lg font-medium text-gray-900">Recent Transactions</h2>
        <button @click="downloadTransactions" class="btn-secondary">
          Download CSV
        </button>
      </div>
      
      <div class="border-t border-gray-200">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Description
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Amount
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th scope="col" class="relative px-6 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(transaction.date) }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                {{ transaction.description }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${{ transaction.amount.toFixed(2) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="[
                  transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800',
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full'
                ]">
                  {{ transaction.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  v-if="transaction.status === 'completed'"
                  @click="downloadReceipt(transaction)"
                  class="text-blue-600 hover:text-blue-900"
                >
                  Download Receipt
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const billingStats = ref([
  { name: 'Total Revenue (MTD)', value: '$2,450.00' },
  { name: 'Pending Payments', value: '$350.00' },
  { name: 'Last Month Revenue', value: '$3,280.00' }
])

const transactions = ref([
  {
    id: 1,
    date: '2024-04-01',
    description: 'Regular Cleaning Service - John Smith',
    amount: 150.00,
    status: 'completed'
  },
  {
    id: 2,
    date: '2024-03-28',
    description: 'Deep Cleaning Service - Sarah Johnson',
    amount: 280.00,
    status: 'completed'
  },
  {
    id: 3,
    date: '2024-03-25',
    description: 'Move-out Cleaning - Mike Brown',
    amount: 350.00,
    status: 'pending'
  }
])

const downloadTransactions = () => {
  // Implementation for downloading transactions as CSV
  console.log('Downloading transactions...')
}

const downloadReceipt = (transaction) => {
  // Implementation for downloading individual receipt
  console.log('Downloading receipt for transaction:', transaction.id)
}
</script>