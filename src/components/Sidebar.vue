<template>
  <div class="sidebar">
    <a v-for="(text, key) in SolarSystemText" :key="key" @click="showInfo(key)">{{ text }}</a>
    <transition name="fade" class="fade">
      <p v-if="activeInfo">{{ activeInfo }}</p>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useSolarSystem } from "@/data/useSolarSystem";
import { ref, inject } from "vue";

const solarSystem = useSolarSystem();
const activeInfo = ref("");

const SolarSystemText = {
  age: "Возраст Солнечной системы",
  mass: "Масса Солнечной системы",
  nearestStar: "Ближайшая звезда",
  satellites: "Число спутников",
  smallBodies: "Число малых тел",
  comets: "Число комет",
};

function showInfo(info: keyof typeof solarSystem) {
  activeInfo.value = activeInfo.value == solarSystem[info] ? "" : solarSystem[info];
}
</script>

<style></style>
