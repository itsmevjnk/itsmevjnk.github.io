<script setup>
import AboutMe from '../components/resume/AboutMe.vue';
import Skills from '../components/resume/Skills.vue';
import Education from '../components/resume/Education.vue';
import Projects from './Projects.vue';
</script>

<template>
    <AboutMe/>
    <Skills/>
    <Education/>
    <Projects/>
    <section class="print-btn">
        <a href="#" onclick="window.print();">Print this portfolio</a>
    </section>
</template>

<style>
.print-btn {
    padding: 1rem;
    text-align: right;
}

@media print {
    .print-btn {
        display: none;
    }
}
</style>