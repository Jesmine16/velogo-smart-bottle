import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, Easing, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryButton from "../src/components/PrimaryButton";
import { colors, radii } from "../src/theme";

const BOTTLE_IMG = "https://static.prod-images.emergentagent.com/jobs/8f393651-c989-4a33-9a25-619c6df79151/images/6255cac04bbe18daebe28c45c9c9cf433382ff6e9939c840260111255523c3f8.png";

export default function AddBottle() {
  const router = useRouter();
  const [stage, setStage] = useState<"searching" | "found">("searching");
  const pulse1 = useRef(new Animated.Value(0)).current;
  const pulse2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const a = (v: Animated.Value, d: number) =>
      Animated.loop(
        Animated.timing(v, { toValue: 1, duration: 2200, delay: d, easing: Easing.out(Easing.ease), useNativeDriver: true })
      );
    a(pulse1, 0).start();
    a(pulse2, 1100).start();
    const t = setTimeout(() => setStage("found"), 3200);
    return () => clearTimeout(t);
  }, [pulse1, pulse2]);

  const ring = (v: Animated.Value) => ({
    transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.4, 2.2] }) }],
    opacity: v.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0] }),
  });

  return (
    <View style={styles.root}>
      <LinearGradient colors={["#E5F0FF", "#F9FAFB"]} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity testID="back-btn" onPress={() => router.back()} style={styles.back}>
            <Ionicons name="chevron-back" size={26} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pair Bottle</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.center}>
          {stage === "searching" ? (
            <>
              <View style={styles.radar} testID="pairing-radar">
                <Animated.View style={[styles.ring, ring(pulse1)]} />
                <Animated.View style={[styles.ring, ring(pulse2)]} />
                <View style={styles.core}>
                  <Ionicons name="bluetooth" size={40} color={colors.white} />
                </View>
              </View>
              <Text style={styles.title}>Searching for VeloGo...</Text>
              <Text style={styles.sub}>Make sure your bottle is powered on and within range.</Text>
              <View style={styles.statusRow}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Bluetooth scanning</Text>
              </View>
            </>
          ) : (
            <View style={styles.foundCard} testID="bottle-found-card">
              <Image source={{ uri: BOTTLE_IMG }} style={styles.bottleImg} resizeMode="contain" />
              <View style={styles.foundBadge}>
                <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
                <Text style={[styles.statusText, { color: colors.success }]}>Device found</Text>
              </View>
              <Text style={styles.foundTitle}>VeloGo Pro</Text>
              <Text style={styles.foundMeta}>Serial • VG-PRO-A1B2C3</Text>
              <Text style={styles.foundMeta}>Signal • Strong (-42 dBm)</Text>
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <PrimaryButton
            testID="connect-bottle-btn"
            title={stage === "found" ? "Connect Bottle" : "Scanning..."}
            onPress={() => router.replace("/(tabs)/dashboard")}
            disabled={stage !== "found"}
          />
          <TouchableOpacity testID="skip-pair-btn" onPress={() => router.replace("/(tabs)/dashboard")} style={{ marginTop: 12, alignItems: "center" }}>
            <Text style={styles.skip}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingTop: 8 },
  back: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 17, fontWeight: "700", color: colors.textPrimary },
  center: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 28 },
  radar: { width: 240, height: 240, alignItems: "center", justifyContent: "center" },
  ring: { position: "absolute", width: 240, height: 240, borderRadius: 120, backgroundColor: colors.primary },
  core: { width: 92, height: 92, borderRadius: 46, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", shadowColor: colors.primary, shadowOpacity: 0.5, shadowRadius: 24, shadowOffset: { width: 0, height: 8 }, elevation: 10 },
  title: { fontSize: 24, fontWeight: "800", color: colors.textPrimary, marginTop: 40, letterSpacing: -0.5 },
  sub: { fontSize: 14, color: colors.textSecondary, marginTop: 8, textAlign: "center" },
  statusRow: { flexDirection: "row", alignItems: "center", marginTop: 20, backgroundColor: colors.surface, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, gap: 8 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  statusText: { fontSize: 13, fontWeight: "600", color: colors.textSecondary },
  foundCard: { backgroundColor: colors.surface, borderRadius: radii.xl, padding: 24, alignItems: "center", width: "100%", shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 24, shadowOffset: { width: 0, height: 12 }, elevation: 6 },
  bottleImg: { width: 180, height: 180 },
  foundBadge: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#E8F8EE", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
  foundTitle: { fontSize: 26, fontWeight: "800", color: colors.textPrimary, marginTop: 12 },
  foundMeta: { fontSize: 13, color: colors.textSecondary, marginTop: 4 },
  footer: { paddingHorizontal: 28, paddingBottom: 24 },
  skip: { color: colors.textSecondary, fontWeight: "600", fontSize: 14 },
});
