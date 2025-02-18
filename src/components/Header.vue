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
import planets from "@/data/planets";

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

<style scoped>
.burger {
  position: relative;
  width: 40px;
  height: 35px;
  display: block;
  margin-left: 10px;
}
.burger .secondLine,
.burger .firstLine::after,
.burger .firstLine::before {
  transition: 0.5s;
  height: 3px;
  width: 100%;
  position: absolute;
  background: #f4acc4;
  margin: 0 auto;
}
.burger .secondLine {
  top: 16px;
}
.burger .firstLine::after {
  content: "";
  bottom: 5px;
}
.burger .firstLine::before {
  content: "";
  top: 5px;
}
.burger {
  cursor: pointer;
}

.burger.cross .secondLine {
  opacity: 0;
  transition: 0.5s;
}
.burger.cross > .firstLine::before {
  transform: rotate(45deg);
  top: 16px;
  transition: 0.4s;
}
.burger.cross > .firstLine::after {
  transform: rotate(-45deg);
  bottom: 16px;
  transition: 0.4s;
}

.burgerUl {
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
}

.burgerUl a {
  padding: 12px 24px;
  text-decoration: none; /* Убираем подчеркивание */
  border-radius: 8px;
  width: 200px;
}
</style>
