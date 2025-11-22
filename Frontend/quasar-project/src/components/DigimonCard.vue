<template>
  <q-card class="q-ma-sm" bordered>
    <q-img :src="img" :alt="name" style="height: 200px;" />

    <q-card-section>
      <div class="text-h6">{{ name }}</div>
      <div class="text-subtitle2">Nivel: {{ level }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  name: String,
  img: String,
  level: String
});
</script>
