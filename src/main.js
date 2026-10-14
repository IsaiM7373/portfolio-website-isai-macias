import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
import { ref, onMounted, onUnmounted } from 'vue'

// 1. Define your page sections
const sections = ref([
  { id: 'overview', title: 'Overview', content: 'This is the overview section content...' },
  { id: 'features', title: 'Key Features', content: 'Details about the amazing features go here...' },
  { id: 'pricing', title: 'Pricing Plans', content: 'Transparent pricing details for your users...' },
  { id: 'faq', title: 'Frequently Asked Questions', content: 'Answers to common questions...' },
])

const activeSection = ref(sections.value[0].id)
let observer = null

// 2. Handle smooth scrolling when clicking a sidebar link
const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// 3. Set up the IntersectionObserver for Scroll-Spy functionality
onMounted(() => {
  const options = {
    root: null, // Uses the viewport
    rootMargin: '-20% 0px -60% 0px', // Triggers when section hits upper-middle of screen
    threshold: 0
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, options)

  // Track all elements with the 'data-section' attribute
  document.querySelectorAll('[data-section]').forEach((section) => {
    observer.observe(section)
  })
})

// Clean up the observer when component unmounts
onUnmounted(() => {
  if (observer) observer.disconnect()
})