<template>
  <div class="row q-col-gutter-md q-mb-md">
    <!-- Buscar por nombre -->
    <div class="col-12 col-sm-6">
      <q-input
        v-model="localName"
        label="Buscar por nombre"
        clearable
        dense
        @input="emitFilter"
      />
    </div>

    <!-- Filtrar por nivel -->
    <div class="col-12 col-sm-6">
      <q-select
        v-model="localLevel"
        :options="levelOptions"
        label="Filtrar por nivel"
        clearable
        dense
        @update:model-value="emitFilter"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['filter-change']);

const localName = ref('');
const localLevel = ref(null);

const levelOptions = [
  'Fresh',
  'In Training',
  'Rookie',
  'Champion',
  'Ultimate',
  'Mega'
];

function emitFilter () {
  emit('filter-change', {
    name: localName.value,
    level: localLevel.value
  });
}
</script>
