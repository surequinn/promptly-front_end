import { LinearGradient } from "expo-linear-gradient"; // Expo's linear gradient
import React from "react";
import {
  ColorValue,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import {
  colors,
  fontFamilies,
  fontSizes,
  getFontFamily,
  spacing,
  typography,
} from "../../theme";

// Omit 'title' from TouchableOpacityProps because we define it more specifically.
interface ButtonProps extends Omit<TouchableOpacityProps, "title"> {
  title: string; // Our title is always a string
  onPress: () => void;
  variant?: "primary" | "secondary" | "gradientRainbow"; // Add more variants as needed
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress, // onPress is part of TouchableOpacityProps
  variant = "primary",
  style, // style from TouchableOpacityProps
  textStyle: customTextStyle, // Renaming to avoid confusion with internal text var
  disabled, // disabled from TouchableOpacityProps
  ...rest // other TouchableOpacityProps
}) => {
  const getButtonStyles = () => {
    switch (variant) {
      case "secondary":
        return {
          button: styles.secondaryButton,
          text: styles.secondaryButtonText,
        };
      case "gradientRainbow": // For selected vibe buttons
        return {
          button: styles.gradientRainbowButton, // Will be a container for LinearGradient
          text: styles.gradientButtonText,
        };
      case "primary":
      default:
        return {
          button: styles.primaryButton, // Will be a container for LinearGradient
          text: styles.primaryButtonText,
        };
    }
  };

  const { button: variantButtonStyles, text: variantTextStyles } =
    getButtonStyles();

  // Define gradientColors with a more specific type that satisfies LinearGradient
  let concreteGradientColors:
    | Readonly<[ColorValue, ColorValue, ...ColorValue[]]>
    | undefined;

  if (variant === "primary") {
    concreteGradientColors = [
      colors.buttonGradientStop1,
      colors.buttonGradientStop2,
    ];
  } else if (variant === "gradientRainbow") {
    concreteGradientColors = [
      colors.gradientRainbowStop1,
      colors.gradientRainbowStop2,
      colors.gradientRainbowStop3,
      colors.gradientRainbowStop4,
      colors.gradientRainbowStop5,
      colors.gradientRainbowStop6,
      colors.gradientRainbowStop7,
      colors.gradientRainbowStop8,
      colors.gradientRainbowStop9,
    ];
  }

  if (concreteGradientColors) {
    // This implies variant is 'primary' or 'gradientRainbow'
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.buttonBase,
          variantButtonStyles,
          style,
          disabled && styles.disabledButton,
        ]}
        {...rest}
      >
        <LinearGradient
          colors={concreteGradientColors} // Now correctly typed
          style={styles.gradient}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <Text style={[styles.textBase, variantTextStyles, customTextStyle]}>
            {title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.buttonBase,
        variantButtonStyles,
        style,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled}
      {...rest}
    >
      <Text style={[styles.textBase, variantTextStyles, customTextStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.lg, // 16px
    paddingHorizontal: spacing.xxl, // 24px
    borderRadius: 30, // From Figma for "Next" buttons
    minHeight: 50, // Common height from Figma
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30, // Match base
  },
  textBase: {
    textAlign: "center",
  },
  primaryButton: {
    // backgroundColor is handled by LinearGradient
  },
  primaryButtonText: {
    fontFamily: getFontFamily("Inter_700Bold", fontFamilies.inter),
    fontSize: fontSizes.xxl, // Explicitly 24px for Next button
    lineHeight: fontSizes.xxl * 1, // Adjust line height for 24px text if needed, e.g. 24px * 0.833 = 20px
    color: colors.white,
  },
  secondaryButton: {
    backgroundColor: colors.white, // Or a light purple/grey as per Figma unselected states
    borderColor: colors.primaryMuted, // Example: #5B2D5C
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontFamily: getFontFamily("Inter_500Medium", fontFamilies.inter),
    fontSize: typography.buttonSmall.fontSize,
    color: colors.primary, // Example: #402F73
  },
  gradientRainbowButton: {
    // backgroundColor is handled by LinearGradient
  },
  gradientButtonText: {
    fontFamily: getFontFamily("Inter_500Medium", fontFamilies.inter),
    fontSize: typography.buttonSmall.fontSize,
    color: colors.white,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default Button;
