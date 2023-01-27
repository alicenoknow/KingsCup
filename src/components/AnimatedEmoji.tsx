import React, { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Font } from "../styling/fonts";
import DecoratedText from "./DecoratedText";

interface EmojiProps {
  emoji: string;
}

const { width, height } = Dimensions.get("window");

export default function AnimatedEmoji(props: EmojiProps) {
  const { emoji } = props;

  const yVal = useSharedValue(Math.random() * height * 0.6);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: withTiming(
        yVal.value,
        {
          duration: 2000 + Math.random() * 3000,
        },
        () => {
          yVal.value = Math.random() * height * 0.6;
        }
      ),
    };
  }); 

  return (
    <Animated.View
      style={[
        styles.container,
        {
          left: Math.random() * width,
          top: Math.random() * height * 0.6,
        },
        animatedStyle,
      ]}
    >
      <DecoratedText textStyle={styles.text} text={emoji} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: Font.LARGE,
    zIndex: -1,
  },
  container: {
    position: "absolute",
    zIndex: -1,
    opacity: 0.5,
  },
});
