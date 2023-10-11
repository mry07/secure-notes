import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import * as Colors from "../../../utils/colors";
import { GeneralContext } from "../../../context/general";

const BUTTON_PLUS_SIZE = 56;

// floating action button
const FabComponent = ({ navigation }: any) => {
  const { encryptionKey, logout } = React.useContext(GeneralContext);

  return (
    <View style={styles.container}>
      {encryptionKey && (
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("ManageNote")}
        >
          <FontAwesomeIcon icon="plus" size={18} color={Colors.white()} />
        </Pressable>
      )}

      <Pressable style={styles.button} onPress={logout}>
        <FontAwesomeIcon
          icon="arrow-right-from-bracket"
          size={18}
          color={Colors.red(undefined, "400")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    rowGap: 8,
  },
  button: {
    height: BUTTON_PLUS_SIZE,
    width: BUTTON_PLUS_SIZE,
    borderRadius: BUTTON_PLUS_SIZE * 0.5,
    backgroundColor: Colors.black(0.85),
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FabComponent;
