import { useEffect, useState } from 'react';
import { Header } from '../components/ui/header';
import { Footer } from '../components/ui/footer';
import api from '../api/axios';

interface Corso {
  id: number;
  nome: string;
}

interface Voto {
  id: number;
  nome: string;
  valutazione: number;
  dataVerifica: string;
  descrizione: string;
  corso: Corso;
}

const GradesPage = () => {
  const [grades, setGrades] = useState<Voto[]>([]);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await api.get('/voti/studente/1');
        setGrades(res.data);
      } catch (err) {
        console.error('Errore nel recupero voti:', err);
      }
    };

    fetchGrades();
  }, []);

  const grouped = grades.reduce((acc: Record<string, Voto[]>, voto) => {
    const courseName = voto.corso.nome;
    if (!acc[courseName]) acc[courseName] = [];
    acc[courseName].push(voto);
    return acc;
  }, {});

  return (
    <div>
      <Header/>
      <main className="rounded-xl border-3 border-green-600 p-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(grouped).map(([corso, voti]) => (
            <div key={corso} className="bg-green-700 text-white rounded-2xl p-4 shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">{corso}</h2>
              <div className="flex flex-col gap-3">
                {voti.map((voto) => (
                  <div
                    key={voto.id}
                    className="bg-green-900 rounded-xl p-3 flex flex-col justify-center items-start"
                  >
                    <p className="text-lg font-semibold">Voto: {voto.valutazione}</p>
                    <p className="text-sm">{new Date(voto.dataVerifica).toLocaleDateString()}</p>
                    <p className="text-xs italic">{voto.descrizione}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GradesPage;
