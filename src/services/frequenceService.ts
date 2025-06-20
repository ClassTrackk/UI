
export interface AttendanceData {
  id: number;
  corso: {
    id: number;
    nome: string;
  };
  data: string;
  presente: boolean;
  giustificato?: boolean;
  note?: string;
}

export const frequencesService = {
  getFrequence: async (studentId: number): Promise<AttendanceData> => {
    try {
      const res = await fetch(`/api/studenti/${studentId}/frequenza`);
      return res.json();
    } catch (error) {
      console.error('Errore nel recupero presenze:', error);
      throw error;
    }
  }
};