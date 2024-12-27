import React, { useContext, useEffect, useCallback, useMemo } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Gesture, GestureDetector, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";
import { ActionType, AppContext, GameState } from "../store/store";
import { Card, CardName } from "../utils/cards";
import CardContent from "./CardContent";

const { width, height } = Dimensions.get("window");

const CARD_HIDE_OFFSET = 10;
const CARD_HORIZONTAL_SNAP_POINTS = [-width - CARD_HIDE_OFFSET, 0, width + CARD_HIDE_OFFSET];
const CARD_VERTICAL_SNAP_POINTS = [-height - CARD_HIDE_OFFSET, 0, height + CARD_HIDE_OFFSET];
const CARD_SLIDE_IN_DURATION_MS = 250;
const CARD_MAX_ROTATION_DEG = 10;
const TOTAL_CARDS = 49;
const VISIBLE_CARDS = 5; // only a few first cards are visible and animated initially
const DRAG_SCALE = 1.2;

interface CardProps {
  card: Card;
  index: number;
}

const ActionCard = ({ card: { img, name }, index }: CardProps) => {
  const {
    state: { currentIndex, gameState },
    dispatch,
  } = useContext(AppContext);

  const offset = useSharedValue({ x: 0, y: 0 });
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotateZ = useSharedValue(0);
  const initialAngle = useMemo(() => -CARD_MAX_ROTATION_DEG + Math.random() * 2 * CARD_MAX_ROTATION_DEG, [])

  const slideInCard = useCallback(() => {
    scale.value = 1;

    const slideInDirection = Math.floor(Math.random() * 4);
    if (slideInDirection === 0) {
      translateX.value = -width - CARD_HIDE_OFFSET;
    } else if (slideInDirection === 1) {
      translateY.value = -height - CARD_HIDE_OFFSET;
    } else if (slideInDirection === 2) {
      translateY.value = height + CARD_HIDE_OFFSET;
    } else if (slideInDirection === 3) {
      translateX.value = width + CARD_HIDE_OFFSET;
    }

    const delay = (TOTAL_CARDS - index) * CARD_SLIDE_IN_DURATION_MS;
    translateX.value = withDelay(
      delay,
      withTiming(0, { duration: CARD_SLIDE_IN_DURATION_MS, easing: Easing.ease })
    );
    translateY.value = withDelay(
      delay,
      withTiming(0, { duration: CARD_SLIDE_IN_DURATION_MS, easing: Easing.ease })
    );
    rotateZ.value = withDelay(delay, withSpring(initialAngle));
  }, []);

  useEffect(() => {
    if (gameState === GameState.START && index >= TOTAL_CARDS - VISIBLE_CARDS) {
      slideInCard();
    } else {
      rotateZ.value = withDelay(0, withSpring(initialAngle));
    }
  }, [gameState, slideInCard, index]);

  const handleKingCard = useCallback(() => {
    if (index === currentIndex && name === CardName.KING) {
      dispatch({ type: ActionType.CHANGE_GAME_STATE, payload: GameState.KING });
    }
  }, [currentIndex, dispatch, index, name]);

  useEffect(() => {
    handleKingCard();
  }, [handleKingCard]);

  const handleGestureBegin = () => {
    if (index !== currentIndex || gameState === GameState.KING) return;
    offset.value = { x: translateX.value, y: translateY.value };
    rotateZ.value = withTiming(0);
    scale.value = withTiming(DRAG_SCALE);
  };

  const handleGestureUpdate = ({ translationX, translationY }: PanGestureHandlerGestureEvent["nativeEvent"]) => {
    if (index !== currentIndex || gameState === GameState.KING) return;
    translateX.value = offset.value.x + translationX;
    translateY.value = offset.value.y + translationY;
  };

  const handleGestureEnd = ({ velocityX, velocityY }: PanGestureHandlerGestureEvent["nativeEvent"]) => {
    if (index !== currentIndex || gameState === GameState.KING) return;

    const destX = snapPoint(translateX.value, velocityX, CARD_HORIZONTAL_SNAP_POINTS);
    const destY = snapPoint(translateY.value, velocityY, CARD_VERTICAL_SNAP_POINTS);

    translateX.value = withSpring(destX, { velocity: velocityX });
    translateY.value = withSpring(destY, { velocity: velocityY });

    if (destX || destY) {
      dispatch({ type: ActionType.NEXT_CARD, payload: undefined });
    }
  };

  const gesture = Gesture.Pan()
    .runOnJS(true)
    .onBegin(handleGestureBegin)
    .onUpdate(handleGestureUpdate)
    .onEnd(handleGestureEnd);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotateZ: `${rotateZ.value}deg` },
      { scale: scale.value },
    ],
  }));

  return (
    <View style={styles.container} pointerEvents="box-none">
      <GestureDetector gesture={gesture}>
        <CardContent index={index} front={img} style={animatedStyle} />
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ActionCard;
