import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fontSizes, spacing } from "@/theme";
import { fontFamilies, getFontFamily } from "@/theme/typography";

const ombreBackground = require("../../assets/images/ombre_background.png");

export type NextStep = "improve" | "rate_another" | "write_new";

interface RatingNextStepScreenProps {
  onSelect: (selection: NextStep) => void;
}

const RatingNextStepScreen: React.FC<RatingNextStepScreenProps> = ({
  onSelect,
}) => {
  return (
    <ImageBackground
      source={ombreBackground}
      style={styles.backgroundImageFullScreen}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>What's next? 👉</Text>
          <Text style={styles.subtitle}>
            Tweak it, try another, or let Promptly take the wheel.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => onSelect("improve")}
            activeOpacity={0.8}
            style={[styles.button, styles.primaryButton]}
          >
            <LinearGradient
              colors={["#8655D5", "#A585EF"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.gradient}
            >
              <Text style={[styles.buttonText, styles.primaryButtonText]}>
                Improve my response
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onSelect("rate_another")}
            style={[styles.button, styles.secondaryButton]}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Rate another response
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onSelect("write_new")}
            style={[styles.button, styles.secondaryButton]}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Write one for me
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImageFullScreen: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  title: {
    fontFamily: getFontFamily("Inter_800ExtraBold", fontFamilies.inter),
    fontSize: 36,
    color: "#402F73",
    textAlign: "center",
    marginBottom: spacing.md,
  },
  subtitle: {
    fontFamily: getFontFamily("Inter_400Regular", fontFamilies.inter),
    fontSize: 16,
    color: "#808080",
    textAlign: "center",
    maxWidth: "80%",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    width: "100%",
    maxWidth: 340,
    height: 78,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  primaryButton: {
    padding: 0,
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#402F73",
  },
  buttonText: {
    fontSize: 23,
    textAlign: "center",
  },
  primaryButtonText: {
    fontFamily: getFontFamily("Inter_600SemiBold", fontFamilies.inter),
    color: "#FFFFFF",
  },
  secondaryButtonText: {
    fontFamily: getFontFamily("Inter_400Regular", fontFamilies.inter),
    color: "#402F73",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
});

export default RatingNextStepScreen;
