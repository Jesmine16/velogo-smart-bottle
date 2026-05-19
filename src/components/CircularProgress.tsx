import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { colors } from "../theme";

type Props = {
  size?: number;
  strokeWidth?: number;
  progress: number; // 0..1
  current: number;
  goal: number;
};

export default function CircularProgress({ size = 240, strokeWidth = 18, progress, current, goal }: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(1, Math.max(0, progress)));
  const pct = Math.round(progress * 100);

  return (
    <View style={[styles.wrap, { width: size, height: size }]} testID="dashboard-hydration-progress">
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={colors.primary} />
            <Stop offset="1" stopColor={colors.cyan} />
          </LinearGradient>
        </Defs>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.primaryLight}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#grad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.center} pointerEvents="none">
        <Text style={styles.pct} testID="hydration-percentage">{pct}%</Text>
        <Text style={styles.amount}>{current} <Text style={styles.unit}>ml</Text></Text>
        <Text style={styles.goal}>of {goal} ml goal</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", justifyContent: "center" },
  center: { position: "absolute", alignItems: "center" },
  pct: { fontSize: 14, color: colors.primary, fontWeight: "700", letterSpacing: 1 },
  amount: { fontSize: 44, fontWeight: "900", color: colors.textPrimary, marginTop: 4, letterSpacing: -1 },
  unit: { fontSize: 18, fontWeight: "600", color: colors.textSecondary },
  goal: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
});
