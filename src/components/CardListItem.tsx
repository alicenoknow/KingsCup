import React from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { TouchableOpacity, View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Colors } from "../styling/colors";
import { CardName } from "../utils/cards";
import { Font } from "../styling/fonts";
import DecoratedText from "./DecoratedText";
import { Spacer } from "../styling/spacers";

const { height: windowHeight } = Dimensions.get("window");

const ICONS = ["♠️", "♥️", "♣️", "♦️"];
const ITEM_TOTAL_HEIGHT = Spacer.LARGE_48 + 2 * Spacer.SMALL_8;

function getIcon(index: number): string {
  return ICONS[index % ICONS.length];
}

interface CardListItemProps {
  card: { label: string; cards: CardName[] };
  index: number;
  y: SharedValue<number>;
  headerHeight: number;
  onPress: () => void;
}

export default function CardListItem({
  card,
  index,
  y,
  headerHeight,
  onPress,
}: CardListItemProps) {
  const navHeaderHeight = useHeaderHeight();
  const listContentHeight = windowHeight - headerHeight - navHeaderHeight;

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      y.value,
      [
        (index + 1) * ITEM_TOTAL_HEIGHT - listContentHeight,
        (index + 2) * ITEM_TOTAL_HEIGHT - listContentHeight,
        index * ITEM_TOTAL_HEIGHT,
        (index + 1) * ITEM_TOTAL_HEIGHT,
      ],
      [0, 1, 1, 0],
      {
        extrapolateRight: Extrapolation.CLAMP,
        extrapolateLeft: Extrapolation.CLAMP,
      }
    ),
    transform: [
      {
        scale: interpolate(
          y.value,
          [
            (index + 1) * ITEM_TOTAL_HEIGHT - listContentHeight,
            (index + 2) * ITEM_TOTAL_HEIGHT - listContentHeight,
            index * ITEM_TOTAL_HEIGHT,
            (index + 1) * ITEM_TOTAL_HEIGHT,
          ],
          [0, 1, 1, 0],
          {
            extrapolateRight: Extrapolation.CLAMP,
            extrapolateLeft: Extrapolation.CLAMP,
          }
        ),
      },
    ],
  }));

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View style={[styles.item, animatedStyle]} key={index}>
        <View>
          <DecoratedText
            textStyle={styles.text}
            text={`${getIcon(index)}  ${card.label}`}
          />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    marginVertical: Spacer.SMALL_8,
    alignSelf: "center",
    height: Spacer.LARGE_48,
    width: "90%",
    justifyContent: "center",
    borderRadius: Spacer.MEDIUM_24,
    backgroundColor: Colors.secondary,
  },
  text: {
    textAlign: "center",
    fontSize: Font.LARGE,
    fontWeight: "bold",
    color: Colors.secondaryText,
  },
});
