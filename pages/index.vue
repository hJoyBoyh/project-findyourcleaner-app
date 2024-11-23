<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold mb-8">Welcome to FindYourCleaner</h1>
    <div class="space-x-4">
      <NuxtLink to="/auth/login" class="btn-primary">Login</NuxtLink>
      <NuxtLink to="/auth/register" class="btn-secondary">Register</NuxtLink>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  auth: false
})
</script>