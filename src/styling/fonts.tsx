import { Platform } from "react-native";

export enum Font {
    SMALL = Platform.OS === "android" ? 16 : 14,
    MEDIUM = Platform.OS === "android" ? 18 : 16,
    LARGE = Platform.OS === "android" ? 22 : 20,
    X_LARGE = Platform.OS === "android" ? 26 : 24

}