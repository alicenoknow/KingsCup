import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import Button from "../components/Button";
import { Colors } from "../styling/colors";
import { Spacer } from "../styling/spacers";
import { Screens } from "./types";

interface HomeProps {
  navigation: NativeStackNavigationProp<ParamListBase, Screens.HOME>;
}

export default function Home(props: HomeProps) {
  const { navigation } = props;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button
          label={"Start"}
          style={styles.button}
          onPress={() => {
            navigation.navigate(Screens.GAME_BOARD);
          }}
        />
        <Button
          label={"Rules"}
          style={styles.button}
          onPress={() => {
            navigation.navigate(Screens.RULES);
          }}
        />
      </View>
      <Text style={styles.bottom}>created by alicenoknow</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    flex: 1,
    margin: Spacer.MEDIUM_24,
    marginTop: "30%",
    width: "60%",
  },
  button: {
    marginVertical: 20,
  },
  bottom: {
    color: Colors.primaryText,
  },
});
