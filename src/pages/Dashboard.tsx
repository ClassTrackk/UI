import { Header } from '../components/ui/header'
import { Footer } from '../components/ui/footer';
import CalendarComponent from '../components/calendar';
const Dashboard  = () => {
    return(
       <div className="pt-20">
            <Header></Header> 
                <CalendarComponent />      
            <Footer></Footer>
        </div> 
    )
}

export default Dashboard