<script setup>
definePageMeta({
  layout: 'default'
})
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`docs-${slug}`, () => {
  return queryCollection('docs').path(`/docs/${slug}`).first()
})

</script>

<template>
  <ContentRenderer :value="post" class="prose w-full m-auto"/>
</template>
