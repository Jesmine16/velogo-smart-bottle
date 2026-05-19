import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, ActivityIndicator } from "react-native";
import { colors, radii, shadows } from "../theme";

type Props = {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
  testID?: string;
};

export default function PrimaryButton({ title, onPress, variant = "primary", loading, disabled, style, testID }: Props) {
  const bg = variant === "primary" ? colors.primary : variant === "danger" ? colors.danger : colors.surfaceSecondary;
  const fg = variant === "secondary" ? colors.textPrimary : colors.white;
  return (
    <TouchableOpacity
      testID={testID}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
      style={[
        styles.btn,
        { backgroundColor: bg, opacity: disabled ? 0.5 : 1 },
        variant === "primary" && shadows.buttonPrimary,
        style,
      ]}
    >
      {loading ? <ActivityIndicator color={fg} /> : <Text style={[styles.txt, { color: fg }]}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 16,
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  txt: { fontSize: 16, fontWeight: "700" },
});
