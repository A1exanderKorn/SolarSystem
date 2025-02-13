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
import planets from "@/data/planets";
import { provideSolarSystem } from "./data/useSolarSystem";

provideSolarSystem();

const route = useRoute();
const planetName = computed(() => route.params.name);

const planet = computed(() => {
  return planets.find((p) => p.name === planetName.value) || null;
});

const rootClass = computed(() => (planet.value ? planet.value.name : "default"));

const isMobile = ref(window.innerWidth < 1000);
const updateSize = () => {
  isMobile.value = window.innerWidth < 1000;
};
window.addEventListener("resize", updateSize);

provide("isMobile", isMobile);
</script>

<style>
.root.default,
.root.Sat {
  background: radial-gradient(ellipse at center, rgba(8, 25, 42, 1) 19%, rgba(1, 4, 6, 1) 100%);
  color: rgb(255, 255, 255);
  text-shadow: 1px 0 1px #000, 0 1px 1px #000, -1px 0 1px #000, 0 -1px 1px #000;
}
.root.default .main-footer,
.root.default .header,
.root.Sat .main-footer,
.root.Sat .header {
  background: #353358;
}

.root.Earth {
  background: none;
  background-color: #8fc1e3;
  text-shadow: none;
}
.root.Earth .main-footer,
.root.Earth .header {
  background-color: #687864;
}
.root.Earth .header a {
  color: #f7f9fb;
}
.root.Earth .main-planet,
.root.Earth .main-planet h1 {
  color: #f7f9fb;
}
.root.Earth .main-planet h1 {
  text-shadow: 0 0 1px #999, 1px 1px 1px #888, 2px 2px 1px #777, 3px 3px 1px #666, 4px 4px 1px #555,
    5px 5px 1px #444;
}

.root.Merc {
  background: radial-gradient(#bc4639, #d4a59a);
  background-color: #8fc1e3;
  text-shadow: 1px 0 1px rgba(0, 0, 0, 0.425), 0 1px 1px rgba(0, 0, 0, 0.426),
    -1px 0 1px rgba(0, 0, 0, 0.426), 0 -1px 1px rgba(0, 0, 0, 0.426);
}
.root.Merc .main-footer,
.root.Merc .header {
  background-color: #5c2018;
}
.root.Merc .ul a {
  color: #f3e0dc;
}
.root.Merc .main-planet,
.root.Merc .main-planet h1 {
  color: #f3e0dc;
}

.root.Ven {
  background: radial-gradient(ellipse at center, #edc7b7 49%, #eee2dc 100%);
  text-shadow: 1px 0 1px rgba(255, 255, 255, 0.131), 0 1px 1px rgba(255, 255, 255, 0.109),
    -1px 0 1px rgba(255, 255, 255, 0.134), 0 -1px 1px rgba(255, 255, 255, 0.141);
}
.root.Ven .main-footer,
.root.Ven .header {
  background-color: #bab2b5;
}
.root.Ven .ul a {
  color: #ac3b61;
}
.root.Ven .main-planet {
  color: #123c69;
}
.root.Ven .main-planet h1 {
  color: #ac3b61;
}

.root.Jup {
  background: linear-gradient(#8f6331, #c7aa92);
  text-shadow: none;
}
.root.Jup .main-footer,
.root.Jup .header {
  background-color: #5c59464f;
}
.root.Jup .ul a {
  background-color: #c7aa92;
}
.root.Jup .main-planet {
  color: #4a2e1e;
  text-shadow: 0px 2px 3px rgba(85, 85, 85, 0.509);
}
.root.Jup .main-planet h1 {
  color: #5c3825;
  text-shadow: 0px 2px 3px rgb(51, 51, 51);
}

.root.Ur {
  background: none;
  background-color: #48993f;
  text-shadow: 1px 0 1px rgba(255, 255, 255, 0.2), 0 1px 1px rgba(255, 255, 255, 0.2),
    -1px 0 1px rgba(255, 255, 255, 0.2), 0 -1px 1px rgba(255, 255, 255, 0.2);
}
.root.Ur .main-footer,
.root.Ur .header {
  background-color: #1c6c36;
}
.root.Ur .main-planet,
.root.Ur .main-planet h1,
.root.Ur .ul a {
  color: #ffe6ba;
}

.root.Nep {
  background: none;
  background-color: #17177b;
  text-shadow: none;
}
.root.Nep .main-footer,
.root.Nep .header {
  background-color: #553d67;
}
.root.Nep .ul a,
.root.Nep .main-planet h1 {
  color: #f64c72;
}
.root.Nep .main-planet {
  color: #ffffff;
}

.root.Sun {
  background: none;
  background-color: #fbe8a6;
  text-shadow: 1px 0 1px rgba(255, 255, 255, 0.425), 0 1px 1px rgba(255, 255, 255, 0.425),
    -1px 0 1px rgba(255, 255, 255, 0.425), 0 -1px 1px rgba(255, 255, 255, 0.425);
}
.root.Sun .main-footer,
.root.Sun .header {
  background-color: #f4976c;
}
.root.Sun .ul a,
.root.Sun .main-planet h1 {
  color: #303c6c;
}
.root.Sun .main-planet {
  color: #28393b;
}

.root.Mars {
  background: none;
  background-color: #c4a189;
  text-shadow: 1px 0 1px rgba(255, 255, 255, 0.2), 0 1px 1px rgba(255, 255, 255, 0.2),
    -1px 0 1px rgba(255, 255, 255, 0.2), 0 -1px 1px rgba(255, 255, 255, 0.2);
}
.root.Mars .main-footer,
.root.Mars .header {
  background-color: #4c1905;
}
.root.Mars .ul a {
  color: #f75151;
}
.root.Mars .main-planet {
  color: #4c1905;
}
.root.Mars .main-planet h1 {
  color: #4c1905;
}
</style>
