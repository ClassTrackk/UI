import { Header } from '../components/ui/header';
import { Footer } from '../components/ui/footer';
import CalendarComponent from '../components/calendar';
import AttendanceBar from '../components/attendanceBar';
import GradesChart from '../components/grades';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import ClassesComponent from '../components/classes';
import UserManager from '../components/TutorComponent';
import { useEffect, useState } from 'react';
import api from '../api/axios';
import { setUser } from '../store/authSlice';

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
    nome: 'Prof. Giulia',
    cognome: 'Bianchi',
    email: 'giulia.bianchi@scuola.it',
    ruolo: 'Professore'
  },
  {
    id: 3,
    nome: 'Tutor Marco',
    cognome: 'Verdi',
    email: 'marco.verdi@scuola.it',
    ruolo: 'Tutor'
  },
  {
    id: 4,
    nome: 'Anna',
    cognome: 'Neri',
    email: 'anna.neri@esempio.it',
    ruolo: 'Studente'
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isUsingMockData, setIsUsingMockData] = useState(false);
  
  const handleGradesPage = () => {
    navigate('/Grades');
  };

  const user = useAppSelector((state) => state.auth.user);
  const storedUserId = Number(localStorage.getItem('userId'));

  const getMockUser = () => {
    const randomIndex = Math.floor(Math.random() * mockUsers.length);
    return mockUsers[randomIndex];
  };

  const getMockUserByRole = (role: string) => {
    const usersByRole = mockUsers.filter(u => u.ruolo === role);
    if (usersByRole.length > 0) {
      const randomIndex = Math.floor(Math.random() * usersByRole.length);
      return usersByRole[randomIndex];
    }
    return getMockUser();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (localStorage.getItem('quickLogin')) {
        setIsLoading(true);
        setApiError('');
        console.log('Loading:', isLoading);
        
        try {
          if (storedUserId) {
            const res = await api.get(`/users/${storedUserId}`);
            const updatedUser = {
              id: res.data.id,
              nome: res.data.firstName || res.data.nome,
              cognome: res.data.lastName || res.data.cognome,
              email: res.data.email,
              ruolo: res.data.role || res.data.ruolo || res.data.userType,
            };
            dispatch(setUser(updatedUser));
            setIsUsingMockData(false);
          }
        } catch (err) {
          console.error('Errore nel caricamento dati utente:', err);
          setApiError('Errore nel caricamento dei dati utente - usando dati di esempio');
          
          const mockUser = getMockUser();
          dispatch(setUser(mockUser));
          setIsUsingMockData(true);
          
          console.log('Error:', apiError);
        } finally {
          setIsLoading(false);
        }
      } else {
        if (!user) {
          const mockUser = getMockUser();
          dispatch(setUser(mockUser));
          setIsUsingMockData(true);
        }
      }
    };

    fetchUserData();
  }, [dispatch, storedUserId]);

  const currentUser = user || (() => {
    const mockUser = getMockUser();
    dispatch(setUser(mockUser));
    setIsUsingMockData(true);
    return mockUser;
  })();

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-white">Caricamento dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex justify-center items-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Errore nel caricamento dei dati utente</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  console.log(storedUserId);
  console.log(currentUser);

  const MockDataBanner = () => (
    isUsingMockData && (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 z-20 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="ml-3">
              <p className="text-sm">
                ⚠️ Dashboard in modalità demo - dati di esempio
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                const mockUser = getMockUserByRole('Studente');
                dispatch(setUser(mockUser));
              }}
              className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
            >
              Demo Studente
            </button>
            <button 
              onClick={() => {
                const mockUser = getMockUserByRole('Professore');
                dispatch(setUser(mockUser));
              }}
              className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
            >
              Demo Professore
            </button>
            <button 
              onClick={() => {
                const mockUser = getMockUserByRole('Tutor');
                dispatch(setUser(mockUser));
              }}
              className="px-3 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600"
            >
              Demo Tutor
            </button>
          </div>
        </div>
      </div>
    )
  );

  if (currentUser.ruolo === 'Tutor') {
    return (
      <div className="flex flex-col">
        <img 
          src="/wallpaperDM.png" 
          alt="Wallpaper DM" 
          className="hidden absolute top-0 left-0 object-cover bg-auto bg-center max-h-screen dark:block" 
        />
        <img 
          src="/wallpaperWM.png" 
          alt="Wallpaper WM" 
          className="block absolute top-0 left-0 object-cover bg-auto bg-center max-h-screen dark:hidden" 
        />
        <Header />
        
        <MockDataBanner />

        <main className="flex-grow flex justify-center items-center p-4">
          <div className="min-h-[40%] px-4">
            <UserManager />
          </div>
        </main>

        <div className="flex justify-center items-center p-4">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <img 
        src="/wallpaperDM.png" 
        alt="Wallpaper DM" 
        className="hidden absolute top-0 left-0 object-cover bg-auto bg-center max-h-screen z-0 dark:block" 
      />
      <img 
        src="/wallpaperWM.png" 
        alt="Wallpaper WM" 
        className="block absolute top-0 left-0 object-cover bg-auto bg-center max-h-screen z-0 dark:hidden" 
      />
      <Header />
      
      <MockDataBanner />
      
      <div className="flex-1 p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
          <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-2">
            {currentUser.ruolo === 'Studente' ? (
              <>
                <div className="w-full z-10">
                  <AttendanceBar studentId={currentUser.id} />
                </div>
                <div className="flex-1 cursor-pointer" onClick={handleGradesPage}>
                  <GradesChart studentId={currentUser.id} />
                </div>
              </>
            ) : (
              <>
                <div className="w-full">
                  <ClassesComponent studentId={currentUser.id} />
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col z-10 gap-4 sm:gap-6 lg:col-span-3">
            <div className="w-full">
              <CalendarComponent studentId={currentUser.id} />
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

export default Dashboard;