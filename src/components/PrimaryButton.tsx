import { fontFamilies, getFontFamily } from "@/theme/typography";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors, fontSizes } from "../theme";

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
  disabled?: boolean;
}

const { height } = Dimensions.get("window");
const scaleFactor = height < 700 ? 0.88 : height < 800 ? 0.94 : 1;

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        style,
        disabled && styles.disabledButtonContainer,
      ]}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <LinearGradient
        colors={[colors.buttonGradientStop1, colors.buttonGradientStop2]}
        style={styles.gradient}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabledButtonContainer: {
    opacity: 0.5,
  },
  gradient: {
    paddingVertical: 15 * scaleFactor,
    paddingHorizontal: 30 * scaleFactor,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: getFontFamily("Inter_700Bold", fontFamilies.inter),
    fontSize: fontSizes.xxl * scaleFactor, // 24px base
    color: colors.white,
    textAlign: "center",
    lineHeight: fontSizes.xxl * scaleFactor * 1.1, // Adjust line height to prevent clipping
  },
});

export default PrimaryButton;
