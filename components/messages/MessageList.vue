<template>
  <div class="flex-1 overflow-y-auto">
    <div class="space-y-4 p-4">
      <div v-for="message in messages" :key="message.id" class="flex items-start space-x-3">
        <img :src="message.sender.avatar" class="h-8 w-8 rounded-full" />
        <div :class="[
          'rounded-lg px-4 py-2 max-w-[80%]',
          message.isAdmin ? 'bg-blue-100' : 'bg-gray-100'
        ]">
          <p class="text-sm font-medium text-gray-900">{{ message.sender.name }}</p>
          <p class="text-sm text-gray-700">{{ message.content }}</p>
          <span class="text-xs text-gray-500">{{ formatDate(message.timestamp) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDate } from '~/utils/date'

defineProps({
  messages: {
    type: Array,
    required: true
  }
})
</script>