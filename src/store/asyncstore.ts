import AsyncStorage from "@react-native-async-storage/async-storage";
import { CardName } from "../utils/cards";

const USE_CUSTOM_KEY = "USE_CUSTOM_KEY";
const RULES_SET_KEY = "RULES_SET_KEY";

export const storeUseCustomInfo = async (value: boolean) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(USE_CUSTOM_KEY, jsonValue);
  } catch (e) {
    console.warn("ERROR :: Cannot save use custom to async storage");
  }
};

export const storeCustomRulesSetData = async (
  value: { [key in CardName]: string }
) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(RULES_SET_KEY, jsonValue);
  } catch (e) {
    console.warn("ERROR :: Cannot save rules set to async storage");
  }
};

export const getUseCustomInfo = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USE_CUSTOM_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.warn("ERROR :: Cannot read use custom from async storage");
  }
};

export const getCustomRulesSetData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(RULES_SET_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.warn("ERROR :: Cannot read rules set from async storage");
  }
};
