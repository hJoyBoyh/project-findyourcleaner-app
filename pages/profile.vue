<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-lg shadow">
      <div class="px-4 py-5 sm:p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-6">Company Profile</h2>
        <CompanyForm
          :company="company"
          @submit="updateProfile"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const company = ref({
  name: 'Acme Cleaning Services',
  email: 'contact@acmecleaning.com',
  phone: '(555) 123-4567',
  logo: null,
  serviceAreas: 'Downtown, North Side, West End, South District'
})

const updateProfile = async (data) => {
  try {
    // In a real app, this would update Supabase
    company.value = { ...data }
    // Show success message
  } catch (error) {
    console.error('Error updating profile:', error)
  }
}
</script>