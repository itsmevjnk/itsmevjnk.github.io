<script setup>
import { store } from '../info.js';
</script>

<template>
    <footer class="container-pad">
        <span>&copy; 2023 Thanh Vinh Nguyen (itsmevjnk)</span>
        <a v-if="store.gh_source !== ''" v-bind:href="store.gh_source" target="_blank">View on GitHub</a>
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
}

@media print {
    /* hide footer in print */
    footer {
        display: none;
    }
}
</style>