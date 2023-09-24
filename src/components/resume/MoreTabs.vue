<script setup>
import { useRoute, RouterLink } from 'vue-router';
</script>

<template>
    <section v-if="useRoute().path !== '/cv'">
        <i>There is more to see! Check out the other tabs in this website, or click <RouterLink to="/cv">here</RouterLink> to read my entire resume in one page.</i>
    </section>
</template>