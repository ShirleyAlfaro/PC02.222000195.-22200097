<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-lg" style="width: 350px;">
      <div class="text-h6 q-mb-md">Iniciar Sesión</div>

      <q-input
        filled
        v-model="email"
        label="Correo"
        class="q-mb-md"
      />

      <q-input
        filled
        v-model="password"
        label="Contraseña"
        type="password"
        class="q-mb-md"
      />

      <q-btn
        label="Ingresar"
        color="primary"
        class="full-width"
        @click="handleLogin"
      />

      <q-banner v-if="error" class="q-mt-md bg-red-3 text-red-10">
        {{ error }}
      </q-banner>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { login } from 'src/services/authService';
import { useAuthStore } from 'src/stores/authStore';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();
const authStore = useAuthStore();

async function handleLogin() {
  try {
    error.value = '';

    const data = await login(email.value, password.value);

    authStore.setAuthData(data.user, data.token);

    router.push('/digimons'); // ir directo al módulo de Luis
  } catch (err) {
    console.error(err);
    error.value = 'Correo o contraseña incorrectos';
  }
}
</script>
