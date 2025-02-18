<template>
  <div class="main-content">
    <Sidebar></Sidebar>
    <div v-if="!isMobile">
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

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import planets from "@/data/planets";

const route = useRoute();
const planetName = computed(() => route.params.name);

const planet = computed(() => planets.find((p) => p.name === planetName.value) || null);
</script>

<style></style>
