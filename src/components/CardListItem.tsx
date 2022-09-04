import React from "react";
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
          <Text style={styles.text}>{`${getIcon(index)}  ${card.label}`}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    marginVertical: distanceBetweenItem,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: itemHeight,
    width: "90%",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: Colors.yellow,
  },
  text: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
