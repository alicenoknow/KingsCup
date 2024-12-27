import React, { useContext, useEffect } from "react";
import { StyleSheet, Image, Dimensions, Platform, ImageSourcePropType, ImageStyle } from "react-native";
import Animated, {
  AnimatedStyle,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { AppContext, GameState } from "../store/store";
import { Colors } from "../styling/colors";
import { Spacer } from "../styling/spacers";
import { Back, CARD_ASPECT_RATIO } from "../utils/assets";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width - Spacer.X_LARGE_128;
const CARD_HEIGHT = CARD_WIDTH * CARD_ASPECT_RATIO;
const ANIMATION_DURATION = 300;
const INITIAL_ROTATION = 180;
const PERSPECTIVE = 1000;

interface CardContentProps {
  front: ImageSourcePropType;
  style: AnimatedStyle<ImageStyle>;
  index: number;
}

export default function CardContent({ index, front, style }: CardContentProps) {
  const {
    state: { currentIndex, gameState },
  } = useContext(AppContext);

  const rotateYAsDeg = useSharedValue(INITIAL_ROTATION);
  const backOpacity = useSharedValue(1);
  const frontOpacity = useSharedValue(0);

  useEffect(() => {
    if (currentIndex === index) {
      rotateYAsDeg.value = withTiming(0, { duration: ANIMATION_DURATION });
      backOpacity.value = withTiming(0, { duration: ANIMATION_DURATION });
      frontOpacity.value = withTiming(1, { duration: ANIMATION_DURATION });
    }
  }, [currentIndex, index]);

  useEffect(() => {
    if (gameState === GameState.START && index !== currentIndex) {
      rotateYAsDeg.value = INITIAL_ROTATION;
      backOpacity.value = 1;
      frontOpacity.value = 0;
    }
  }, [gameState, index, currentIndex]);

  const backCardStyle = useAnimatedStyle(() => ({
    opacity: backOpacity.value,
    transform: [{ perspective: PERSPECTIVE }],
  }));

  const frontCardStyle = useAnimatedStyle(() => ({
    opacity: frontOpacity.value,
    transform: [
      { perspective: PERSPECTIVE },
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
      <Animated.View style={[styles.cardFace, backCardStyle]}>
        <Image source={Back} style={styles.image} resizeMode="contain" />
      </Animated.View>
      <Animated.View style={[styles.cardFace, frontCardStyle]}>
        <Image source={front} style={styles.image} resizeMode="contain" />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Spacer.MEDIUM_16,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  cardIOS: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  cardAndroid: {
    borderWidth: 2,
    borderColor: Colors.black,
    elevation: 5,
  },
  cardFace: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backfaceVisibility: "hidden",
  },
  image: {
    borderRadius: Spacer.SMALL_8,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
});
