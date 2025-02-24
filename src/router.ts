import { createRouter, createWebHistory } from "vue-router";
import Planet from "@/components/Planet.vue";
import Asteroids from "./components/Asteroids.vue";

const routes = [
  { path: "/", component: Planet, props: true },
  { path: "/planet/:name", component: Planet, props: true },
  { path: "/asteroids", component: Asteroids },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
