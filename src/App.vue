<script setup>
import { ref, computed, onMounted } from 'vue'


const GITHUB_USERNAME = 'IsaiM7373' 


const activeTab = ref('home') // Options: 'home', 'about', 'portfolio'
const repos = ref([])
const isLoading = ref(false)
const error = ref(null)
const searchQuery = ref('')
const selectedLanguage = ref('All')


const sections = [
  { id: 'home', title: 'Home' },
  { id: 'about', title: 'About Me' },
  { id: 'portfolio', title: 'Portfolio' }
]


const navigateTo = (sectionId) => {
  activeTab.value = sectionId
}


const fetchGitHubRepos = async () => {
  if (!GITHUB_USERNAME || GITHUB_USERNAME === 'IsaiM7373') return
  isLoading.value = true
  error.value = null
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`)
    if (!response.ok) throw new Error('Failed to load GitHub repositories')
    const data = await response.json()
    repos.value = data
  } catch (err) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchGitHubRepos()
})


const availableLanguages = computed(() => {
  const langs = repos.value.map(r => r.language).filter(Boolean)
  return ['All', ...new Set(langs)]
})


const filteredRepos = computed(() => {
  return repos.value.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchQuery.value.toLowerCase()))
    const matchesLang = selectedLanguage.value === 'All' || repo.language === selectedLanguage.value
    return matchesSearch && matchesLang
  })
})
</script>

<template>
  <div class="split-pane-layout">
    
    <aside class="sidebar">
      <img src="./assets/me.jpg" alt="Isai Macias" class="profile-avatar" />
      <h1 class="name">Isai Macias</h1>
      <p class="descrip">Future Network Admin</p>

      <p class="paragraph">
        I am on track to becoming a network administrator. I am taking definitive steps to achieve this goal, and while it is a long journey, I am confident in my path. Currently studying for my CompTIA Network+ certification while breaking into the tech world, inspired by Mr. Fox.
      </p>

      <nav>
        <ul>
          <li 
            v-for="section in sections" 
            :key="section.id"
            :class="{ active: activeTab === section.id }"
          >
            <a href="#" @click.prevent="navigateTo(section.id)">
              {{ section.title }}
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    
    <main class="content-pane">
      
      <!-- 1. HOME PAGE -->
      <section v-if="activeTab === 'home'" class="page-view">
        <h2>Welcome</h2>
        <p class="intro-text">
          Welcome to my professional portfolio. Here you will find my journey towards network administration, my ongoing projects, and my hands-on experience in tech infrastructure.
        </p>
        <div class="highlight-box">
          <h3>Current Focus</h3>
          <p>Studying CompTIA Network+ • Networking Fundamentals • System Configuration</p>
        </div>
      </section>

      
      <section v-else-if="activeTab === 'about'" class="page-view">
        <h2>About Me</h2>
        <div class="about-grid">
          <div class="card">
            <h3>Education & Goals</h3>
            <p>Targeting CompTIA Network+ and CCNA certifications to specialize in enterprise network architecture and security administration.</p>
          </div>
          <div class="card" style="margin-top: 1.5rem;">
            <h3>Technical Interests</h3>
            <p>Subnetting, routing protocols (OSPF, BGP), firewall configurations, switch management, and network troubleshooting.</p>
          </div>
        </div>
      </section>

      <!-- 3. PORTFOLIO PAGE (GitHub Auto-Fetch) -->
      <section v-else-if="activeTab === 'portfolio'" class="page-view">
        <h2>Portfolio & GitHub Repositories</h2>
        <p class="intro-text">Automatically fetching public repositories directly from GitHub.</p>

        <!-- Search & Filter Controls -->
        <div class="filter-controls">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search projects..." 
            class="search-input"
          />
          <select v-model="selectedLanguage" class="lang-select">
            <option v-for="lang in availableLanguages" :key="lang" :value="lang">
              {{ lang }}
            </option>
          </select>
        </div>

        <!-- Loading & Error States -->
        <div v-if="isLoading" class="status-msg">Loading GitHub repositories...</div>
        <div v-else-if="error" class="status-msg error">{{ error }}</div>

        <!-- Asymmetric Repo Grid -->
        <div v-else class="repo-grid">
          <div 
            v-for="(repo, index) in filteredRepos" 
            :key="repo.id" 
            class="repo-card"
            :class="{ 'wide-card': index % 3 === 0 }"
          >
            <div class="repo-header">
              <h3><a :href="repo.html_url" target="_blank">{{ repo.name }}</a></h3>
              <span v-if="repo.language" class="lang-tag">{{ repo.language }}</span>
            </div>
            <p class="repo-desc">{{ repo.description || 'No description provided.' }}</p>
            <div class="repo-footer">
              <span>⭐ {{ repo.stargazers_count }}</span>
              <span>🍴 {{ repo.forks_count }}</span>
              <a :href="repo.html_url" target="_blank" class="repo-link">View Repository →</a>
            </div>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<style scoped>
/* Main Layout */
.split-pane-layout {
  display: flex;
  flex-direction: column; 
  min-height: 100vh;
  overflow-y: auto;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #0f172a;
  color: #f8fafc;
}

/* Sidebar */
.sidebar {
  width: 100%; 
  background-color: #1e293b; 
  border-bottom: 1px solid #334155;
  padding: 2.5rem 1.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.profile-avatar {
  width: 110px;
  height: 110px;
  border-radius: 50%;        
  object-fit: cover;         
  margin-bottom: 1.25rem;   
  border: 3px solid #38bdf8; 
  align-self: flex-start;   
}

.name {
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: #ffffff; 
}

.descrip {
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #38bdf8; 
  margin: 0 0 1.5rem 0;
}

.paragraph {
  font-size: 0.85rem;
  line-height: 1.6;
  color: #94a3b8; 
  margin: 0 0 2.5rem 0;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin-bottom: 0.5rem;
}

.sidebar a {
  display: block;
  padding: 0.75rem 1rem;
  color: #cbd5e1; 
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.sidebar a:hover {
  background-color: #334155;
  color: #ffffff;
}

.sidebar li.active a {
  background-color: #0284c7; 
  color: #ffffff;
  font-weight: 600;
}

/* Content Pane */
.content-pane {
  width: 100%;
  padding: 2rem;
  background-color: #0f172a;
  box-sizing: border-box;
}

.page-view h2 {
  font-size: 2.25rem;
  color: #ffffff;
  margin-bottom: 1rem;
}

.intro-text {
  color: #94a3b8;
  font-size: 1.05rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.highlight-box, .card {
  background: #1e293b;
  border: 1px solid #334155;
  padding: 1.5rem;
  border-radius: 8px;
}

.highlight-box h3, .card h3 {
  color: #38bdf8;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.highlight-box p, .card p {
  color: #94a3b8;
  margin: 0;
}

/* Filter Controls */
.filter-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-input, .lang-select {
  background-color: #1e293b;
  border: 1px solid #334155;
  color: #ffffff;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.95rem;
}

.search-input { flex: 2; }
.lang-select { flex: 1; }

/* Repository Asymmetric Grid */
.repo-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.25rem;
}

.repo-card {
  grid-column: span 12;
  background-color: #1e293b;
  border: 1px solid #334155;
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: border-color 0.2s ease;
}

.repo-card:hover {
  border-color: #38bdf8;
}

@media (min-width: 768px) {
  .split-pane-layout {
    flex-direction: row; 
    height: 100vh;
    overflow: hidden; 
  }

  .sidebar {
    width: 280px; 
    height: 100vh;
    border-right: 1px solid #334155;
    border-bottom: none;
    overflow-y: auto; 
  }

  .content-pane {
    flex: 1;
    height: 100vh;
    overflow-y: auto; 
    padding: 3rem;
  }

  .repo-card { grid-column: span 6; }
  .repo-card.wide-card { grid-column: span 12; }
}

.repo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.repo-header h3 a {
  color: #38bdf8;
  text-decoration: none;
  font-size: 1.25rem;
}

.lang-tag {
  font-size: 0.75rem;
  background-color: #0369a1;
  color: #e0f2fe;
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
}

.repo-desc {
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.repo-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #64748b;
}

.repo-link {
  color: #38bdf8;
  text-decoration: none;
  font-weight: 600;
}

.status-msg {
  color: #94a3b8;
  font-style: italic;
  margin-top: 1rem;
}

.status-msg.error {
  color: #f87171;
}
</style>