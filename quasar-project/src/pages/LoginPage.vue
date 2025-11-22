<template>
  <q-page class="flex flex-center bg-gradient">
    <q-card class="login-card q-pa-md">
      <q-card-section>
        <div class="text-h5 text-center text-weight-bold q-mb-md">
          Iniciar Sesión
        </div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit">
          <q-input
            v-model="email"
            type="email"
            label="Email"
            outlined
            :rules="[val => !!val || 'El email es requerido']"
            class="q-mb-md"
          >
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>

          <q-input
            v-model="password"
            :type="isPwd ? 'password' : 'text'"
            label="Password"
            outlined
            :rules="[val => !!val || 'La contraseña es requerida']"
            class="q-mb-md"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-btn
            type="submit"
            label="Ingresar"
            color="primary"
            class="full-width"
            :loading="loading"
            size="md"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import axios from 'axios';

const $q = useQuasar();

const email = ref('');
const password = ref('');
const isPwd = ref(true);
const loading = ref(false);

const onSubmit = async () => {
  loading.value = true;
  
  try {
    const response = await axios.post(
      'https://storedb-api.onrender.com/node-api/users/signin',
      {
        email: email.value,
        password: password.value
      },
      {
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Respuesta del servidor:', response.data);

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user || {}));
      
      $q.notify({
        type: 'positive',
        message: 'Inicio de sesión exitoso',
        position: 'top'
      });

      console.log('Login exitoso, token guardado');
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    
    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.',
      position: 'top'
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-card {
  width: 100%;
  max-width: 400px;
  border-radius: 16px;
}
</style>
