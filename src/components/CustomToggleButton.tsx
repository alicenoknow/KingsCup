import React, { useContext } from "react";
import { Switch } from "react-native";
import { AppContext } from "../store/store";
import { Colors } from "../styling/colors";
import { getButtonColor } from "../styling/themeHelper";

interface UseCustomToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function CustomToggleButton({
  value,
  onChange,
}: UseCustomToggleProps) {
  const { state: { isLightTheme } } = useContext(AppContext);
  const toggleColor = getButtonColor(isLightTheme).backgroundColor;
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
