import React, { useContext, useEffect } from "react";
import { StyleSheet, Platform, View } from "react-native";
import Animated from "react-native-reanimated";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { ParamListBase } from "@react-navigation/native";
import ActionCard from "../components/ActionCard";
import Button from "../components/Button";
import { ActionType, AppContext, GameState } from "../store/store";
import { Spacer } from "../styling/spacers";
import { getBackgroundColor } from "../styling/themeHelper";
import { CARD_HEIGHT } from "../utils/assets";
import { Card } from "../utils/cards";
import { Screens } from "./types";
import HelpIcon from "../components/HelpIcon";

interface GameBoardProps {
  navigation: NativeStackNavigationProp<ParamListBase, Screens.GAME_BOARD>;
}

const GameBoard = ({ navigation }: GameBoardProps) => {
  const {
    state: { currentIndex, cards, gameState, isLightTheme },
    dispatch,
  } = useContext(AppContext);

  const shouldCardBeRendered = (index: number) =>
    currentIndex - index < 5 && currentIndex - index >= 0;

  useEffect(() => {
    const cleanUpListener = navigation.addListener("beforeRemove", () => {
      dispatch({ type: ActionType.SHUFFLE_DECK, payload: undefined });
    });

    return () => cleanUpListener();
  }, [navigation, dispatch]);

  return (
    <SafeAreaView style={[styles.container, getBackgroundColor(isLightTheme)]}>
      <View style={styles.helpIcon}>
        <HelpIcon />
      </View>
      <Animated.View style={styles.cardsContainer}>
        {cards.map((card: Card, index: number) =>
          shouldCardBeRendered(index) ? (
            <ActionCard key={index} index={index} card={card} />
          ) : null
        )}
        {gameState === GameState.KING && (
          <Button
            style={styles.gameOverButton}
            label="One more cup?"
            onPress={() =>
              dispatch({ type: ActionType.SHUFFLE_DECK, payload: undefined })
            }
          />
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? Spacer.MEDIUM_24 : 0,
  },
  cardsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gameOverButton: {
    marginTop: CARD_HEIGHT - Spacer.FOOTER,
    paddingHorizontal: Spacer.MEDIUM_16,
  },
  helpIcon: {
    flex: 1,
    position: "absolute",
    top: 2 * Spacer.LARGE_48,
    alignSelf: "center",
    zIndex: 3,
  }
});

export default GameBoard;
