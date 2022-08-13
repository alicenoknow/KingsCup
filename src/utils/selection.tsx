// TODO algo

import { Card, CardName } from "./cards";

let probabilityFactor = 1;

export function getNewCard(deckOfCards: Set<Card>): Card | undefined {
  if (deckOfCards.size === 0) {
    return undefined;
  }
  const arrayOfCards = Array.from(deckOfCards);
  let index = Math.floor(Math.random() * deckOfCards.size);
  let newCard: Card = arrayOfCards[index];

  while (newCard.name === CardName.KING && Math.random() < probabilityFactor) {
    index = Math.floor(Math.random() * deckOfCards.size);
    newCard = arrayOfCards[index];
    probabilityFactor -= 0.05;
  }
  return newCard;
}
