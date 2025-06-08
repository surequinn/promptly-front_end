import { Platform } from "react-native";

export const fontFamilies = {
  // Original names kept for conceptual reference, but direct usage will be specific font strings
  inter: "Inter", // Base name
  playfair: "Playfair Display", // Base name
  gelasio: "Gelasio", // Base name
  paytoneOne: "Paytone One", // Base name
};

// These specific strings are what you'll use in your StyleSheet objects
export const fonts = {
  interLight: "Inter_200ExtraLight",
  interRegular: "Inter_400Regular",
  interMedium: "Inter_500Medium",
  interSemiBold: "Inter_600SemiBold",
  interBold: "Inter_700Bold",
  interExtraBold: "Inter_800ExtraBold",

  playfairBold: "PlayfairDisplay_700Bold",
  playfairExtraBold: "PlayfairDisplay_800ExtraBold",

  gelasioSemiBold: "Gelasio_600SemiBold",
  gelasioBold: "Gelasio_700Bold",

  paytoneOneRegular: "PaytoneOne_400Regular",
};

export function getFontFamily(nativeFont: string, webFont: string) {
  return Platform.OS === "web" ? webFont : nativeFont;
}

// Font weights are now part of the font name (e.g., Inter_700Bold)
// The fontWeights object can be kept for numericfontWeight compatibility if needed elsewhere,
// but for fontFamily, use the names from the 'fonts' object above.
export const fontWeights = {
  interLight: "200" as const,
  interRegular: "400" as const,
  interMedium: "500" as const,
  interSemiBold: "600" as const,
  interBold: "700" as const,
  interExtraBold: "800" as const,

  playfairBold: "700" as const,
  playfairExtraBold: "800" as const,

  gelasioSemiBold: "600" as const,
  gelasioBold: "700" as const,
};

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  xxxxl: 36,
  xxxxxl: 50, // For large display text like "Effortlessly✨"
  xxxxxxl: 64, // For hero text like "Stand out on Hinge"
};

// Specific text styles combining family, weight, and size from Figma analysis
export const typography = {
  // Headings from Figma
  h1: {
    fontFamily: getFontFamily(fonts.gelasioBold, fontFamilies.gelasio),
    fontWeight: fontWeights.gelasioBold,
    fontSize: fontSizes.xxxxxxl, // 64px
    lineHeight: 65, // Approx 1.015625em for 64px
  },
  h2: {
    fontFamily: getFontFamily(fonts.gelasioSemiBold, fontFamilies.gelasio),
    fontWeight: fontWeights.gelasioSemiBold,
    fontSize: fontSizes.xxxxxl, // 50px
    lineHeight: 60, // Approx 1.2em for 50px
  },
  h3: {
    fontFamily: getFontFamily(fonts.interExtraBold, fontFamilies.inter),
    fontWeight: fontWeights.interExtraBold,
    fontSize: fontSizes.xxxxl, // 36px
    lineHeight: 43, // Approx 1.2em for 36px (e.g., "Need a hand with your Hinge prompt?")
  },
  h4: {
    fontFamily: getFontFamily(fonts.interExtraBold, fontFamilies.inter),
    fontWeight: fontWeights.interExtraBold,
    fontSize: fontSizes.xxl, // 24px
    lineHeight: 36, // 1.5em for 24px (e.g., "You are a...")
  },
  h5: {
    fontFamily: getFontFamily(fonts.interBold, fontFamilies.inter),
    fontWeight: fontWeights.interBold, // For titles like "Hinge Prompts"
    fontSize: fontSizes.xl, // 20px
    lineHeight: 24, // 1.2em
  },

  // Body and UI text
  bodyLg: {
    fontFamily: getFontFamily(fonts.interMedium, fontFamilies.inter),
    fontWeight: fontWeights.interMedium,
    fontSize: fontSizes.lg, // 18px
    lineHeight: 20, // Approx 1.11em for 18px (e.g., "Describe yourself...")
  },
  bodyMd: {
    fontFamily: getFontFamily(fonts.interMedium, fontFamilies.inter),
    fontWeight: fontWeights.interMedium, // or regular 400 based on usage
    fontSize: fontSizes.md, // 16px
    lineHeight: 19, // Approx 1.2em for 16px
  },
  bodySm: {
    fontFamily: getFontFamily(fonts.interRegular, fontFamilies.inter),
    fontWeight: fontWeights.interRegular,
    fontSize: fontSizes.sm, // 14px
    lineHeight: 17, // Approx 1.2em for 14px
  },

  // Prompt text (critical style)
  promptText: {
    fontFamily: getFontFamily(fonts.playfairExtraBold, fontFamilies.playfair),
    fontWeight: fontWeights.playfairExtraBold,
    fontSize: fontSizes.xl, // 20px
    lineHeight: 18, // 0.9em for 20px, as per Figma
    letterSpacing: -0.01, // -1%
  },

  // Button text
  button: {
    fontFamily: getFontFamily(fonts.interBold, fontFamilies.inter),
    fontWeight: fontWeights.interBold, // e.g. Next button 24px
    fontSize: fontSizes.xxl, // For large Next buttons
    // lineHeight will vary, e.g. 0.833em for 24px Next button
  },
  buttonSmall: {
    fontFamily: getFontFamily(fonts.interSemiBold, fontFamilies.inter),
    fontWeight: fontWeights.interSemiBold,
    fontSize: fontSizes.lg, // 18px for Vibe buttons, 17px for Submit
  },

  // Special cases
  inputPlaceholder: {
    fontFamily: getFontFamily(fonts.interLight, fontFamilies.inter),
    fontWeight: fontWeights.interLight,
    fontSize: fontSizes.sm, // 14px
    lineHeight: 17, // Approx 1.2em
  },
  promptLabel: {
    fontFamily: getFontFamily(fonts.interMedium, fontFamilies.inter),
    fontWeight: fontWeights.interMedium,
    fontSize: fontSizes.sm, // 14px
    lineHeight: 21, // 1.5em
  },
  loadingDots: {
    fontFamily: getFontFamily(fonts.playfairBold, fontFamilies.playfair),
    fontWeight: fontWeights.playfairBold,
    fontSize: fontSizes.xxxl, // 30px
    lineHeight: 36, // 1.2em
  },
  // Specific font for Paytone One, if needed directly and not part of a style above
  paytoneOne: {
    fontFamily: getFontFamily(fonts.paytoneOneRegular, fontFamilies.paytoneOne),
  },
};

export type TypographyTheme = typeof typography;
export type FontFamilies = typeof fontFamilies;
export type FontWeights = typeof fontWeights;
export type FontSizes = typeof fontSizes;
