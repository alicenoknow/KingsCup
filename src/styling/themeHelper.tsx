import { Colors } from "./colors";

export function getBackgroundColor(
  isLightTheme: boolean,
  hasOpacity?: boolean
) {
  return {
    backgroundColor: isLightTheme
      ? `${Colors.backgroundLight}${hasOpacity ? "dd" : ""}`
      : `${Colors.backgroundDark}${hasOpacity ? "dd" : ""}`,
  };
}

export function getOnBackgroundColor(isLightTheme: boolean) {
  return {
    color: isLightTheme ? Colors.onBackgroundLight : Colors.onBackgroundDark,
  };
}
