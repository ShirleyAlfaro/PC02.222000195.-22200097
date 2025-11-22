import axios from 'axios';

const authApi = axios.create({
  baseURL: 'https://storedb-api.onrender.com/node-api'
});

export async function login(email, password) {
  const response = await authApi.post('/users/signin', {
    email,
    password
  });
  return response.data; // token + user
}
