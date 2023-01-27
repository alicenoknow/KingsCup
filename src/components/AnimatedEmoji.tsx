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

  const xVal = useSharedValue(Math.random() * width);
  const yVal = useSharedValue(Math.random() * height/2);

  useEffect(() => {
    xVal.value = Math.random() * width;
    yVal.value = Math.random() * height/2;
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: withTiming(
        yVal.value,
        {
          duration: 2000 + Math.random() * 3000,
        },
        () => {
          yVal.value = Math.random() * height/2;
          xVal.value = Math.random() * width;
        }
      ),
      left: withTiming(xVal.value, {
        duration: 2000 + Math.random() * 3000,
      },
      () => {
        yVal.value = Math.random() * height/2;
        xVal.value = Math.random() * width;
      }),
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          left: Math.random() * width,
          top: Math.random() * height,
        //   transform: [
        //     {
        //       rotateZ: `${Math.random() * 360}deg`,
        //     },
        //   ],
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
  },
});
