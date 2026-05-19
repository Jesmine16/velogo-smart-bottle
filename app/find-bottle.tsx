import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, radii } from "../src/theme";
import { mockLocation } from "../src/mockData";

const MAP_IMG = "https://static.prod-images.emergentagent.com/jobs/8f393651-c989-4a33-9a25-619c6df79151/images/0cf84ebc6f60277682e1aecbf9a6fccff0369c33b0d55d1e58fb6e16b591d2b6.png";

export default function FindBottle() {
  const router = useRouter();
  const [ringing, setRinging] = useState(false);
  const pulse = useRef(new Animated.Value(0)).current;
  const beep = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(pulse, { toValue: 1, duration: 2200, easing: Easing.out(Easing.ease), useNativeDriver: true })
    ).start();
  }, [pulse]);

  useEffect(() => {
    if (ringing) {
      const anim = Animated.loop(
        Animated.sequence([
          Animated.timing(beep, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(beep, { toValue: 0, duration: 400, useNativeDriver: true }),
        ])
      );
      anim.start();
      const t = setTimeout(() => setRinging(false), 5000);
      return () => { anim.stop(); clearTimeout(t); };
    }
  }, [ringing, beep]);

  return (
    <View style={styles.root} testID="find-bottle-screen">
      <ImageBackground source={{ uri: MAP_IMG }} style={StyleSheet.absoluteFill} resizeMode="cover">
        <View style={styles.overlay} />
      </ImageBackground>

      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity testID="back-btn" onPress={() => router.back()} style={styles.iconBtn}>
            <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <View style={[styles.iconBtn, styles.headerPill]}>
            <Ionicons name="location" size={16} color={colors.primary} />
            <Text style={styles.headerPillTxt}>Last seen {mockLocation.lastSeen}</Text>
          </View>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="compass-outline" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.pinWrap} pointerEvents="none">
          <Animated.View
            style={[
              styles.pinPulse,
              {
                transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.5, 2.5] }) }],
                opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0] }),
              },
            ]}
          />
          <View style={styles.pin}>
            <Ionicons name="water" size={28} color={colors.white} />
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.glassCard} testID="bottle-location-card">
            <View style={styles.cardHeader}>
              <View style={styles.bottleAvatar}>
                <Ionicons name="water" size={20} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>VeloGo Pro</Text>
                <Text style={styles.cardSub}>{mockLocation.address}</Text>
              </View>
              <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
            </View>

            <View style={styles.coordRow}>
              <View style={styles.coordBox}>
                <Text style={styles.coordLabel}>LATITUDE</Text>
                <Text style={styles.coordValue}>{mockLocation.lat.toFixed(4)}°</Text>
              </View>
              <View style={styles.coordBox}>
                <Text style={styles.coordLabel}>LONGITUDE</Text>
                <Text style={styles.coordValue}>{mockLocation.lng.toFixed(4)}°</Text>
              </View>
              <View style={styles.coordBox}>
                <Text style={styles.coordLabel}>SIGNAL</Text>
                <Text style={styles.coordValue}>-42 dBm</Text>
              </View>
            </View>

            <TouchableOpacity
              testID="ring-bottle-btn"
              onPress={() => setRinging(true)}
              style={[styles.ringBtn, ringing && { backgroundColor: colors.warning }]}
              activeOpacity={0.85}
            >
              <Animated.View
                style={{
                  transform: [
                    { scale: ringing ? beep.interpolate({ inputRange: [0, 1], outputRange: [1, 1.15] }) : 1 },
                  ],
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <Ionicons name={ringing ? "volume-high" : "notifications"} size={20} color={colors.white} />
                <Text style={styles.ringTxt}>{ringing ? "Ringing bottle..." : "Ring Bottle"}</Text>
              </Animated.View>
            </TouchableOpacity>

            <Text style={styles.helper}>Your bottle will play a sound for 30 seconds.</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(229,240,255,0.45)" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 22, paddingTop: 8 },
  iconBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(255,255,255,0.85)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.borderLight },
  headerPill: { width: "auto", paddingHorizontal: 14, flexDirection: "row", gap: 6 },
  headerPillTxt: { fontSize: 12, fontWeight: "700", color: colors.textPrimary },
  pinWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  pinPulse: { position: "absolute", width: 80, height: 80, borderRadius: 40, backgroundColor: colors.primary },
  pin: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", borderWidth: 4, borderColor: colors.white, shadowColor: colors.primary, shadowOpacity: 0.4, shadowRadius: 16, shadowOffset: { width: 0, height: 6 }, elevation: 10 },
  footer: { padding: 18 },
  glassCard: { backgroundColor: "rgba(255,255,255,0.95)", borderRadius: radii.xl, padding: 18, borderWidth: 1, borderColor: "rgba(255,255,255,0.6)", shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 24, shadowOffset: { width: 0, height: 12 }, elevation: 8 },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
  bottleAvatar: { width: 44, height: 44, borderRadius: 14, backgroundColor: colors.primaryLight, alignItems: "center", justifyContent: "center" },
  cardTitle: { fontSize: 17, fontWeight: "800", color: colors.textPrimary },
  cardSub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  coordRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 16, backgroundColor: colors.surfaceSecondary, borderRadius: radii.lg, padding: 12 },
  coordBox: { alignItems: "center", flex: 1 },
  coordLabel: { fontSize: 9, fontWeight: "800", color: colors.textSecondary, letterSpacing: 0.5 },
  coordValue: { fontSize: 13, fontWeight: "800", color: colors.textPrimary, marginTop: 4 },
  ringBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 14, paddingVertical: 16, borderRadius: radii.pill, backgroundColor: colors.primary, shadowColor: colors.primary, shadowOpacity: 0.4, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
  ringTxt: { color: colors.white, fontWeight: "800", fontSize: 15 },
  helper: { textAlign: "center", fontSize: 11, color: colors.textSecondary, marginTop: 10 },
});
