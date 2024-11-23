<template>
  <div class="border-t p-4">
    <form @submit.prevent="handleSubmit" class="flex space-x-2">
      <input
        v-model="message"
        type="text"
        placeholder="Type your message..."
        class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <button type="submit" class="btn-primary">Send</button>
    </form>
  </div>
</template>

<script setup>
const message = ref('')
const emit = defineEmits(['send'])

const handleSubmit = () => {
  if (message.value.trim()) {
    emit('send', message.value)
    message.value = ''
  }
}
</script>