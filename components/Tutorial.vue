<script>
import GithubLogo from '/components/logo/GithubLogo'
import TwitterLogo from '/components/logo/TwitterLogo'

export default {
  name: 'NuxtTutorial',
  components: {
    GithubLogo,
    TwitterLogo,
  },
}
</script>

<template>
  <div class="flex items-top justify-center py-10 bg-gray-200 sm:items-center sm:pt-0 rounded-xl">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet">
    <div class="max-w-4xl mx-auto sm:px-6 lg:px-8">
      <a class="flex justify-center sm:pt-0" href="https://nuxtjs.org" target="_blank">
        <img src="/nuxt.svg" alt="Nuxt" class="nuxt">
      </a>
      <div class="mt-8">
        <h2 class="text-2xl leading-7 font-semibold text-gray-600">
          Welcome to your Nuxt Application
        </h2>
        <p class="mt-3 text-gray-600">
          We recommend you take a look at the
          <a href="https://nuxtjs.org" target="_blank"
             class="button--doc text-green-500 hover:underline">Nuxt documentation</a>,
          whether you are new or have previous experience with the framework.
        </p>
        <p class="mt-4 text-gray-800 border-t border-dashed">
          To get started, remove <code class="bg-gray-100 text-sm p-1 rounded border">components/Tutorial.vue</code> and
          start coding in <code class="bg-gray-100 text-sm p-1 rounded border">pages/index.vue</code>.
        </p>
        <p class="mt-4 text-gray-800 border-t border-dashed">
          Have fun!
        </p>
      </div>
      <div class="flex justify-center pt-4 space-x-2">
        <GithubLogo/>
        <TwitterLogo/>
      </div>
    </div>
  </div>
</template>

<style scoped>
img.nuxt {
  height: 60px;
}
</style>
