<template>
  <div class="bg-white rounded-lg shadow">
    <div class="h-[calc(100vh-12rem)] flex flex-col">
      <div class="border-b px-4 py-3">
        <h2 class="text-lg font-medium text-gray-900">Messages</h2>
        <p class="text-sm text-gray-500">Chat with administrators</p>
      </div>
      
      <MessageList :messages="messages" />
      <MessageInput @send="sendMessage" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const messages = ref([
  {
    id: 1,
    content: 'Hello! How can we help you today?',
    timestamp: new Date('2024-01-01T10:00:00'),
    sender: {
      name: 'Admin Support',
      avatar: 'https://via.placeholder.com/32',
      isAdmin: true
    }
  },
  {
    id: 2,
    content: 'I have a question about billing',
    timestamp: new Date('2024-01-01T10:05:00'),
    sender: {
      name: 'Company Name',
      avatar: 'https://via.placeholder.com/32',
      isAdmin: false
    }
  }
])

const sendMessage = async (content) => {
  // In a real app, this would send to Supabase
  messages.value.push({
    id: Date.now(),
    content,
    timestamp: new Date(),
    sender: {
      name: 'Company Name',
      avatar: 'https://via.placeholder.com/32',
      isAdmin: false
    }
  })
}
</script>