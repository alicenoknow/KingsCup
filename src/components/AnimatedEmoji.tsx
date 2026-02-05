import React, { useEffect, useMemo, useRef } from "react";
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

  const minY = Spacer.MEDIUM_16;
  const maxY = height - Spacer.FOOTER;
  const minX = Spacer.MEDIUM_16;
  const maxX = width - Spacer.LARGE_48 - Spacer.SMALL_8;

  const left = useMemo(
    () => minX + Math.random() * Math.max(0, maxX - minX),
    [minX, maxX]
  );
  const initialY = useMemo(
    () => minY + Math.random() * Math.max(0, maxY - minY),
    [minY, maxY]
  );

  const yVal = useSharedValue(initialY);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      const nextY = minY + Math.random() * Math.max(0, maxY - minY);
      const duration = 2000 + Math.random() * 3000;
      yVal.value = withTiming(nextY, { duration });
      timerRef.current = setTimeout(tick, duration);
    };

    tick();

    return () => {
      cancelled = true;
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [minY, maxY, yVal]);

  const animatedStyle = useAnimatedStyle(() => ({
    top: yVal.value,
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        { left },
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
