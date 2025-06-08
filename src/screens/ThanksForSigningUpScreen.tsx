import { fontFamilies, getFontFamily } from "@/theme/typography";
import React from "react";
import {
  Dimensions,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { colors, fontSizes, spacing } from "../theme";

const ombreBackground = require("../../assets/images/ombre_background.png");

const { width, height } = Dimensions.get("window");
const isWebApp = Platform.OS === "web";

// Consistent scaleFactor and innerContentMaxWidth with AuthScreen
const scaleFactor = height < 700 ? 0.88 : height < 800 ? 0.94 : 1;
const innerContentMaxWidth = isWebApp ? 428 : Math.min(width - 40, 380);

interface ThanksForSigningUpScreenProps {
  navigateToNext: () => void;
}

const ThanksForSigningUpScreen: React.FC<ThanksForSigningUpScreenProps> = ({
  navigateToNext,
}) => {
  return (
    <View style={styles.rootScreenContainer}>
      <ImageBackground
        source={ombreBackground}
        style={styles.backgroundImageFullScreen}
        imageStyle={styles.fullScreenImageStyle}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeAreaContentContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
          >
            <View
              style={[styles.contentView, { maxWidth: innerContentMaxWidth }]}
            >
              <View style={styles.textContainer}>
                <Text style={styles.titleText}>Thanks for signing up! 🙌</Text>
                <Text style={styles.subtitleText}>
                  Let's make a prompt that sounds like you. Just a few quick
                  questions—your vibe, your interests, what makes you different.
                  Ready?
                </Text>
              </View>
              <PrimaryButton
                title="Next"
                onPress={() => {
                  console.log(
                    "Next button pressed on ThanksForSigningUpScreen, navigating to NameInput"
                  );
                  navigateToNext();
                }}
                style={styles.nextButton}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  rootScreenContainer: {
    flex: 1,
    backgroundColor: colors.primaryMuted, // Fallback using theme color
  },
  backgroundImageFullScreen: {
    flex: 1,
  },
  fullScreenImageStyle: {
    width: "100%",
    height: "100%",
  },
  safeAreaContentContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.xl * scaleFactor,
  },
  contentView: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg * scaleFactor,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  titleText: {
    fontFamily: getFontFamily("Inter_800ExtraBold", fontFamilies.inter),
    fontSize: fontSizes.xxxxl * scaleFactor,
    color: colors.primary,
    textAlign: "center",
    lineHeight: fontSizes.xxxxl * scaleFactor * 1.15,
    marginBottom: spacing.md * scaleFactor,
  },
  subtitleText: {
    fontFamily: getFontFamily("Inter_500Medium", fontFamilies.inter),
    fontSize: fontSizes.md * scaleFactor,
    color: colors.primary,
    textAlign: "center",
    lineHeight: fontSizes.md * scaleFactor * 1.3,
  },
  nextButton: {
    width: "80%",
    maxWidth: 300,
    minHeight: 55 * scaleFactor,
  },
});

export default ThanksForSigningUpScreen;
