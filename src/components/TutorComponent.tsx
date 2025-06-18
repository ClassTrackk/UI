import React, { useState, useEffect } from 'react';
import { faMagnifyingGlass, faUser, faEnvelope, faGraduationCap, faChalkboardTeacher} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useUsers from '../hooks/useFetchUsers';
import {User} from '../services/usersService';
const UserManager = () => {
  const { users, loading, error, refresh } = useUsers();
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handleRefresh = async () => {
    setSelectedUser(null);
    await refresh();
  };
if (error) {
    return (
      <div>
        <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
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
    <div className="flex bg-gray-50 h-130 border-4 border-green-600 rounded-xl" style={{ aspectRatio: '16/11'}}>
      {/* Pannello sinistro - Lista utenti */}
      <div className="w-1/2 bg-white border-r border-gray-200 flex flex-col  rounded-xl">
        {/* Header con searchbar */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-center mb-4">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-medium py-2 px-3 rounded-lg transition-colors"
            >
              <i className={`fas fa-refresh ${loading ? 'animate-spin' : ''} mr-1`}></i>
              {loading ? 'Caricamento...' : 'Aggiorna'}
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

        {/* Lista utenti */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-500">Caricamento utenti...</p>
            </div>
          ) : users && users.length > 0 ? (
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
                   <div className="flex-1 min-w-0">
                        <div className="flex items-center">
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
                  </div>
                </div>
              ))}
              {filteredUsers.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <i className="fas fa-search text-4xl mb-4 opacity-50"></i>
                  <p>Nessun utente trovato per "{searchTerm}"</p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <i className="fas fa-user-slash text-4xl mb-4 opacity-50"></i>
              <p>Nessun utente disponibile</p>
            </div>
          )}
        </div>
      </div>
            {/*card*/}
        <div className="w-1/2 bg-gray-50 flex items-center justify-center">
            {selectedUser ? (
            <div className="max-w-md w-full mx-6">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header card */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-8 text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-blue-500 font-bold text-2xl mx-auto mb-4">
                    {selectedUser.nome.charAt(0)}{selectedUser.cognome.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold text-white">{selectedUser.nome} {selectedUser.cognome}</h3>
                    <p className="text-blue-100 text-sm">ID: {selectedUser.id}</p>
                </div>

                {/* Dettagli */}
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
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        selectedUser.ruolo === 'Admin' ? 'bg-red-100 text-red-800' :
                        selectedUser.ruolo === 'Docente' ? 'bg-green-100 text-green-800' :
                        selectedUser.ruolo === 'Tutor' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                        }`}>
                        {selectedUser.ruolo}
                        </span>
                    </div>
                    </div>

                    <div className="flex items-center space-x-3">
                    <i className="fas fa-signature text-gray-400 w-5"></i>
                    <div>
                        <p className="text-sm text-gray-500">Nome completo</p>
                        <p className="text-sm font-medium text-gray-900">{selectedUser.nome} {selectedUser.cognome}</p>
                    </div>
                    </div>
                </div>

                {/* Footer */}
               
                </div>
            </div>
            ) : (
            <div className="text-center text-gray-500">
                <i className="fas fa-user text-6xl mb-4 opacity-30"></i>
                <h3 className="text-lg font-medium mb-2">Seleziona un utente</h3>
                <p className="text-sm">Clicca su un utente dalla lista per vedere i dettagli</p>
            </div>
            )}
        </div>
    </div>
  );
};

export default UserManager;