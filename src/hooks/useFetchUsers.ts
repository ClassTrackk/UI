import { useEffect, useState } from 'react';
import UserService ,{User} from '../services/usersService';

const useUsers = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const service = UserService();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await service.getUsers();
        setUsers(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    refresh: async () => {
      const data = await service.getUsers();
      setUsers(data);
    },
    // createUser: UserService.createUser,
    // updateUser: UserService.updateUser,
    // deleteUser: UserService.deleteUser,
  };
};

export default useUsers;
