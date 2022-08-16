import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";
import { ActionType, AppContext, GameState } from "../store/store";
import { Back, CARD_ASPECT_RATIO } from "../utils/assets";
import { Card, CardName } from "../utils/cards";
import CardContent from "./CardContent";

const { width, height } = Dimensions.get("window");

const HIDE_OFFSET = 0;
const HORIZONTAL_SNAP_POINTS = [-width - HIDE_OFFSET, 0, width + HIDE_OFFSET];
const VERTICAL_SNAP_POINTS = [-height - HIDE_OFFSET, 0, height + HIDE_OFFSET];
const SLIDE_IN_DURATION = 100;
const MAX_ANGLE = 10;

// TODO fix cards coimnig back

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
  const translateY = useSharedValue(-height - HIDE_OFFSET);
  const scale = useSharedValue(1);
  const rotateZ = useSharedValue(0);
  const delay = index * SLIDE_IN_DURATION;
  const theta = -MAX_ANGLE + Math.random() * 2 * MAX_ANGLE;

  useEffect(() => {
    if (gameState === GameState.START) {
      translateY.value = withDelay(
        delay,
        withTiming(0, {
          duration: SLIDE_IN_DURATION,
          easing: Easing.ease,
        })
      );
      translateX.value = withDelay(
        delay,
        withTiming(0, {
          duration: SLIDE_IN_DURATION,
          easing: Easing.ease,
        })
      );
    }
    rotateZ.value = withDelay(delay, withSpring(theta));
  }, [index, translateY, rotateZ, delay, theta]);

  useEffect(() => {
    if (index === currentIndex && name === CardName.KING) {
      dispatch({
        type: ActionType.CHANGE_GAME_STATE,
        payload: GameState.KING,
      });
    }
  }, [currentIndex]);

  const gesture = Gesture.Pan()
    .runOnJS(true)
    .onBegin(() => {
      if (index !== currentIndex || gameState === GameState.KING) {
        return;
      }
      offset.value.x = translateX.value;
      offset.value.y = translateY.value;
      rotateZ.value = withTiming(0);
      scale.value = withTiming(1.1);
    })
    .onUpdate(({ translationX, translationY }) => {
      if (index !== currentIndex || gameState === GameState.KING) {
        return;
      }
      translateX.value = offset.value.x + translationX;
      translateY.value = offset.value.y + translationY;
    })
    .onEnd(({ velocityX, velocityY }) => {
      if (index !== currentIndex || gameState === GameState.KING) {
        return;
      }
      const destX = snapPoint(
        translateX.value,
        velocityX,
        HORIZONTAL_SNAP_POINTS
      );
      const destY = snapPoint(
        translateY.value,
        velocityY,
        VERTICAL_SNAP_POINTS
      );

      if (destX || destY) {
        dispatch({
          type: ActionType.NEXT_CARD,
          payload: undefined,
        });
      }
      translateX.value = withSpring(destX, { velocity: velocityX });
      translateY.value = withSpring(destY, { velocity: velocityY });
    });

  const style = useAnimatedStyle(() => ({
    transform: [
      { rotateX: "30deg" },
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotateY: `${rotateZ.value / 10}deg` },
      { rotateZ: `${rotateZ.value}deg` },
      { scale: scale.value },
    ],
  }));

  return (
    <View style={styles.container} pointerEvents="box-none">
      <GestureDetector gesture={gesture}>
        <CardContent index={index} front={img} style={style} />
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
