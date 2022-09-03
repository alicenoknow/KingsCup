import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { StyleSheet, Image, Dimensions, Platform } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { AppContext, GameState } from "../store/store";
import { Back, CARD_ASPECT_RATIO } from "../utils/assets";

const { width } = Dimensions.get("window");

const HORIZONTAL_MARGIN = 128;
const CARD_WIDTH = width - HORIZONTAL_MARGIN;
const CARD_HEIGHT = CARD_WIDTH * CARD_ASPECT_RATIO;

const perspective = Platform.OS === "ios" ? 1000 : undefined;

interface CardContentProps {
  front: any; //TODO
  style: any;
  index: number;
}

export default function CardContent({ index, front, style }: CardContentProps) {
  const {
    state: { currentIndex, gameState },
  } = useContext(AppContext);

  const rotateYAsDeg = useSharedValue(180);
  const backOpacity = useSharedValue(1);
  const frontOpacity = useSharedValue(0);

  useEffect(() => {
    if (currentIndex === index) {
      rotateYAsDeg.value = withTiming(0, { duration: 300 });
      backOpacity.value = withTiming(0, { duration: 300 });
      frontOpacity.value = withTiming(1, { duration: 300 });
    }
  }, [currentIndex]);

  useEffect(() => {
    if (gameState === GameState.START && index !== currentIndex) {
      rotateYAsDeg.value = 180;
      backOpacity.value = 1;
      frontOpacity.value = 0;
    }
  }, [gameState]);

  const backCardStyle = useAnimatedStyle(() => ({
    opacity: backOpacity.value,
    transform: [
      { perspective: perspective ?? 0 },
      { rotateY: "180deg" },
      { rotateY: `${rotateYAsDeg.value}deg` },
    ],
  }));

  const frontCardStyle = useAnimatedStyle(() => ({
    opacity: frontOpacity.value,
    transform: [
      { perspective: perspective ?? 0 },
      { rotateY: `${rotateYAsDeg.value}deg` },
    ],
  }));

  return (
    <Animated.View style={[styles.card, style]}>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            justifyContent: "center",
            alignItems: "center",
            backfaceVisibility: "hidden",
          },
          backCardStyle,
        ]}
      >
        <Image source={Back} style={styles.image} resizeMode="contain" />
      </Animated.View>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            justifyContent: "center",
            alignItems: "center",
            backfaceVisibility: "hidden",
          },
          frontCardStyle,
        ]}
      >
        <Image source={front} style={styles.image} resizeMode="contain" />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.8,
    elevation: 5,
  },
  image: {
    backgroundColor: "white",
    width: CARD_WIDTH,
    height: CARD_WIDTH * CARD_ASPECT_RATIO,
    borderRadius: 10,
  },
});
