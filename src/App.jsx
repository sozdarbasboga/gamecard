import { useState, useEffect } from 'react'
import './App.css'

// 12 çift + 1 tek kart (joker veya boş)
const CARD_PAIRS = 12;
const GRID_SIZE = 5;
const EMOJIS = [
  '🐯', '👻', '🌟', '🦄', '🐸', '🐶', '🦁', '🐼', '🐵', '🐙', '🦋', '🐞'
];
const JOKER_EMOJI = '🃏';

function shuffle(array) {
  // Fisher-Yates algoritması
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateCards() {
  const cards = [];
  for (let i = 0; i < CARD_PAIRS; i++) {
    const emoji = EMOJIS[i % EMOJIS.length];
    cards.push({ id: i + 'a', value: emoji, matched: false });
    cards.push({ id: i + 'b', value: emoji, matched: false });
  }
  // Eğer 25'e tamamlanmazsa, bir joker kart ekle
  if (cards.length < GRID_SIZE * GRID_SIZE) {
    cards.push({ id: 'joker', value: JOKER_EMOJI, matched: false });
  }
  return shuffle(cards);
}

function App() {
  const [cards, setCards] = useState(generateCards());
  const [opened, setOpened] = useState([]); // Açık kartların indexleri
  const [matched, setMatched] = useState([]); // Eşleşen kartların indexleri
  const [score, setScore] = useState(0);
  const [lock, setLock] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    if (opened.length === 2) {
      setLock(true);
      const [firstIdx, secondIdx] = opened;
      const firstCard = cards[firstIdx];
      const secondCard = cards[secondIdx];
      if (firstCard.value === secondCard.value && firstCard.id !== secondCard.id) {
        // Eşleşti
        setTimeout(() => {
          setMatched((prev) => [...prev, firstIdx, secondIdx]);
          setScore((s) => s + 50);
          setOpened([]);
          setLock(false);
        }, 700);
      } else {
        // Eşleşmedi
        setTimeout(() => {
          setScore((s) => s - 10);
          setOpened([]);
          setLock(false);
        }, 1000);
      }
    }
  }, [opened, cards]);

  useEffect(() => {
    if (matched.length === cards.length) {
      setGameFinished(true);
    }
  }, [matched, cards]);

  const handleCardClick = (idx) => {
    if (lock) return;
    if (matched.includes(idx)) return;
    if (opened.includes(idx)) {
      // Açık karta tekrar basılırsa kapat
      setOpened((prev) => prev.filter((i) => i !== idx));
      return;
    }
    if (opened.length === 2) return;
    setOpened((prev) => [...prev, idx]);
  };

  const handleRestart = () => {
    setCards(generateCards());
    setOpened([]);
    setMatched([]);
    setScore(0);
    setLock(false);
    setGameFinished(false);
  };

  return (
    <div>
      <h1>Kart Eşleştirme Oyunu</h1>
      <div style={{ marginBottom: 16, fontSize: 20 }}>Puan: {score}</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_SIZE}, 60px)`,
        gridGap: 64,
        justifyContent: 'center',
        margin: '0 auto',
        marginBottom: 24
      }}>
        {cards.map((card, idx) => {
          const isOpen = opened.includes(idx) || matched.includes(idx);
          return (
            <button
              key={card.id + '-' + idx}
              onClick={() => handleCardClick(idx)}
              style={{
                width: 100,
                height: 140,
                fontSize: 24,
                background: isOpen ? '#fff' : '#f5f5f5',
                color: isOpen ? '#222' : '#b0b0b0',
                border: 'none',
                borderRadius: 8,
                cursor: isOpen ? 'default' : 'pointer',
                transition: 'background 0.3s',
                userSelect: 'none',
              }}
              disabled={isOpen || lock}
            >
              {isOpen ? card.value : '?'}
            </button>
          );
        })}
      </div>
      {gameFinished && (
        <button onClick={handleRestart} style={{ fontSize: 18, padding: '10px 24px' }}>
          Yeniden Oyna
        </button>
      )}
    </div>
  );
}

export default App
