import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import usersData from '../../data/users.json'; // Import users data

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

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; password: string }>) {
      const { username, password } = action.payload;
    
      console.log("Reducer called with state:", state, "and action:", action);

      // Check if user exists in usersData with provided username and password
      const userExists = usersData.some(user => user.username === username && user.password === password);
      
      if (userExists) {
        state.isAuthenticated = true;
        state.currentUser = username;  // Set the current user
        state.error = null;
      } else {
        state.error = 'Incorrect login details. Try again.';
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.currentUser = null;  // Assuming you have a currentUser in your auth state
      state.error = null;
    },
    
    clearError(state) {
      state.error = null;
    },
  },
});

export const { login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
