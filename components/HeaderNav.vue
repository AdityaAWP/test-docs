<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import MiniSearch from 'minisearch'

interface SearchItem {
  title: string;
  content: string;
  id: string;
}

const query = ref('')
const { data } = await useAsyncData('search', () => queryCollectionSearchSections('docs'))

const miniSearch = new MiniSearch<SearchItem>({
  fields: ['title'],
  storeFields: ['title', 'content'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.2,
  },
})

// Add data to the MiniSearch instance with null check
if (data.value) {
  miniSearch.addAll(toValue(data.value))
}

const handleResultClick = () => {
  query.value = ''; 
};

const result = computed(() => query.value ? miniSearch.search(toValue(query.value)) : [])

const searchInput = ref<HTMLInputElement | null>(null)

const focusSearchInput = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 's') {
    event.preventDefault() 
    searchInput.value?.focus()
  }
}

onMounted(() => {
  document.addEventListener('keydown', focusSearchInput)
})

onUnmounted(() => {
  document.removeEventListener('keydown', focusSearchInput)
})
</script>

<template>
  <div class="p-6 max-w-2xl mx-auto fixed">
    <div class="relative">
      <input
        ref="searchInput"
        v-model="query"
        placeholder="Search documentation..."
        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
      />
      <span class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <svg
          class="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </span>
    </div>

    <div v-if="query" class="mt-4 space-y-3">
      <div
        v-for="link of result"
        :key="link.id"
        class="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <NuxtLink :to="link.id" class="block" >
          <h3 @click="handleResultClick" class="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200">
            {{ link.title }}
          </h3>
          <p @click="handleResultClick" class="mt-1 text-sm truncate -gray-600">
            {{ link.content }}
          </p>
        </NuxtLink>
      </div>

      <div v-if="result.length === 0" class="p-4 text-center text-gray-500">
        No results found for "{{ query }}".
      </div>
    </div>
  </div>
</template>