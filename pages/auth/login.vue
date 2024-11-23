<template>
  <div>
    <h1 class="text-center text-2xl font-bold mb-8">Sign in to your account</h1>
    <form @submit.prevent="handleLogin" class="space-y-6">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div class="flex items-center justify-between">
        <NuxtLink to="/auth/forgot-password" class="text-sm text-blue-600 hover:text-blue-500">
          Forgot password?
        </NuxtLink>
      </div>
      <div>
        <button type="submit" class="w-full btn-primary">Sign in</button>
      </div>
    </form>
    <p class="mt-4 text-center text-sm text-gray-600">
      Not registered?
      <NuxtLink to="/auth/register" class="font-medium text-blue-600 hover:text-blue-500">
        Create an account
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
const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    const { error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    if (error) throw error
    router.push('/dashboard')
  } catch (error) {
    console.error('Error:', error.message)
  }
}
</script>