<template>
  <div class="sidebar">
    <a @click="showInfo('age')">Возраст</a>
    <a @click="showInfo('mass')">Масса</a>
    <a @click="showInfo('nearestStar')">Ближайшая звезда</a>
    <a @click="showInfo('satellites')">Спутники</a>
    <a @click="showInfo('smallBodies')">Малые тела</a>
    <a @click="showInfo('comets')">Кометы</a>
    <p v-if="activeInfo">{{ activeInfo }}</p>
  </div>
</template>

<script setup lang="ts">
import { useSolarSystem } from "@/data/useSolarSystem";
import { ref } from "vue";

const solarSystem = useSolarSystem();
const activeInfo = ref("");

function showInfo(info: keyof typeof solarSystem) {
  activeInfo.value = activeInfo.value == solarSystem[info] ? "" : solarSystem[info];
}
</script>
