import api from '../api/axios';

export interface User {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  ruolo: string;
  password?: string
}

const UserService = () => {
  const getUsers = async (): Promise<User[]> => {
    const res = await api.get(`/users`);
    if (!res.data) throw new Error(`Errore ${res.status}`);
    return res.data;
  };

  const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const res = await api.post('/users', user);
  if (!res.data) throw new Error(`Errore ${res.status}`);
  return res.data;
};

 const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  const res = await api.put(`/users/${id}`, user);
  if (!res.data) throw new Error(`Errore ${res.status}`);
  return res.data;
};

const deleteUser = async (id: number): Promise<void> => {
  const res = await api.delete(`/users/${id}`);
  if (res.status !== 200 && res.status !== 204) {
    throw new Error(`Errore ${res.status}`);
  }
};


  return {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
  };
};

export default UserService;