<template>
  <div class="container">
    <n-card v-if="image" title="Изображение дня" class="image-card">
      <n-image :src="image.url" :alt="image.title" width="100%" />
      <p class="image-description">{{ image.title }}</p>
    </n-card>

    <n-card v-if="asteroids.length" title="Ближайшие астероиды" class="asteroid-card">
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
          <tr v-for="asteroid in asteroids" :key="asteroid.id">
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
import { ref, onMounted } from "vue";
import { NCard, NTable, NImage } from "naive-ui";

const image = ref(null);
const asteroids = ref([]);
const apiKey = "qgBvqrtZkceHildbaJAessN3vUs2lqHOsXu67hlr";

onMounted(async () => {
  const today = new Date().toISOString().split("T")[0];
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);

    if (!response.ok) {
      throw new Error(`Ошибка APOD: ${response.status}`);
    }
    image.value = await response.json();
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }

  try {
    const response = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&api_key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    asteroids.value = Object.keys(data.near_earth_objects)
      .flatMap((date) => data.near_earth_objects[date])
      .map((asteroid) => ({
        id: asteroid.id,
        name: asteroid.name,
        close_approach_date: asteroid.close_approach_data[0]?.close_approach_date || "Неизвестно",
        size: asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2),
        hazardous: asteroid.is_potentially_hazardous_asteroid,
        nasa_jpl_url: asteroid.nasa_jpl_url,
      }));
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.image-card,
.asteroid-card {
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.image-description {
  text-align: center;
  font-size: 1.1em;
  margin-top: 10px;
}

th,
td {
  padding: 10px;
  text-align: left;
}

.danger {
  color: red;
  font-weight: bold;
}
</style>
