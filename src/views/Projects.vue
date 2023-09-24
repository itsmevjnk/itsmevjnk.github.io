<script setup>
import store from '../info.json';
import List from '../components/resume/List.vue';
import MoreTabs from '../components/resume/MoreTabs.vue';
</script>

<template>
    <section>
        <h2>Projects</h2>
        <List v-bind:list="store.projects"/>
    </section>
    <MoreTabs/>
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

</style>