import React from "react";
import { TouchableOpacity, Text, View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Colors } from "../styling/colors";
import { Spacer } from "../styling/spacers";

interface ButtonProps {
    label: string;
    style?: StyleProp<ViewStyle>;
    disabled?: boolean;
    onPress: () => void;
}

export default function Button(props:  ButtonProps) {
    const { label, disabled, style, onPress } = props;

    return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
        <View style={[styles.button, style]}>
            <Text style={{ fontSize: 24 }}>
                {label}
            </Text>
        </View>
    </TouchableOpacity>);
}


const styles = StyleSheet.create({
    button: {
      backgroundColor: Colors.white,
      color: Colors.black,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: Spacer.MEDIUM_24,
      padding: Spacer.SMALL_8,
    },
  });