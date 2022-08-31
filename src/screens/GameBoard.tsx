import React, { useContext } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import Animated from "react-native-reanimated";
import { Context } from "react-native-reanimated/lib/types/lib/reanimated2/hook/commonTypes";
import ActionCard from "../components/ActionCard";
import Button from "../components/Button";
import { ActionType, AppContext, GameState } from "../store/store";
import { Colors } from "../styling/colors";
import { CARD_HEIGHT } from "../utils/assets";
import { Card } from "../utils/cards";

interface AnimatedGestureContext extends Context {
  startX: number;
}

export default function GameBoard() {
  const {
    state: { cards, gameState },
    dispatch,
  } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.container}>
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
    backgroundColor: Colors.background,
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
