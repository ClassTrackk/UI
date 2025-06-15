import React from 'react';

// Definisci un'interfaccia per la struttura della card
interface Card {
  id: number;
  icon: string;
  color: string;
}

// Definisci le props del componente
interface CardCarouselProps {
  cards: Card[];
  handleCardClick: (card: Card) => void;
  className?: string;
}

const CardCarousel: React.FC<CardCarouselProps> = ({ cards, handleCardClick, className = "" }) => {
  return (
    <div className={`w-full max-w-2xl mx-auto${className}`}>
        <div className="bg-green-100 rounded-full border-3 border-green-600  p-4 shadow-inner z-20 dark:bg-white">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 py-2">
            {cards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card)}
                className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col items-center"
              >
                <div className={`w-12 h-12 ${card.color} rounded-full flex items-center justify-center text-white text-xl mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{card.icon}</span>
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

// Esempio di utilizzo del componente
const App: React.FC = () => {
  const cards: Card[] = [
    { id: 1, icon: '🍎', color: 'bg-red-500' },
    { id: 2, icon: '🍌', color: 'bg-yellow-500' },
    { id: 3, icon: '🍒', color: 'bg-pink-500' },
    { id: 4, icon: '🍓', color: 'bg-purple-500' },
    { id: 5, icon: '🍊', color: 'bg-orange-500' },
  ];

  const handleCardClick = (card: Card) => {
    console.log(`Card clicked: ${card.id}`);
  };

  return (
    <div className="p-4">
      <CardCarousel cards={cards} handleCardClick={handleCardClick} />
    </div>
  );
};

export default App;
