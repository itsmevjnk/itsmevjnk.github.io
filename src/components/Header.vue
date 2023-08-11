<script setup>
import { store } from '../info.js';
</script>

<template>
    <header class="container-pad">
        <div id="header">
            <img class="avatar" src="../assets/avatar.jpg" alt="Profile picture"/>
            <section>
                <h1 class="mb0 mt2-l5">{{ store.name }}</h1>
                <i class="d-block mb2">{{ store.summary }}</i>
                <ul class="contact-info">
                    <li>
                        <img class="icon invert" src="../assets/icons/location_on_FILL0_wght400_GRAD0_opsz48.svg" alt="location"/>
                        <span>{{ store.address }}</span>
                    </li>
                    <li>
                        <img class="icon invert" src="../assets/icons/mail_FILL0_wght400_GRAD0_opsz48.svg" alt="mail"/>
                        <a v-bind:href="'mailto:' + store.email" class="no-effect">{{ store.email }}</a>
                    </li>
                    <li>
                        <img class="icon invert" src="../assets/icons/phone_android_FILL0_wght400_GRAD0_opsz48.svg" alt="phone"/>
                        <template v-for="(item, i) in store.phone">
                            <a v-bind:href="'tel:' + item.number.replaceAll(' ', '')" class="no-effect">{{ item.number }}</a>
                            <span v-if="item.desc !== ''">{{ '&nbsp;(' + item.desc + ')' }}</span>
                            <span v-if="i != store.phone.length - 1">&nbsp;|&nbsp;</span>
                        </template>
                    </li>
                    <li>
                        <img class="icon" src="../assets/icons/github-mark-white.svg" alt="GitHub"/>
                        <a v-bind:href="store.gh_account" class="no-effect" target="_blank">{{ store.gh_account }}</a>
                    </li>
                </ul>
            </section>
        </div>
    </header>
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
header {
    padding-top: 1rem; padding-bottom: 1rem;
}

/* header */
div#header {
    width: 100%;
    display: flex;
    flex-direction: row;
}

div#header img.avatar {
    flex: 0; /* no flex, display as is */
    margin: 0 1rem;
}

div#header section {
    flex: 1; /* flex as much as possible */
    width: 100%;
}

ul.contact-info {
    width: 100%;
    text-align: left;
    list-style-type: none;
    margin: 0; padding: 0;
}

ul.contact-info li {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 0.3rem;
}

ul.contact-info li img.icon {
    margin-right: 0.5rem;
}

@media(max-width: 575px) { /* L5 */
    div#header {
        flex-direction: column;
        align-items: center;
    }

    div#header section {
        text-align: center;
    }
}
</style>