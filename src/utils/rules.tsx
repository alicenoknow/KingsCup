import { CardName } from "./cards";

export function getCardRule(cardName: CardName) {
  switch (cardName) {
    case CardName.CLUB2:
    case CardName.DIAMOND2:
    case CardName.SPADE2:
    case CardName.HEART2:
      return "2 for u - you take two sips";

    case CardName.CLUB3:
    case CardName.DIAMOND3:
    case CardName.SPADE3:
    case CardName.HEART3:
      return "3 for them - you split three sips among others";

    case CardName.CLUB4:
    case CardName.DIAMOND4:
    case CardName.SPADE4:
    case CardName.HEART4:
      return "4-hoe - all the ladies drink";

    case CardName.CLUB5:
    case CardName.DIAMOND5:
    case CardName.SPADE5:
    case CardName.HEART5:
      return "5-drive - start the car and turn the wheel in chosen direction, if next person wants to continue the drive, then say 'BEEP' and turn the wheel in the same direction, if next person wants to change the direction, then say 'TOOT' and turn the will in opposite direction, the one who get confused, drinks";

    case CardName.CLUB6:
    case CardName.DIAMOND6:
    case CardName.SPADE6:
    case CardName.HEART6:
      return "6-dicks - all the guys drink";

    case CardName.CLUB7:
    case CardName.DIAMOND7:
    case CardName.SPADE7:
    case CardName.HEART7:
      return "7-heaven - raise your hands, last person to do so, drinks";

    case CardName.CLUB8:
    case CardName.DIAMOND8:
    case CardName.SPADE8:
    case CardName.HEART8:
      return "8-mate - pick your drinking buddy, who will take a sip each time you take a sip";

    case CardName.CLUB9:
    case CardName.DIAMOND9:
    case CardName.SPADE9:
    case CardName.HEART9:
      return "9-rhyme - start with a word or sentence, next person must find a rhyme to the words of previous player, the one who fails, drinks";

    case CardName.CLUB10:
    case CardName.DIAMOND10:
    case CardName.SPADE10:
    case CardName.HEART10:
      return "10-forbidden - you pick the word that gonna be forbidden until the end of the game, if someone says it, they drink";

    case CardName.CLUB_J:
    case CardName.DIAMOND_J:
    case CardName.SPADE_J:
    case CardName.HEART_J:
      return "Jack-ritual - pick a routine that everybody needs to follow before every sip, if someone miss it, they drink twice";

    case CardName.CLUB_Q:
    case CardName.DIAMOND_Q:
    case CardName.SPADE_Q:
    case CardName.HEART_Q:
      return "Queen - it's a superpower! take the card, and keep it until someone else gets a queen. during the  game you can put your thumb on the table, last person to notice that and do the same, drinks";

    case CardName.CLUB_A:
    case CardName.DIAMOND_A:
    case CardName.SPADE_A:
    case CardName.HEART_A:
      return "Ace-brand - pick a category, each person has to find a match, first person who cannot find a word, drinks";

    case CardName.KING:
      return "Game over - drink the King's cup!";

    default:
      "Oops, idk";
  }
}
