import React, { useContext, useState } from "react";
import { Switch } from "react-native";
import { ActionType, AppContext } from "../store/store";
import { Colors } from "../styling/colors";

export function ThemeToggleButton() {
  const {
    state: { isLightTheme },
    dispatch,
  } = useContext(AppContext);
  const [checked, setChecked] = useState<boolean>(isLightTheme);

  const handleChange = (value: boolean) => {
    dispatch({ type: ActionType.CHANGE_THEME, payload: undefined });
    setChecked(value);
  };

  return (
    <Switch
      trackColor={{ false: Colors.yellow, true: Colors.yellow }}
      thumbColor={Colors.white}
      ios_backgroundColor={Colors.grey}
      onValueChange={handleChange}
      value={checked}
    />
  );
}
