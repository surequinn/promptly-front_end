import { fontFamilies, getFontFamily } from "@/theme/typography";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors, fontSizes } from "../theme";

interface SelectableButtonProps {
  title: string;
  onPress: () => void;
  isSelected: boolean;
  style?: object;
  textStyle?: object;
  useGradientWhenSelected?: boolean;
  gradientColors?: readonly [string, string, ...string[]];
}

const { height } = Dimensions.get("window");
const scaleFactor = height < 700 ? 0.88 : height < 800 ? 0.94 : 1;

const SelectableButton: React.FC<SelectableButtonProps> = ({
  title,
  onPress,
  isSelected,
  style,
  textStyle,
  useGradientWhenSelected = false,
  gradientColors = [colors.buttonGradientStop1, colors.buttonGradientStop2],
}) => {
  const showGradient = isSelected && useGradientWhenSelected;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        showGradient
          ? styles.buttonSelectedGradientBase
          : isSelected
          ? styles.buttonSelected
          : styles.buttonUnselected,
        style,
        showGradient && { backgroundColor: "transparent" },
      ]}
      activeOpacity={0.7}
    >
      {showGradient ? (
        <LinearGradient
          colors={gradientColors}
          style={styles.gradientBackground}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <Text
            style={[styles.buttonText, styles.textSelectedGradient, textStyle]}
          >
            {title}
          </Text>
        </LinearGradient>
      ) : (
        <Text
          style={[
            styles.buttonText,
            isSelected ? styles.textSelected : styles.textUnselected,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 16 * scaleFactor,
    paddingVertical: 14 * scaleFactor,
    paddingHorizontal: 18 * scaleFactor,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 90 * scaleFactor,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.0,
    elevation: 2,
  },
  buttonSelected: {
    backgroundColor: colors.primaryMuted,
  },
  buttonSelectedGradientBase: {},
  buttonUnselected: {
    backgroundColor: colors.white,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16 * scaleFactor,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: fontSizes.md * scaleFactor,
    textAlign: "center",
  },
  textSelected: {
    fontFamily: getFontFamily("Inter_700Bold", fontFamilies.inter),
    color: colors.white,
  },
  textSelectedGradient: {
    fontFamily: getFontFamily("Inter_700Bold", fontFamilies.inter),
    color: colors.white,
  },
  textUnselected: {
    fontFamily: getFontFamily("Inter_500Medium", fontFamilies.inter),
    color: colors.textMuted,
  },
});

export default SelectableButton;
