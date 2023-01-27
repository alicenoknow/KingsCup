import React from "react";
import { Text, StyleSheet, StyleProp, TextStyle, Platform } from "react-native";

interface TextProps {
  text: string;
  textStyle: StyleProp<TextStyle>;
}

export default function DecoratedText(props: TextProps) {
  const { text, textStyle } = props;
  return <Text style={[styles.text, textStyle]}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: Platform.OS === "android" ? "monospace" : undefined,
  },
});
