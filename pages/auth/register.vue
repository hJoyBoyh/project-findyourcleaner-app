<template>
  <div>
    <h1 class="text-center text-2xl font-bold mb-8">Create Partner Account</h1>
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div class="sm:col-span-2">
          <label class="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            v-model="form.companyName"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Contact Name</label>
          <input
            v-model="form.contactName"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Phone</label>
          <input
            v-model="form.phone"
            type="tel"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div class="sm:col-span-2">
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div class="sm:col-span-2">
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="form.password"
            type="password"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div class="sm:col-span-2">
          <label class="block text-sm font-medium text-gray-700">Service Areas</label>
          <textarea
            v-model="form.serviceAreas"
            rows="3"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="List the areas where you provide services..."
          ></textarea>
        </div>
      </div>

      <div v-if="error" class="p-4 bg-red-50 rounded-md">
        <p class="text-sm text-red-700">{{ error }}</p>
      </div>

      <div>
        <button type="submit" class="w-full btn-primary">Create Account</button>
      </div>
    </form>

    <p class="mt-4 text-center text-sm text-gray-600">
      Already have an account?
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
const router = useRouter()

const form = ref({
  companyName: '',
  contactName: '',
  phone: '',
  email: '',
  password: '',
  serviceAreas: ''
})

const error = ref('')

const handleSubmit = async () => {
  try {
    // Create auth user
    const { data: authData, error: authError } = await client.auth.signUp({
      email: form.value.email,
      password: form.value.password,
      options: {
        data: {
          company_name: form.value.companyName,
          contact_name: form.value.contactName,
          phone: form.value.phone,
          service_areas: form.value.serviceAreas
        }
      }
    })

    if (authError) throw authError

    // Create company profile in database
    const { error: profileError } = await client
      .from('company_profiles')
      .insert({
        user_id: authData.user.id,
        company_name: form.value.companyName,
        contact_name: form.value.contactName,
        phone: form.value.phone,
        email: form.value.email,
        service_areas: form.value.serviceAreas
      })

    if (profileError) throw profileError

    // Redirect to dashboard
    router.push('/dashboard')
  } catch (err) {
    error.value = err.message
  }
}
</script>