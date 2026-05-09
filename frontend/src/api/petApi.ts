import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/pets';

export interface Pet {
  id?: number;
  name: string;
  breed: string;
  category: string;
  price: number;
  description: string;
  imageUrl: string;
}

export const getPets = async (category?: string) => {
  const url = category ? `${API_BASE_URL}?category=${category}` : API_BASE_URL;
  const response = await axios.get<Pet[]>(url);
  return response.data;
};

export const getPetById = async (id: number) => {
  const response = await axios.get<Pet>(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const createPet = async (pet: Pet) => {
  const response = await axios.post<Pet>(API_BASE_URL, pet);
  return response.data;
};

export const updatePet = async (id: number, pet: Pet) => {
  const response = await axios.put<Pet>(`${API_BASE_URL}/${id}`, pet);
  return response.data;
};

export const deletePet = async (id: number) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
