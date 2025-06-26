import { useState } from 'react';
import { Header } from '../components/ui/header';
import { Footer } from '../components/ui/footer';
import { faGraduationCap, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../store/hooks';

// Dati mockati per fallback
const mockUsers = [
  {
    id: 1,
    nome: 'Mario',
    cognome: 'Rossi',
    email: 'mario.rossi@esempio.it',
    ruolo: 'Studente'
  },
  {
    id: 2,
    nome: 'Giulia',
    cognome: 'Bianchi',
    email: 'giulia.bianchi@esempio.it',
    ruolo: 'Professore'
  },
  {
    id: 3,
    nome: 'Luca',
    cognome: 'Verdi',
    email: 'luca.verdi@esempio.it',
    ruolo: 'Studente'
  }
];

const Account = () => {
  const [showRole, setShowRole] = useState(false);
  const [isUsingMockData, setIsUsingMockData] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  const getMockUser = () => {
    const randomIndex = Math.floor(Math.random() * mockUsers.length);
    return mockUsers[randomIndex];
  };

  const currentUser = user || (() => {
    if (!isUsingMockData) {
      setIsUsingMockData(true);
    }
    return getMockUser();
  })();

  if (!currentUser) {
    return (
      <div>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Errore nel caricamento dei dati utente</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      
      {isUsingMockData && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <div className="flex items-center justify-center">
            <div className="ml-3">
              <p className="text-sm">
                ⚠️ Stai visualizzando dati di esempio (utente non autenticato)
              </p>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-3xl text-center font-bold text-gray-600 dark:text-white">Account</h1>
      
      <div className="flex justify-center items-center rounded-xl">
        <div className="max-w-sm mx-auto bg-green-100 border-4 border-green-600 rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 dark:bg-white">
          <div className="p-6">
            <div className="flex flex-col items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-full p-3 mb-4">
                <div 
                  className="flex-shrink-0 h-8 w-8 bg rounded-full relative" 
                  onMouseEnter={() => setShowRole(true)} 
                  onMouseLeave={() => setShowRole(false)}
                >
                  {currentUser.ruolo === 'Studente' ? (
                    <FontAwesomeIcon className='text-white text-2xl' icon={faGraduationCap} />
                  ) : (
                    <FontAwesomeIcon className='text-white text-2xl' icon={faChalkboardTeacher} />
                  )}
                  
                  {showRole && currentUser && (
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-200 text-gray-800 px-3 py-1 rounded-xl text-xs whitespace-nowrap">
                      {currentUser.ruolo}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="">
                <h1 className='text-xl text-center font-bold text-gray-900'>
                  {currentUser.nome} {currentUser.cognome}
                </h1>
                <br /><br />
                <p className="text-gray-700">
                  <strong>Email:</strong> {currentUser.email}
                </p>
                <br /><br />
                
                {isUsingMockData && (
                  <div className="text-center">
                    <p className="text-sm text-gray-500 italic">
                      ID Utente: {currentUser.id}
                    </p>
                    <button 
                      onClick={() => window.location.reload()}
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      Cambia Utente Demo
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center items-center p-4">
        <Footer />
      </div>
    </div>
  );
};

export default Account;