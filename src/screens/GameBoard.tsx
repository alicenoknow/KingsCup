import React, { useState } from "react";
import { useContext } from "react";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Context } from "react-native-reanimated/lib/types/lib/reanimated2/hook/commonTypes";
import ActionCard from "../components/ActionCard";
import Button from "../components/Button";
import { ActionType, AppContext } from "../store/store";
import { getNewCard } from "../utils/selection";

interface AnimatedGestureContext extends Context {
  startX: number;
}

export default function GameBoard() {
  const {
    state: { currentCard, cards },
    dispatch,
  } = useContext(AppContext);

  const x = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: AnimatedGestureContext) => {
      ctx.startX = x.value;
    },
    onActive: (event, ctx: AnimatedGestureContext) => {
      x.value = ctx.startX + event.translationX;
      console.warn(event.translationX);
    },
    onEnd: (_) => {
      x.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
      ],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View>
          {currentCard && (
            <ActionCard card={currentCard} style={animatedStyle} />
          )}
          <Button
            label="Next"
            onPress={() => {
              const newCard = getNewCard(cards);
              if (newCard) {
                dispatch({ type: ActionType.SELECT_CARD, payload: newCard });
              }
            }}
          />
        </Animated.View>
      </PanGestureHandler>
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
