<template>
  <div id="root" class="root" :class="rootClass">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { computed, reactive, onMounted, ref, onUnmounted, provide, inject } from "vue";
import { useRoute } from "vue-router";
import resources from "@/data/planets";
import { provideSolarSystem } from "./data/useSolarSystem";

const planets = resources.planets;
const defaultPlanet = resources.defaultPlanet;
provideSolarSystem();

const route = useRoute();
const planetName = computed(() => route.params.name);

const planet = computed(() => {
  return planets.find((p) => p.name === planetName.value) || defaultPlanet;
});

const rootClass = computed(() => planet.value.name);

const isMobile = ref(window.innerWidth < 1100);
const updateSize = () => {
  isMobile.value = window.innerWidth < 1100;
};
window.addEventListener("resize", updateSize);

provide("isMobile", isMobile);
</script>

<style></style>
