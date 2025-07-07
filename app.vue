<template>
  <div class="max-w-[460px] w-full mt-10 mb-16 mx-auto">
    <factfinder />
  </div>
</template>

<script setup>
const title = ref('PIERS Property Risk Fact Finder')
const description = ref('PIERS Fact Finder')
import { createI18n } from 'vue-i18n'

const numberFormats = {
  'en-US': {
    currency: {
      style: 'currency', currency: 'USD', notation: 'standard'
    },
    decimal: {
      style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2
    },
    percent: {
      style: 'percent', useGrouping: false
    }
  }
}
const i18n = createI18n({
  numberFormats
})
// This will be reactive even you change title/description above
useHead({
  title,
  meta: [{
    name: 'description',
    content: description
  }],
  // add font
  

  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap'
    },
  ],
  
  // script: [
  //   {
  //     src: 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&amp;libraries=places&amp;callback=initMaps',
  //     defer: true,
  //   },
  //   {
  //     src: '/initMaps.js',
  //   },
  // ]
})
</script>