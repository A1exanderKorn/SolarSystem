<template>
  <header class="header">
    <div id="burg" v-if="mobile" class="burger menu" onclick="burger()">
      <span id="fi">
        <span id="se"></span>
      </span>
    </div>

    <nav id="nav_panel" class="navigation" v-else>
      <router-link to="/">
        <img src="@/assets/fav.png" alt="Солнечная система" class="logo-img" />
      </router-link>
      <div class="ul">
        <router-link v-for="planet in planets" :key="planet.name" :to="'/planet/' + planet.name">
          {{ planet.title }}
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import planets from "@/data/planets";

const menuOpen = ref(false);
const mobile = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
</script>

<style></style>
