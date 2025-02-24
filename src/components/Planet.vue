<template>
  <div class="main-content">
    <Sidebar v-if="planet === defaultPlanet"></Sidebar>
    <div v-if="!isMobile && planet === defaultPlanet">
      <div
        class="star"
        v-for="(star, index) in stars"
        :key="index"
        :style="{
          left: star.left,
          pointerEvents: 'none',
          top: star.top,
          width: star.width,
          height: star.height,
          boxShadow: star.boxShadow,
          animationDuration: star.animationDuration,
        }"
      ></div>
    </div>
    <div class="main-planet">
      <h1>{{ planet.title }}</h1>
      <p v-for="(paragraph, index) in planet.description" :key="index">{{ paragraph }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import resources from "@/data/planets";
import Sidebar from "@/components/Sidebar.vue";
import { ref, onMounted, onUnmounted, reactive } from "vue";

const planets = resources.planets;
const defaultPlanet = resources.defaultPlanet;
const isMobile = ref(window.innerWidth < 800);

const updateSize = () => {
  isMobile.value = window.innerWidth < 800;
};

const stars = reactive<
  {
    position: string;
    left: string;
    top: string;
    width: string;
    height: string;
    boxShadow: string;
    animationDuration: string;
  }[]
>([]);

const params = {
  amount: 200,
  size: {
    min: 1,
    max: 5,
    giant: 9,
  },
  duration: {
    min: 5,
    max: 25,
  },
};

const randomBetween = (a, b) => {
  return a + Math.random() * (b - a);
};

onMounted(() => {
  window.addEventListener("resize", updateSize);
  if (!isMobile.value) {
    for (let i = 0; i < params.amount; i++) {
      let size =
        Math.round(Math.random() * 10) === 0
          ? params.size.giant
          : randomBetween(params.size.min, params.size.max);

      let star = {
        position: "absolute",
        left: `${randomBetween(0, 100)}%`,
        top: `${randomBetween(0, 100)}%`,
        width: `${size}px`,
        height: `${size}px`,
        boxShadow: `0 0 ${size}px ${size / 2}px #043668`,
        animationDuration: `${randomBetween(params.duration.min, params.duration.max)}s`,
      };
      stars.push(star);
    }
  }
});
onUnmounted(() => {
  window.removeEventListener("resize", updateSize);
});
const route = useRoute();
const planetName = computed(() => route.params.name);

const planet = computed(() => {
  return planets.find((p) => p.name === planetName.value) || defaultPlanet;
});
</script>

<style></style>
