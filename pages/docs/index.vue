<script setup lang="ts">

const { data } = await useAsyncData("docs", () =>
    queryCollection("docs").all(),
);
</script>

<template>
  <main>
    <ul v-if="data" class="list">
      <li v-for="article in data" :key="article.path" class="list_item bg-red-500">
        <NuxtLink :to="article.path">{{ article.title }}</NuxtLink>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.list {
  display: grid;
  gap: 0.5rem;
}
.date {
  font-size: 0.8rem;
  color: #555;
  margin-left: 0.75rem;
}
.list_item {
  display: flex;
  align-items: center;
  gap: 8px;
  .list_item_tag {
    font-size: 0.75rem;
    border-radius: 4px;
    border: 1px solid #000;
    padding: 2px 4px;
  }
}
</style>