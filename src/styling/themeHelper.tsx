import { Colors } from "./colors";

export function getBackgroundColor(isLightTheme: boolean) {
  return {
    backgroundColor: isLightTheme
      ? Colors.backgroundLight
      : Colors.backgroundDark,
  };
}

export function getOnBackgroundColor(isLightTheme: boolean) {
  return {
    color: isLightTheme ? Colors.onBackgroundLight : Colors.onBackgroundDark,
  };
}
