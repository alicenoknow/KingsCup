const rule2 = "2 for u - you take 2 cards";

const enum CardName {
    CLUB2 = '2 of Clubs',
}

export interface Card {
    name: CardName,
    rule: string,
    url: string,
}

export const Cards: ReadonlyArray<Card> = [
    {
        name: CardName.CLUB2,
        rule: rule2,
        url: "king_app/assets/cards/2_of_clubs.svg",
    }
]
