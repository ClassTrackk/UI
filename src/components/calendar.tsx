import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useStudentGrades } from '../hooks/useGrades';
import { LoadingOverlay } from './ui/loading';
type CalendarProps={
  studentId: number;
}

const CalendarComponent = ({ studentId }: CalendarProps) => {
  //all'inizio ci doveva essere un'altra chiamata, che aggregasse anche le lezioni ma non esiste l'endpoint con le lezioni quindi c'è quella solo con i voti
  const { grades, loading, error } = useStudentGrades(studentId);

  const calendarEvents = grades?.map((grade) => ({
  title: `${grade.valutazione}/30 – ${grade.corso.nome}`,
  start: grade.dataVerifica,
  allDay: true,
  extendedProps: {
    descrizione: grade.descrizione,
    corsoId: grade.corso.id,
    gradeId: grade.id,
    
  },
}));


  if (error) return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4`}>
      <div className="text-red-600 text-center">
        <p className="font-semibold">Errore nel caricamento dei voti</p>
        <p className="text-sm">{error}</p>
      </div>
    </div>
  );
  return (
    <LoadingOverlay isLoading={loading}>
 <div className="p-2 sm:p-4 text-white">
   <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-2 sm:p-4 text-black" 
        style={{ aspectRatio: '16/14', minHeight: '400px'}}>
     <FullCalendar
       plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
       initialView="timeGridWeek"
       events={calendarEvents}
       headerToolbar={{
         left: 'prev,next today',
         center: 'title',
         right: 'dayGridMonth,timeGridWeek,timeGridDay',
       }}
       height="100%"
       slotMinTime="08:00:00"
       slotMaxTime="16:00:00"
       businessHours={{
         daysOfWeek: [1, 2, 3, 4, 5, 6],
         startTime: '08:00',
         endTime: '18:00',
       }}
       
     />
   </div>
 </div>
 </LoadingOverlay>
);
};

export default CalendarComponent;
