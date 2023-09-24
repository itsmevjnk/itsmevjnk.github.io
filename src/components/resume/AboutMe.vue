<script setup>
import store from '../../info.json';
import MoreTabs from './MoreTabs.vue';
</script>

<template>
    <section>
        <h2>About me</h2>
        <p>{{ store.about }}</p>
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