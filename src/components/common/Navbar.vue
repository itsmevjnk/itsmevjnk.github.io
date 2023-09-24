<script setup>
import store from '../../info.json';
import { useRoute, RouterLink } from 'vue-router';
</script>

<template>
    <nav>
        <!-- for desktop -->
        <div class="navbar-items container-pad-n desktop">
            <RouterLink v-for="route in routes" v-bind:to="route.to" :class="{ pin: route.pin }">{{ route.name }}</RouterLink>
        </div>
        <!-- for mobile -->
        <div class="mobile-navbar">
            <span class="bold">{{ (current_route == undefined) ? '' : current_route.name }}</span>
            <div @click="mobile_expanded = !mobile_expanded;" class="btn">
                <img class="icon" src="../../assets/icons/menu_FILL0_wght400_GRAD0_opsz48.svg" alt="Expand menu" v-if="mobile_expanded == false" v-no-ctx-menu/>
                <img class="icon" src="../../assets/icons/close_FILL0_wght400_GRAD0_opsz48.svg" alt="Hide menu" v-else v-no-ctx-menu/>
            </div>
        </div>
        <transition>
            <div class="navbar-items container-pad-n mobile" v-if="mobile_expanded">
                <RouterLink v-for="route in routes" v-bind:to="route.to" :class="{ pin: route.pin }" @click="mobile_expanded = false">{{ route.name }}</RouterLink>
            </div>
        </transition>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            routes: [
                { to: "/", name: "Home", pin: false },
                { to: "/projects", name: "Projects", pin: false },
                { to: "/blog", name: "Blog", pin: false },
                { to: "/cv", name: "Resume", pin: true }
            ],
            mobile_expanded: false, // set when mobile navbar is expanded
        };
    },

    computed: {
        navbar_height() {
            return (3.2 * this.routes.length) + 'rem';
        },

        current_route() {
            return this.routes.find(route => route.to == useRoute().path);
        }
    }
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

.navbar-items a:not(.RouterLink-active):hover {
    background-color: var(--pal-yellow);
    color: black !important;
}

.navbar-items a.RouterLink-active {
    background-color: var(--pal-white);
    color: black !important;
}

.mobile-navbar {
    display: none;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0;
}

.navbar-items.mobile {
    overflow: hidden;
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
    background-color: var(--pal-yellow);
}

.mobile-navbar div.btn:hover img {
    filter: invert(0);
}

@keyframes nav-wipe-down {
    0% {
        max-height: 0;
    }

    100% {
        max-height: v-bind('navbar_height');
    }
}

.v-enter-active {
    animation: nav-wipe-down 0.5s ease-out;
}

.v-leave-active {
    animation: nav-wipe-down 0.5s ease-in reverse;
}



@media(max-width: 575px) {
    .navbar-items {
        flex-direction: column;
    }

    .navbar-items.desktop {
        display: none;
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
        border-bottom: 1px solid var(--pal-blue);
    }
}

@media(min-width: 576px) {
    .navbar-items.mobile {
        display: none;
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