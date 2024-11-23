<template>
  <div>
    <h1 class="text-center text-2xl font-bold mb-8">Set New Password</h1>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">New Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div v-if="error" class="p-4 bg-red-50 rounded-md">
        <p class="text-sm text-red-700">{{ error }}</p>
      </div>

      <div>
        <button type="submit" class="w-full btn-primary">
          Reset Password
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
  auth: false
})

const client = useSupabaseClient()
const router = useRouter()

const password = ref('')
const confirmPassword = ref('')
const error = ref('')

const handleSubmit = async () => {
  error.value = ''
  
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }

  try {
    const { error: updateError } = await client.auth.updateUser({
      password: password.value
    })

    if (updateError) throw updateError
    
    // Redirect to login
    router.push('/auth/login')
  } catch (err) {
    error.value = err.message
  }
}
</script>