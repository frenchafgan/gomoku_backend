import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../../src/api'; 

interface AuthState {
  isAuthenticated: boolean;
  currentUser: string | null; 
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  currentUser: null,
  error: null
};

export const signUp = createAsyncThunk('auth/signUp', async (userData: any) => {
  const response = await api.signUp(userData);
  return response.data;
});

export const login = createAsyncThunk('auth/login', async (userData: any) => {
  const response = await api.login(userData);
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state: AuthState, action: PayloadAction<{ username: string; password: string }>) {
      // Your login logic here
    },
    logout(state: AuthState) {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.error = null;
    },
    clearError(state: AuthState) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state: AuthState, action: PayloadAction<any>) => {
        state.isAuthenticated = true;
        state.currentUser = action.payload.username;
        state.error = null;
      })
      .addCase(login.fulfilled, (state: AuthState, action: PayloadAction<any>) => {
        state.isAuthenticated = true;
        state.currentUser = action.payload.username;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
