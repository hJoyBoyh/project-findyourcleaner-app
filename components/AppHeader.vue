<template>
  <nav class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <NuxtLink to="/dashboard" class="flex-shrink-0 flex items-center">
            <span class="text-xl font-bold text-gray-900">FindYourCleaner</span>
          </NuxtLink>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NuxtLink to="/dashboard" class="nav-link">Dashboard</NuxtLink>
            <NuxtLink to="/messages" class="nav-link">Messages</NuxtLink>
            <NuxtLink to="/requests" class="nav-link">Requests</NuxtLink>
            <NuxtLink to="/billing" class="nav-link">Billing</NuxtLink>
          </div>
        </div>
        <div class="flex items-center">
          <Menu as="div" class="ml-3 relative">
            <MenuButton class="flex rounded-full bg-white text-sm focus:outline-none">
              <span class="sr-only">Open user menu</span>
              <img class="h-8 w-8 rounded-full" :src="profileImage" alt="" />
            </MenuButton>
            <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <MenuItem v-slot="{ active }">
                <NuxtLink to="/profile" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                  Your Profile
                </NuxtLink>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button @click="handleLogout" :class="[active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700']">
                  Sign out
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
const client = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const profileImage = computed(() => {
  return user.value?.user_metadata?.avatar_url || 'https://www.gravatar.com/avatar/?d=mp'
})

const handleLogout = async () => {
  await client.auth.signOut()
  router.push('/auth/login')
}
</script>

<style scoped>
.nav-link {
  @apply inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900;
}
</style>