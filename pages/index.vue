<script setup lang="ts">
const { data } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('docs', ['title', 'path'])
})
console.log(data)
const hello = '/install'
</script>

<template>
  <nav>
    <ul v-if="data">
      <li v-for="item in data" :key="item.path" class="">
        <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>
