import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface Grade {
  id: number;
  subject: string;
  grade: number;
  date: string;
  weight?: number; // Peso del voto (opzionale)
}

interface GradesChartProps {
  grades?: Grade[];
  chartType?: 'line' | 'bar';
  showAverage?: boolean;
  className?: string;
}

const GradesChart = ({
  grades = [
    { id: 1, subject: 'Matematica', grade: 8.5, date: '2024-01-15', weight: 1 },
    { id: 2, subject: 'Italiano', grade: 7.8, date: '2024-01-16', weight: 1 },
    { id: 3, subject: 'Storia', grade: 9.2, date: '2024-01-17', weight: 1 },
    { id: 4, subject: 'Inglese', grade: 8.0, date: '2024-01-18', weight: 1 },
    { id: 5, subject: 'Scienze', grade: 7.5, date: '2024-01-19', weight: 1 },
    { id: 6, subject: 'Geografia', grade: 8.8, date: '2024-01-20', weight: 1 },
    { id: 7, subject: 'Matematica', grade: 9.0, date: '2024-01-22', weight: 1 },
    { id: 8, subject: 'Italiano', grade: 8.2, date: '2024-01-23', weight: 1 },
  ],
  chartType = 'bar',
  showAverage = true,
  className = ""
}) => {

  // Calcola le medie per materia
  const calculateAverages = () => {
    const subjectGrades: { [key: string]: { grade: number; weight: number; }[] } = {};
    
    grades.forEach(grade => {
      if (!subjectGrades[grade.subject]) {
        subjectGrades[grade.subject] = [];
      }
      subjectGrades[grade.subject].push({
        grade: grade.grade,
        weight: grade.weight || 1
      });
    });

    return Object.entries(subjectGrades).map(([subject, gradesList]) => {
      const totalWeightedGrades = gradesList.reduce((sum, g) => sum + (g.grade * g.weight), 0);
      const totalWeight = gradesList.reduce((sum, g) => sum + g.weight, 0);
      const average = totalWeightedGrades / totalWeight;

      return {
        subject,
        average: parseFloat(average.toFixed(2)),
        totalGrades: gradesList.length,
        color: getSubjectColor(subject)
      };
    });
  };

  // Assegna colori alle materie
  const getSubjectColor = (subject: string): string => {
    const colors: { [key: string]: string } = {
      'Matematica': '#3B82F6',
      'Italiano': '#EF4444',
      'Storia': '#F59E0B',
      'Inglese': '#10B981',
      'Scienze': '#8B5CF6',
      'Geografia': '#F97316',
      'Fisica': '#06B6D4',
      'Chimica': '#84CC16',
      'Arte': '#EC4899',
      'Musica': '#6366F1'
    };
    return colors[subject] || '#6B7280';
  };

  const calculateGeneralAverage = (): number => {
    const totalWeightedGrades = grades.reduce((sum, grade) => sum + (grade.grade * (grade.weight || 1)), 0);
    const totalWeight = grades.reduce((sum, grade) => sum + (grade.weight || 1), 0);
    return parseFloat((totalWeightedGrades / totalWeight).toFixed(2));
  };

  const averagesData = calculateAverages();
  const generalAverage = calculateGeneralAverage();

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

  return (
    <div className={`bg-white h-97 rounded-lg shadow-lg p-6 ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-3 rounded-lg">
            <h3 className="text-blue-800 font-semibold text-sm">Media Generale</h3> 
            <p className="text-xl font-bold text-blue-600">{generalAverage}</p> 
          </div>
          <div className="bg-blue-50 p-3 rounded-lg"> 
            <h3 className="text-blue-800 font-semibold text-sm">Materie</h3>
            <p className="text-xl font-bold text-blue-600">{averagesData.length}</p> 
          </div>
          <div className="bg-green-50 p-3 rounded-lg"> 
            <h3 className="text-green-800 font-semibold text-sm">Voti Totali</h3>
            <p className="text-xl font-bold text-green-600">{grades.length}</p> 
          </div>
          <div className="bg-purple-50 p-3 rounded-lg"> 
            <h3 className="text-purple-800 font-semibold text-sm">Media Più Alta</h3> 
            <p className="text-xl font-bold text-purple-600">
              {averagesData.length > 0 ? Math.max(...averagesData.map(d => d.average)) : 'N/A'}
            </p> 
          </div>
        </div>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="80%">
          {chartType === 'line' ? (
            <LineChart data={averagesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="subject" 
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
              />
              <YAxis 
                domain={[0, 10]}
                tickCount={11}
              />
              <Tooltip content={<CustomTooltip />} />
            </LineChart>
          ) : (
          <BarChart data={averagesData} margin={{ top: 20, right: 30, left: 20, bottom: 5  }}>
              <XAxis 
                dataKey="subject" 
                angle={-45}
                textAnchor="end"
                height={100}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                domain={[0, 10]}
                tickCount={11}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="average" 
                name="Media Voti" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GradesChart;