import React from "react";
import { Switch } from "react-native";
import { Colors } from "../styling/colors";

interface UseCustomToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function CustomToggleButton({
  value,
  onChange,
}: UseCustomToggleProps) {
  const toggleColor = Colors.button;
  return (
    <Switch
      trackColor={{ false: toggleColor, true: toggleColor }}
      thumbColor={Colors.white}
      ios_backgroundColor={toggleColor}
      onValueChange={onChange}
      value={value}
    />
  );
}
