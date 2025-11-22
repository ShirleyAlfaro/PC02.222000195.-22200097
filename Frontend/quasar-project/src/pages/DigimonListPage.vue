<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Lista de Digimon</div>

    <div v-if="loading">Cargando Digimon...</div>
    <div v-else-if="error">Error: {{ error }}</div>

    <div v-else class="row">
      <div
        v-for="d in digimons"
        :key="d.name"
        class="col-xs-12 col-sm-6 col-md-3"
      >
        <DigimonCard :name="d.name" :img="d.img" :level="d.level" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllDigimons } from 'src/services/digimonService';
import DigimonCard from 'src/components/DigimonCard.vue';

const digimons = ref([]);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    const data = await getAllDigimons();
    digimons.value = data;
  } catch (err) {
    console.error(err);
    error.value = 'No se pudieron cargar los Digimon';
  } finally {
    loading.value = false;
  }
});
</script>
