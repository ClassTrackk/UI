import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useStudentGrades } from '../hooks/useGrades';
import { LoadingOverlay } from './ui/loading';


type CalendarProps = {
  studentId: number;
};

const CalendarComponent = ({ studentId }: CalendarProps) => {
  const { grades, loading, error } = useStudentGrades(studentId);

  const mockGrades = [
    {
      id: 1,
      valutazione: 26,
      dataVerifica: new Date().toISOString(),
      descrizione: 'Verifica matematica',
      corso: { id: 101, nome: 'Matematica' },
    },
    {
      id: 2,
      valutazione: 30,
      dataVerifica: new Date(Date.now() + 86400000).toISOString(), // domani
      descrizione: 'Verifica fisica',
      corso: { id: 102, nome: 'Fisica' },
    },
  ];

  const displayedGrades = error ? mockGrades : grades;

  const calendarEvents = displayedGrades?.map((grade) => ({
    title: `${grade.valutazione}/30 – ${grade.corso.nome}`,
    start: grade.dataVerifica,
    allDay: true,
    extendedProps: {
      descrizione: grade.descrizione,
      corsoId: grade.corso.id,
      gradeId: grade.id,
    },
  }));

  return (
    <LoadingOverlay isLoading={loading}>
      <div className="p-2 sm:p-4 text-white">
        <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-2 sm:p-4 text-black" style={{ aspectRatio: '16/14', minHeight: '400px' }}>
          {error && (
            <div className="text-center text-red-600 mb-2 font-semibold">
              Errore nel caricamento dei voti – Mostrati eventi simulati
            </div>
          )}
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
