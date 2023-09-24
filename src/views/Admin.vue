<script setup>
import { logged_in, login, register, logout } from '../auth.js';
import { query_posts, fetch_post, add_edit_post, delete_post } from '../blog.js';
import axios from 'axios';
</script>

<template>
    <form v-if="!logged_in"  @submit.prevent="handle_login">
        <div class="alert error" v-if="login_form.error != null">Login/registration failed ({{ login_form.error }})</div>
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
            <button type="submit">Log in</button>
            <button @click.prevent="handle_register">Register</button>
        </div>
    </form>
    <section v-else>
        <h2 class="mb1">Blog Administration</h2>
        <div>
            <a href="#" @click="handle_logout">Log out</a>
        </div>
        <div v-if="posts.loading">Fetching posts...</div>
        <template v-else>
            <article @click="add_post" v-if="!edit_post.editing || !isNaN(edit_post.idx)" class="item add-post">
                <img src="../assets/icons/add_FILL0_wght400_GRAD0_opsz48.svg" alt="add" class="icon" v-no-ctx-menu>
                <span>Add new post</span>
            </article>
            <article class="item" v-for="(post, idx) in posts.list" @click="handle_edit_selection" :data-id="post.id" :data-idx="idx" :class="{ selectable: !edit_post.editing || (edit_post.idx != idx && !(isNaN(idx) && isNaN(edit_post.idx))) }">
                <template v-if="!edit_post.editing || (edit_post.idx != idx)">
                    <h3 class="my1">{{ post.title }}</h3>
                    <div>{{ post.ctime }} UTC</div>
                    <i>ID: {{ post.id }}</i>
                </template>
                <form v-else @submit.prevent="handle_edit_save">
                    <div class="alert error" v-if="edit_post.error != null">Operation failed ({{ edit_post.error }})</div>
                    <div class="form-input">
                        <label for="post_title">Title:</label>
                        <input type="text" v-model="post.title" name="post_title" id="post_title" class="post" :disabled="edit_post.input_disabled" required>
                    </div>
                    <div class="form-input">
                        <label for="post_content">Content:</label>
                        <textarea v-model="edit_post.content" name="post_content" id="post_content" class="post" :disabled="!edit_post.content_fetched || edit_post.input_disabled"></textarea>
                    </div>
                    <div class="button-group center">
                        <button type="submit" :disabled="edit_post.input_disabled">{{ (isNaN(post.id)) ? 'Add' : 'Save' }}</button>
                        <button @click.prevent="handle_edit_cancel" :disabled="edit_post.input_disabled">Cancel</button>
                        <button class="delete" @click.prevent="handle_delete_post" :disabled="edit_post.input_disabled" v-if="!isNaN(post.id)">Delete</button>
                    </div>
                </form>
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
                old_title: '',
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
                this.login_form.password = '';
                this.login_form.error = (result) ? null : msg;
            });
        },

        handle_register() {
            if(document.querySelector('form').reportValidity() == false) return; // not valid
            register(this.login_form.user, this.login_form.password, (result, msg) => {
                if(!result) this.login_form.error = msg;
                else this.handle_login(); // try logging in now
            })
        },

        handle_logout() {
            logout(() => logged_in.value = false);
        },

        handle_edit_selection(event) {
            let idx = parseInt(event.target.closest('[data-id]').dataset.idx);
            if(this.edit_post.editing && this.edit_post.idx == idx) return; // don't do anything; we're selecting the same post
            
            this.edit_post.content_fetched = false;
            this.edit_post.content = 'Loading...';
            this.edit_post.error = null;
            this.edit_post.editing = true;
            this.edit_post.idx = idx;
            this.edit_post.old_title = this.posts.list[idx].title;

            // console.log(event.target);
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
            });
        },

        handle_edit_cancel(event) {
            this.edit_post.editing = false;
            this.posts.list[this.edit_post.idx].title = this.edit_post.old_title;
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
        },

        handle_delete_post(event) { 
            this.edit_post.input_disabled = true;
            delete_post(this.posts.list[this.edit_post.idx].id, (result, message) => {
                this.edit_post.input_disabled = false;
                this.edit_post.editing = !result;
                this.edit_post.error = message;

                if(result) this.do_query_posts(); // query again
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

article.selectable {
    cursor: pointer;
}

input.post {
    width: initial;
}

button.delete {
    border-color: var(--pal-red);
}

button.delete:hover {
    background-color: var(--pal-red);
    color: black;
}
</style>