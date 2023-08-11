<script setup>
import { store } from '../info.js';
import { useRoute } from 'vue-router';
</script>

<template>
    <nav>
        <div class="mobile-navbar">
            <span class="bold">{{ routes.find(route => route.to == useRoute().path).name }}</span>
            <div @click="mobile_expanded = !mobile_expanded;" class="btn">
                <img class="icon" src="../assets/icons/menu_FILL0_wght400_GRAD0_opsz48.svg" alt="Expand menu" v-if="mobile_expanded == false"/>
                <img class="icon" src="../assets/icons/close_FILL0_wght400_GRAD0_opsz48.svg" alt="Hide menu" v-else/>
            </div>
        </div>
        <div class="navbar-items container-pad-n" v-show="mobile_expanded == true">
            <router-link v-for="route in routes" v-bind:to="route.to" :class="{ pin: route.pin }">{{ route.name }}</router-link>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            routes: [
                { to: "/", name: "About me", pin: false },
                { to: "/edu", name: "Education", pin: false },
                { to: "/projects", name: "Projects", pin: false },
                { to: "/all", name: "All sections", pin: true }
            ],
            mobile_expanded: false, // set when mobile navbar is expanded
        };
    },
};
</script>

<style>
.navbar-items {
    display: flex;
    flex-direction: row;
}

.navbar-items a {
    color: inherit;
    text-decoration: none;
    display: block;
    width: calc(100% / 8);
    min-width: 6.5rem;
    padding: 1rem;
    transition: 0.5s;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
}

.navbar-items a:not(.router-link-active):hover {
    background-color: #f9d949;
    color: black !important;
}

.navbar-items a.router-link-active {
    background-color: #f0f0f0;
    color: black !important;
}

.mobile-navbar {
    display: none;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0;
}

.mobile-navbar span {
    font-weight: bold;
    padding-left: 1.25rem;
}

.mobile-navbar div.btn {
    transition: 0.5s;
    padding: 0.75rem;
}

.mobile-navbar div.btn img {
    filter: invert(1);
    transition: 0.5s;
}

.mobile-navbar div.btn:hover {
    cursor: pointer;
    background-color: #f9d949;
}

.mobile-navbar div.btn:hover img {
    filter: invert(0);
}

@media(max-width: 575px) {
    .navbar-items {
        flex-direction: column;
    }

    .navbar-items a {
        width: 100%;
        text-align: left;
        padding: 1rem 1.25rem;
        border-radius: 0;
    }

    .mobile-navbar {
        display: flex;
    }

    .navbar-items a {
        border-bottom: 1px solid #3c486b;
    }
}

@media(min-width: 576px) {
    .navbar-items {
        display: flex !important; /* force flex */
    }

    .navbar-items a.pin {
        margin-left: auto;
    }
}

@media print {
    /* hide navbar in print */
    nav {
        display: none;
    }
}
</style>