import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Context } from "react-native-reanimated/lib/types/lib/reanimated2/hook/commonTypes";
import ActionCard from "../components/ActionCard";
import { ActionType, AppContext } from "../store/store";
import { Card } from "../utils/cards";

interface AnimatedGestureContext extends Context {
  startX: number;
}

export default function GameBoard() {
  const {
    state: { cards },
  } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View>
        {cards.map((card: Card, index: number) => {
          return <ActionCard key={index} index={index} card={card} />;
        })}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
});
