import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GeneralContext } from "../../../context/general";
import * as Colors from "../../../utils/colors";

const EncryptComponent = ({ encryptedNote }: any) => {
  const { encryptionKey } = React.useContext(GeneralContext);

  if (!encryptionKey) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Encryption Key:</Text>
        <Text>{encryptionKey}</Text>
      </View>

      {Boolean(encryptedNote) && (
        <View>
          <Text style={styles.label}>Encrypted Note:</Text>
          <Text>{encryptedNote}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blue(0.25),
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 10,
    rowGap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
  },
});

export default EncryptComponent;
