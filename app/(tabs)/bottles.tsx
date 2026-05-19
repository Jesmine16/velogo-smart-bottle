import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Card from "../../src/components/Card";
import { colors, radii } from "../../src/theme";
import { mockBottles } from "../../src/mockData";

const BOTTLE_IMG = "https://static.prod-images.emergentagent.com/jobs/8f393651-c989-4a33-9a25-619c6df79151/images/6255cac04bbe18daebe28c45c9c9cf433382ff6e9939c840260111255523c3f8.png";

export default function MyBottles() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.root} edges={["top"]} testID="my-bottles-screen">
      <View style={styles.header}>
        <Text style={styles.title}>My Bottles</Text>
        <TouchableOpacity testID="add-bottle-btn" onPress={() => router.push("/add-bottle")} style={styles.addBtn}>
          <Ionicons name="add" size={22} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 22, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {mockBottles.map((b) => (
          <Card key={b.id} style={styles.bottleCard} testID={`bottle-card-${b.id}`}>
            <View style={styles.row}>
              <Image source={{ uri: BOTTLE_IMG }} style={styles.img} resizeMode="contain" />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <View style={[styles.statusBadge, { backgroundColor: b.connected ? "#E8F8EE" : "#FEE7E5" }]}>
                  <View style={[styles.dot, { backgroundColor: b.connected ? colors.success : colors.danger }]} />
                  <Text style={[styles.statusTxt, { color: b.connected ? colors.success : colors.danger }]}>
                    {b.connected ? "Connected" : "Offline"}
                  </Text>
                </View>
                <Text style={styles.name}>{b.name}</Text>
                <Text style={styles.meta}>{b.color} • {b.capacity} ml</Text>
                <Text style={styles.serial}>SN: {b.serial}</Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <Stat icon="battery-half" label="Battery" value={`${b.battery}%`} color={b.battery > 30 ? colors.success : colors.warning} />
              <Stat icon="thermometer-outline" label="Temp" value={`${b.temperature}°C`} color={colors.primary} />
              <Stat icon="water" label="Water" value={`${b.waterLevel}%`} color={colors.cyan} />
            </View>

            <View style={styles.actionsRow}>
              <TouchableOpacity testID={`settings-${b.id}`} onPress={() => router.push("/bottle-settings")} style={styles.ghostBtn}>
                <Ionicons name="settings-outline" size={16} color={colors.textPrimary} />
                <Text style={styles.ghostTxt}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity testID={`find-${b.id}`} onPress={() => router.push("/find-bottle")} style={styles.ghostBtn}>
                <Ionicons name="location-outline" size={16} color={colors.textPrimary} />
                <Text style={styles.ghostTxt}>Locate</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}

        <TouchableOpacity testID="add-new-bottle-tile" onPress={() => router.push("/add-bottle")} style={styles.addTile}>
          <Ionicons name="add-circle-outline" size={28} color={colors.primary} />
          <Text style={styles.addTileTxt}>Pair a new bottle</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ icon, label, value, color }: any) {
  return (
    <View style={styles.stat}>
      <Ionicons name={icon} size={16} color={color} />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 22, paddingTop: 8, paddingBottom: 4 },
  title: { fontSize: 28, fontWeight: "900", color: colors.textPrimary, letterSpacing: -0.5 },
  addBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" },
  bottleCard: { marginBottom: 16 },
  row: { flexDirection: "row", alignItems: "center" },
  img: { width: 90, height: 90 },
  statusBadge: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, alignSelf: "flex-start" },
  dot: { width: 6, height: 6, borderRadius: 3 },
  statusTxt: { fontSize: 11, fontWeight: "700" },
  name: { fontSize: 20, fontWeight: "800", color: colors.textPrimary, marginTop: 8 },
  meta: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  serial: { fontSize: 11, color: colors.textTertiary, marginTop: 4, fontFamily: "monospace" },
  statsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.borderLight },
  stat: { alignItems: "center", flex: 1 },
  statLabel: { fontSize: 11, color: colors.textSecondary, marginTop: 4, fontWeight: "600" },
  statValue: { fontSize: 15, fontWeight: "800", color: colors.textPrimary, marginTop: 2 },
  actionsRow: { flexDirection: "row", gap: 10, marginTop: 16 },
  ghostBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, backgroundColor: colors.surfaceSecondary, paddingVertical: 12, borderRadius: radii.lg },
  ghostTxt: { fontSize: 13, fontWeight: "700", color: colors.textPrimary },
  addTile: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, paddingVertical: 22, borderRadius: radii.xl, borderWidth: 2, borderColor: colors.primaryLight, borderStyle: "dashed", backgroundColor: colors.surface },
  addTileTxt: { fontSize: 15, fontWeight: "700", color: colors.primary },
});
