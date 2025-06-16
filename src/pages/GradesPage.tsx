import { useStudentGrades } from '../hooks/useGrades';
import { Header } from '../components/ui/header';
import { Footer } from '../components/ui/footer';
import { useAppSelector } from '../store/hooks';
const GradesPage = () => {
  const user = useAppSelector((state) => state.auth.user)
  if (!user) {
    return <p>Utente non autenticato</p>
  }
  const { grades, groupedGrades, statistics, loading, error, refetch } = useStudentGrades(user.id);
  console.log(grades, groupedGrades, statistics, loading, error, refetch)
  if (loading) return (
    <div>
      <Header/>
      <main className="rounded-xl border-3 border-green-600 p-6 bg-green-200 dark:bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Caricamento voti...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
  
  if (error) return (
    <div>
      <Header/>
      <main className="rounded-xl border-3 border-green-600 p-6 bg-green-200 dark:bg-white">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-semibold">Errore nel caricamento</p>
            <p className="text-sm">{error}</p>
          </div>
          <button 
            onClick={refetch}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Riprova
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );

  return (
    <div>
      <Header/>
      <main className="rounded-xl border-3 border-green-600 p-6 bg-green-200 dark:bg-white">

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(groupedGrades).map(([corso, voti]) => (
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

        {grades.length === 0 && (
          <div className="text-center py-12 bg-green-200 dark:bg-white">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-xl font-semibold text-gray-600">Nessun voto disponibile</p>
              <p className="text-sm text-gray-500">I tuoi voti appariranno qui quando saranno inseriti</p>
            </div>
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-100 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-green-800">{statistics.totalGrades}</p>
            <p className="text-sm text-green-600">Totale voti</p>
          </div>
          <div className="bg-green-100 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-green-800">{statistics.average.toFixed(2)}</p>
            <p className="text-sm text-green-600">Media</p>
          </div>
          <div className="bg-green-100 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-green-800">{statistics.maxGrade}</p>
            <p className="text-sm text-green-600">Voto max</p>
          </div>
          <div className="bg-green-100 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-green-800">{statistics.courseCount}</p>
            <p className="text-sm text-green-600">Corsi</p>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default GradesPage