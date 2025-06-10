import { Header } from '../components/ui/header'
import { Footer } from '../components/ui/footer';
import CalendarComponent from '../components/calendar';
import AttendanceBar from '../components/attendanceBar';
const Dashboard  = () => {
    return(
       <div className="mx-auto">
            <Header></Header> 
                <AttendanceBar/>
                <CalendarComponent />      
            <Footer></Footer>
        </div> 
    )
}

export default Dashboard