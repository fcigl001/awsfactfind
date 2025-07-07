// vueform.config.js

import en from '@vueform/vueform/locales/en'
import tailwind from '@vueform/vueform/themes/tailwind'
import CurrencyField from './components/CurrencyField.vue'

// import builder from '@vueform/builder/plugin'
export default {
  theme: tailwind,
  locales: { en },
  size: 'sm',
  locale: 'en',
  elements: [
    CurrencyField,
  ],
  // apiKey: 'izio-4eit-ww48-upot-pv0k',
//   endpoints: {
//     submit: {
//       url: 'https://piers.test/api/generate-pdf',
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//     },
//   }
// },
// response (response) {
//   console.log("Test",response.json())
// },
  // plugins: [
  //   builder,
  // ],
}