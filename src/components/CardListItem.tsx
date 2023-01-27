import React, { useContext } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
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
import { AppContext } from "../store/store";

function getIcon(index: number): string {
  switch (index % 4) {
    case 0:
      return "♠️";
    case 1:
      return "♥️";
    case 2:
      return "♣️";
    case 3:
      return "♦️";
    default:
      return "";
  }
}

interface CardListItemProps {
  card: { label: string; cards: CardName[] };
  index: number;
  y: SharedValue<number>;
  headerHeight: number;
  onPress: () => void;
}

const { height } = Dimensions.get("window");
const distanceBetweenItem = 10;
const itemHeight = 50;
const totalItemHeight = itemHeight + 2 * distanceBetweenItem;

export default function CardListItem(props: CardListItemProps) {
  const navHeaderHeight = useHeaderHeight();
  const {
    state: { isLightTheme },
  } = useContext(AppContext);
  const { index, card, y, headerHeight, onPress } = props;

  const listContentHeight = height - headerHeight - navHeaderHeight;
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        y.value,
        [
          (index + 1) * totalItemHeight - listContentHeight,
          (index + 2) * totalItemHeight - listContentHeight,
          index * totalItemHeight,
          (index + 1) * totalItemHeight,
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
              (index + 1) * totalItemHeight - listContentHeight,
              (index + 2) * totalItemHeight - listContentHeight,
              index * totalItemHeight,
              (index + 1) * totalItemHeight,
            ],
            [0, 1, 1, 0]
          ),
        },
      ],
    };
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View style={[styles.item, animatedStyle]} key={index}>
        <View>
          <DecoratedText
            textStyle={[styles.text]}
            text={`${getIcon(index)}  ${card.label}`}
          />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    marginVertical: distanceBetweenItem,
    alignSelf: "center",
    height: itemHeight,
    width: "90%",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: Spacer.MEDIUM_24,
    backgroundColor: Colors.secondary,
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: Font.LARGE,
    fontWeight: "bold",
    color: Colors.secondaryText,
  },
});
