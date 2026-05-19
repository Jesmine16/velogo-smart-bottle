export const colors = {
  background: "#F9FAFB",
  surface: "#FFFFFF",
  surfaceSecondary: "#F3F4F6",
  primary: "#007AFF",
  primaryLight: "#E5F0FF",
  primaryDark: "#0066D6",
  cyan: "#00C6FF",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  textTertiary: "#9CA3AF",
  success: "#34C759",
  warning: "#FF9500",
  danger: "#FF3B30",
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  white: "#FFFFFF",
  black: "#000000",
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const shadows = {
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 30,
    elevation: 3,
  },
  floating: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 40,
    elevation: 6,
  },
  buttonPrimary: {
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.39,
    shadowRadius: 14,
    elevation: 6,
  },
};

export const typography = {
  h1: { fontSize: 34, fontWeight: "800" as const, color: colors.textPrimary, letterSpacing: -0.5 },
  h2: { fontSize: 26, fontWeight: "700" as const, color: colors.textPrimary, letterSpacing: -0.3 },
  h3: { fontSize: 20, fontWeight: "700" as const, color: colors.textPrimary },
  body: { fontSize: 15, color: colors.textSecondary, lineHeight: 22 },
  bodyStrong: { fontSize: 15, color: colors.textPrimary, fontWeight: "600" as const },
  label: { fontSize: 11, fontWeight: "700" as const, color: colors.textSecondary, letterSpacing: 0.8, textTransform: "uppercase" as const },
  data: { fontSize: 44, fontWeight: "900" as const, color: colors.textPrimary, letterSpacing: -1 },
};
