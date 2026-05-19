import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../src/components/PrimaryButton";
import { colors, radii } from "../src/theme";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <TouchableOpacity testID="back-btn" onPress={() => router.back()} style={styles.back}>
            <Ionicons name="chevron-back" size={26} color={colors.textPrimary} />
          </TouchableOpacity>

          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Start your hydration journey with VeloGo.</Text>

          <View style={{ marginTop: 28 }}>
            <Field testID="signup-name" icon="person-outline" placeholder="Full name" value={name} onChangeText={setName} />
            <Field testID="signup-email" icon="mail-outline" placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            <Field testID="signup-password" icon="lock-closed-outline" placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Field testID="signup-confirm" icon="shield-checkmark-outline" placeholder="Confirm password" value={confirm} onChangeText={setConfirm} secureTextEntry />
          </View>

          <View style={styles.terms}>
            <View style={styles.checkbox}>
              <Ionicons name="checkmark" size={14} color={colors.white} />
            </View>
            <Text style={styles.termsText}>I agree to VeloGo's Terms and Privacy Policy.</Text>
          </View>

          <PrimaryButton
            testID="signup-submit-btn"
            title="Create Account"
            onPress={() => router.replace("/add-bottle")}
            style={{ marginTop: 18 }}
          />

          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Already a member? </Text>
            <TouchableOpacity testID="go-to-login" onPress={() => router.replace("/login")}>
              <Text style={styles.signupLink}>Log in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Field({ icon, ...props }: any) {
  return (
    <View style={styles.inputWrap}>
      <Ionicons name={icon} size={20} color={colors.textSecondary} />
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.textTertiary}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  scroll: { paddingHorizontal: 28, paddingBottom: 32 },
  back: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", marginTop: 8 },
  title: { fontSize: 32, fontWeight: "900", color: colors.textPrimary, marginTop: 24, letterSpacing: -1 },
  subtitle: { fontSize: 15, color: colors.textSecondary, marginTop: 6 },
  inputWrap: { flexDirection: "row", alignItems: "center", backgroundColor: colors.surface, borderRadius: radii.lg, paddingHorizontal: 16, height: 56, borderWidth: 1, borderColor: colors.border, gap: 12, marginBottom: 12 },
  input: { flex: 1, fontSize: 16, color: colors.textPrimary },
  terms: { flexDirection: "row", alignItems: "center", marginTop: 8, gap: 10 },
  checkbox: { width: 20, height: 20, borderRadius: 6, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" },
  termsText: { color: colors.textSecondary, fontSize: 13, flex: 1 },
  signupRow: { flexDirection: "row", justifyContent: "center", marginTop: 24 },
  signupText: { color: colors.textSecondary, fontSize: 14 },
  signupLink: { color: colors.primary, fontWeight: "700", fontSize: 14 },
});
