import React from "react";
import { StyleSheet, Image } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import { Colors } from "../styling/colors";
import { Spacer } from "../styling/spacers";
import { Card } from "../utils/cards";

interface CardProps {
  card: Card;
}

export default function ActionCard(props: CardProps) {
  const { card } = props;
  return (
    <Animated.View entering={SlideInDown}>
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
