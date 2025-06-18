import { Header } from '../components/ui/header';
import { Footer } from '../components/ui/footer';
import CalendarComponent from '../components/calendar';
import AttendanceBar from '../components/attendanceBar';
import GradesChart from '../components/grades';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import ClassesComponent from '../components/classes';
import UserManager from '../components/TutorComponent';
const Dashboard = () => {
  const navigate = useNavigate();
  const handleGradesPage = () => {
    navigate('/Grades');
  };
 const user = useAppSelector((state) => state.auth.user)
//  const storedUserId = Number(localStorage.getItem('userId'));
  if (!user) {
    return <p>Utente non autenticato</p>
  }
  console.log(user)

  if (user.ruolo === 'Tutor') {
    return (
    <div className="flex flex-col">
      <Header />

      <main className="flex-grow flex justify-center items-center p-4 max-h-fit">
        <div className="w-[100%] px-4">
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
      <Header />
      <div className="flex-1 p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
          <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-2">
            {user.ruolo === 'Studente' ? (
              <>
                <div className="w-full">
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

          <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-3">
            <div className="w-full">
              <CalendarComponent />
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
