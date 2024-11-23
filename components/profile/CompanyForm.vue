<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-gray-700">Company Logo</label>
      <div class="mt-1 flex items-center space-x-4">
        <img :src="previewImage || company.logo || defaultLogo" class="h-20 w-20 rounded-lg object-cover" />
        <input
          type="file"
          accept="image/*"
          @change="handleImageChange"
          class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
        <label class="block text-sm font-medium text-gray-700">Company Name</label>
        <input
          v-model="form.name"
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
        <label class="block text-sm font-medium text-gray-700">Service Areas</label>
        <textarea
          v-model="form.serviceAreas"
          rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        ></textarea>
      </div>
    </div>

    <div class="flex justify-end">
      <button type="submit" class="btn-primary">Save Changes</button>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  company: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['submit'])
const form = ref({ ...props.company })
const previewImage = ref(null)
const defaultLogo = 'https://via.placeholder.com/80'

const handleImageChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    previewImage.value = URL.createObjectURL(file)
    form.value.logo = file
  }
}

const handleSubmit = () => {
  emit('submit', form.value)
}
</script>