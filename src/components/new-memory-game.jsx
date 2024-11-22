import React, { useState, useEffect } from "react";
import { Shuffle } from "lucide-react";

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);

  const cardImages = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const duplicatedCards = [...cardImages, ...cardImages];
    const shuffledCards = duplicatedCards.sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
  };

  const handleClick = (index) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      solved.includes(index)
    )
      return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);

      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setSolved([...solved, ...newFlipped]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-bold">Coups: {moves}</div>
        <button
          onClick={initGame}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <Shuffle size={20} />
          Nouvelle partie
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`aspect-square flex items-center justify-center text-4xl cursor-pointer rounded-lg transition-all duration-300 ${
              flipped.includes(index) || solved.includes(index)
                ? "bg-white rotate-y-0"
                : "bg-blue-500 rotate-y-180"
            }`}
          >
            {(flipped.includes(index) || solved.includes(index)) && card}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
