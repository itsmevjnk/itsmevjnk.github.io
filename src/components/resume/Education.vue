<script setup>
import store from '../../info.json';
import MoreTabs from './MoreTabs.vue';
import List from './List.vue';
</script>

<template>
    <section>
        <h2>Education</h2>
        <List v-bind:list="store.education"/>
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