import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Card from "../src/components/Card";
import { colors, radii } from "../src/theme";
import { mockBottles } from "../src/mockData";

const BOTTLE_IMG = "https://static.prod-images.emergentagent.com/jobs/8f393651-c989-4a33-9a25-619c6df79151/images/6255cac04bbe18daebe28c45c9c9cf433382ff6e9939c840260111255523c3f8.png";

export default function BottleSettings() {
  const router = useRouter();
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [led, setLed] = useState(true);
  const [sound, setSound] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const bottle = mockBottles[0];

  return (
    <SafeAreaView style={styles.root} edges={["top"]} testID="bottle-settings-screen">
      <View style={styles.header}>
        <TouchableOpacity testID="back-btn" onPress={() => router.back()} style={styles.iconBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bottle Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 22, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <Card style={styles.bottleHero}>
          <Image source={{ uri: BOTTLE_IMG }} style={styles.img} resizeMode="contain" />
          <Text style={styles.bottleName}>{bottle.name}</Text>
          <View style={styles.connectedBadge}>
            <View style={styles.dot} />
            <Text style={styles.connectedTxt}>Connected • {bottle.lastSync}</Text>
          </View>
        </Card>

        <Text style={styles.section}>Information</Text>
        <Card style={{ padding: 0 }}>
          <InfoRow label="Model" value={bottle.model} />
          <InfoRow label="Serial Number" value={bottle.serial} mono />
          <InfoRow label="Firmware" value={bottle.firmware} badge="Up to date" />
          <InfoRow label="Color" value={bottle.color} />
          <InfoRow label="Capacity" value={`${bottle.capacity} ml`} last />
        </Card>

        <Text style={styles.section}>Preferences</Text>
        <Card>
          <ToggleRow label="LED Glow" desc="Bottle lights up when sipping" value={led} onChange={setLed} testID="toggle-led" />
          <Div />
          <ToggleRow label="Sound Alerts" desc="Audible reminder chime" value={sound} onChange={setSound} testID="toggle-sound" />
          <Div />
          <ToggleRow label="Auto Sync" desc="Sync data every 5 minutes" value={autoSync} onChange={setAutoSync} testID="toggle-sync" />
          <Div />
          <View style={styles.tempRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowLabel}>Temperature Unit</Text>
              <Text style={styles.rowDesc}>Display preference</Text>
            </View>
            <View style={styles.unitToggle}>
              {(["C", "F"] as const).map((u) => (
                <TouchableOpacity
                  key={u}
                  testID={`unit-${u}`}
                  onPress={() => setUnit(u)}
                  style={[styles.unitBtn, unit === u && styles.unitBtnActive]}
                >
                  <Text style={[styles.unitTxt, unit === u && styles.unitTxtActive]}>°{u}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Card>

        <TouchableOpacity
          testID="unpair-btn"
          style={styles.unpairBtn}
          onPress={() =>
            Alert.alert("Unpair bottle?", "You'll need to re-pair it to track again.", [
              { text: "Cancel", style: "cancel" },
              { text: "Unpair", style: "destructive", onPress: () => router.replace("/(tabs)/bottles") },
            ])
          }
        >
          <Ionicons name="unlink-outline" size={18} color={colors.danger} />
          <Text style={styles.unpairTxt}>Unpair Bottle</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ label, value, badge, mono, last }: any) {
  return (
    <View style={[styles.infoRow, !last && styles.rowBorder]}>
      <Text style={styles.infoLabel}>{label}</Text>
      <View style={styles.infoRight}>
        <Text style={[styles.infoValue, mono && { fontFamily: "monospace", fontSize: 13 }]}>{value}</Text>
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeTxt}>{badge}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

function ToggleRow({ label, desc, value, onChange, testID }: any) {
  return (
    <View style={styles.toggleRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowDesc}>{desc}</Text>
      </View>
      <Switch testID={testID} value={value} onValueChange={onChange} trackColor={{ true: colors.primary, false: colors.border }} thumbColor="#fff" />
    </View>
  );
}

function Div() { return <View style={styles.divider} />; }

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 22, paddingTop: 8 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border },
  headerTitle: { fontSize: 17, fontWeight: "800", color: colors.textPrimary },
  bottleHero: { alignItems: "center", paddingVertical: 24 },
  img: { width: 140, height: 160 },
  bottleName: { fontSize: 22, fontWeight: "800", color: colors.textPrimary, marginTop: 8 },
  connectedBadge: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#E8F8EE", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, marginTop: 8 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.success },
  connectedTxt: { fontSize: 12, fontWeight: "700", color: colors.success },
  section: { fontSize: 13, fontWeight: "800", color: colors.textSecondary, textTransform: "uppercase", letterSpacing: 0.6, marginTop: 24, marginBottom: 10 },
  infoRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: colors.borderLight },
  infoLabel: { fontSize: 14, color: colors.textSecondary, fontWeight: "600" },
  infoRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  infoValue: { fontSize: 14, fontWeight: "700", color: colors.textPrimary },
  badge: { backgroundColor: "#E8F8EE", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 },
  badgeTxt: { fontSize: 10, fontWeight: "700", color: colors.success },
  toggleRow: { flexDirection: "row", alignItems: "center", paddingVertical: 4 },
  divider: { height: 1, backgroundColor: colors.borderLight, marginVertical: 12 },
  rowLabel: { fontSize: 15, fontWeight: "700", color: colors.textPrimary },
  rowDesc: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  tempRow: { flexDirection: "row", alignItems: "center" },
  unitToggle: { flexDirection: "row", backgroundColor: colors.surfaceSecondary, padding: 3, borderRadius: 999 },
  unitBtn: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 999 },
  unitBtnActive: { backgroundColor: colors.primary },
  unitTxt: { fontSize: 13, fontWeight: "700", color: colors.textSecondary },
  unitTxtActive: { color: colors.white },
  unpairBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 24, paddingVertical: 16, borderRadius: radii.pill, backgroundColor: "#FEE7E5" },
  unpairTxt: { fontSize: 15, fontWeight: "700", color: colors.danger },
});
