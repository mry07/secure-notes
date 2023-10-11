import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GeneralContext } from "../../../context/general";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as Colors from "../../../utils/colors";

const WarningComponent = () => {
  const { encryptionKey } = React.useContext(GeneralContext);

  if (encryptionKey) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FontAwesomeIcon
        icon="triangle-exclamation"
        size={18}
        color={Colors.black(0.85)}
      />
      <Text>You have not a Encryption Key</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.yellow(0.85, "400"),
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    columnGap: 8,
  },
});

export default WarningComponent;
