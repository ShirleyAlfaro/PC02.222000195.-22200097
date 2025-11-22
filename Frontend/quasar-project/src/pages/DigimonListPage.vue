<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Lista de Digimon</div>

    <DigimonFilter @filter-change="applyFilters" />

    <div v-if="loading">
      Cargando Digimon...
    </div>

    <div v-else-if="error">
      Ocurrió un error: {{ error }}
    </div>

    <div v-else class="row">
      <div
        v-for="d in digimons"
        :key="d.name"
        class="col-xs-12 col-sm-6 col-md-3"
      >
        <DigimonCard
          :name="d.name"
          :img="d.img"
          :level="d.level"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllDigimons } from 'src/services/digimonService';
import DigimonCard from 'src/components/DigimonCard.vue';
import DigimonFilter from 'src/components/DigimonFilter.vue';

const digimons = ref([]);
const loading = ref(true);
const error = ref('');
const allDigimons = ref([]);

onMounted(async () => {
  try {
    const data = await getAllDigimons();
    allDigimons.value = data;
    digimons.value = data;
  } catch (err) {
    console.error(err);
    error.value = 'No se pudieron cargar los Digimon';
  } finally {
    loading.value = false;
  }
});

function applyFilters(filters) {
  const name = (filters.name || '').toLowerCase();
  const level = filters.level || null;

  digimons.value = allDigimons.value.filter(d => {
    const matchName = d.name.toLowerCase().includes(name);
    const matchLevel = !level || d.level === level;
    return matchName && matchLevel;
  });
}
</script>
