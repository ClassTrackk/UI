import { useState, useEffect } from 'react';
import { gradesService, Voto } from '../services/gradesService';

export const useStudentGrades = (studentId: number) => {
  const [grades, setGrades] = useState<Voto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await gradesService.getStudentGrades(studentId);
        setGrades(data);
      } catch (err) {
        setError('Errore nel caricamento dei voti');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [studentId]);

  // Funzione di utilità per raggruppare i voti
  const groupedGrades = grades.reduce((acc: Record<string, Voto[]>, voto) => {
    const courseName = voto.corso.nome;
    if (!acc[courseName]) acc[courseName] = [];
    acc[courseName].push(voto);
    return acc;
  }, {});

  return {
    grades,
    groupedGrades,
    loading,
    error,
    refetch: () => {
      const fetchGrades = async () => {
        try {
          const data = await gradesService.getStudentGrades(studentId);
          setGrades(data);
        } catch (err) {
          setError('Errore nel caricamento dei voti');
        }
      };
      fetchGrades();
    }
  };
};