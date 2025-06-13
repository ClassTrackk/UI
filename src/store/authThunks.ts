import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';
import { login, logout } from './authSlice';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const loginRes  = await api.post('/auth/login', { email, password });
      const userId = loginRes.data.id
      const res = await api.get(`/users/${userId}`);
      localStorage.setItem('userId', userId);
      console.log(res)
      thunkAPI.dispatch(login(res.data.email));
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue('Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, thunkAPI) => {
  try {
    await api.post('/auth/logout');
    thunkAPI.dispatch(logout());
  } catch (err) {
    return thunkAPI.rejectWithValue('Logout failed' + {err} );
  }
});

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async (_, thunkAPI) => {
  try {
    const res = await api.get('/auth/profile');
    thunkAPI.dispatch(login(res.data.email));
  } catch {
    thunkAPI.dispatch(logout());
  }
});
