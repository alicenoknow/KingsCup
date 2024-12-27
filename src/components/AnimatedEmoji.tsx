import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Font } from "../styling/fonts";
import DecoratedText from "./DecoratedText";
import { Spacer } from "../styling/spacers";

interface EmojiProps {
  emoji: string;
}

const { width, height } = Dimensions.get("window");

export default function AnimatedEmoji(props: EmojiProps) {
  const { emoji } = props;

  const yVal = useSharedValue(Spacer.MEDIUM_16 + Math.random() * (height - Spacer.FOOTER));

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: withTiming(
        yVal.value,
        {
          duration: 2000 + Math.random() * 3000,
        },
        () => {
          yVal.value = Spacer.MEDIUM_16 + Math.random() * (height - Spacer.FOOTER)
        }
      ),
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          left: Spacer.MEDIUM_16 + Math.random() * (width - Spacer.LARGE_48 - Spacer.SMALL_8),
          top: Spacer.MEDIUM_16 + Math.random() * (height - Spacer.FOOTER)
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
  },
  container: {
    position: "absolute",
    opacity: 0.5,
  },
});
