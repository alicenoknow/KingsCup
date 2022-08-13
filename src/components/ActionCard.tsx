import React from "react";
import { StyleSheet, Image, StyleProp, ViewStyle } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import { AnimatedStyle } from "react-native-reanimated/lib/types/lib/reanimated2/commonTypes";
import { Colors } from "../styling/colors";
import { Spacer } from "../styling/spacers";
import { Card } from "../utils/cards";

interface CardProps {
  card: Card;
  style: any; // TODO
}

export default function ActionCard(props: CardProps) {
  const { card, style } = props;
  return (
    <Animated.View style={style} entering={SlideInDown}>
      <Image
        source={card.img}
        style={{
          width: 200,
          height: 200,
          resizeMode: "contain",
        }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.white,
    color: Colors.black,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Spacer.MEDIUM_24,
    padding: Spacer.SMALL_8,
  },
});
