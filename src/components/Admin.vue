<script setup>
import { logged_in, login, register, logout } from '../auth.js';
import { query_posts, fetch_post, add_edit_post } from '../blog.js';
import axios from 'axios';
</script>

<template>
    <section v-if="!logged_in">
        <div class="alert warning" v-if="login_form.error != null">Login/registration failed ({{ login_form.error }})</div>
        <h2>Administration Login</h2>
        <div class="form-input">
            <label for="login_user">User name:</label>
            <input type="text" v-model="login_form.user" name="login_user" id="login_user" required>
        </div>
        <div class="form-input">
            <label for="login_pswd">Password:</label>
            <input type="password" v-model="login_form.password" name="login_pswd" id="login_pswd" required>
        </div>
        <div class="button-group">
            <button @click="handle_login">Log in</button>
            <button @click="handle_register">Register</button>
        </div>
    </section>
    <section v-else>
        <h2>Blog Administration</h2>
        <div>
            <a href="#" @click="handle_logout">Log out</a>
        </div>
        <div v-if="posts.loading">Fetching posts...</div>
        <template v-else>
            <article @click="add_post" v-if="!(edit_post.editing && isNaN(edit_post.id))" class="add-post">
                <img src="../assets/icons/add_FILL0_wght400_GRAD0_opsz48.svg" alt="add" class="icon">
                <span>Add new post</span>
            </article>
            <article v-for="(post, idx) in posts.list" @click="handle_edit_selection" :data-id="post.id" :data-idx="idx">
                <template v-if="!edit_post.editing || (edit_post.idx != idx)">
                    <div>{{ post.ctime }} UTC</div>
                    <h3>{{ post.title }}</h3>
                    <i>ID: {{ post.id }}</i>
                </template>
                <template v-else>
                    <div class="alert warning" v-if="edit_post.error != null">Cannot add/edit post ({{ edit_post.error }})</div>
                    <div class="form-input">
                        <label for="post_title">Title:</label>
                        <input type="text" v-model="post.title" name="post_title" id="post_title" class="post" :disabled="edit_post.input_disabled">
                    </div>
                    <div class="form-input">
                        <label for="post_content">Content:</label>
                        <textarea v-model="edit_post.content" name="post_content" id="post_content" class="post" :disabled="!edit_post.content_fetched || edit_post.input_disabled"></textarea>
                    </div>
                    <div class="button-group center">
                        <button @click="handle_edit_save" :disabled="edit_post.input_disabled">{{ (isNaN(post.id)) ? 'Add' : 'Save' }}</button>
                        <button @click="handle_edit_cancel" :disabled="edit_post.input_disabled">Cancel</button>
                    </div>
                </template>
            </article>
        </template>
    </section>
</template>

<script>
export default {
    data() {
        return {
            login_form: {
                user: '',
                password: '',
                error: null
            },

            posts: {
                list: [],
                loading: true
            },

            edit_post: {
                editing: false,
                idx: 0,
                content: '',
                content_fetched: false,
                input_disabled: false,
                error: null
            }
        };
    },

    mounted() {
        this.do_query_posts();
    },

    methods: {
        do_query_posts() {
            this.posts.loading = true;
            query_posts((list) => {
                this.posts.list = list;
                this.posts.loading = false;
            });
        },

        handle_login() {
            login(this.login_form.user, this.login_form.password, (result, msg) => {
                logged_in.value = result;
                this.login_form.error = (result) ? null : msg;
            });
        },

        handle_register() {
            register(this.login_form.user, this.login_form.password, (result, msg) => {
                if(!result) this.login_form.error = msg;
                else this.handle_login(); // try logging in now
            })
        },

        handle_logout() {
            logout(() => logged_in.value = false);
        },

        handle_edit_selection(event) {
            if(this.edit_post.editing && edit_post.idx == parseInt(event.target.dataset.idx)) return; // don't do anything; we're selecting the same post
            
            this.edit_post.content_fetched = false;
            this.edit_post.content = 'Loading...';
            this.edit_post.error = null;
            this.edit_post.editing = true;
            this.edit_post.idx = event.target.closest('[data-id]').dataset.idx;

            console.log(event.target);
            let id = event.target.closest('[data-id]').dataset.id;
            fetch_post(id, (payload) => {
                this.edit_post.content = payload.content;
                this.edit_post.content_fetched = true;
            });
        },

        handle_edit_save() {
            this.edit_post.input_disabled = true; // disable all inputs for now

            let payload = {
                title: this.posts.list[this.edit_post.idx].title,
                content: this.edit_post.content
            };
            if(!isNaN(this.posts.list[this.edit_post.idx].id)) payload['id'] = this.posts.list[this.edit_post.idx].id; // edit/new post

            add_edit_post(payload, (result, msg) => {
                this.edit_post.input_disabled = false;
                this.edit_post.editing = !result;
                this.edit_post.error = msg;
                if(result) this.do_query_posts();
            })
        },

        handle_edit_cancel(event) {
            this.edit_post.editing = false;
            if(this.edit_post.idx == 0 && this.posts.list.length > 0 && isNaN(this.posts.list[0].id)) this.posts.list.shift(); // remove phantom new post

            event.stopPropagation(); // so that edit selection won't get triggered
            
            // console.log(!(this.edit_post.editing && isNaN(this.edit_post.id)));
        },

        add_post() {
            this.edit_post.editing = true;
            this.edit_post.idx = 0;
            this.edit_post.content = 'Hello, World!';
            this.edit_post.error = null;
            this.edit_post.content_fetched = true;
            this.posts.list.unshift({
                id: NaN,
                ctime: '',
                title: 'Untitled Post'
            });
        }
    }
};
</script>

<style scoped>
.alert {
    border-radius: 1.25rem;
    padding: 1rem;
}

.button-group button {
    margin: 0 0.25rem;
}

.button-group.center {
    width: 100%;
    justify-content: center;
}

.add-post {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
}

.add-post span {
    margin: 0 0.5rem;
}
</style>