import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  ruolo: string;
  quickLogin?: boolean; // Aggiungi questa proprietà opzionale
};

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    setUser: (state, action: PayloadAction<User>) => { // Aggiungi il tipo PayloadAction
      state.user = action.payload;
      // Opzionalmente puoi anche settare isAuthenticated a true per il quick login
      if (action.payload.quickLogin) {
        state.isAuthenticated = true;
      }
    }
  },
});

export const { login, logout, setUser } = authSlice.actions; // Esporta anche setUser!
export default authSlice.reducer;