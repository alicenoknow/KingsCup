import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { AppContext } from "../store/store";
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
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={[styles.button, style]}>
        <DecoratedText textStyle={[styles.text, textStyle]} text={label} />
      </View>
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