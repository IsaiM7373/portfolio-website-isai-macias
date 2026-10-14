<script setup>
</script>

<template>
  <div class="split-pane-layout">
    
    <aside class="sidebar">
      <h1 class="name">Isai macias</h1>
      <p class="descrip">Future Network Admin</p>
      <img src="./assets/me.jpg" alt="Isai Macias" class="profile-avatar" />

      <p class="paragraph"> 
        I am on track to becoming a network administrator. I am taking definitive steps to achieve this goal, and while it is a long journey, I am confident in my path. I am currently in the midst of studying for my CompTIA Network+ certification while working to get my foot in the door here in the tech world.
      </p>

      <nav>
        <ul>
          <li 
            v-for="section in sections" 
            :key="section.id"
            :class="{ active: activeSection === section.id }"
          >
            <a :href="`#${section.id}`" @click.prevent="scrollToSection(section.id)">
              {{ section.title }}
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    
    <main class="content-pane" ref="contentPane">
      <section 
        v-for="section in sections" 
        :key="section.id" 
        :id="section.id"
        class="scroll-section"
        data-section
      >
        <h2>{{ section.title }}</h2>
        <p>{{ section.content }}</p>
      </section>
    </main>
  </div>
</template>

<style scoped>

.split-pane-layout {
  display: flex;
  flex-direction: column; 
  min-height: 100vh;
  overflow-y: auto;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}


.sidebar {
  width: 100%; 
  background-color: #1e293b; 
  border-bottom: 1px solid #334155;
  padding: 2.5rem 1.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
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
  background-color: #2563eb; 
  color: #ffffff;
  font-weight: 600;
}


.content-pane {
  width: 100%;
  padding: 2rem;
  background-color: #ffffff;
  box-sizing: border-box;
}


.scroll-section {
  min-height: 50vh;
  padding: 3rem 1rem;
  border-bottom: 1px solid #f1f3f5;
}

.scroll-section h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #0f172a;
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

.profile-avatar {
  width: 110px;
  height: 110px;
  border-radius: 50%;       
  object-fit: cover;        
  margin-bottom: 1.25rem;   
  border: 3px solid #e7f5ff; 
  align-self: flex-start;  
}

.name {
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: #ffffff; 
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

  .scroll-section {
    min-height: 80vh;
    padding: 4rem 2rem;
  }
}
</style>