import { provide, inject, reactive } from "vue";

const solarSystemToken = Symbol();
type solarSystem = {
  age: string;
  mass: string;
  nearestStar: string;
  satellites: string;
  smallBodies: string;
  comets: string;
};

const solarSystemData: solarSystem = reactive({
  age: "4,5682±0,0006 млрд лет",
  mass: "1,0014 M☉ (~1,991253858 * 10³⁰ кг)",
  nearestStar: "Проксима Центавра (4,21—4,24 св. лет)",
  satellites: "639 спутников (204 у планет, 435 у малых тел)",
  smallBodies: "Более 1 000 000 (на ноябрь 2020)",
  comets: "3690 (на ноябрь 2020)",
});

export function provideSolarSystem() {
  provide(solarSystemToken, solarSystemData);
}

export function useSolarSystem() {
  return inject(solarSystemToken) as solarSystem;
}
