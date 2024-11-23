<template>
  <div>
    <h1 class="text-center text-2xl font-bold mb-8">Reset Password</h1>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <button type="submit" class="w-full btn-primary">
          Send Reset Instructions
        </button>
      </div>
    </form>

    <div v-if="submitted" class="mt-6 p-4 bg-green-50 rounded-md">
      <p class="text-sm text-green-700">
        If an account exists for {{ email }}, you will receive password reset instructions.
      </p>
    </div>

    <p class="mt-4 text-center text-sm text-gray-600">
      Remember your password?
      <NuxtLink to="/auth/login" class="font-medium text-blue-600 hover:text-blue-500">
        Sign in
      </NuxtLink>
    </p>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
  auth: false
})

const client = useSupabaseClient()
const email = ref('')
const submitted = ref(false)

const handleSubmit = async () => {
  try {
    const { error } = await client.auth.resetPasswordForEmail(email.value, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    })
    if (error) throw error
    submitted.value = true
  } catch (error) {
    console.error('Error:', error.message)
    // Still show success message to prevent email enumeration
    submitted.value = true
  }
}
</script>