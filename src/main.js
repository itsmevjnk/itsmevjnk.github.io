import './assets/css/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

import Projects from './views/Projects.vue'
import Resume from './views/Resume.vue'
import Home from './views/Home.vue'
import Admin from './views/Admin.vue'
import Blog from './views/Blog.vue'

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

app.mount('#app')
