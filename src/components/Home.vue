<script setup>
</script>

<template>
    <section>
        <h2>Welcome to my page!</h2>
        <p>This website is still under construction. However, there are still things that you can check out, and I really hope you have a great time visiting this!</p>
        <ul>
            <li>If you want to see the projects that I have done, head over to the <router-link to="/projects">Projects</router-link> tab.</li>
            <li><b>Interested in my CV/resume?</b> Go to the Resume tab above, or use <router-link to="/cv">this link</router-link>.</li>
        </ul>
    </section>
    <section class="tech-footer">
        <a href="https://html.spec.whatwg.org/" target="_blank">
            <img src="../assets/icons/html5.svg" alt="HTML5">
        </a>
        <a href="https://www.w3.org/Style/CSS/specs.en.html" target="_blank">
            <img src="../assets/icons/css3.svg" alt="CSS3">
        </a>
        <a href="https://vuejs.org/" target="_blank">
            <img src="../assets/icons/vue.svg" alt="Vue">
        </a>
        <span>This website has been developed using HTML5, CSS3 and the <a href="https://vuejs.org/" target="_blank">Vue 3</a> framework.</span>
    </section>
</template>

<style scoped>
.tech-footer {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.tech-footer * {
    margin: 0 0.125rem;
}

.tech-footer img {
    height: 3rem;
    width: auto;
}

.tech-footer span {
    font-style: italic;
}
</style>