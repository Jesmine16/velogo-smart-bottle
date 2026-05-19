import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../../src/components/Card";
import CircularProgress from "../../src/components/CircularProgress";
import { colors, radii } from "../../src/theme";
import { mockUser, mockBottles, mockHydration, mockWaterQuality } from "../../src/mockData";
import bottleImage from "../../assets/images/2b2.png";

export default function Dashboard() {
  const router = useRouter();
  const bottle = mockBottles[0];
  const progress = mockHydration.current / mockHydration.goal;

  return (
    <SafeAreaView style={styles.root} edges={["top"]} testID="dashboard-screen">
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.hello}>Good morning,</Text>
            <Text style={styles.userName} testID="user-name">{mockUser.name.split(" ")[0]} 👋</Text>
          </View>
          <TouchableOpacity testID="reminder-icon-btn" onPress={() => router.push("/reminder-settings")} style={styles.bell}>
            <Ionicons name="notifications-outline" size={22} color={colors.textPrimary} />
            <View style={styles.bellDot} />
          </TouchableOpacity>
        </View>

        {/* Hero card with circular progress */}
        <View style={styles.heroCard}>
          <LinearGradient colors={["#E5F0FF", "#FFFFFF"]} style={StyleSheet.absoluteFill} />
          <CircularProgress progress={progress} current={mockHydration.current} goal={mockHydration.goal} />
          <View style={styles.streakBadge}>
            <Ionicons name="flame" size={14} color={colors.warning} />
            <Text style={styles.streakText}>{mockHydration.streak}-day streak</Text>
          </View>
        </View>

        {/* Quick actions */}
        <View style={styles.actions} testID="quick-actions">
          <QuickAction icon="add" label="+250 ml" color={colors.primary} testID="quick-add-250" />
          <QuickAction icon="cafe" label="+500 ml" color={colors.cyan} testID="quick-add-500" />
          <QuickAction icon="search" label="Find" color={colors.warning} onPress={() => router.push("/find-bottle")} testID="quick-find" />
          <QuickAction icon="settings" label="Settings" color={colors.textPrimary} onPress={() => router.push("/bottle-settings")} testID="quick-settings" />
        </View>

        {/* Bottle status */}
        <Card style={styles.bottleCard} testID="bottle-status-card">
          <View style={{ flex: 1 }}>
            <View style={styles.connectedBadge}>
              <View style={[styles.dot, { backgroundColor: bottle.connected ? colors.success : colors.danger }]} />
              <Text style={[styles.connectedText, { color: bottle.connected ? colors.success : colors.danger }]}>
                {bottle.connected ? "Connected" : "Disconnected"}
              </Text>
            </View>
            <Text style={styles.bottleName}>{bottle.name}</Text>
            <Text style={styles.bottleMeta}>{bottle.model} • {bottle.lastSync}</Text>
            <View style={styles.bottleStats}>
              <View style={styles.statItem}>
                <Ionicons name="battery-half" size={16} color={colors.success} />
                <Text style={styles.statTxt}>{bottle.battery}%</Text>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="thermometer-outline" size={16} color={colors.primary} />
                <Text style={styles.statTxt}>{bottle.temperature}°C</Text>
              </View>
            </View>
          </View>
          <Image source={bottleImage} style={styles.bottleThumb} resizeMode="contain" />
        </Card>

        {/* Metric grid */}
        <View style={styles.grid}>
          <MetricCard
            testID="metric-battery"
            icon="battery-charging"
            label="Battery"
            value={`${bottle.battery}%`}
            sub="~ 4 days left"
            color={colors.success}
          />
          <MetricCard
            testID="metric-temp"
            icon="thermometer"
            label="Temperature"
            value={`${bottle.temperature}°`}
            sub="Cool & fresh"
            color={colors.primary}
          />
          <MetricCard
            testID="metric-quality"
            icon="shield-checkmark"
            label="Water Quality"
            value={mockWaterQuality.status}
            sub={`Score ${mockWaterQuality.score}`}
            color={colors.success}
            onPress={() => router.push("/water-quality")}
          />
          <MetricCard
            testID="metric-reminder"
            icon="alarm"
            label="Next Sip"
            value="11:30"
            sub="in 28 min"
            color={colors.warning}
            onPress={() => router.push("/reminder-settings")}
          />
        </View>

        <Text style={styles.sectionTitle}>Today's Log</Text>
        <Card>
          {mockHydration.intakeToday.slice(0, 4).map((it, idx) => (
            <View key={idx} style={[styles.logRow, idx > 0 && styles.logRowBorder]}>
              <View style={styles.logIconWrap}>
                <Ionicons name="water" size={18} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.logAmount}>+{it.amount} ml</Text>
                <Text style={styles.logTime}>{it.time}</Text>
              </View>
              <Text style={styles.logBottle}>VeloGo Muse</Text>
            </View>
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

function QuickAction({ icon, label, color, onPress, testID }: any) {
  return (
    <TouchableOpacity testID={testID} onPress={onPress} style={styles.qaItem} activeOpacity={0.7}>
      <View style={[styles.qaIcon, { backgroundColor: color + "1A" }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.qaLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function MetricCard({ icon, label, value, sub, color, onPress, testID }: any) {
  return (
    <TouchableOpacity testID={testID} onPress={onPress} activeOpacity={onPress ? 0.7 : 1} style={styles.metricWrap}>
      <Card style={styles.metricCard}>
        <View style={[styles.metricIcon, { backgroundColor: color + "1A" }]}>
          <Ionicons name={icon} size={18} color={color} />
        </View>
        <Text style={styles.metricLabel}>{label}</Text>
        <Text style={styles.metricValue}>{value}</Text>
        <Text style={styles.metricSub}>{sub}</Text>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 22, paddingTop: 8, paddingBottom: 8 },
  hello: { fontSize: 14, color: colors.textSecondary },
  userName: { fontSize: 24, fontWeight: "900", color: colors.textPrimary, letterSpacing: -0.5 },
  bell: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border },
  bellDot: { position: "absolute", top: 12, right: 13, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.danger, borderWidth: 2, borderColor: colors.surface },
  heroCard: { marginHorizontal: 22, marginTop: 16, borderRadius: radii.xl, paddingVertical: 28, alignItems: "center", overflow: "hidden", borderWidth: 1, borderColor: colors.borderLight },
  streakBadge: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#FFF4E6", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, marginTop: 16 },
  streakText: { fontSize: 12, fontWeight: "700", color: colors.warning },
  actions: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 22, marginTop: 20 },
  qaItem: { alignItems: "center", gap: 8, flex: 1 },
  qaIcon: { width: 52, height: 52, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  qaLabel: { fontSize: 12, fontWeight: "600", color: colors.textPrimary },
  bottleCard: { marginHorizontal: 22, marginTop: 20, flexDirection: "row", alignItems: "center", gap: 12 },
  connectedBadge: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: "#E8F8EE" },
  dot: { width: 6, height: 6, borderRadius: 3 },
  connectedText: { fontSize: 11, fontWeight: "700" },
  bottleName: { fontSize: 18, fontWeight: "800", color: colors.textPrimary, marginTop: 8 },
  bottleMeta: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  bottleStats: { flexDirection: "row", gap: 16, marginTop: 10 },
  statItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  statTxt: { fontSize: 13, fontWeight: "600", color: colors.textPrimary },
  bottleThumb: { width: 80, height: 80 },
  grid: { paddingHorizontal: 22, marginTop: 16, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  metricWrap: { width: "48%", marginTop: 12 },
  metricCard: { padding: 16 },
  metricIcon: { width: 36, height: 36, borderRadius: 12, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  metricLabel: { fontSize: 11, fontWeight: "700", color: colors.textSecondary, letterSpacing: 0.6, textTransform: "uppercase" },
  metricValue: { fontSize: 22, fontWeight: "800", color: colors.textPrimary, marginTop: 4, letterSpacing: -0.5 },
  metricSub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: colors.textPrimary, marginTop: 24, marginBottom: 12, paddingHorizontal: 22 },
  logRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12, gap: 12 },
  logRowBorder: { borderTopWidth: 1, borderTopColor: colors.borderLight },
  logIconWrap: { width: 36, height: 36, borderRadius: 12, backgroundColor: colors.primaryLight, alignItems: "center", justifyContent: "center" },
  logAmount: { fontSize: 15, fontWeight: "700", color: colors.textPrimary },
  logTime: { fontSize: 12, color: colors.textSecondary },
  logBottle: { fontSize: 12, color: colors.textTertiary, fontWeight: "600" },
});

// Fix grid section padding - container should have horizontal padding
// (kept here intentionally to keep file count low)
