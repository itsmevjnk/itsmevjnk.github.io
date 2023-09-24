<script setup>
import HeaderComp from './components/common/Header.vue';
import NavbarComp from './components/common/Navbar.vue';
import FooterComp from './components/common/Footer.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <HeaderComp/>
  <NavbarComp/>
  <main class="container-pad">
    <RouterView></RouterView>
  </main>
  <FooterComp/>
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