import React, { useState, useEffect } from 'react';
import { AttendanceData } from '../services/frequenceService';
import { useFrequence } from '../hooks/useFrequence';

interface AttendanceCarouselProps {
  studentId: number;
  handleAttendanceClick?: (attendance: AttendanceData) => void;
  className?: string;
}

const AttendanceBar: React.FC<AttendanceCarouselProps> = ({ 
  studentId, 
  handleAttendanceClick, 
  className = "" 
}) => {
  const {Frequence, loading, error } = useFrequence(studentId);
  const attendanceData = Frequence
  

  const getAttendanceIcon = (attendance: AttendanceData) => {
    if (attendance.presente) {
      return '✅';
    } else if (attendance.giustificato) {
      return '📋';
    } else {
      return '❌';
    }
  };

  const getAttendanceColor = (attendance: AttendanceData) => {
    if (attendance.presente) {
      return 'bg-green-500';
    } else if (attendance.giustificato) {
      return 'bg-yellow-500';
    } else {
      return 'bg-red-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit'
    });
  };
  if (error) return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
      <div className="text-red-600 text-center">
        <p className="font-semibold">Errore nel caricamento delle presenze</p>
        <p className="text-sm">{error}</p>
      </div>
    </div>
  );
  if (loading) {
    return (
      <div className={`w-full max-w-2xl mx-auto ${className}`}>
        <div className="bg-green-100 rounded-full border-4 border-green-600 p-4 shadow-inner z-20 dark:bg-white">
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <span className="ml-2 text-gray-600">Caricamento frequenza...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full max-w-2xl mx-auto ${className}`}>
        <div className="bg-red-100 rounded-full border-4 border-red-600 p-4 shadow-inner z-20">
          <div className="text-center py-4">
            <span className="text-red-600">Errore: {error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!attendanceData) {
    return (
      <div className={`w-full max-w-2xl mx-auto ${className}`}>
        <div className="bg-gray-100 rounded-full border-4 border-gray-400 p-4 shadow-inner z-20">
          <div className="text-center py-4">
            <span className="text-gray-600">Nessun dato di frequenza disponibile</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <div className="bg-green-100 rounded-full border-4 border-green-600 p-4 shadow-inner z-20 dark:bg-white">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 py-2">
          {attendanceData.map((attendance) => (
            <div
              key={attendance.id}
              onClick={() => handleAttendanceClick?.(attendance)}
              className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col items-center group"
            >
              <div className={`w-12 h-12 ${getAttendanceColor(attendance)} rounded-full flex items-center justify-center text-white text-xl mb-2 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl">{getAttendanceIcon(attendance)}</span>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-800 truncate max-w-full">
                  {attendance.corso.nome}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(attendance.data)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AttendanceBar