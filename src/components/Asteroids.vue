<template>
  <div class="container">
    <n-card v-if="image" title="Изображение дня" class="image-card">
      <n-image :src="image.url" :alt="image.title" width="100%" />
      <p class="image-description">{{ image.title }}</p>
    </n-card>

    <n-card title="Выберите дату" class="date-card">
      <n-input type="date" v-model:value="selectedDate" @update:value="fetchAsteroids" />
    </n-card>

    <n-card v-if="asteroids.length" title="Фильтры" class="filters-card">
      <n-select
        v-model:value="hazardFilter"
        :options="hazardOptions"
        label-field="label"
        value-field="value"
        placeholder="Опасные объекты"
      />
      <n-slider v-model:value="sizeFilter" :min="0.01" :max="1" step="0.01" />
      <n-select
        v-model:value="selectedDates"
        multiple
        :options="availableDates"
        label-field="label"
        value-field="value"
        placeholder="Дата сближения"
      />
    </n-card>

    <n-card v-if="filteredAsteroids.length" title="Ближайшие астероиды" class="asteroid-card">
      <n-table :bordered="true">
        <thead>
          <tr>
            <th>Название</th>
            <th>Дата сближения</th>
            <th>Размер (км)</th>
            <th>Опасен?</th>
            <th>Ссылка NASA</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="asteroid in filteredAsteroids" :key="asteroid.id">
            <td>{{ asteroid.name }}</td>
            <td>{{ asteroid.close_approach_date }}</td>
            <td>{{ asteroid.size }} км</td>
            <td :class="{ danger: asteroid.hazardous }">
              {{ asteroid.hazardous ? "Да" : "Нет" }}
            </td>
            <td>
              <a :href="asteroid.nasa_jpl_url" target="_blank">Подробнее</a>
            </td>
          </tr>
        </tbody>
      </n-table>
    </n-card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { NCard, NTable, NImage, NInput, NSelect, NSlider } from "naive-ui";

const image = ref(null);
const asteroids = ref([]);
const apiKey = "qgBvqrtZkceHildbaJAessN3vUs2lqHOsXu67hlr";
const selectedDate = ref(new Date().toISOString().split("T")[0]);

const hazardFilter = ref("all");
const sizeFilter = ref(1);
const selectedDates = ref([]);

const hazardOptions = [
  { label: "Все", value: "all" },
  { label: "Опасные", value: "dangerous" },
  { label: "Безопасные", value: "safe" },
];

const availableDates = computed(() => {
  const uniqueDates = [...new Set(asteroids.value.map((a) => a.close_approach_date))];
  return uniqueDates.map((date) => ({ label: date, value: date }));
});

const filteredAsteroids = computed(() => {
  return asteroids.value.filter((asteroid) => {
    const matchesHazard =
      hazardFilter.value === "all" ||
      (hazardFilter.value === "dangerous" && asteroid.hazardous) ||
      (hazardFilter.value === "safe" && !asteroid.hazardous);

    const matchesSize = asteroid.size <= sizeFilter.value || sizeFilter.value == 1;
    const matchesDate =
      selectedDates.value.length === 0 ||
      selectedDates.value.includes(asteroid.close_approach_date);

    return matchesHazard && matchesSize && matchesDate;
  });
});

onMounted(async () => {
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);

    if (!response.ok) {
      throw new Error(`Ошибка APOD: ${response.status}`);
    }
    image.value = await response.json();
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
});

const fetchAsteroids = async () => {
  try {
    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${selectedDate.value}&api_key=${apiKey}`
    );
    if (!response.ok) throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    const data = await response.json();

    asteroids.value = Object.values(data.near_earth_objects)
      .flat()
      .map((asteroid) => ({
        id: asteroid.id,
        name: asteroid.name,
        close_approach_date: asteroid.close_approach_data[0]?.close_approach_date || "Неизвестно",
        size: asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2),
        hazardous: asteroid.is_potentially_hazardous_asteroid,
        nasa_jpl_url: asteroid.nasa_jpl_url,
      }));
  } catch (error) {
    console.error("Ошибка загрузки астероидов:", error);
  }
};

onMounted(fetchAsteroids);
</script>

<style></style>
