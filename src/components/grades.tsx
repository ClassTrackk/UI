import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useStudentGrades } from '../hooks/useGrades';

interface GradesSummaryProps {
  studentId: number;
  className?: string;
  showChart?: boolean;
}

const getColorBasedOnAverage = (average: number): string => {
  if (average < 5) {
    return '#EF4444'; // rosso
  } else if (average >= 5 && average < 6) {
    return '#F59E0B'; // arancione
  } else {
    return '#10B981'; // verde
  }
};

const getColorBasedOnAverageText = (average: number): string => {
  if (average < 5) {
    return 'red-600'; 
  } else if (average >= 5 && average < 6) {
    return 'orange-600'; 
  } else {
    return 'green-600'; 
  }
};

const GradesSummary: React.FC<GradesSummaryProps> = ({ 
  studentId, 
  className = '',
  showChart = true 
}) => {
  const { grades, statistics, loading, error } = useStudentGrades(studentId);

  // Trasforma i dati per il grafico
  const transformGradesForChart = () => {
    if (!grades.length) return [];

    // Raggruppa per corso e calcola la media
    const courseGrades: { [key: string]: number[] } = {};
    
    grades.forEach(grade => {
      const courseName = grade.corso.nome;
      if (!courseGrades[courseName]) {
        courseGrades[courseName] = [];
      }
      courseGrades[courseName].push(grade.valutazione);
    });

    return Object.entries(courseGrades).map(([subject, gradesList]) => {
      const average = gradesList.reduce((sum, grade) => sum + grade, 0) / gradesList.length;
      return {
        subject,
        average: parseFloat(average.toFixed(2)),
        totalGrades: gradesList.length,
        fill: getColorBasedOnAverage(average)
      };
    });
  };

  const chartData = transformGradesForChart();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg600"> 
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-blue-600">
            Media: <span className="font-bold">{payload[0].value}</span>
          </p>
          <p className="text-gray-600">
            Voti totali: {data.totalGrades}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) return (
    <div className={`animate-pulse rounded-lg p-6 ${className} rounded-xl border-3 border-green-600 p-6 bg-green-100 dark:bg-white`}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-purple-50 p-3 rounded-lg">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
      <div className="h-64 bg-gray-200 rounded"></div>
    </div>
  );

  if (error) return (
    <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
      <div className="text-red-600 text-center">
        <p className="font-semibold">Errore nel caricamento dei voti</p>
        <p className="text-sm">{error}</p>
      </div>
    </div>
  );

  if (!grades.length) return (
    <div className={`bg-gray-50 rounded-lg p-6 text-center ${className}`}>
      <p className="text-gray-500">Nessun voto disponibile per visualizzare le statistiche</p>
    </div>
  );

  return (
    <div className={` w-full rounded-lg shadow-lg p-4 sm:p-6 ${className} rounded-xl border-3 border-green-600 p-6 bg-green-100 dark:bg-white`}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4 lg:mb-6">
        <div className={`p-2 sm:p-3 rounded-lg bg-purple-50 text-${getColorBasedOnAverageText(statistics.average)} bg-${getColorBasedOnAverageText(statistics.average)}`}>
          <h3 className="font-semibold text-xs sm:text-sm">Media Generale</h3>
          <p className="text-lg sm:text-xl font-bold">{statistics.average.toFixed(2)}</p>
        </div>
        
        <div className="bg-purple-50 p-2 sm:p-3 rounded-lg text-purple-900">
          <h3 className="font-semibold text-xs sm:text-sm text-purple-600">Corsi</h3>
          <p className="text-lg sm:text-xl font-bold">{statistics.courseCount}</p>
        </div>
        
        <div className="bg-purple-50 p-2 sm:p-3 rounded-lg">
          <h3 className="font-semibold text-xs sm:text-sm">Voti Totali</h3>
          <p className="text-lg sm:text-xl font-bold">{statistics.totalGrades}</p>
        </div>
        
        <div className="bg-purple-50 p-2 sm:p-3 rounded-lg">
          <h3 className="font-semibold text-xs sm:text-sm">Voto Più Alto</h3>
          <p className="text-lg sm:text-xl font-bold text-purple-600">
            {statistics.maxGrade > 0 ? statistics.maxGrade : 'N/A'}
          </p>
        </div>
      </div>

      {showChart && chartData.length > 0 && (
        <div className="flex-1" style={{ minHeight: '300px' }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
              <XAxis
                dataKey="subject"
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
                tick={{ fontSize: 11 }}
              />
              <YAxis domain={[0, 10]} tickCount={11} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="average"
                name="Media Voti"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default GradesSummary;