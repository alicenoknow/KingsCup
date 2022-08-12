import React from "react";
import { TouchableOpacity, Text, View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Colors } from "../styling/colors";
import { Spacer } from "../styling/spacers";

export default function HelpIcon() {
    return (
    <TouchableOpacity onPress={() => {}}>
        <View style={styles.icon} />
    </TouchableOpacity>);
}


const styles = StyleSheet.create({
    icon: {
      backgroundColor: Colors.blue,
      color: Colors.black,
      borderRadius: Spacer.SMALL_8,
      margin: Spacer.SMALL_8,
      height: 30,
      width: 30,
    },
  });