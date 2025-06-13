import { Header } from '../components/ui/header';
import { Footer } from '../components/ui/footer';
import CalendarComponent from '../components/calendar';
import AttendanceBar from '../components/attendanceBar';
import GradesChart from '../components/grades';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleGradesPage = () => {
    navigate('/Grades');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="w-full">
              <AttendanceBar />
            </div>
            <div
              className="flex-1 cursor-pointer"
              onClick={handleGradesPage}
            >
              <GradesChart />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="w-full">
              <CalendarComponent />
            </div>
            <div className="flex-1 min-h-[150px] sm:min-h-[300px]"></div>
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
