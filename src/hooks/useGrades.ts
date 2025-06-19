import { useState, useEffect } from 'react';
import { gradesService, Voto } from '../services/gradesService';

export const useStudentGrades = (studentId: number) => {
  const [grades, setGrades] = useState<Voto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGrades = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await gradesService.getStudentGrades(studentId);
      console.log(data)
      setGrades(data);
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

  const groupedGrades = grades.reduce((acc: Record<string, Voto[]>, voto) => {
    const courseName = voto.corso.nome;
    if (!acc[courseName]) acc[courseName] = [];
    acc[courseName].push(voto);
    return acc;
  }, {});

  const statistics = {
    totalGrades: grades.length,
    average: grades.length > 0 
      ? grades.reduce((sum, grade) => sum + grade.valutazione, 0) / grades.length 
      : 0,
    maxGrade: grades.length > 0 ? Math.max(...grades.map(g => g.valutazione)) : 0,
    minGrade: grades.length > 0 ? Math.min(...grades.map(g => g.valutazione)) : 0,
    courseCount: Object.keys(groupedGrades).length
  };

  return {
    grades,
    groupedGrades,
    statistics,
    loading,
    error,
    refetch: fetchGrades
  };
};