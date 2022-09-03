import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Animated from "react-native-reanimated";
import ActionCard from "../components/ActionCard";
import Button from "../components/Button";
import { ActionType, AppContext, GameState } from "../store/store";
import { getBackgroundColor } from "../styling/themeHelper";
import { CARD_HEIGHT } from "../utils/assets";
import { Card } from "../utils/cards";
import { Screens } from "./types";

interface GameBoardProps {
  navigation: NativeStackNavigationProp<ParamListBase, Screens.GAME_BOARD>;
}

export default function GameBoard({ navigation }: GameBoardProps) {
  const {
    state: { cards, gameState, isLightTheme },
    dispatch,
  } = useContext(AppContext);

  useEffect(
    () =>
      navigation.addListener("beforeRemove", () => {
        dispatch({ type: ActionType.SHUFFLE_DECK, payload: undefined });
      }),
    [navigation]
  );

  return (
    <SafeAreaView style={[styles.container, getBackgroundColor(isLightTheme)]}>
      <Animated.View>
        {cards.map((card: Card, index: number) => {
          return <ActionCard key={index} index={index} card={card} />;
        })}
        {gameState === GameState.KING && (
          <Button
            style={styles.gameOverButton}
            label={"one more cup?"}
            onPress={() =>
              dispatch({ type: ActionType.SHUFFLE_DECK, payload: undefined })
            }
          />
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  gameOverButton: {
    marginTop: CARD_HEIGHT - 200,
    paddingHorizontal: 16,
  },
});
