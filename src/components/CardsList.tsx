import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { Screens } from "../screens/types";
import { Spacer } from "../styling/spacers";
import { CardName } from "../utils/cards";
import CardListItem from "./CardListItem";

interface CardListItemProps {
  label: string;
  cards: CardName[];
}

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const cardsItems: CardListItemProps[] = [
  {
    label: "2",
    cards: [
      CardName.CLUB2,
      CardName.HEART2,
      CardName.SPADE2,
      CardName.DIAMOND2,
    ],
  },
  {
    label: "3",
    cards: [
      CardName.CLUB3,
      CardName.HEART3,
      CardName.SPADE3,
      CardName.DIAMOND3,
    ],
  },
  {
    label: "4",
    cards: [
      CardName.CLUB4,
      CardName.HEART4,
      CardName.SPADE4,
      CardName.DIAMOND4,
    ],
  },
  {
    label: "5",
    cards: [
      CardName.CLUB5,
      CardName.HEART5,
      CardName.SPADE5,
      CardName.DIAMOND5,
    ],
  },
  {
    label: "6",
    cards: [
      CardName.CLUB6,
      CardName.HEART6,
      CardName.SPADE6,
      CardName.DIAMOND6,
    ],
  },
  {
    label: "7",
    cards: [
      CardName.CLUB7,
      CardName.HEART7,
      CardName.SPADE7,
      CardName.DIAMOND7,
    ],
  },
  {
    label: "8",
    cards: [
      CardName.CLUB8,
      CardName.HEART8,
      CardName.SPADE8,
      CardName.DIAMOND8,
    ],
  },
  {
    label: "9",
    cards: [
      CardName.CLUB9,
      CardName.HEART9,
      CardName.SPADE9,
      CardName.DIAMOND9,
    ],
  },
  {
    label: "10",
    cards: [
      CardName.CLUB10,
      CardName.HEART10,
      CardName.SPADE10,
      CardName.DIAMOND10,
    ],
  },
  {
    label: "J",
    cards: [
      CardName.CLUB_J,
      CardName.HEART_J,
      CardName.SPADE_J,
      CardName.DIAMOND_J,
    ],
  },
  {
    label: "Q",
    cards: [
      CardName.CLUB_Q,
      CardName.HEART_Q,
      CardName.SPADE_Q,
      CardName.DIAMOND_Q,
    ],
  },
  {
    label: "A",
    cards: [
      CardName.CLUB_A,
      CardName.HEART_A,
      CardName.SPADE_A,
      CardName.DIAMOND_A,
    ],
  },
  {
    label: "K",
    cards: [CardName.KING],
  },
];

interface CardListProps {
  navigation: NativeStackNavigationProp<ParamListBase, Screens.RULES>;
  headerHeight: number;
}

export default function CardsList({ headerHeight, navigation }: CardListProps) {
  const y = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    y.value = event.contentOffset.y;
  });

  const renderItem = ({ index, item }: { index: number; item: unknown }) => (
    <CardListItem
      index={index}
      y={y}
      card={item as CardListItemProps} // TODO idk ts issue
      onPress={() =>
        navigation.navigate(Screens.RULES_DETAILS, {
          cards: (item as CardListItemProps).cards,
          label: (item as CardListItemProps).label,
        })
      }
      headerHeight={headerHeight}
    />
  );

  return (
    <View style={styles.list}>
      <AnimatedFlatList
        scrollEventThrottle={16}
        bounces={false}
        data={cardsItems}
        renderItem={renderItem}
        onScroll={scrollHandler}
        ListFooterComponent={<View style={styles.footer} />}
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    width: "100%",
    height: 150,
  },
  list: {
    flex: 1,
    width: "100%",
  },
  contentList: {
    paddingTop: Spacer.MEDIUM_24,
  },
});
