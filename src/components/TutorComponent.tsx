import { useState, useEffect, useCallback } from 'react';
import { faMagnifyingGlass, faGraduationCap, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useUsers from '../hooks/useFetchUsers';
import { User } from '../services/usersService';
import { LoadingOverlay } from './ui/loading';

const UserManager = () => {
  const { users, loading, error, deleteUser, updateUser, createUser, refresh } = useUsers();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editUserData, setEditUserData] = useState<Partial<User> | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const emptyUser: Partial<User> = { nome: '', cognome: '', email: '', ruolo: 'Studente' };

  useEffect(() => {
    if (users) {
      const filtered = users.filter(user =>
        user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.cognome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const handleUserSelect = useCallback((user: User) => {
    setSelectedUser(user);
  }, []);

  const handleSave = useCallback(async () => {
    if (!editUserData) return;

    if (isCreating) {
      await createUser(editUserData as User);
    } else if (editUserData.id !== undefined) {
      await updateUser(editUserData.id, editUserData);
    }
    setIsEditing(false);
    setIsCreating(false);
    await refresh();
  }, [editUserData, isCreating, createUser, updateUser, refresh]);

  const handleDelete = useCallback(async () => {
    if (selectedUser) {
      await deleteUser(selectedUser.id);
      setSelectedUser(null);
      await refresh();
    }
  }, [selectedUser, deleteUser, refresh]);

  const handleRefresh = useCallback(async () => {
    setSelectedUser(null);
    await refresh();
  }, [refresh]);

  if (error) {
    return (
      <div>
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto">
          <i className="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Errore nel caricamento</h2>
          <p className="text-red-600 mb-4">{error.message}</p>
          <button
            onClick={handleRefresh}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <i className="fas fa-refresh mr-2"></i>
            Riprova
          </button>
        </div>
      </div>
    );
  }

  return (
    <LoadingOverlay isLoading={loading}>
      <div className="flex overflow-auto border-4 border-green-600 min-h-screen rounded-xl dark:bg-gray-50" style={{ aspectRatio: '16/11' }}>
        {/* Lista utenti */}
        <div className="w-full md:w-1/2 bg-white border-r border-gray-200 flex flex-col rounded-xl">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-center gap-2 mb-4">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-3 rounded-lg transition-colors"
              >
                <i className={`fas fa-refresh ${loading ? 'animate-spin' : ''} mr-1`}></i>
                {loading ? 'Caricamento...' : 'Aggiorna'}
              </button>
              <button
                onClick={() => {
                  setEditUserData(emptyUser);
                  setIsCreating(true);
                  setIsEditing(true);
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-3 rounded-lg transition-colors"
              >
                <i className="fas fa-plus mr-1"></i> Aggiungi
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Cerca utenti..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredUsers.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleUserSelect(user)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedUser?.id === user.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {user.ruolo === 'Studente' ? (
                        <FontAwesomeIcon className="text-violet-300 text-lg mr-2" icon={faGraduationCap} />
                      ) : (
                        <FontAwesomeIcon className="text-violet-300 text-lg mr-2" icon={faChalkboardTeacher} />
                      )}
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.nome}</p>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <i className="fas fa-search text-4xl mb-4 opacity-20"></i>
                <p>{users?.length ? `Nessun utente trovato per "${searchTerm}"` : 'Nessun utente disponibile'}</p>
              </div>
            )}
          </div>
        </div>

        {/* Dettagli utente */}
        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-4">
          {selectedUser ? (
            <div className="w-full mx-4">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8 text-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-blue-500 font-bold text-2xl mx-auto mb-4">
                    {selectedUser.nome.charAt(0)}
                    {selectedUser.cognome.charAt(0)}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedUser.nome} {selectedUser.cognome}
                  </h3>
                  <p className="text-blue-100 text-sm">ID: {selectedUser.id}</p>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-envelope text-gray-400 w-5"></i>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-900">{selectedUser.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <i className="fas fa-user-tag text-gray-400 w-5"></i>
                    <div>
                      <p className="text-sm text-gray-500">Ruolo</p>
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          selectedUser.ruolo === 'Admin'
                            ? 'bg-red-100 text-red-800'
                            : selectedUser.ruolo === 'Docente'
                            ? 'bg-green-100 text-green-800'
                            : selectedUser.ruolo === 'Tutor'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {selectedUser.ruolo}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <i className="fas fa-signature text-gray-400 w-5"></i>
                    <div>
                      <p className="text-sm text-gray-500">Nome completo</p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedUser.nome} {selectedUser.cognome}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 p-4">
                  <button
                    onClick={() => {
                      setEditUserData(selectedUser);
                      setIsEditing(true);
                      setIsCreating(false);
                    }}
                    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg"
                  >
                    Modifica
                  </button>
                  <button onClick={handleDelete} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">
                    Elimina
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 p-4">
              <i className="fas fa-user text-6xl mb-4 opacity-30"></i>
              <h3 className="text-lg font-medium mb-2">Seleziona un utente</h3>
              <p className="text-sm">Clicca su un utente dalla lista per vedere i dettagli</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal per editing/creazione */}
      {isEditing && editUserData && (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {isCreating ? 'Crea nuovo utente' : 'Modifica utente'}
            </h3>
            <input
              type="number"
              placeholder="ID"
              value={editUserData.id ?? ''}
              onChange={(e) => setEditUserData({ ...editUserData, id: Number(e.target.value) })}
              className="w-full border border-gray-300 p-2 rounded"
            />
            <input
              type="text"
              placeholder="Nome"
              value={editUserData.nome ?? ''}
              onChange={(e) => setEditUserData({ ...editUserData, nome: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
            />
            <input
              type="text"
              placeholder="Cognome"
              value={editUserData.cognome ?? ''}
              onChange={(e) => setEditUserData({ ...editUserData, cognome: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={editUserData.email ?? ''}
              onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={editUserData.password ?? ''}
              onChange={(e) => setEditUserData({ ...editUserData, password: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
            />
            <select
              value={editUserData.ruolo ?? 'Studente'}
              onChange={(e) => setEditUserData({ ...editUserData, ruolo: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="Studente">Studente</option>
              <option value="Docente">Docente</option>
              <option value="Tutor">Tutor</option>
            </select>

            <div className="flex justify-end space-x-2">
              <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                Salva
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setIsCreating(false);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      )}
    </LoadingOverlay>
  );
};

export default UserManager;