import api from '../api/axios';

export interface Corso {
  id: number;
  nome: string;
}

export interface Voto {
  id: number;
  nome: string;
  valutazione: number;
  dataVerifica: string;
  descrizione: string;
  corso: Corso;
}

export const gradesService = {
  getStudentGrades: async (studentId: number): Promise<Voto[]> => {
    try {
      const res = await api.get(`/voti/studente/${studentId}`);
      return res.data;
    } catch (error) {
      console.error('Errore nel recupero voti:', error);
      throw error;
    }
  }
};