import React from "react";
import * as Colors from "../../utils/colors";
import {
  View,
  Text,
  TextInput,
  StyleProp,
  ViewStyle,
  TextInputProps,
  Pressable,
  StyleSheet,
} from "react-native";

interface Props extends TextInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  label?: string;
  onIconRightPress?: (event: any) => void;
  iconRight?: (size: number) => React.ReactNode;
}

const INPUT_HEIGHT = 52;

const Input = ({
  containerStyle,
  label,
  onIconRightPress,
  iconRight,
  ...props
}: Props) => {
  return (
    <View style={containerStyle}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput {...props} style={styles.input} />
        </View>
        {iconRight && (
          <Pressable style={styles.iconRight} onPress={onIconRightPress}>
            {iconRight(16)}
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.grey(0.5),
    height: INPUT_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 10,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    flexGrow: 1,
    height: INPUT_HEIGHT,
    paddingLeft: 16,
  },
  iconRight: {
    height: INPUT_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 16,
  },
});

export default Input;
