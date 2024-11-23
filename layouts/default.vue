<template>
  <div>
    <AppHeader v-if="user" />
    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
const user = useSupabaseUser()
</script>