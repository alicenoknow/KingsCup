import { Card } from "./cards";

export function shuffleCards(cards: ReadonlyArray<Card>) {
  const cardsCount = cards.length;
  const kingCard = cards[cardsCount - 1];
  const shuffledCards = shuffleRandomly(cards.slice(0, cardsCount - 1));
  const kingsIndex = Math.random() * (cardsCount / 4) - 1;

  return [
    ...shuffledCards.slice(0, kingsIndex),
    kingCard,
    ...shuffledCards.slice(kingsIndex),
  ];
}

function shuffleRandomly(cards: ReadonlyArray<Card>) {
  return cards
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
