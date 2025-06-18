import api from '../api/axios';

export interface User {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  ruolo: string;
}

const UserService = () => {
  const getUsers = async (): Promise<User[]> => {
    const res = await api.get(`/users`);
    if (!res.data) throw new Error(`Errore ${res.status}`);
    return res.data;
  };

//   const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
//     const res = await fetch(`${baseUrl}/users`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(user),
//     });
//     if (!res.ok) throw new Error(`Errore ${res.status}`);
//     return res.json();
//   };

//   const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
//     const res = await fetch(`${baseUrl}/users/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(user),
//     });
//     if (!res.ok) throw new Error(`Errore ${res.status}`);
//     return res.json();
//   };

//   const deleteUser = async (id: number): Promise<void> => {
//     const res = await fetch(`${baseUrl}/users/${id}`, {
//       method: 'DELETE',
//     });
//     if (!res.ok) throw new Error(`Errore ${res.status}`);
//   };

  return {
    getUsers,
    // getUserById,
    // createUser,
    // updateUser,
    // deleteUser,
  };
};

export default UserService;