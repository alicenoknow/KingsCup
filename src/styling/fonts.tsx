import { Platform } from "react-native";

export enum Font {
  SMALL = Platform.OS === "android" ? 16 : 10,
  MEDIUM = Platform.OS === "android" ? 20 : 12,
  LARGE = Platform.OS === "android" ? 24 : 14,
  X_LARGE = Platform.OS === "android" ? 28 : 18,
  TITLE = Platform.OS === "android" ? 52 : 26,
}
