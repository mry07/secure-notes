import React from "react";
import * as Colors from "../../../utils/colors";
import * as Biometric from "expo-local-authentication";
import Input from "../../components/input";
import Button from "../../components/button";
import { GeneralContext } from "../../../context/general";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, StyleSheet, Alert, Pressable } from "react-native";

const Auth = () => {
  const { login } = React.useContext(GeneralContext);

  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");

  /** **************************************** */

  // effect

  React.useEffect(() => {
    handleBiometric();
  }, []);

  /** **************************************** */

  // function

  const handleBiometric = async () => {
    const hasHardware = await Biometric.hasHardwareAsync();
    if (hasHardware) {
      const result = await Biometric.authenticateAsync({});
      if (result.success !== false) {
        login({ biometric: true });
      } else {
        if (result.error !== "user_cancel") {
          Alert.alert("Failed", "Biometric authentication failed", [
            { text: "OK" },
          ]);
        }
      }
    }
  };

  /** **************************************** */

  // render

  return (
    <View style={styles.container}>
      <View style={infoStyles.container}>
        <FontAwesomeIcon
          icon="circle-info"
          size={18}
          color={Colors.blue(0.85)}
        />
        <Text style={infoStyles.text}>
          Use password:
          <Text style={infoStyles.textWithWeight}> test1234</Text>
        </Text>
      </View>

      <Input
        containerStyle={styles.input}
        label="Password"
        placeholder="Enter your password"
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        onChangeText={setPassword}
        onIconRightPress={() => setShowPassword(!showPassword)}
        iconRight={() => (
          <FontAwesomeIcon
            icon={showPassword ? "eye" : "eye-slash"}
            color={Colors.grey(undefined, "700")}
          />
        )}
      />

      <Button
        style={styles.button}
        title="Enter"
        onPress={() => login({ password })}
      />

      <Pressable style={styles.biometric} onPress={handleBiometric}>
        <Text style={styles.biometricText}>Use Biometric</Text>
        <FontAwesomeIcon icon="fingerprint" size={16} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.white(0.7),
    rowGap: 16,
  },
  input: {
    marginHorizontal: 16,
  },
  button: {
    marginHorizontal: 16,
  },
  biometric: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 8,
  },
  biometricText: {
    fontSize: 14,
    fontWeight: "500",
  },
});

const infoStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blue(0.2, "400"),
    padding: 16,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    marginHorizontal: 16,
  },
  text: {
    color: Colors.black(0.7),
  },
  textWithWeight: {
    fontWeight: "500",
  },
});

export default Auth;
