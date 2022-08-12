import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import Button from "../components/Button";
import { Card } from "../utils/cards";

export default function GameBoard() {
  return (
    <SafeAreaView style={styles.container}>
      <Button label="Next" onPress={() => {}} />
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
  iconContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
});
