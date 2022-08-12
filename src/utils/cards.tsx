import { ImageSourcePropType } from "react-native";
import * as images from "./assets";

type ImageSource = typeof images;
export type ImageSourceType = keyof ImageSource;

export const enum CardName {
  CLUB2 = "2 of Clubs",
  DIAMOND2 = "2 of Diamonds",
  SPADE2 = "2 of Spades",
  HEART2 = "2 of Hearts",

  CLUB3 = "3 of Clubs",
  DIAMOND3 = "3 of Diamonds",
  SPADE3 = "3 of Spades",
  HEART3 = "3 of Hearts",

  CLUB4 = "4 of Clubs",
  DIAMOND4 = "4 of Diamonds",
  SPADE4 = "4 of Spades",
  HEART4 = "4 of Hearts",

  CLUB5 = "5 of Clubs",
  DIAMOND5 = "5 of Diamonds",
  SPADE5 = "5 of Spades",
  HEART5 = "5 of Hearts",

  CLUB6 = "6 of Clubs",
  DIAMOND6 = "6 of Diamonds",
  SPADE6 = "6 of Spades",
  HEART6 = "6 of Hearts",

  CLUB7 = "7 of Clubs",
  DIAMOND7 = "7 of Diamonds",
  SPADE7 = "7 of Spades",
  HEART7 = "7 of Hearts",

  CLUB8 = "8 of Clubs",
  DIAMOND8 = "8 of Diamonds",
  SPADE8 = "8 of Spades",
  HEART8 = "8 of Hearts",

  CLUB9 = "9 of Clubs",
  DIAMOND9 = "9 of Diamonds",
  SPADE9 = "9 of Spades",
  HEART9 = "9 of Hearts",

  CLUB10 = "10 of Clubs",
  DIAMOND10 = "10 of Diamonds",
  SPADE10 = "10 of Spades",
  HEART10 = "10 of Hearts",

  CLUB_J = "Jack of Clubs",
  DIAMOND_J = "Jack of Diamonds",
  SPADE_J = "Jack of Spades",
  HEART_J = "Jack of Hearts",

  CLUB_Q = "Queen of Clubs",
  DIAMOND_Q = "Queen of Diamonds",
  SPADE_Q = "Queen of Spades",
  HEART_Q = "Queen of Hearts",

  CLUB_A = "Ace of Clubs",
  DIAMOND_A = "Ace of Diamonds",
  SPADE_A = "Ace of Spades",
  HEART_A = "Ace of Hearts",

  KING = "King",
}

export interface Card {
  name: CardName;
  img: ImageSourcePropType;
}

export const Cards: ReadonlyArray<Card> = [
  {
    name: CardName.CLUB2,
    img: images.Club2,
  },
  {
    name: CardName.DIAMOND2,
    img: images.Diamond2,
  },
  {
    name: CardName.SPADE2,
    img: images.Spade2,
  },
  {
    name: CardName.HEART2,
    img: images.Heart2,
  },
  {
    name: CardName.CLUB3,
    img: images.Club3,
  },
  {
    name: CardName.DIAMOND3,
    img: images.Diamond3,
  },
  {
    name: CardName.SPADE3,
    img: images.Spade3,
  },
  {
    name: CardName.HEART3,
    img: images.Heart3,
  },
  {
    name: CardName.CLUB4,
    img: images.Club4,
  },
  {
    name: CardName.DIAMOND4,
    img: images.Diamond4,
  },
  {
    name: CardName.SPADE4,
    img: images.Spade4,
  },
  {
    name: CardName.HEART4,
    img: images.Heart4,
  },
  {
    name: CardName.CLUB5,
    img: images.Club5,
  },
  {
    name: CardName.DIAMOND5,
    img: images.Diamond5,
  },
  {
    name: CardName.SPADE5,
    img: images.Spade5,
  },
  {
    name: CardName.HEART5,
    img: images.Heart5,
  },
  {
    name: CardName.CLUB6,
    img: images.Club6,
  },
  {
    name: CardName.DIAMOND6,
    img: images.Diamond6,
  },
  {
    name: CardName.SPADE6,
    img: images.Spade6,
  },
  {
    name: CardName.HEART6,
    img: images.Heart6,
  },
  {
    name: CardName.CLUB7,
    img: images.Club7,
  },
  {
    name: CardName.DIAMOND7,
    img: images.Diamond7,
  },
  {
    name: CardName.SPADE7,
    img: images.Spade7,
  },
  {
    name: CardName.HEART7,
    img: images.Heart7,
  },
  {
    name: CardName.CLUB8,
    img: images.Club8,
  },
  {
    name: CardName.DIAMOND8,
    img: images.Diamond8,
  },
  {
    name: CardName.SPADE8,
    img: images.Spade8,
  },
  {
    name: CardName.HEART8,
    img: images.Heart8,
  },
  {
    name: CardName.CLUB9,
    img: images.Club9,
  },
  {
    name: CardName.DIAMOND9,
    img: images.Diamond9,
  },
  {
    name: CardName.SPADE9,
    img: images.Spade9,
  },
  {
    name: CardName.HEART9,
    img: images.Heart9,
  },
  {
    name: CardName.CLUB10,
    img: images.Club10,
  },
  {
    name: CardName.DIAMOND10,
    img: images.Diamond10,
  },
  {
    name: CardName.SPADE10,
    img: images.Spade10,
  },
  {
    name: CardName.HEART10,
    img: images.Heart10,
  },
  {
    name: CardName.CLUB_J,
    img: images.ClubJ,
  },
  {
    name: CardName.DIAMOND_J,
    img: images.DiamondJ,
  },
  {
    name: CardName.SPADE_J,
    img: images.SpadeJ,
  },
  {
    name: CardName.HEART_J,
    img: images.HeartJ,
  },
  {
    name: CardName.CLUB_Q,
    img: images.ClubQ,
  },
  {
    name: CardName.DIAMOND_Q,
    img: images.DiamondQ,
  },
  {
    name: CardName.SPADE_Q,
    img: images.SpadeQ,
  },
  {
    name: CardName.HEART_Q,
    img: images.HeartQ,
  },
  {
    name: CardName.CLUB_A,
    img: images.ClubA,
  },
  {
    name: CardName.DIAMOND_A,
    img: images.DiamondA,
  },
  {
    name: CardName.SPADE_A,
    img: images.SpadeA,
  },
  {
    name: CardName.HEART_A,
    img: images.HeartA,
  },
  {
    name: CardName.KING,
    img: images.King,
  },
];
