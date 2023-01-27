import React, { useContext } from "react";
import {
  TouchableOpacity,
  Text,
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
import { getButtonColor, getOnButtonColor } from "../styling/themeHelper";
import DecoratedText from "./DecoratedText";

interface ButtonProps {
  label: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  onPress: () => void;
}

export default function Button(props: ButtonProps) {
  const { label, disabled, style, textStyle, onPress } = props;
  const { state: { isLightTheme } } = useContext(AppContext);

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={[styles.button, getButtonColor(isLightTheme), style]}>
        <DecoratedText textStyle={[styles.text, getOnButtonColor(isLightTheme), textStyle]} text={label} />
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
  },
  text: {
    fontSize: Font.LARGE,
  },
});
