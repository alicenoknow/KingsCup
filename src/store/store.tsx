import { createContext, useReducer, Dispatch } from "react";
import { Card, Cards } from "../utils/cards";
import { shuffleCards } from "../utils/shuffle";

interface State {
  gameState: GameState;
  cards: ReadonlyArray<Card>;
  currentIndex: number | undefined;
}

interface ContextState {
  state: State;
  dispatch: Dispatch<Action>;
}

export enum GameState {
  START = "START",
  IN_PROGRESS = "IN_PROGRESS",
  KING = "KING",
}

export enum ActionType {
  SHUFFLE_DECK = "SHUFFLE_DECK",
  CHANGE_GAME_STATE = "CHANGE_GAME_STATE",
  NEXT_CARD = "NEXT_CARD",
}

export type Action =
  | {
      type: ActionType.SHUFFLE_DECK;
      payload: undefined;
    }
  | {
      type: ActionType.CHANGE_GAME_STATE;
      payload: GameState;
    }
  | {
      type: ActionType.NEXT_CARD;
      payload: undefined;
    };

const initialState: State = {
  gameState: GameState.START,
  cards: shuffleCards(Cards),
  currentIndex: Cards.length - 1,
};

export const AppContext = createContext<ContextState>({
  state: initialState,
  dispatch: () => null,
});

const { Provider } = AppContext;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SHUFFLE_DECK:
      return {
        gameState: GameState.START,
        cards: shuffleCards(Cards),
        currentIndex: state.cards.length - 1,
      };
    case ActionType.CHANGE_GAME_STATE:
      return {
        ...state,
        gameState: action.payload,
      };
    case ActionType.NEXT_CARD:
      return {
        ...state,
        currentIndex: state.currentIndex
          ? state.currentIndex - 1
          : state.cards.length - 1,
        gameState: GameState.IN_PROGRESS,
      };
    default:
      console.warn("ERROR :: Unknown action in reducer");
      return state;
  }
};

export const AppProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
