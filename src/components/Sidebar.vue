<template>
  <div class="sidebar">
    <a @click="showInfo('age')">Возраст Солнечной системы</a>
    <a @click="showInfo('mass')">Масса Солнечной системы</a>
    <a @click="showInfo('nearestStar')">Ближайшая звезда</a>
    <a @click="showInfo('satellites')">Число спутников</a>
    <a @click="showInfo('smallBodies')">Число малых тел</a>
    <a @click="showInfo('comets')">Число комет</a>
    <transition name="fade">
      <p v-if="activeInfo">{{ activeInfo }}</p>
    </transition>
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

<style scoped>
p {
  position: absolute;
  top: calc(50% - 150px);
  left: 15%;
  width: 40%;
  height: auto;
  min-height: 200px;
  padding-top: 40px;
  padding-bottom: 40px;
  padding-left: 30px;
  padding-right: 30px;
  background: rgb(255, 255, 255, 0.4);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  z-index: 1;
  color: #ffffff;
  font-size: 30;
  text-shadow: 0px 0px 6px rgba(255, 255, 255, 0.7);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s linear, transform 0.25s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-to {
  opacity: 0.5;
}
</style>
