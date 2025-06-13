import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const CalendarComponent = () => {
  return (
    <div className="p-2 sm:p-4 bg-gray-900 text-white">
      <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full max-w-full mx-auto bg-white rounded-xl shadow-lg p-2 sm:p-4 text-black">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
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
  );
};

export default CalendarComponent;
