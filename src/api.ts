import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/', // Replace with your backend URL
});

export const signUp = (userData: any) => {
  return api.post('signup', userData);
};

export const login = (userData: any) => {
  return api.post('login', userData);
};

export const createGame = (gameData: any) => {
  return api.post('game/create', gameData);
};

export const updateGame = (gameId: string, gameData: any) => {
  return api.put(`game/update/${gameId}`, gameData);
};

