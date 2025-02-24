<template>
  <header class="header">
    <div v-if="isMobile" :class="burgerClasses" @click="burger()">
      <span class="firstLine">
        <span class="secondLine"></span>
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
    <nav class="burgerNav" v-if="burgerClasses === 'burger cross'">
      <div class="ul burgerUl">
        <router-link to="/"> На главную </router-link>
        <router-link v-for="planet in planets" :key="planet.name" :to="'/planet/' + planet.name">
          {{ planet.title }}
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { inject, ref, watch } from "vue";
import resources from "@/data/planets";

const planets = resources.planets;
const defaultPlanet = resources.defaultPlanet;
const isMobile = ref(inject("isMobile"));
const burgerClasses = ref("burger menu");

watch(isMobile, (newValue) => {
  if (!newValue) {
    burgerClasses.value = "burger menu";
  }
});

function burger() {
  burgerClasses.value = burgerClasses.value === "burger menu" ? "burger cross" : "burger menu";
}
</script>

<style></style>
