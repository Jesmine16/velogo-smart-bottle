import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Card from "../src/components/Card";
import { colors, radii } from "../src/theme";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const FREQS = [
  { label: "30 min", value: 30 },
  { label: "1 hour", value: 60 },
  { label: "1.5 hours", value: 90 },
  { label: "2 hours", value: 120 },
];

export default function ReminderSettings() {
  const router = useRouter();
  const [enabled, setEnabled] = useState(true);
  const [smart, setSmart] = useState(true);
  const [freq, setFreq] = useState(60);
  const [days, setDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);

  const toggleDay = (i: number) => {
    setDays((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
  };

  return (
    <SafeAreaView style={styles.root} edges={["top"]} testID="reminder-settings-screen">
      <View style={styles.header}>
        <TouchableOpacity testID="back-btn" onPress={() => router.back()} style={styles.iconBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reminders</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 22, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <Card>
          <View style={styles.toggleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>Hydration Reminders</Text>
              <Text style={styles.rowDesc}>Get gentle nudges to drink water</Text>
            </View>
            <Switch testID="reminders-enabled" value={enabled} onValueChange={setEnabled} trackColor={{ true: colors.primary, false: colors.border }} thumbColor="#fff" />
          </View>
          <View style={styles.divider} />
          <View style={styles.toggleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>Smart Schedule</Text>
              <Text style={styles.rowDesc}>Adapts to your activity & weather</Text>
            </View>
            <Switch testID="smart-schedule" value={smart} onValueChange={setSmart} trackColor={{ true: colors.primary, false: colors.border }} thumbColor="#fff" />
          </View>
        </Card>

        <Text style={styles.section}>Repeat Frequency</Text>
        <View style={styles.freqGrid}>
          {FREQS.map((f) => (
            <TouchableOpacity
              key={f.value}
              testID={`freq-${f.value}`}
              onPress={() => setFreq(f.value)}
              style={[styles.freqCard, freq === f.value && styles.freqCardActive]}
            >
              <Text style={[styles.freqTxt, freq === f.value && styles.freqTxtActive]}>{f.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.section}>Active Hours</Text>
        <Card style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.timeBox}>
            <Text style={styles.timeLabel}>START</Text>
            <Text style={styles.timeValue}>08:00</Text>
            <Text style={styles.timeMeta}>Morning</Text>
          </View>
          <View style={styles.timeDivider} />
          <View style={styles.timeBox}>
            <Text style={styles.timeLabel}>END</Text>
            <Text style={styles.timeValue}>22:00</Text>
            <Text style={styles.timeMeta}>Night</Text>
          </View>
        </Card>

        <Text style={styles.section}>Repeat Days</Text>
        <Card>
          <View style={styles.daysRow}>
            {DAYS.map((d, i) => {
              const active = days.includes(i);
              return (
                <TouchableOpacity
                  key={i}
                  testID={`day-${i}`}
                  onPress={() => toggleDay(i)}
                  style={[styles.dayChip, active && styles.dayChipActive]}
                >
                  <Text style={[styles.dayTxt, active && styles.dayTxtActive]}>{d}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Card>

        <Card style={styles.previewCard}>
          <View style={styles.previewIcon}><Ionicons name="notifications" size={20} color={colors.primary} /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.previewTitle}>Time to hydrate! 💧</Text>
            <Text style={styles.previewSub}>You've had 1.6 L today. Drink 250 ml to hit your goal.</Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 22, paddingTop: 8 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border },
  headerTitle: { fontSize: 17, fontWeight: "800", color: colors.textPrimary },
  toggleRow: { flexDirection: "row", alignItems: "center", paddingVertical: 4 },
  rowLabel: { fontSize: 15, fontWeight: "700", color: colors.textPrimary },
  rowDesc: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  divider: { height: 1, backgroundColor: colors.borderLight, marginVertical: 12 },
  section: { fontSize: 13, fontWeight: "800", color: colors.textSecondary, textTransform: "uppercase", letterSpacing: 0.6, marginTop: 24, marginBottom: 10 },
  freqGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  freqCard: { width: "48%", paddingVertical: 16, borderRadius: radii.lg, backgroundColor: colors.surface, alignItems: "center", borderWidth: 2, borderColor: "transparent" },
  freqCardActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  freqTxt: { fontSize: 14, fontWeight: "700", color: colors.textSecondary },
  freqTxtActive: { color: colors.primary },
  timeBox: { flex: 1, alignItems: "center", paddingVertical: 8 },
  timeLabel: { fontSize: 11, fontWeight: "700", color: colors.textSecondary, letterSpacing: 0.8 },
  timeValue: { fontSize: 38, fontWeight: "900", color: colors.textPrimary, marginTop: 6, letterSpacing: -1 },
  timeMeta: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  timeDivider: { width: 1, backgroundColor: colors.borderLight },
  daysRow: { flexDirection: "row", justifyContent: "space-between" },
  dayChip: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surfaceSecondary, alignItems: "center", justifyContent: "center" },
  dayChipActive: { backgroundColor: colors.primary },
  dayTxt: { fontSize: 14, fontWeight: "700", color: colors.textSecondary },
  dayTxtActive: { color: colors.white },
  previewCard: { marginTop: 24, flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: colors.primaryLight, borderWidth: 1, borderColor: "#CCE2FF" },
  previewIcon: { width: 44, height: 44, borderRadius: 16, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" },
  previewTitle: { fontSize: 14, fontWeight: "800", color: colors.textPrimary },
  previewSub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
});
