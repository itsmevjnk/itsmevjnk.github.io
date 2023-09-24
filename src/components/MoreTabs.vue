<script setup>
import { useRoute } from 'vue-router';
</script>

<template>
    <section v-if="useRoute().path !== '/cv'">
        <i>There is more to see! Check out the other tabs in this website, or click <router-link to="/cv">here</router-link> to read my entire resume in one page.</i>
    </section>
</template>