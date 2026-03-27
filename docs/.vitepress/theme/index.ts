// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import BilingualSection from './components/BilingualSection.vue'
import AISummaryCollapse from './components/AISummaryCollapse.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // Register the custom component globally
    app.component('BilingualSection', BilingualSection)
    app.component('AISummaryCollapse', AISummaryCollapse)
  }
} satisfies Theme
