<script setup lang="ts">
import HeaderNav from '~/components/HeaderNav.vue';

const { data } = await useAsyncData("docs", () =>
  queryCollection("docs").all(),
);
</script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-50">
    <!-- Top Bar (HeaderNav) -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div class="ml-64">
        <HeaderNav />
      </div>
    </header>

    <!-- Sidebar -->
    <aside class="w-64 border-r border-gray-200 bg-white fixed h-full overflow-y-auto">
      <div class="p-4">
        <ul v-if="data" class="space-y-2">
          <li v-for="article in data" :key="article.path" class="list_item">
            <NuxtLink
              :to="article.path"
              class="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              :class="{ 'bg-gray-100 font-medium': $route.path === article.path }"
            >
              {{ article.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 ml-64 mt-16 bg-green-50">
      <div class="max-w-4xl mx-auto px-8 py-12">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped>
.list_item {
  @apply w-full;
}
</style>