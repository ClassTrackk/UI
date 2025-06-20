import { useState, useEffect } from 'react';
import {AttendanceData, frequencesService } from '../services/frequenceService';
export const useFrequence = (studentId: number) => {
  const [Frequence, setFrequence] = useState<AttendanceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGrades = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await frequencesService.getFrequence(studentId);
      console.log(data)
      setFrequence(data);
    } catch (err) {
      setError('Errore nel caricamento dei voti');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, [studentId]);

  return {
    Frequence,
    loading,
    error,
    refetch: fetchGrades
  };
};