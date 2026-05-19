import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Card from "../../src/components/Card";
import { colors, radii } from "../../src/theme";
import { mockAchievements, mockHydration } from "../../src/mockData";

const PRESETS = [1500, 2000, 2500, 3000, 3500];

export default function Goals() {
  const [goal, setGoal] = useState(2500);
  const [freq, setFreq] = useState(60);
  const [smart, setSmart] = useState(true);

  return (
    <SafeAreaView style={styles.root} edges={["top"]} testID="goals-screen">
      <View style={styles.header}>
        <Text style={styles.title}>Goals</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 22, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <Card style={styles.streakCard}>
          <View style={styles.streakRow}>
            <View>
              <Text style={styles.streakLabel}>Current Streak</Text>
              <Text style={styles.streakValue}>{mockHydration.streak} days 🔥</Text>
              <Text style={styles.streakSub}>3 days to your next badge</Text>
            </View>
            <View style={styles.flameCircle}>
              <Ionicons name="flame" size={32} color={colors.warning} />
            </View>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: "80%" }]} />
          </View>
        </Card>

        <Text style={styles.section}>Daily Goal</Text>
        <Card>
          <Text style={styles.goalValue}>{goal} <Text style={styles.goalUnit}>ml</Text></Text>
          <Text style={styles.goalSub}>Recommended for your weight & activity</Text>
          <View style={styles.presetRow}>
            {PRESETS.map((p) => (
              <TouchableOpacity
                key={p}
                testID={`goal-preset-${p}`}
                onPress={() => setGoal(p)}
                style={[styles.preset, goal === p && styles.presetActive]}
              >
                <Text style={[styles.presetTxt, goal === p && styles.presetTxtActive]}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Text style={styles.section}>Reminders</Text>
        <Card>
          <Row label="Smart Reminders" desc="Adapts to your activity & weather">
            <Switch value={smart} onValueChange={setSmart} trackColor={{ true: colors.primary, false: colors.border }} thumbColor="#fff" testID="smart-reminders-toggle" />
          </Row>
          <View style={styles.divider} />
          <Text style={styles.freqLabel}>Reminder frequency</Text>
          <View style={styles.freqRow}>
            {[30, 60, 90, 120].map((f) => (
              <TouchableOpacity
                key={f}
                testID={`freq-${f}`}
                onPress={() => setFreq(f)}
                style={[styles.freq, freq === f && styles.freqActive]}
              >
                <Text style={[styles.freqTxt, freq === f && styles.freqTxtActive]}>{f}m</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Text style={styles.section}>Achievements</Text>
        <View style={styles.badges}>
          {mockAchievements.map((a) => (
            <View key={a.id} style={[styles.badge, !a.earned && styles.badgeLocked]} testID={`badge-${a.id}`}>
              <View style={[styles.badgeIcon, { backgroundColor: a.earned ? colors.primaryLight : colors.surfaceSecondary }]}>
                <Ionicons name={a.icon as any} size={24} color={a.earned ? colors.primary : colors.textTertiary} />
              </View>
              <Text style={[styles.badgeTitle, !a.earned && { color: colors.textTertiary }]}>{a.title}</Text>
              <Text style={styles.badgeDesc} numberOfLines={2}>{a.desc}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({ label, desc, children }: any) {
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowLabel}>{label}</Text>
        {desc ? <Text style={styles.rowDesc}>{desc}</Text> : null}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 22, paddingTop: 8 },
  title: { fontSize: 28, fontWeight: "900", color: colors.textPrimary, letterSpacing: -0.5 },
  streakCard: { marginTop: 8 },
  streakRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  streakLabel: { fontSize: 11, fontWeight: "700", color: colors.textSecondary, textTransform: "uppercase", letterSpacing: 0.5 },
  streakValue: { fontSize: 28, fontWeight: "900", color: colors.textPrimary, marginTop: 4, letterSpacing: -0.5 },
  streakSub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  flameCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: "#FFF4E6", alignItems: "center", justifyContent: "center" },
  progressTrack: { height: 8, backgroundColor: colors.surfaceSecondary, borderRadius: 4, marginTop: 16, overflow: "hidden" },
  progressFill: { height: 8, backgroundColor: colors.primary, borderRadius: 4 },
  section: { fontSize: 18, fontWeight: "800", color: colors.textPrimary, marginTop: 24, marginBottom: 12 },
  goalValue: { fontSize: 40, fontWeight: "900", color: colors.textPrimary, letterSpacing: -1 },
  goalUnit: { fontSize: 16, fontWeight: "700", color: colors.textSecondary },
  goalSub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  presetRow: { flexDirection: "row", gap: 8, marginTop: 16, flexWrap: "wrap" },
  preset: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 999, backgroundColor: colors.surfaceSecondary },
  presetActive: { backgroundColor: colors.primary },
  presetTxt: { fontSize: 13, fontWeight: "700", color: colors.textSecondary },
  presetTxtActive: { color: colors.white },
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 4 },
  rowLabel: { fontSize: 15, fontWeight: "700", color: colors.textPrimary },
  rowDesc: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  divider: { height: 1, backgroundColor: colors.borderLight, marginVertical: 14 },
  freqLabel: { fontSize: 13, fontWeight: "700", color: colors.textPrimary, marginBottom: 10 },
  freqRow: { flexDirection: "row", gap: 8 },
  freq: { flex: 1, paddingVertical: 12, borderRadius: radii.md, backgroundColor: colors.surfaceSecondary, alignItems: "center" },
  freqActive: { backgroundColor: colors.primary },
  freqTxt: { fontSize: 13, fontWeight: "700", color: colors.textSecondary },
  freqTxtActive: { color: colors.white },
  badges: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  badge: { width: "31%", backgroundColor: colors.surface, borderRadius: radii.lg, padding: 12, alignItems: "center", marginBottom: 10, borderWidth: 1, borderColor: colors.borderLight },
  badgeLocked: { opacity: 0.6 },
  badgeIcon: { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  badgeTitle: { fontSize: 12, fontWeight: "800", color: colors.textPrimary, textAlign: "center" },
  badgeDesc: { fontSize: 10, color: colors.textSecondary, textAlign: "center", marginTop: 2 },
});
