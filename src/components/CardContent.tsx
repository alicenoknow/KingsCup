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
import { Colors } from "../styling/colors";
import { Spacer } from "../styling/spacers";
import { Back, CARD_ASPECT_RATIO } from "../utils/assets";

const { width } = Dimensions.get("window");

const HORIZONTAL_MARGIN = 128;
const CARD_WIDTH = width - HORIZONTAL_MARGIN;
const CARD_HEIGHT = CARD_WIDTH * CARD_ASPECT_RATIO;

const perspective = 1000;

interface CardContentProps {
  front: any; //TODO
  style: any;
  index: number;
}

export default function CardContent({ index, front, style }: CardContentProps) {
  const { state: { currentIndex, gameState } } = useContext(AppContext);

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
      { perspective: perspective ?? 100 },
    ],
  }));

  const frontCardStyle = useAnimatedStyle(() => ({
    opacity: frontOpacity.value,
    transform: [
      { perspective: perspective ?? 100 },
      { rotateY: `${rotateYAsDeg.value}deg` },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.card,
        Platform.OS === "ios" ? styles.cardIOS : styles.cardAndroid,
        style,
      ]}
    >
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
    backgroundColor: Colors.white,
    borderRadius: Spacer.SMALL_8,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  cardIOS: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  cardAndroid: {
    borderWidth: 2,
    borderColor: Colors.black,
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * CARD_ASPECT_RATIO,
    borderRadius: Spacer.SMALL_8,
  },
});
