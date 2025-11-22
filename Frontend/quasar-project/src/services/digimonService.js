import axios from 'axios';

const digimonApi = axios.create({
  baseURL: 'https://digimon-api.vercel.app'
});

export async function getAllDigimons() {
  const response = await digimonApi.get('/api/digimon');
  return response.data;
}
