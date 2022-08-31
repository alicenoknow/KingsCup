import { CardName } from "./cards";

export function getCardRule(cardName: CardName) {
  switch (cardName) {
    case CardName.CLUB2:
    case CardName.DIAMOND2:
    case CardName.SPADE2:
    case CardName.HEART2:
      return "2 for u - you split two sips among other players";

    case CardName.CLUB3:
    case CardName.DIAMOND3:
    case CardName.SPADE3:
    case CardName.HEART3:
      return "3 for mee - you drink three sips";

    case CardName.CLUB4:
    case CardName.DIAMOND4:
    case CardName.SPADE4:
    case CardName.HEART4:
      return "4 whores - ladies drink";

    case CardName.CLUB5:
    case CardName.DIAMOND5:
    case CardName.SPADE5:
    case CardName.HEART5:
      return "5 never have I ever - play a round, losers drink";

    case CardName.CLUB6:
    case CardName.DIAMOND6:
    case CardName.SPADE6:
    case CardName.HEART6:
      return "6 dicks - all the guys drink";

    case CardName.CLUB7:
    case CardName.DIAMOND7:
    case CardName.SPADE7:
    case CardName.HEART7:
      return "7 heaven - raise your hands, last person to do so drinks";

    case CardName.CLUB8:
    case CardName.DIAMOND8:
    case CardName.SPADE8:
    case CardName.HEART8:
      return "8 mate - pick your drinking buddy, who will take a sip each time you take a sip";

    case CardName.CLUB9:
    case CardName.DIAMOND9:
    case CardName.SPADE9:
    case CardName.HEART9:
      return "9 rhyme - say a word, then going clockwise everyone has to say a word that rhyme with the previous one. The first person to fail to come up with a word drinks.";

    case CardName.CLUB10:
    case CardName.DIAMOND10:
    case CardName.SPADE10:
    case CardName.HEART10:
      return "10 categories - pick a category, others need to say things in that cat or drink";

    case CardName.CLUB_J:
    case CardName.DIAMOND_J:
    case CardName.SPADE_J:
    case CardName.HEART_J:
      return "Jack ritual - pick a rule that everyone has to follow before every sip, if someone disobey it, they drink twice";

    case CardName.CLUB_Q:
    case CardName.DIAMOND_Q:
    case CardName.SPADE_Q:
    case CardName.HEART_Q:
      return "Queen forbidden - you pick the word that gonna be forbidden until the end of the game, if someone says it, they drink";

    case CardName.CLUB_A:
    case CardName.DIAMOND_A:
    case CardName.SPADE_A:
    case CardName.HEART_A:
      return "Ace waterfall - all players start drinking their beverage at the same time. No player can stop drinking until the player to their left stops";

    case CardName.KING:
      return "Game over - drink the King's cup!";
    case CardName.RULES:
      return "Swipe out rules card to start the game!";
    default:
      "Oops, idk";
  }
}
