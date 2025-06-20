import { useState, useEffect } from 'react';
import { gradesService } from '../services/gradesService';

export const useProfGrades = (studentId: number) => {
  const [voti, setVoti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVoti = async () => {
    if (!studentId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await gradesService.getVotiByProf(studentId);
      setVoti(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVoti();
  }, [studentId]);

  return { voti, loading, error, refetch: fetchVoti };
};
