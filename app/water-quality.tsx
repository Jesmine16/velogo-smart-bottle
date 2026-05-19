import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle, Defs, LinearGradient as SvgLG, Stop } from "react-native-svg";
import Card from "../src/components/Card";
import { colors, radii } from "../src/theme";
import { mockWaterQuality } from "../src/mockData";

export default function WaterQuality() {
  const router = useRouter();
  const score = mockWaterQuality.score;
  const size = 220;
  const stroke = 22;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);

  return (
    <SafeAreaView style={styles.root} edges={["top"]} testID="water-quality-screen">
      <View style={styles.header}>
        <TouchableOpacity testID="back-btn" onPress={() => router.back()} style={styles.iconBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Water Quality</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 22, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <View style={styles.gaugeWrap} testID="quality-gauge">
          <Svg width={size} height={size}>
            <Defs>
              <SvgLG id="qg" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={colors.success} />
                <Stop offset="1" stopColor={colors.primary} />
              </SvgLG>
            </Defs>
            <Circle cx={size / 2} cy={size / 2} r={r} stroke={colors.surfaceSecondary} strokeWidth={stroke} fill="none" />
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke="url(#qg)"
              strokeWidth={stroke}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${circ} ${circ}`}
              strokeDashoffset={offset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </Svg>
          <View style={styles.gaugeCenter} pointerEvents="none">
            <Text style={styles.scoreLabel}>QUALITY SCORE</Text>
            <Text style={styles.scoreValue}>{score}</Text>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusTxt}>{mockWaterQuality.status}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.note}>
          Your water is safe and clean. UV-C sterilization active.
        </Text>

        <View style={styles.metricsGrid}>
          <MetricBox icon="bug-outline" label="Bacteria" value={mockWaterQuality.bacteriaLevel} color={colors.success} />
          <MetricBox icon="flask-outline" label="pH Level" value={`${mockWaterQuality.ph}`} color={colors.primary} />
          <MetricBox icon="speedometer-outline" label="TDS" value={`${mockWaterQuality.tds} ppm`} color={colors.cyan} />
          <MetricBox icon="thermometer-outline" label="Temp" value="18°C" color={colors.warning} />
        </View>

        <Text style={styles.section}>Quality Indicator</Text>
        <Card>
          <View style={styles.indicatorBar}>
            <View style={[styles.indicatorFill, { width: `${score}%` }]} />
            <View style={[styles.indicatorMarker, { left: `${score}%` }]} />
          </View>
          <View style={styles.indicatorLabels}>
            <Text style={styles.idxLabel}>Poor</Text>
            <Text style={styles.idxLabel}>Fair</Text>
            <Text style={[styles.idxLabel, { color: colors.success, fontWeight: "800" }]}>Excellent</Text>
          </View>
        </Card>

        <Text style={styles.section}>Cleaning</Text>
        <Card>
          <View style={styles.cleanRow}>
            <View style={styles.cleanIcon}><Ionicons name="sparkles" size={20} color={colors.primary} /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cleanTitle}>Last Cleaned</Text>
              <Text style={styles.cleanSub}>{mockWaterQuality.lastCleaned}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.cleanRow}>
            <View style={[styles.cleanIcon, { backgroundColor: "#FFF4E6" }]}><Ionicons name="time-outline" size={20} color={colors.warning} /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cleanTitle}>Next Cleaning</Text>
              <Text style={styles.cleanSub}>{mockWaterQuality.nextCleaning}</Text>
            </View>
          </View>
          <TouchableOpacity testID="clean-now-btn" style={styles.cleanBtn}>
            <Ionicons name="water" size={18} color={colors.white} />
            <Text style={styles.cleanBtnTxt}>Run UV-C Cleaning</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

function MetricBox({ icon, label, value, color }: any) {
  return (
    <View style={styles.metricBox}>
      <View style={[styles.metricIcon, { backgroundColor: color + "1A" }]}>
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 22, paddingTop: 8 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border },
  headerTitle: { fontSize: 17, fontWeight: "800", color: colors.textPrimary },
  gaugeWrap: { alignItems: "center", justifyContent: "center", marginTop: 16 },
  gaugeCenter: { position: "absolute", alignItems: "center" },
  scoreLabel: { fontSize: 11, fontWeight: "700", color: colors.textSecondary, letterSpacing: 0.8 },
  scoreValue: { fontSize: 72, fontWeight: "900", color: colors.textPrimary, letterSpacing: -2, marginTop: 4 },
  statusBadge: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#E8F8EE", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, marginTop: 8 },
  statusDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.success },
  statusTxt: { fontSize: 12, fontWeight: "700", color: colors.success },
  note: { textAlign: "center", color: colors.textSecondary, marginTop: 18, fontSize: 13, lineHeight: 19 },
  metricsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginTop: 20 },
  metricBox: { width: "48%", backgroundColor: colors.surface, borderRadius: radii.lg, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: colors.borderLight },
  metricIcon: { width: 36, height: 36, borderRadius: 12, alignItems: "center", justifyContent: "center", marginBottom: 10 },
  metricLabel: { fontSize: 11, fontWeight: "700", color: colors.textSecondary, textTransform: "uppercase", letterSpacing: 0.5 },
  metricValue: { fontSize: 17, fontWeight: "800", color: colors.textPrimary, marginTop: 4 },
  section: { fontSize: 13, fontWeight: "800", color: colors.textSecondary, textTransform: "uppercase", letterSpacing: 0.6, marginTop: 12, marginBottom: 10 },
  indicatorBar: { height: 12, backgroundColor: colors.surfaceSecondary, borderRadius: 6, overflow: "visible", position: "relative" },
  indicatorFill: { height: 12, backgroundColor: colors.success, borderRadius: 6 },
  indicatorMarker: { position: "absolute", top: -4, width: 20, height: 20, borderRadius: 10, backgroundColor: colors.white, borderWidth: 3, borderColor: colors.success, marginLeft: -10 },
  indicatorLabels: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  idxLabel: { fontSize: 12, color: colors.textSecondary, fontWeight: "600" },
  cleanRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  cleanIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: colors.primaryLight, alignItems: "center", justifyContent: "center" },
  cleanTitle: { fontSize: 14, fontWeight: "700", color: colors.textPrimary },
  cleanSub: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  divider: { height: 1, backgroundColor: colors.borderLight, marginVertical: 12 },
  cleanBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: colors.primary, paddingVertical: 14, borderRadius: radii.pill, marginTop: 16 },
  cleanBtnTxt: { color: colors.white, fontSize: 15, fontWeight: "700" },
});
