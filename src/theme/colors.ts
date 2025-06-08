export const colors = {
  // Primary palette
  primary: "#402F73", // Main purple
  primaryDark: "#302357", // A darker shade for gradients
  primaryLight: "#7F58C8", // Lighter purple for "Stand out on Hinge"
  primaryMuted: "#B18DB2", // Lighter purple from Figma

  // Text colors
  textPrimary: "#000000", // Main text (prompts)
  textSecondary: "#333333", // Secondary text (labels)
  textPlaceholder: "#898A8D", // Input placeholders
  textMuted: "rgba(34, 23, 42, 0.4)", // Light purple text

  // Background colors
  white: "#FFFFFF",
  inputBackground: "#F6F6F6",
  menuIcon: "#8E8E8E",

  // Gradient definitions (will be used in components, not directly as simple colors)
  // Storing the hex codes for reference and potential utility functions
  gradientRainbowStop1: "#4BC4FF",
  gradientRainbowStop2: "#1A9AFF",
  gradientRainbowStop3: "#9676FF",
  gradientRainbowStop4: "#BE64FE",
  gradientRainbowStop5: "#E157CB",
  gradientRainbowStop6: "#EF5794",
  gradientRainbowStop7: "#FD683F",
  gradientRainbowStop8: "#FE7C2B",
  gradientRainbowStop9: "#FFA10B",

  gradientModalStop1: "#A7C3C9",
  gradientModalStop2: "#C3ADB9",
  gradientModalStop3: "#E098A6",
  gradientModalStop4: "#F08A97",
  gradientModalStop5: "#F1838C",

  buttonGradientStop1: "#7F69D5",
  buttonGradientStop2: "#402F73",
};

// It's often useful to have a type for your colors
export type ColorTheme = typeof colors;
