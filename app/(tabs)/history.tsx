import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { BarChart } from "react-native-chart-kit";
import Card from "../../src/components/Card";
import { colors, radii } from "../../src/theme";
import { mockHydration } from "../../src/mockData";

const SCREEN_W = Dimensions.get("window").width;

export default function History() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("weekly");

  const data =
    period === "daily"
      ? { labels: mockHydration.dailyLabels, values: mockHydration.daily }
      : period === "weekly"
      ? { labels: mockHydration.weeklyLabels, values: mockHydration.weekly }
      : { labels: mockHydration.monthlyLabels, values: mockHydration.monthly };

  const avg = Math.round(data.values.reduce((a, b) => a + b, 0) / data.values.length);
  const best = Math.max(...data.values);

  return (
    <SafeAreaView style={styles.root} edges={["top"]} testID="history-screen">
      <View style={styles.header}>
        <Text style={styles.title}>History</Text>
        <TouchableOpacity testID="share-btn" style={styles.iconBtn}>
          <Ionicons name="share-outline" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 22, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <View style={styles.tabs}>
          {(["daily", "weekly", "monthly"] as const).map((p) => (
            <TouchableOpacity
              key={p}
              testID={`tab-${p}`}
              onPress={() => setPeriod(p)}
              style={[styles.tab, period === p && styles.tabActive]}
            >
              <Text style={[styles.tabTxt, period === p && styles.tabTxtActive]}>{p[0].toUpperCase() + p.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.summaryRow}>
          <SumCard label="Average" value={`${avg}`} unit="ml" />
          <SumCard label="Best Day" value={`${best}`} unit="ml" />
          <SumCard label="Streak" value={`${mockHydration.streak}`} unit="days" />
        </View>

        <Card style={styles.chartCard} testID="hydration-chart-card">
          <Text style={styles.cardTitle}>Water Intake</Text>
          <Text style={styles.cardSub}>{period === "daily" ? "Today" : period === "weekly" ? "This Week" : "This Month"}</Text>
          <View style={styles.chartWrap}>
            <BarChart
              data={{
                labels: data.labels,
                datasets: [{ data: data.values }],
              }}
              width={SCREEN_W - 44 - 32}
              height={210}
              yAxisLabel=""
              yAxisSuffix=""
              fromZero
              withInnerLines={false}
              showValuesOnTopOfBars={false}
              chartConfig={{
                backgroundGradientFrom: "#FFFFFF",
                backgroundGradientTo: "#FFFFFF",
                decimalPlaces: 0,
                color: (o = 1) => `rgba(0, 122, 255, ${o})`,
                labelColor: () => colors.textSecondary,
                barPercentage: 0.55,
                fillShadowGradientFrom: colors.primary,
                fillShadowGradientFromOpacity: 1,
                fillShadowGradientTo: colors.cyan,
                fillShadowGradientToOpacity: 0.7,
                propsForBackgroundLines: { stroke: "transparent" },
              }}
              style={{ marginLeft: -16 }}
              flatColor
              withCustomBarColorFromData={false}
            />
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Drinking Log</Text>
        <Card>
          {mockHydration.intakeToday.map((it, idx) => (
            <View key={idx} style={[styles.logRow, idx > 0 && styles.logRowBorder]}>
              <View style={styles.logDot}>
                <Ionicons name="water" size={16} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.logTitle}>+{it.amount} ml</Text>
                <Text style={styles.logTime}>{it.time}</Text>
              </View>
              <View style={styles.logTag}>
                <Text style={styles.logTagTxt}>VeloGo Pro</Text>
              </View>
            </View>
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

function SumCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <View style={styles.sum}>
      <Text style={styles.sumLabel}>{label}</Text>
      <Text style={styles.sumValue}>
        {value} <Text style={styles.sumUnit}>{unit}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 22, paddingTop: 8 },
  title: { fontSize: 28, fontWeight: "900", color: colors.textPrimary, letterSpacing: -0.5 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border },
  tabs: { flexDirection: "row", backgroundColor: colors.surface, padding: 4, borderRadius: radii.pill, borderWidth: 1, borderColor: colors.border },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 999, alignItems: "center" },
  tabActive: { backgroundColor: colors.primary },
  tabTxt: { fontSize: 13, fontWeight: "700", color: colors.textSecondary },
  tabTxtActive: { color: colors.white },
  summaryRow: { flexDirection: "row", gap: 10, marginTop: 16 },
  sum: { flex: 1, backgroundColor: colors.surface, padding: 14, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.borderLight },
  sumLabel: { fontSize: 11, fontWeight: "700", color: colors.textSecondary, textTransform: "uppercase", letterSpacing: 0.5 },
  sumValue: { fontSize: 22, fontWeight: "800", color: colors.textPrimary, marginTop: 4 },
  sumUnit: { fontSize: 12, fontWeight: "600", color: colors.textSecondary },
  chartCard: { marginTop: 16 },
  cardTitle: { fontSize: 17, fontWeight: "800", color: colors.textPrimary },
  cardSub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  chartWrap: { marginTop: 12, alignItems: "center" },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: colors.textPrimary, marginTop: 24, marginBottom: 12 },
  logRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12, gap: 12 },
  logRowBorder: { borderTopWidth: 1, borderTopColor: colors.borderLight },
  logDot: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.primaryLight, alignItems: "center", justifyContent: "center" },
  logTitle: { fontSize: 14, fontWeight: "700", color: colors.textPrimary },
  logTime: { fontSize: 12, color: colors.textSecondary },
  logTag: { backgroundColor: colors.surfaceSecondary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  logTagTxt: { fontSize: 11, fontWeight: "700", color: colors.textSecondary },
});
