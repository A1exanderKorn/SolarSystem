<template>
  <div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { provideSolarSystem } from "./data/useSolarSystem";
import Header from "@/components/Header.vue";
provideSolarSystem();
</script>
