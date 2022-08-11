import React from "react";
import { View, StyleSheet } from "react-native";

export default function GameBoard() {
    return <View style={styles.container}/>
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  