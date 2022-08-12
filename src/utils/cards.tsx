const enum CardName {
  CLUB2 = "2 of Clubs",
  DIAMOND2 = "2 of Diamonds",
  KING = "King",
}

export interface Card {
  name: CardName;
  url: string;
}

export const Cards: ReadonlyArray<Card> = [
  {
    name: CardName.CLUB2,
    url: "king_app/assets/cards/2_of_clubs.png",
  },
  {
    name: CardName.DIAMOND2,
    url: "king_app/assets/cards/2_of_diamonds.png",
  },
  {
    name: CardName.KING,
    url: "king_app/assets/cards/king_of_spades2.png",
  },
];

export function getCardRule(cardName: CardName) {
  switch (cardName) {
    case CardName.CLUB2:
    case CardName.DIAMOND2:
      return "2 for u - you take two cards";
    default:
      "Oops, idk";
  }
}

// TODO algo

export function getNewCard(deckOfCards: Set<Card>): Card {
  const arrayOfCards = Array.from(deckOfCards);
  let probabilityFactor = 0.8;

  let index = Math.floor(Math.random() * deckOfCards.size);
  let newCard: Card = arrayOfCards[index];

  while (newCard.name === CardName.KING && Math.random() < probabilityFactor) {
    index = Math.floor(Math.random() * deckOfCards.size);
    newCard = arrayOfCards[index];
    probabilityFactor -= 0.1;
  }

  return newCard;
}
