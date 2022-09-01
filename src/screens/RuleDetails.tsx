import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const cardsShorts = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];

export default function Rules() {
  const renderItem = ({ item }: { item: string }) => {
    return <View>{item}</View>;
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          data={cardsShorts.map((name) => name + " ♥️♠️♦️♣️")}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
