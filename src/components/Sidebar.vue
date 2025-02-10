<template>
  <div class="sidebar">
    <button @click="showInfo('age')">Возраст</button>
    <button @click="showInfo('mass')">Масса</button>
    <button @click="showInfo('nearestStar')">Ближайшая звезда</button>
    <button @click="showInfo('satellites')">Спутники</button>
    <button @click="showInfo('smallBodies')">Малые тела</button>
    <button @click="showInfo('comets')">Кометы</button>
    <p v-if="activeInfo">{{ activeInfo }}</p>
  </div>
</template>

<script setup lang="ts">
import { useSolarSystem } from "@/data/useSolarSystem";
import { ref } from "vue";

const solarSystem = useSolarSystem();
const activeInfo = ref("");

function showInfo(info: keyof typeof solarSystem) {
  activeInfo.value = solarSystem[info];
}
</script>
