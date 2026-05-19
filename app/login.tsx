import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../src/components/PrimaryButton";
import { colors, radii } from "../src/theme";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("alex@velogo.app");
  const [password, setPassword] = useState("velogo2026");
  const [show, setShow] = useState(false);

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <TouchableOpacity testID="back-btn" onPress={() => router.back()} style={styles.back}>
            <Ionicons name="chevron-back" size={26} color={colors.textPrimary} />
          </TouchableOpacity>

          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Log in to continue tracking your hydration.</Text>

          <View style={{ marginTop: 32 }}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="mail-outline" size={20} color={colors.textSecondary} />
              <TextInput
                testID="login-email-input"
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor={colors.textTertiary}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <Text style={[styles.label, { marginTop: 18 }]}>Password</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} />
              <TextInput
                testID="login-password-input"
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={colors.textTertiary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!show}
              />
              <TouchableOpacity onPress={() => setShow(!show)}>
                <Ionicons name={show ? "eye-off-outline" : "eye-outline"} size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={{ alignSelf: "flex-end", marginTop: 14 }}>
              <Text style={styles.forgot}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <PrimaryButton
            testID="login-submit-btn"
            title="Log In"
            onPress={() => router.replace("/add-bottle")}
            style={{ marginTop: 28 }}
          />

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.social}>
            <TouchableOpacity testID="social-apple" style={styles.socialBtn}>
              <Ionicons name="logo-apple" size={22} color={colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity testID="social-google" style={styles.socialBtn}>
              <Ionicons name="logo-google" size={22} color={colors.danger} />
            </TouchableOpacity>
            <TouchableOpacity testID="social-facebook" style={styles.socialBtn}>
              <Ionicons name="logo-facebook" size={22} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>New here? </Text>
            <TouchableOpacity testID="go-to-signup" onPress={() => router.replace("/signup")}>
              <Text style={styles.signupLink}>Create account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 28, paddingBottom: 32 },
  back: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", marginTop: 8 },
  title: { fontSize: 32, fontWeight: "900", color: colors.textPrimary, marginTop: 24, letterSpacing: -1 },
  subtitle: { fontSize: 15, color: colors.textSecondary, marginTop: 6 },
  label: { fontSize: 12, fontWeight: "700", color: colors.textSecondary, letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 8 },
  inputWrap: { flexDirection: "row", alignItems: "center", backgroundColor: colors.surface, borderRadius: radii.lg, paddingHorizontal: 16, height: 56, borderWidth: 1, borderColor: colors.border, gap: 12 },
  input: { flex: 1, fontSize: 16, color: colors.textPrimary },
  forgot: { color: colors.primary, fontSize: 13, fontWeight: "600" },
  divider: { flexDirection: "row", alignItems: "center", marginTop: 28, gap: 12 },
  line: { flex: 1, height: 1, backgroundColor: colors.border },
  dividerText: { fontSize: 12, color: colors.textSecondary, fontWeight: "600" },
  social: { flexDirection: "row", justifyContent: "center", gap: 14, marginTop: 18 },
  socialBtn: { width: 64, height: 56, borderRadius: radii.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" },
  signupRow: { flexDirection: "row", justifyContent: "center", marginTop: 28 },
  signupText: { color: colors.textSecondary, fontSize: 14 },
  signupLink: { color: colors.primary, fontWeight: "700", fontSize: 14 },
});
