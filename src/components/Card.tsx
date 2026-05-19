import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { colors, radii, shadows } from "../theme";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  testID?: string;
};

export default function Card({ children, style, testID }: Props) {
  return (
    <View testID={testID} style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: 20,
    ...shadows.card,
  },
});
