<script setup>
import store from '../info.json';
</script>

<template>
    <section>
        <h2>Skills</h2>
        <div class="skills-container">
            <div class="skill" v-for="(value, key) in store.skills">
                <span>{{ key }}</span>
                <div class="bar-container">
                    <div class="bar" :style="{
                        width: (value * 100) + '%'
                    }" :class="{
                        full: value == 1
                    }">{{ value * 100 }}%</div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.skills-container {
    display: grid;
    grid-template-columns: auto auto;
}

.skill {
    margin: 0.25rem 0.5rem;
}

.bar-container {
    border: 2px solid #3c486b;
    border-radius: 100vh;
    width: 100%;
    box-sizing: border-box;
}

.bar {
    height: 1.25rem;
    background-color: #3c486b;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 0.25rem;
    color: white;
    border-top-left-radius: 100vh;
    border-bottom-left-radius: 100vh;
}

.bar.full {
    border-top-right-radius: 100vh;
    border-bottom-right-radius: 100vh;
}

@media(max-width: 575px) { /* L5 */
    .skills-container {
        grid-template-columns: auto;
    }

    .skill {
        margin: 0.25rem 0;
    }
}
</style>