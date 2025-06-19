import { Header } from '../components/ui/header';
import { Footer } from '../components/ui/footer';
import CalendarComponent from '../components/calendar';
import AttendanceBar from '../components/attendanceBar';
import GradesChart from '../components/grades';
import { useNavigate } from 'react-router-dom';
import { useAppSelector,useAppDispatch  } from '../store/hooks';
import ClassesComponent from '../components/classes';
import UserManager from '../components/TutorComponent';
import { useEffect, useState} from 'react';
import api from '../api/axios';
import { setUser } from '../store/authSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const handleGradesPage = () => {
    navigate('/Grades');
  };
 const user = useAppSelector((state) => state.auth.user)
const storedUserId = Number(localStorage.getItem('userId'));
  useEffect(() => {
    const fetchUserData = async () => {

      if (localStorage.getItem('quickLogin')) {
        setIsLoading(true);
        setApiError('');
        
        try {
          
          if (storedUserId) {
            const res = await api.get(`/users/${storedUserId}`);
            const updatedUser = {
              id: res.data.id,
              nome: res.data.firstName || res.data.nome,
              cognome: res.data.lastName || res.data.cognome, 
              email: res.data.email,
              ruolo: res.data.role  || res.data.ruolo || res.data.userType,
            };
            dispatch(setUser(updatedUser));
          }
        } catch (err) {
          console.error('Errore nel caricamento dati utente:', err);
          setApiError('Errore nel caricamento dei dati utente');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
  }, [dispatch]);

  if (!user) {
    return <p>Utente non autenticato</p>
  }
  console.log(storedUserId)
  console.log(user)

  if (user.ruolo === 'Tutor') {
    return (
    <div className=" flex flex-col">
       <img 
        src="/wallpaperDM.png" 
        alt="Wallpaper DM" 
        className="hidden absolute top-0 left-0 object-cover bg-auto bg-center max-h-screen dark:block" 
      />
      <img 
        src="/wallpaperWM.png" 
        alt="Wallpaper WM" 
        className="block absolute top-0 left-0 object-cover bg-auto bg-center max-h-screen  dark:hidden" 
      />
      <Header />

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
      <div className="flex-1 p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
          <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-2">
            {user.ruolo === 'Studente' ? (
              <>
                <div className="w-full z-10">
                  <AttendanceBar />
                </div>
                <div className="flex-1 cursor-pointer" onClick={handleGradesPage}>
                  <GradesChart studentId={user.id} />
                </div>
              </>
            ) : (
              <>
                <div className="w-full">
                  <ClassesComponent />
                </div>
                <div className="flex-1 cursor-pointer" onClick={handleGradesPage}>
                  <ClassesComponent/>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col z-10 gap-4 sm:gap-6 lg:col-span-3">
            <div className="w-full">
              <CalendarComponent studentId={user.id}/>
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
