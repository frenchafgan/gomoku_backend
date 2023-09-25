import axios from 'axios';
import {store} from './redux/store';



axios.defaults.withCredentials = true;


const api = axios.create({
  baseURL: 'http://localhost:3001/', // Replace with your backend URL
});

// Function to get token from reduxstore
const getToken = () => {
  const state = store.getState();
  return state.auth.token;
};

// Add a request interceptor to include the token in every request
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
});


export const signUp = (userData: any) => {
  return api.post('auth/signup', userData);
};

export const login = (userData: any) => {
  return api.post('auth/login', userData);
};

export const logout = () => {
  return api.post('logout', {
    headers : { Authorization: ` ${getToken()}` } 
  });
};


export const createGame = (gameData: any) => {
  const { token } = gameData;  // Extract the token from gameData
  const headers = token ? { 'Authorization': `${token}` } : undefined;

  return api.post('game/create', gameData, {
    headers: headers
  });
};

export const restartGame = (gameId: string, gameData: any, token: string | null) => {
  const headers = token ? { 'Authorization': `${token}` } : undefined;
  return api.post(`game/restart/${gameId}`, gameData, {
    headers: headers
  });
};




export const updateGame = (gameId: string, gameData: any) => {
  return api.put(`/game/update/${gameId}`, gameData, {
    headers: { Authorization: ` ${getToken()}` }
  });
};

export const getGamesList = (token: string) => {
  return api.get('games', {
    headers: {
      'Authorization': `${token}`
    }
  });
};

export const getSingleGame = (gameId: string) => {
  return api.get(`game/${gameId}`, {
    headers: { Authorization: ` ${getToken()}` }
  });
};

export const getGameByIdAndUserApi = async (id: string, username: string, token: string) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  const response = await axios.get(`/api/game/${id}/${username}`, config);
  return response;
};
