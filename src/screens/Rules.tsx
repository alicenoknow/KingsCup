import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { getUseCustomInfo, storeUseCustomInfo } from "../store/asyncstore";
import { Colors } from "../styling/colors";
import { Screens } from "./types";

const cardsShorts = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
interface RulesProps {
  navigation: NativeStackNavigationProp<ParamListBase, Screens.RULES>;
}

export default function Rules({ navigation }: RulesProps) {
  const [useCustom, setUseCustom] = useState<boolean | null>();

  useEffect(() => {
    const getRules = async () => {
      const useCustomInfo = await getUseCustomInfo();
      setUseCustom(useCustomInfo);
    };
    getRules();
  }, []);

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate(Screens.RULES_DETAILS, {})}
        >
          <Text style={styles.text}>{item}</Text>
        </TouchableOpacity>
        {index !== cardsShorts.length - 1 && <View style={styles.divider} />}
      </>
    );
  };

  const onSwitch = () => {
    const newValue = !useCustom;
    setUseCustom(newValue);
    storeUseCustomInfo(newValue);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Set custom rules</Text>
      <Text style={styles.subtitle}>or just check out existing ones</Text>
      <Text style={styles.statusText}>
        {useCustom
          ? "You're now using default set of rules"
          : "You're now using custom set of rules"}
      </Text>
      <TouchableOpacity style={styles.switch} onPress={onSwitch}>
        <Text style={[styles.statusText, styles.white]}>Switch 🔁</Text>
      </TouchableOpacity>
      <FlatList
        data={cardsShorts.map((name) => ` ♥️♠️ ${name} ♦️♣️`)}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    width: "100%",
  },
  content: {
    width: "100%",
    backgroundColor: "pink",
  },
  item: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignContent: "center",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.grey,
  },
  text: {
    textAlign: "center",
  },
  switch: {
    padding: 10,
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    marginHorizontal: "30%",
    marginVertical: 10,
    color: Colors.white,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 20,
  },
  statusText: {
    textAlign: "center",
  },
  white: {
    color: Colors.secondaryText,
  },
});
