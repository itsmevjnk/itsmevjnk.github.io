<script setup>
import { store } from '../info.js';
</script>

<template>
    <section>
        <h2>Projects</h2>
        <comp-list v-bind:list="store.projects"/>
    </section>
    <comp-more/>
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