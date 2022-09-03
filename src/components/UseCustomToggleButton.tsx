import React from "react";
import { Switch } from "react-native";
import { Colors } from "../styling/colors";

interface UseCustomToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function UseCustomToggleButton({
  value,
  onChange,
}: UseCustomToggleProps) {
  return (
    <Switch
      trackColor={{ false: Colors.yellow, true: Colors.yellow }}
      thumbColor={Colors.white}
      onValueChange={onChange}
      value={value}
    />
  );
}
