import { Header } from '../components/ui/header'
import { Footer } from '../components/ui/footer';
import CalendarComponent from '../components/calendar';
import AttendanceBar from '../components/attendanceBar';
import GradesChart from '../components/grades';
const Dashboard = () => {
    return (
        <div>
            <Header />
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                <div className="flex flex-col gap-6">
                    <AttendanceBar />
                    <div className="flex-1 max-h-[20px]">
                        <GradesChart/>
                    </div>
                </div>
                
                <div className="flex flex-col gap-6">
                    <CalendarComponent />
                    <div className="flex-1 min-h-[300px]">
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <Footer />
            </div>
        </div>
    );
};

export default Dashboard