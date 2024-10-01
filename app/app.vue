<script setup lang="ts">

const color = 'white'
definePageMeta({
  colorMode: 'light',
})

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'CIPRIANI ERP'
const description = 'CIPRIANI ERP'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://dashboard-template.nuxt.dev/social-card.png',
  twitterImage: 'https://dashboard-template.nuxt.dev/social-card.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <UDashboardPage class="content">
        <NuxtPage />
    </UDashboardPage>
    </NuxtLayout>
    <UNotifications />
    <UModals />
  </div>
</template>

<style>
.content{
  background: #fdfcfc!important;
}
</style>