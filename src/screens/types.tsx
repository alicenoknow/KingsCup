import { CardName } from "../utils/cards";

export type RootStackParamList = {
  Home: undefined;
  GameBoard: undefined;
  Rules: undefined;
  RulesDetails: { cards: CardName[], label: string };
};

export enum Screens {
  HOME = "Home",
  GAME_BOARD = "GameBoard",
  RULES = "Rules",
  RULES_DETAILS = "RulesDetails",
}
