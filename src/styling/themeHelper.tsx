import { Colors } from "./colors";

export function getBackgroundColor(isLightTheme: boolean, hasOpacity?: boolean) {
  return {
    backgroundColor: isLightTheme
      ? `${Colors.backgroundLight}${hasOpacity ? 66 : ''}`
      : `${Colors.backgroundDark}${hasOpacity ? 66 : ''}`,
  };
}

export function getOnBackgroundColor(isLightTheme: boolean) {
  return {
    color: isLightTheme ? Colors.onBackgroundLight : Colors.onBackgroundDark,
  };
}

export function getButtonColor(isLightTheme: boolean) {
  return {
    backgroundColor: isLightTheme ? Colors.buttonOnLight : Colors.buttonOnDark,
  };
}

export function getOnButtonColor(isLightTheme: boolean) {
  return {
    color: isLightTheme ? Colors.buttonTextOnLight : Colors.buttonTextOnDark,
  };
}

export function getSecondaryColor(isLightTheme: boolean) {
  return {
    backgroundColor: isLightTheme ? Colors.secondaryOnLight : Colors.secondaryOnDark,
  };
}

export function getOnSecondaryColor(isLightTheme: boolean) {
  return {
    color: isLightTheme ? Colors.secondaryTextOnLight : Colors.secondaryTextOnDark,
  };
}
