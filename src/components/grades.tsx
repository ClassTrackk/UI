import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Grade {
  id: number;
  subject: string;
  grade: number;
  date: string;
  weight?: number;
}

interface GradesChartProps {
  grades?: Grade[];
  chartType?: 'line' | 'bar';
  showAverage?: boolean;
  className?: string;
}

const getColorBasedOnAverage = (average: number): string => {
  if (average < 5) {
    return '#EF4444'; 
  } else if (average >= 5 && average < 6) {
    return '#F59E0B'; 
  } else {
    return '#10B981'; 
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

const GradesChart = ({
  grades = [
    { id: 1, subject: 'Matematica', grade: 2, date: '2024-01-15', weight: 1 },
    { id: 2, subject: 'Italiano', grade: 7.8, date: '2024-01-16', weight: 1 },
    { id: 3, subject: 'Storia', grade: 9.2, date: '2024-01-17', weight: 1 },
    { id: 4, subject: 'Inglese', grade: 8.0, date: '2024-01-18', weight: 1 },
    { id: 5, subject: 'Scienze', grade: 3, date: '2024-01-19', weight: 1 },
    { id: 6, subject: 'Geografia', grade: 8.8, date: '2024-01-20', weight: 1 },
    { id: 7, subject: 'Matematica', grade: 9.0, date: '2024-01-22', weight: 1 },
    { id: 8, subject: 'Italiano', grade: 8.2, date: '2024-01-23', weight: 1 },
  ],
  className = ""
}) => {

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
        fill: getColorBasedOnAverage(average)
      };
    });
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
    <div className={`bg-green-100 w-full max-w-7xl mx-auto rounded-lg shadow-lg p-4 sm:p-6 flex flex-col dark:bg-white   ${className}`} style={{ aspectRatio: '16/10', minHeight: '300px' }}>
      <div className={`grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4 lg:mb-6`}>
        <div className={`p-2 sm:p-3 rounded-lg bg-purple-50 text-${getColorBasedOnAverageText(generalAverage)} bg-${getColorBasedOnAverageText(generalAverage)}`}>
          <h3 className="font-semibold text-xs sm:text-sm">Media Generale</h3>
          <p className="text-lg sm:text-xl font-bold">{generalAverage}</p>
        </div>
        <div className="bg-purple-50 p-2 sm:p-3 rounded-lg text-purple-900">
          <h3 className="font-semibold text-xs sm:text-sm text-purple-600">Materie</h3>
          <p className="text-lg sm:text-xl font-bold ">{averagesData.length}</p>
        </div>
        <div className="bg-purple-50 p-2 sm:p-3 rounded-lg">
          <h3 className=" font-semibold text-xs sm:text-sm">Voti Totali</h3>
          <p className="text-lg sm:text-xl font-bold ">{grades.length}</p>
        </div>
        <div className="bg-purple-50 p-2 sm:p-3 rounded-lg">
          <h3 className=" font-semibold text-xs sm:text-sm">Media Più Alta</h3>
          <p className="text-lg sm:text-xl font-bold text-purple-600">
            {averagesData.length > 0 ? Math.max(...averagesData.map(d => d.average)) : 'N/A'}
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={averagesData} margin={{ top: 20, right: 30, left: 20 }}>
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
    </div>
  );
};

export default GradesChart;
