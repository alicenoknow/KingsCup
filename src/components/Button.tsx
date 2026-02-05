import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Colors } from "../styling/colors";
import { Font } from "../styling/fonts";
import { Spacer } from "../styling/spacers";
import DecoratedText from "./DecoratedText";

interface ButtonProps {
  label: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { label, disabled, style, textStyle, onPress } = props;

  return (
    <TouchableOpacity style={[styles.button, style]} disabled={disabled} onPress={onPress}>
      <DecoratedText textStyle={[styles.text, textStyle]} text={label} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Spacer.MEDIUM_24,
    padding: Spacer.SMALL_8,
    backgroundColor: Colors.button
  },
  text: {
    fontSize: Font.LARGE,
    color: Colors.buttonText,
  },
});

export default React.memo(Button);