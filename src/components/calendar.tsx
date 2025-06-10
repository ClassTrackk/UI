import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const CalendarComponent = () => {
  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen ">
      <div className="h-[400px] md:h-[600px] lg:h-[600px] w-200 mx-auto bg-white rounded-xl shadow-lg p-4 text-black">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          // text-green-600
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          height='100%'
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
