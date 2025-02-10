import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/Home.vue";
import Planet from "@/components/Planet.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/planet/:name", component: Planet, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
