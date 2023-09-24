<script setup>
import { query_posts, fetch_post } from '../blog.js';
</script>

<template>
    <Transition>
        <article v-if="single.loaded">
            <a href="/blog" class="back-container inert" @click="back_to_posts">
                <img class="icon mini" src="../assets/icons/arrow_back_FILL0_wght400_GRAD0_opsz24.svg" alt="back">
                <span>Back to posts</span>
            </a>
            <section class="my3">
                <h3 class="my1">{{ single.title }}</h3>
                <span>{{ single.ctime }} UTC</span> <a :href="'/blog?id=' + single.id" @click="get_link">Copy link</a>
            </section>
            <section class="post-content">{{ single.content }}</section>
        </article>
    </Transition>
    <Transition>
        <div v-if="posts.loaded">
            <!-- posts list -->
            <a v-for="post in posts.list" :data-id="post.id" :href="'/blog?id=' + post.id" @click="display_post" class="inert">
                <article class="item">
                    <h3 class="my1">{{ post.title }}</h3>            
                    <div>{{ post.ctime }} UTC</div>
                </article>
            </a>
        </div>
    </Transition>
</template>

<script>
export default {
    data() {
        return {
            single: {
                loaded: false,
                id: NaN,
                title: null,
                ctime: null,
                content: null
            },

            posts: {
                list: [],
                loaded: true
            }
        };
    },

    mounted() {
        let url_params = new URLSearchParams(window.location.search);

        if(url_params.has('id')) {
            this.single.id = parseInt(url_params.get('id')); // get post ID right away
            this.do_fetch_post(); // and fetch the post too
        } else this.do_query_posts(); // no ID, so we'll get the posts list
    },

    methods: {
        display_post(event) {
            /* block anything else from happening due to this event as we assume control */
            event.preventDefault();
            event.stopPropagation();

            this.single.id = parseInt(event.target.closest('[data-id]').dataset.id); // set post ID
            this.do_fetch_post(); // start fetching the post right away

            /* drop in our new URL */
            let url = new URL(window.location);
            url.searchParams.set('id', this.single.id);
            window.history.pushState({}, '', url);
        },

        back_to_posts(event) {
            /* block anything else from happening due to this event as we assume control */
            event.preventDefault();
            event.stopPropagation();

            this.do_query_posts(); // query posts again in case there's new stuff

            /* drop in our new URL */
            let url = new URL(window.location.href.split('?')[0]);
            window.history.pushState({}, '', url);
        },  

        do_query_posts() {
            this.posts.loaded = false;
            this.single.loaded = false;
            query_posts((list) => {
                this.posts.list = list;
                this.posts.loaded = true;
            });
        },

        do_fetch_post() {
            this.posts.loaded = false;
            this.single.loaded = false;
            fetch_post(this.single.id, (payload) => {
                this.single.ctime = payload.ctime;
                this.single.title = payload.title;
                this.single.content = payload.content;
                this.single.loaded = true; // finally show the thing
            });
        },

        get_link(event) {
            /* block anything else from happening due to this event as we assume control */
            event.preventDefault();
            event.stopPropagation();

            navigator.clipboard.writeText(window.location.href).then(() => {}); // do nothing
        }
    }
};
</script>

<style scoped>
a.inert {
    text-decoration: none;
    color: black;
}

a.inert:hover {
    color: initial;
}

a.back-container {
    display: flex;
    flex-direction: row;
}

a.back-container span {
    margin: 0 0.25rem;
}

section.post-content {
    white-space: pre-wrap;
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

</style>

