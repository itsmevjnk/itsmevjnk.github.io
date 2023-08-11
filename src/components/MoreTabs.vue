<template>
    <section v-if="this.$route.path !== '/all'">
        <i>There is more to see! Check out the other tabs in this website, or click <router-link to="/all">All sections</router-link> to read the entire portfolio in one page.</i>
    </section>
</template>