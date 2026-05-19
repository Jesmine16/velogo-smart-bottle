import React from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import PrimaryButton from "../src/components/PrimaryButton";
import { colors } from "../src/theme";

const BOTTLE_HERO = "https://static.prod-images.emergentagent.com/jobs/8f393651-c989-4a33-9a25-619c6df79151/images/6255cac04bbe18daebe28c45c9c9cf433382ff6e9939c840260111255523c3f8.png";

export default function Welcome() {
  const router = useRouter();
  return (
    <View style={styles.root} testID="welcome-screen">
      <View style={styles.hero}>
        <LinearGradient
          colors={["#E5F0FF", "#F9FAFB"]}
          style={StyleSheet.absoluteFill}
        />
        <Image source={{ uri: BOTTLE_HERO }} style={styles.heroImg} resizeMode="contain" />
      </View>
      <SafeAreaView edges={["bottom"]} style={styles.bottom}>
        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>Smart IoT Hydration</Text>
        </View>
        <Text style={styles.brand} testID="app-name">VeloGo</Text>
        <Text style={styles.tagline}>Hydrate on the go</Text>
        <Text style={styles.sub}>Real-time tracking, smart reminders and water quality insights from your VeloGo smart bottle.</Text>
        <PrimaryButton
          testID="welcome-login-btn"
          title="Log In"
          onPress={() => router.push("/login")}
          style={{ marginTop: 28 }}
        />
        <PrimaryButton
          testID="welcome-signup-btn"
          title="Create Account"
          variant="secondary"
          onPress={() => router.push("/signup")}
          style={{ marginTop: 12 }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  hero: { flex: 1.1, justifyContent: "center", alignItems: "center" },
  heroImg: { width: "85%", height: "90%" },
  bottom: { paddingHorizontal: 28, paddingBottom: 24, paddingTop: 8 },
  badge: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", backgroundColor: colors.primaryLight, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, marginBottom: 16 },
  badgeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.primary, marginRight: 8 },
  badgeText: { fontSize: 12, fontWeight: "700", color: colors.primary, letterSpacing: 0.4 },
  brand: { fontSize: 44, fontWeight: "900", color: colors.textPrimary, letterSpacing: -1.5 },
  tagline: { fontSize: 20, fontWeight: "700", color: colors.textPrimary, marginTop: 4 },
  sub: { fontSize: 14, color: colors.textSecondary, lineHeight: 21, marginTop: 10 },
});
