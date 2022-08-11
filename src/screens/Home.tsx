import React from "react";
import { View, StyleSheet } from "react-native";
import Button from "../components/Button";
import { Spacer } from "../styling/spacers";

/** TODO
 * - add Base page or something to all screens
 * - add formatter
 *  */

export default function Home() {
    return <View style={styles.container}>
        <View style={styles.buttonsContainer}>
            <Button label={"Start"} onPress={() => {}}/>
            <Button label={"Rules"} onPress={() => {}}/>
            <Button label={"Settings"} onPress={() => {}}/>
        </View>
    </View>
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'pink',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: 'space-around',
        margin: Spacer.MEDIUM_24,
        width: "60%",
        marginVertical: "50%",
    }
  });
  