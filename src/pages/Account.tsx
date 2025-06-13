import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Header } from '../components/ui/header';
import { Footer } from '../components/ui/footer';
import { faGraduationCap, faChalkboardTeacher} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface User {
  id: string;
  nome: string;
  cognome: string;
  email: string;
  ruolo: string;
}

const Account = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showRole, setShowRole] = useState(false);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        const res = await api.get(`/users/${userId}`);
        console.log(res.data)
        
        setUser(res.data);
      } catch (error) {
        console.error('Errore nel recupero dati utente:', error);
      }
    };

    fetchUser();
  }, []);

  if (!user) return <p>Caricamento dati utente...</p>;

  return (
    <div>
        <Header/>
        <h1 className="text-3xl text-center font-bold text-white">Account</h1>
 <div className="flex justify-center items-center rounded-xl">
      <div className="max-w-sm mx-auto bg-white border border-green-600 rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
        <div className="p-6">
          <div className="flex flex-col items-center">
            <div className="flex-shrink-0 bg-indigo-500 rounded-full p-3 mb-4">
              <div className="flex-shrink-0 h-8 w-8 bg rounded-full"  onMouseEnter={() => setShowRole(true)} onMouseLeave={() => setShowRole(false)}>
                     {user.ruolo === 'Studente' ? (<FontAwesomeIcon className='text-white text-2xl' icon={faGraduationCap} />):
                                   (<FontAwesomeIcon className='text-white text-2xl' icon={faChalkboardTeacher} />)}
                     {showRole && user && (
                        <div className="inline-flex bg-gray-200 text-gray-800 px-3 py-1 rounded-xl text-xs items-center justify-center">
                            {user.ruolo}
                        </div>
                        )}
                </div>
            </div>

            <div className="">
                <h1 className='text-xl text-center font-bold text-gray-900'>{user.nome} {user.cognome}</h1>
                <br /><br />
              <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
                <br /><br />
            </div>
          </div>
        </div>
      </div>
    </div>
        <Footer/>    
    </div>
  );
};

export default Account;
