import React, { useContext, useState } from "react";
import { ActionType, AppContext } from "../store/store";
import { CustomToggleButton } from "./CustomToggleButton";

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

  return <CustomToggleButton value={checked} onChange={handleChange} />;
}
