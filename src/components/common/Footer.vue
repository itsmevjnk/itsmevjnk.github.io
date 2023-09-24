<script setup>
import { logged_in } from '../../auth.js';
import store from '../../info.json';
import { RouterLink } from 'vue-router';
</script>

<template>
    <footer class="container-pad">
        <div class="info-container">
            <div>&copy; 2023 Thanh Vinh Nguyen (itsmevjnk)</div>
            <div class="footer-icons">
                <a v-bind:href="'mailto:' + store.email" class="footer-icon">
                    <img class="icon invert" src="../../assets/icons/mail_FILL0_wght400_GRAD0_opsz48.svg" alt="mail" v-no-ctx-menu/>
                </a>
                <a v-bind:href="store.gh_account" class="footer-icon" target="_blank">
                    <img class="icon" src="../../assets/icons/github-mark-white.svg" alt="GitHub" v-no-ctx-menu/>
                </a>
            </div>
        </div>
        <div>
            <a v-if="store.gh_source !== ''" v-bind:href="store.gh_source" target="_blank">View on GitHub</a><br/>
            <RouterLink to="/admin">{{ (logged_in) ? 'Admin control panel' : 'Admin login' }}</RouterLink>
        </div>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            
        };
    }
};
</script>

<style>
footer {
    margin-top: auto;
    padding-top: 1.25rem; padding-bottom: 1.25rem;
    display: flex; flex-direction: row; justify-content: space-between; /* keep copyright info and github link on same line */
}

@media(max-width: 575px) { /* L5 */
    footer {
        flex-direction: column; align-items: center; /* collapse contents into center */
        padding-top: 0.95rem; padding-bottom: 0.95rem; /* change padding so it does not look extra thick */
    }
    
    footer * {
        text-align: center;
        padding: 0.1rem 0;
    }

    .info-container {
        align-items: center;
    }
}

.footer-icons {
    display: flex;
    flex-direction: row;
    margin: 0.25rem 0;
}

.footer-icons a {
    opacity: 0.6;
    transition: 0.25s;
    margin: 0 0.25rem;
}

.footer-icons a:hover {
    opacity: 1;
}

.info-container {
    display: flex;
    flex-direction: column;
}

@media print {
    /* hide footer in print */
    footer {
        display: none;
    }
}
</style>