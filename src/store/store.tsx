import { createContext, useReducer, Dispatch } from "react";
import { Card, Cards } from "../utils/cards";

interface State {
  cards: Set<Card>;
  currentCard: Card | undefined;
}

interface ContextState {
  state: State;
  dispatch: Dispatch<Action>;
}

type Action = {
  type: ActionType.SELECT_CARD;
  payload: Card;
};

export enum ActionType {
  SELECT_CARD = "SELECT_CARD",
}

const initialState = {
  cards: new Set(Cards),
  currentCard: Cards[0],
};

export const AppContext = createContext<ContextState>({
  state: initialState,
  dispatch: () => null,
});

const { Provider } = AppContext;

const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.SELECT_CARD:
      state.cards.delete(payload);
      const newState: State = {
        cards: state.cards,
        currentCard: payload,
      };
      return newState;
    default:
      console.warn("ERROR :: Unknown action in reducer");
      return state;
  }
};

export const AppProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.warn(state);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
