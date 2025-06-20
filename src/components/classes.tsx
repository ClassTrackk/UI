import { useState } from 'react';
import { useProfGrades } from '../hooks/useProfGrades';

type ClassesProps = {
  studentId: number;
}

type Voto = {
  studenteId: number;
  nomeStudente?: string;
  valore: number;
  materia?: string;
  data?: string;
  descrizione?: string;
}

type Studente = {
  studenteId: number;
  nomeStudente: string;
  voti: Voto[];
}

const ClassesComponent = ({ studentId }: ClassesProps) => {
  const { voti, loading, error } = useProfGrades(studentId);
  const [selectedStudent, setSelectedStudent] = useState<Studente | null>(null);

  const calculateAverage = (studentVoti: Voto[]): string => {
    if (!studentVoti || studentVoti.length === 0) return "0.00";
    const sum = studentVoti.reduce((acc, voto) => acc + voto.valore, 0);
    return (sum / studentVoti.length).toFixed(2);
  };

  const groupedVoti = voti.reduce((acc: Record<number, Studente>, voto: Voto) => {
    const studentId = voto.studenteId;
    if (!acc[studentId]) {
      acc[studentId] = {
        studenteId: studentId,
        nomeStudente: voto.nomeStudente || `Studente ${studentId}`,
        voti: []
      };
    }
    acc[studentId].voti.push(voto);
    return acc;
  }, {});

  const studenti = Object.values(groupedVoti);

  const handleStudentClick = (studente: Studente) => {
    setSelectedStudent(studente);
  };

  const closeModal = () => {
    setSelectedStudent(null);
  };

  if (loading) {
    return (
      <div className="p-2 sm:p-4 text-white">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <span className="ml-2">Caricamento voti...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-2 sm:p-4 text-white">
        <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-4">
          <h3 className="text-red-300 font-semibold">Errore</h3>
          <p className="text-red-200">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 text-white">
      <h2 className="text-2xl font-bold mb-6">Medie Studenti</h2>
      
      {studenti.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-300">Nessun voto trovato</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {studenti.map((studente) => (
            <div
              key={studente.studenteId}
              onClick={() => handleStudentClick(studente)}
              className="bg-gray-800 hover:bg-gray-700 rounded-lg p-4 cursor-pointer transition-colors duration-200 border border-gray-600 hover:border-gray-500"
            >
              <h3 className="font-semibold text-lg mb-2">{studente.nomeStudente}</h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Media:</span>
                <span className="text-xl font-bold text-blue-400">
                  {calculateAverage(studente.voti)}
                </span>
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {studente.voti.length} vot{studente.voti.length === 1 ? 'o' : 'i'}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal per visualizzare tutti i voti */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{selectedStudent.nomeStudente}</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-4 p-3 bg-gray-700 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Media complessiva:</span>
                  <span className="text-2xl font-bold text-blue-400">
                    {calculateAverage(selectedStudent.voti)}
                  </span>
                </div>
              </div>

              <h4 className="font-semibold mb-3">Tutti i voti:</h4>
              <div className="space-y-2">
                {selectedStudent.voti.map((voto, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-700 rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{voto.materia || 'Materia'}</div>
                      {voto.data && (
                        <div className="text-sm text-gray-400">
                          {new Date(voto.data).toLocaleDateString('it-IT')}
                        </div>
                      )}
                      {voto.descrizione && (
                        <div className="text-sm text-gray-300">{voto.descrizione}</div>
                      )}
                    </div>
                    <div className="text-xl font-bold text-blue-400">
                      {voto.valore}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassesComponent;