import { CardName } from "./cards";

export function getCardRule(cardName: CardName) {
  switch (cardName) {
    case CardName.CLUB2:
    case CardName.DIAMOND2:
    case CardName.SPADE2:
    case CardName.HEART2:
      return "2 for u - split two sips among other players";

    case CardName.CLUB3:
    case CardName.DIAMOND3:
    case CardName.SPADE3:
    case CardName.HEART3:
      return "3 for me - take three sips";

    case CardName.CLUB4:
    case CardName.DIAMOND4:
    case CardName.SPADE4:
    case CardName.HEART4:
      return "4 wh*res - all ladies drink";

    case CardName.CLUB5:
    case CardName.DIAMOND5:
    case CardName.SPADE5:
    case CardName.HEART5:
      return "5 never have I ever - play a round, losers drink";

    case CardName.CLUB6:
    case CardName.DIAMOND6:
    case CardName.SPADE6:
    case CardName.HEART6:
      return "6 d*cks - all guys drink";

    case CardName.CLUB7:
    case CardName.DIAMOND7:
    case CardName.SPADE7:
    case CardName.HEART7:
      return "7 heaven - raise your hands, last person drinks";

    case CardName.CLUB8:
    case CardName.DIAMOND8:
    case CardName.SPADE8:
    case CardName.HEART8:
      return "8 mate - pick your drinking buddy, who will take a sip each time you take a sip";

    case CardName.CLUB9:
    case CardName.DIAMOND9:
    case CardName.SPADE9:
    case CardName.HEART9:
      return "9 rhyme - say a word, then going clockwise everyone has to find rhyme to the previous word, first person who fails - drinks";

    case CardName.CLUB10:
    case CardName.DIAMOND10:
    case CardName.SPADE10:
    case CardName.HEART10:
      return "10 categories - pick a category, others need to find things in that category, first person who fails - drinks";

    case CardName.CLUB_J:
    case CardName.DIAMOND_J:
    case CardName.SPADE_J:
    case CardName.HEART_J:
      return "Jack ritual - pick an action that everyone has to perform before every sip, if someone forgets - they drink twice";

    case CardName.CLUB_Q:
    case CardName.DIAMOND_Q:
    case CardName.SPADE_Q:
    case CardName.HEART_Q:
      return "Queen forbidden - pick a word that will be forbidden until game ends, if someone says it - they drink";

    case CardName.CLUB_A:
    case CardName.DIAMOND_A:
    case CardName.SPADE_A:
    case CardName.HEART_A:
      return "Ace waterfall - all players start drinking at the same time. No one (except the person who draw the card) can stop drinking until the player on their left stops";

    case CardName.KING:
      return "Game over - drink the King's cup!";
    case CardName.RULES:
      return "Swipe out rules card to start the game!";
    default:
      "Oops, idk";
  }
}
