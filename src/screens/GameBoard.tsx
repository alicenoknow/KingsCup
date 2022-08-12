import React, { useState } from "react";
import { useContext } from "react";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import ActionCard from "../components/ActionCard";
import Button from "../components/Button";
import { ActionType, AppContext } from "../store/store";
import { getNewCard } from "../utils/selection";

export default function GameBoard() {
  const {
    state: { currentCard, cards },
    dispatch,
  } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.container}>
      {currentCard && <ActionCard card={currentCard} />}
      <Button
        label="Next"
        onPress={() => {
          const newCard = getNewCard(cards);
          if (newCard) {
            dispatch({ type: ActionType.SELECT_CARD, payload: newCard });
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
});
