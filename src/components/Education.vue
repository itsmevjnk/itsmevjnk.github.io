<script setup>
import { store } from '../info.js';
</script>

<template>
    <section>
        <h2>Education</h2>
        <comp-list v-bind:list="store.education"/>
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