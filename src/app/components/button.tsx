import React from "react";
import * as Colors from "../../utils/colors";
import {
  View,
  Text,
  PressableProps,
  Pressable,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from "react-native";

interface Props extends PressableProps {
  style?: StyleProp<ViewStyle>;
  title?: string;
}

const BUTTON_HEIGHT = 52;

const Button = ({ title, style, ...props }: Props) => {
  return (
    <Pressable {...props} style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black(0.85),
    height: BUTTON_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  title: {
    color: Colors.white(),
    fontSize: 14,
    fontWeight: "500",
  },
});

export default Button;
