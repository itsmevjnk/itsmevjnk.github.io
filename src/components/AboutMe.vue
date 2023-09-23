<script setup>
import store from '../info.json';
</script>

<template>
    <section>
        <h2>About me</h2>
        <p>{{ store.about }}</p>
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