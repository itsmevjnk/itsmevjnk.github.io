import './assets/css/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Navbar from './components/Navbar.vue'

import AboutMe from './components/AboutMe.vue'
import Education from './components/Education.vue'
import Projects from './components/Projects.vue'
import Resume from './components/Resume.vue'
import MoreTabs from './components/MoreTabs.vue'
import List from './components/List.vue'
import Home from './components/Home.vue'
import Admin from './components/Admin.vue'
import Blog from './components/Blog.vue'
import Skills from './components/Skills.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/projects', component: Projects },
        { path: '/cv', component: Resume },
        { path: '/admin', component: Admin },
        { path: '/blog', component: Blog }
    ]
})

const app = createApp(App)
app.use(router)

app.directive('no-ctx-menu', {
    mounted: (e) => {
        e.addEventListener('contextmenu', (ev) => {
            if(ev.button == 2) ev.preventDefault();
        });
    }
});

app.component('comp-header', Header)
app.component('comp-footer', Footer)
app.component('comp-navbar', Navbar)

app.component('comp-aboutme', AboutMe)
app.component('comp-skills', Skills)
app.component('comp-edu', Education)
app.component('comp-projects', Projects)

app.component('comp-list', List)
app.component('comp-more', MoreTabs)

app.mount('#app')
