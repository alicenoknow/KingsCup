import { Platform } from "react-native";

export enum Font {
    SMALL = Platform.OS === "android" ? 16 : 14,
    MEDIUM = Platform.OS === "android" ? 20 : 16,
    LARGE = Platform.OS === "android" ? 24 : 20,
    X_LARGE = Platform.OS === "android" ? 28 : 24,
    TITLE = Platform.OS === "android" ? 52 : 36
}