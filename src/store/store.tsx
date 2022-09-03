import {
  createContext,
  useReducer,
  Dispatch,
  useEffect,
  useState,
} from "react";
import { set } from "react-native-reanimated";
import { Card, CardName, Cards } from "../utils/cards";
import { shuffleCards } from "../utils/shuffle";
import {
  getCustomRulesSetData,
  getUseCustomInfo,
  storeCustomRulesSetData,
  storeUseCustomInfo,
} from "./asyncstore";

interface State {
  gameState: GameState;
  cards: ReadonlyArray<Card>;
  currentIndex: number;
  isLightTheme: boolean;
  useCustomRules: boolean;
  customRules: { [key in CardName]?: string };
}

interface ContextState {
  state: State;
  dispatch: Dispatch<Action>;
  setCustomRules: (customRules: { [key in CardName]?: string }) => void;
  setUseCustom: (useCustomRules: boolean) => void;
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
  CHANGE_THEME = "CHANGE_THEME",
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
    }
  | {
      type: ActionType.CHANGE_THEME;
      payload: undefined;
    };

const initialState: State = {
  gameState: GameState.START,
  cards: shuffleCards(Cards),
  currentIndex: Cards.length,
  isLightTheme: true,
  useCustomRules: false,
  customRules: {},
};

export const AppContext = createContext<ContextState>({
  state: initialState,
  dispatch: () => null,
  setCustomRules: () => null,
  setUseCustom: () => null,
});

const { Provider } = AppContext;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SHUFFLE_DECK:
      const shuffled = shuffleCards(Cards);
      return {
        ...state,
        gameState: GameState.START,
        cards: shuffled,
        currentIndex: shuffled.length - 1,
      };
    case ActionType.CHANGE_GAME_STATE:
      return {
        ...state,
        gameState: action.payload,
      };
    case ActionType.NEXT_CARD:
      return {
        ...state,
        currentIndex: state.currentIndex - 1,
        gameState: GameState.IN_PROGRESS,
      };
    case ActionType.CHANGE_THEME:
      return {
        ...state,
        isLightTheme: !state.isLightTheme,
      };
    default:
      console.warn("ERROR :: Unknown action in reducer");
      return state;
  }
};

export const AppProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [useCustomRules, setUseCustom] = useState<boolean>(false);
  const [customRules, setCustomRules] = useState<
    { [key in CardName]?: string }
  >({});

  useEffect(() => {
    const fetchDataFromStorage = async () => {
      const useCustom = await getUseCustomInfo();
      const customRules = await getCustomRulesSetData();

      setUseCustom(useCustom || {});
      setCustomRules(customRules || {});
    };
    fetchDataFromStorage();
  }, []);

  return (
    <Provider
      value={{
        state: { ...state, useCustomRules, customRules },
        dispatch,
        setUseCustom,
        setCustomRules,
      }}
    >
      {children}
    </Provider>
  );
};
