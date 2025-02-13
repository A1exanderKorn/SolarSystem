<template>
  <div class="main-content">
    <Sidebar></Sidebar>
    <div v-if="!isMobile">
      <div
        class="star"
        v-for="(star, index) in stars"
        :key="index"
        :style="{
          left: star.left,
          pointerEvents: 'none',
          top: star.top,
          width: star.width,
          height: star.height,
          boxShadow: star.boxShadow,
          animationDuration: star.animationDuration,
        }"
      ></div>
    </div>
    <div class="main">
      <h1>СОЛНЕЧНАЯ СИСТЕМА</h1>
      <p>
        Со́лнечная систе́ма — планетная система, включающая в себя центральную звезду Солнце и все
        естественные космические объекты на гелиоцентрических орбитах. Она сформировалась путём
        гравитационного сжатия газопылевого облака примерно 4,57 млрд лет назад.
      </p>
      <p>
        Общая масса Солнечной системы составляет около 1,0014 M☉. Бо́льшая часть её приходится на
        Солнце; оставшаяся часть практически полностью содержится в восьми отдалённых друг от друга
        планетах, имеющих близкие к круговым орбиты, лежащие почти в одной плоскости — плоскости
        эклиптики. Из-за этого наблюдается противоречащее ожидаемому распределение момента импульса
        между Солнцем и планетами (так называемая «проблема моментов»): всего 2 % общего момента
        системы приходится на долю Солнца, масса которого в ~740 раз больше общей массы планет, а
        остальные 98 % — на ~0,001 общей массы Солнечной системы.
      </p>
      <p>
        Четыре ближайшие к Солнцу планеты, называемые планетами земной группы, — Меркурий, Венера,
        Земля и Марс — состоят в основном из силикатов и металлов. Четыре более удалённые от Солнца
        планеты — Юпитер, Сатурн, Уран и Нептун (также называемые газовыми гигантами) — намного
        более массивны, чем планеты земной группы. Крупнейшие планеты, входящие в состав Солнечной
        системы, Юпитер и Сатурн, состоят главным образом из водорода и гелия; меньшие газовые
        гиганты, Уран и Нептун, помимо водорода и гелия, преимущественно содержат воду, метан и
        аммиак, такие планеты выделяются в отдельный класс «ледяных гигантов». Шесть планет из
        восьми и четыре карликовые планеты имеют естественные спутники. Юпитер, Сатурн, Уран и
        Нептун окружены кольцами пыли и других частиц.
      </p>

      <p>
        В Солнечной системе существуют две области, заполненные малыми телами. Пояс астероидов,
        находящийся между Марсом и Юпитером, схож по составу с планетами земной группы, поскольку
        состоит из силикатов и металлов. Крупнейшими объектами пояса астероидов являются карликовая
        планета Церера и астероиды Паллада, Веста и Гигея. За орбитой Нептуна располагаются
        транснептуновые объекты, состоящие из замёрзшей воды, аммиака и метана, крупнейшими из
        которых являются Плутон, Седна, Хаумеа, Макемаке, Квавар, Орк и Эрида. В Солнечной системе
        существуют и другие популяции малых тел, такие как планетные квазиспутники и троянцы,
        околоземные астероиды, кентавры, дамоклоиды, а также перемещающиеся по системе кометы,
        метеороиды и космическая пыль.
      </p>

      <p>
        Солнечный ветер (поток плазмы от Солнца) создаёт пузырь в межзвёздной среде, называемый
        гелиосферой, который простирается до края рассеянного диска. Гипотетическое облако Оорта,
        служащее источником долгопериодических комет, может простираться на расстояние примерно в
        тысячу раз дальше гелиосферы.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import { ref, onMounted, onUnmounted, reactive } from "vue";
const isMobile = ref(window.innerWidth < 800);

const updateSize = () => {
  isMobile.value = window.innerWidth < 800;
};

const stars = reactive<
  {
    position: string;
    left: string;
    top: string;
    width: string;
    height: string;
    boxShadow: string;
    animationDuration: string;
  }[]
>([]);

const params = {
  amount: 200,
  size: {
    min: 1,
    max: 5,
    giant: 9,
  },
  duration: {
    min: 5,
    max: 25,
  },
};

const randomBetween = (a, b) => {
  return a + Math.random() * (b - a);
};

onMounted(() => {
  window.addEventListener("resize", updateSize);
  if (!isMobile.value) {
    let newStars: {
      position: string;
      left: string;
      top: string;
      width: string;
      height: string;
      boxShadow: string;
      animationDuration: string;
    }[] = [];
    for (let i = 0; i < params.amount; i++) {
      let size =
        Math.round(Math.random() * 10) === 0
          ? params.size.giant
          : randomBetween(params.size.min, params.size.max);

      let star = {
        position: "absolute",
        left: `${randomBetween(0, 100)}%`,
        top: `${randomBetween(0, 100)}%`,
        width: `${size}px`,
        height: `${size}px`,
        boxShadow: `0 0 ${size}px ${size / 2}px #043668`,
        animationDuration: `${randomBetween(params.duration.min, params.duration.max)}s`,
      };
      stars.push(star);
    }
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", updateSize);
});
</script>

<style scoped>
.star {
  position: absolute;
  background: radial-gradient(
    ellipse at center,
    rgba(177, 198, 219, 1) 2%,
    rgba(5, 63, 118, 1) 100%
  );
  border-radius: 100%;
  animation: shine infinite alternate;
}
@keyframes shine {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  20% {
    transform: scale(0.9);
    opacity: 0.8;
  }
  40% {
    transform: scale(1);
    opacity: 0.9;
  }
  40% {
    transform: scale(0.2);
    opacity: 0.2;
  }
  60% {
    transform: scale(0.2);
    opacity: 0.1;
  }
  80% {
    transform: scale(0.5);
    opacity: 0.5;
  }
  100% {
    transform: scale(0.9);
    opacity: 0.9;
  }
}
</style>
