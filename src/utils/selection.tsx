// TODO algo

import { Card, CardName } from "./cards";

export function getNewCard(deckOfCards: Set<Card>): Card | undefined {
  if (deckOfCards.size === 0) {
    return undefined;
  }
  const arrayOfCards = Array.from(deckOfCards);
  let probabilityFactor = 1;
  let index = Math.floor(Math.random() * deckOfCards.size);
  let newCard: Card = arrayOfCards[index];

  while (newCard.name === CardName.KING && Math.random() < probabilityFactor) {
    console.warn(newCard.name, probabilityFactor);
    index = Math.floor(Math.random() * deckOfCards.size);
    newCard = arrayOfCards[index];
    probabilityFactor -= 0.1;
  }
  return newCard;
}
