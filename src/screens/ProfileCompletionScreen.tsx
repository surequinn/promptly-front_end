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

const scaleFactor = height < 700 ? 0.88 : height < 800 ? 0.94 : 1;
const innerContentMaxWidth = isWebApp ? 428 : Math.min(width - 40, 380);

interface ProfileCompletionScreenProps {
  userName: string | null; // To display the user's name
  navigateToNext: () => void;
}

const ProfileCompletionScreen: React.FC<ProfileCompletionScreenProps> = ({
  userName,
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
            keyboardShouldPersistTaps="handled"
          >
            <View
              style={[styles.contentView, { maxWidth: innerContentMaxWidth }]}
            >
              <View style={styles.mainContent}>
                <Text style={styles.titleText}>
                  Perfect, {userName || "User"} 🎉
                </Text>
                <Text style={styles.bodyText}>
                  We'll use AI to pick the perfect prompt to help you stand out
                  effortlessly. We'll write three responses for you.
                  {"\n\n"} {/* Manual line break based on Figma visual */}
                  Let's start with the first one. You'll have the option to
                  improve or change the prompt after.
                </Text>
              </View>

              <PrimaryButton
                title="Next"
                onPress={navigateToNext}
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
    backgroundColor: colors.primaryMuted,
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
  mainContent: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  titleText: {
    fontFamily: getFontFamily("Inter_800ExtraBold", fontFamilies.inter),
    fontSize: fontSizes.xxxl * scaleFactor, // 36px from Figma
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.lg * scaleFactor, // Spacing between title and body
    lineHeight: fontSizes.xxxl * 1.5 * scaleFactor, // Figma: 1.5em
  },
  bodyText: {
    fontFamily: getFontFamily("Inter_500Medium", fontFamilies.inter), // Figma: fontWeight 500
    fontSize: fontSizes.md * scaleFactor, // 16px from Figma
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.xl * scaleFactor, // Space before button
    maxWidth: "90%",
    lineHeight: fontSizes.md * 1.3 * scaleFactor, // Adjusted for readability
  },
  nextButton: {
    width: "80%",
    maxWidth: 300,
    minHeight: 55 * scaleFactor,
    marginTop: spacing.md * scaleFactor, // Adjusted to ensure it's visually separated if content is short
  },
});

export default ProfileCompletionScreen;
