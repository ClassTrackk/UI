import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useStudentGrades } from '../hooks/useGrades';
import { LoadingOverlay } from './ui/loading';

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

const getColorBasedOnAverageClasses = (average: number) => {
  if (average < 5) {
    return {
      text: 'text-red-600',
      bg: 'bg-red-50'
    };
  } else if (average >= 5 && average < 6) {
    return {
      text: 'text-orange-600',
      bg: 'bg-orange-50'
    };
  } else {
    return {
      text: 'text-green-600',
      bg: 'bg-green-50'
    };
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
  const averageClasses = getColorBasedOnAverageClasses(statistics?.average || 0);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg"> 
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
    <LoadingOverlay isLoading={loading}>
      <div className={`w-full rounded-lg shadow-lg p-4 ${className} rounded-xl border-4 border-green-600 bg-green-100 dark:bg-white`} style={{ aspectRatio: '2/1'}}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4 lg:mb-6">
          <div className={`p-2 sm:p-3 rounded-lg ${averageClasses.bg} ${averageClasses.text}`}>
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
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                <XAxis
                  dataKey="subject"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  interval={0}
                  tick={{ fontSize: 11 }}
                />
                <YAxis domain={[0, 10]} tickCount={11} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="average"
                  name="Media Voti"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </LoadingOverlay>
  );
};

export default GradesSummary;