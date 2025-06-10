import React from 'react';

interface CardData {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface HorizontalCardBarProps {
  cards?: CardData[];
  className?: string;
  onCardClick?: (card: CardData) => void;
}
const cards = [
    {
      id: 1,
      title: "Dashboard",
      description: "Visualizza statistiche",
      icon: "📊",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Progetti",
      description: "Gestisci i tuoi progetti",
      icon: "🚀",
      color: "bg-purple-500"
    },
    {
      id: 3,
      title: "Team",
      description: "Collabora con il team",
      icon: "👥",
      color: "bg-orange-500"
    },
    {
      id: 4,
      title: "Impostazioni",
      description: "Configura le preferenze",
      icon: "⚙️",
      color: "bg-gray-500"
    },
    {
      id: 5,
      title: "Notifiche",
      description: "Messaggi e avvisi",
      icon: "🔔",
      color: "bg-red-500"
    }
  ]

const AttendanceBar: React.FC<HorizontalCardBarProps> = ({ 
  className = "",
  onCardClick
}) => {
  const handleCardClick = (card: CardData) => {
    if (onCardClick) {
      onCardClick(card);
    }
  };

  return (
    <div className={`w-full max-w-6xl mx-auto ${className}`}>
      {/* Barra orizzontale principale */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-full p-6 shadow-2xl">
        {/* Container interno con forma arrotondata */}
        <div className="bg-gray-100 rounded-full p-4 shadow-inner">
          {/* Container delle card */}
          <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 py-2">
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card)}
                className="flex-shrink-0 bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer min-w-[200px] group"
              >
                {/* Icona centrale */}
                <div className={`w-12 h-12 ${card.color} rounded-full flex items-center justify-center text-white text-xl mb-3 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{card.icon}</span>
                </div>
                
                {/* Contenuto della card */}
                <div className="text-center">
                  <h3 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-green-600 transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
                
                {/* Indicatore di stato */}
                <div className="flex justify-center mt-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Barra di navigazione aggiuntiva
      <div className="flex justify-center mt-6 gap-2">
        {cards.map((_, index) => (
          <div 
            key={index}
            className="w-2 h-2 bg-green-300 rounded-full hover:bg-green-500 transition-colors duration-300 cursor-pointer"
          ></div>
        ))}
      </div> */}
    </div>
  );
};

export default AttendanceBar;