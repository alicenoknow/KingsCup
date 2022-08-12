import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import Button from "../components/Button";
import { Spacer } from "../styling/spacers";

interface HomeProps {
  navigation: NativeStackNavigationProp<ParamListBase, "Home">;
}

export default function Home(props: HomeProps) {
  const { navigation } = props;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button
          label={"Start"}
          onPress={() => {
            navigation.navigate("GameBoard");
          }}
        />
        <Button
          label={"Rules"}
          onPress={() => {
            navigation.navigate("Rules");
          }}
        />
        <Button
          label={"Settings"}
          onPress={() => {
            navigation.navigate("Settings");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "space-around",
    margin: Spacer.MEDIUM_24,
    marginTop: "30%",
    width: "60%",
  },
});
