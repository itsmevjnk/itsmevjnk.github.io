<template>
    <section class="list-item" v-for="item in list">
        <img v-if="item.image !== undefined" v-bind:src="item.image"/>
        <div>
            <i>{{ item.date }}</i>
            <h4 class="my0">
                <a v-bind:href="item.title_url" v-if="item.title_url !== undefined" target="_blank">{{ item.title }}</a>
                <span v-else>{{ item.title }}</span>
            </h4>
            <template v-if="item.subtitle !== undefined">
                <a v-bind:href="item.subtitle_url" v-if="item.subtitle_url !== undefined" target="_blank">{{ item.subtitle }}</a>
                <span class="mb2" v-else>{{ item.subtitle }}</span>
            </template>
            <p v-if="item.content !== undefined">{{ item.content }}</p>
            <ul v-if="item.points !== undefined">
                <li v-for="point in item.points">{{ point }}</li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        list: Array
    }
};
</script>

<style>
section.list-item {
    margin: 1rem 0;
    padding: 1rem;
    border-radius: 1rem;
    border: 2px solid var(--pal-blue);
    display: flex;
    flex-direction: row;
    align-items: start;
}

section.list-item img {
    flex: 0;
    width: min(max(15vw, 7.5rem), 10rem);
    height: auto;
    margin-right: 1rem;
}

section.list-item div {
    flex: 1;
}

section.list-item ul {
    margin: 0.5rem;
}

section.list-item li {
    margin: 0.15rem 0;
}

@media(max-width: 30rem) {
    section.list-item img {
        display: none;
    }
}

@media print {
    section.list-item img {
        display: none;
    }

    section.list-item a {
        color: initial;
        text-decoration: none;
    }
}
</style>