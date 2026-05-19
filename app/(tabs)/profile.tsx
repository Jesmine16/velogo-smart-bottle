import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Card from "../../src/components/Card";
import { colors, radii } from "../../src/theme";
import { mockUser } from "../../src/mockData";

export default function Profile() {
  const router = useRouter();

  const items = [
    { icon: "water-outline", label: "Bottle Settings", route: "/bottle-settings", testID: "menu-bottle-settings" },
    { icon: "notifications-outline", label: "Reminder Settings", route: "/reminder-settings", testID: "menu-reminders" },
    { icon: "shield-checkmark-outline", label: "Water Quality", route: "/water-quality", testID: "menu-water-quality" },
    { icon: "location-outline", label: "Find My Bottle", route: "/find-bottle", testID: "menu-find" },
  ];

  const settings = [
    { icon: "person-circle-outline", label: "Account", testID: "menu-account" },
    { icon: "lock-closed-outline", label: "Privacy", testID: "menu-privacy" },
    { icon: "help-circle-outline", label: "Help & Support", testID: "menu-help" },
    { icon: "information-circle-outline", label: "About VeloGo", testID: "menu-about" },
  ];

  return (
    <SafeAreaView style={styles.root} edges={["top"]} testID="profile-screen">
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        <View style={styles.profileTop}>
          <Image source={{ uri: mockUser.avatar }} style={styles.avatar} />
          <Text style={styles.name} testID="profile-name">{mockUser.name}</Text>
          <Text style={styles.email}>{mockUser.email}</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statVal}>2</Text>
              <Text style={styles.statLabel}>Bottles</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.stat}>
              <Text style={styles.statVal}>12</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.stat}>
              <Text style={styles.statVal}>3</Text>
              <Text style={styles.statLabel}>Badges</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bottle & Hydration</Text>
          <Card style={{ padding: 0 }}>
            {items.map((it, idx) => (
              <TouchableOpacity
                key={it.label}
                testID={it.testID}
                onPress={() => router.push(it.route as any)}
                style={[styles.row, idx > 0 && styles.rowBorder]}
              >
                <View style={styles.rowIcon}><Ionicons name={it.icon as any} size={20} color={colors.primary} /></View>
                <Text style={styles.rowLabel}>{it.label}</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
              </TouchableOpacity>
            ))}
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <Card style={{ padding: 0 }}>
            {settings.map((it, idx) => (
              <TouchableOpacity key={it.label} testID={it.testID} style={[styles.row, idx > 0 && styles.rowBorder]}>
                <View style={styles.rowIcon}><Ionicons name={it.icon as any} size={20} color={colors.textPrimary} /></View>
                <Text style={styles.rowLabel}>{it.label}</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.textTertiary} />
              </TouchableOpacity>
            ))}
          </Card>
        </View>

        <TouchableOpacity
          testID="logout-btn"
          onPress={() => router.replace("/")}
          style={styles.logoutBtn}
        >
          <Ionicons name="log-out-outline" size={18} color={colors.danger} />
          <Text style={styles.logoutTxt}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>VeloGo v1.0.0 • Made with 💧</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 22, paddingTop: 8 },
  title: { fontSize: 28, fontWeight: "900", color: colors.textPrimary, letterSpacing: -0.5 },
  profileTop: { alignItems: "center", marginTop: 16, paddingHorizontal: 22 },
  avatar: { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: colors.surface },
  name: { fontSize: 22, fontWeight: "800", color: colors.textPrimary, marginTop: 12 },
  email: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  statsRow: { flexDirection: "row", marginTop: 16, backgroundColor: colors.surface, borderRadius: radii.xl, paddingVertical: 14, paddingHorizontal: 12, alignSelf: "stretch", justifyContent: "space-around", borderWidth: 1, borderColor: colors.borderLight },
  stat: { alignItems: "center", flex: 1 },
  statVal: { fontSize: 20, fontWeight: "800", color: colors.textPrimary },
  statLabel: { fontSize: 11, color: colors.textSecondary, fontWeight: "600", marginTop: 2 },
  divider: { width: 1, backgroundColor: colors.borderLight },
  section: { paddingHorizontal: 22, marginTop: 24 },
  sectionTitle: { fontSize: 13, fontWeight: "800", color: colors.textSecondary, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 },
  row: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  rowBorder: { borderTopWidth: 1, borderTopColor: colors.borderLight },
  rowIcon: { width: 36, height: 36, borderRadius: 12, backgroundColor: colors.surfaceSecondary, alignItems: "center", justifyContent: "center" },
  rowLabel: { flex: 1, fontSize: 15, fontWeight: "600", color: colors.textPrimary },
  logoutBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginHorizontal: 22, marginTop: 24, paddingVertical: 16, borderRadius: radii.pill, backgroundColor: "#FEE7E5" },
  logoutTxt: { fontSize: 15, fontWeight: "700", color: colors.danger },
  version: { textAlign: "center", color: colors.textTertiary, fontSize: 12, marginTop: 24 },
});
