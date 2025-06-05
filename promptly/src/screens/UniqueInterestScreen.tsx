import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Platform,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import { colors, fonts, fontSizes, spacing } from "../theme";
import PrimaryButton from "../components/PrimaryButton";

const ombreBackground = require("../../assets/images/ombre_background.png");

const { width, height } = Dimensions.get("window");
const isWebApp = Platform.OS === "web";

const scaleFactor = height < 700 ? 0.88 : height < 800 ? 0.94 : 1;
const innerContentMaxWidth = isWebApp ? 428 : Math.min(width - 40, 380);

interface UniqueInterestScreenProps {
  navigateToNextScreen: (uniqueInterest: string) => void;
}

const UniqueInterestScreen: React.FC<UniqueInterestScreenProps> = ({
  navigateToNextScreen,
}) => {
  const [uniqueInterestText, setUniqueInterestText] = useState("");

  const validateAndProceed = () => {
    const trimmedInterest = uniqueInterestText.trim();
    if (trimmedInterest === "") {
      Alert.alert(
        "One More Thing!",
        "Please tell us about a specific interest or trait."
      );
      return;
    }
    console.log("Entered unique interest:", trimmedInterest);
    navigateToNextScreen(trimmedInterest);
  };

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
                  Tell us something specific you love 😍
                </Text>
                <Text style={styles.subtitle1Text}>Give us at least 1!</Text>
                <Text style={styles.instructionText}>
                  This could be something oddly specific, low-key nerdy, or just
                  delightfully random. The weirder or more personal, the better.
                  We'll make it shine.
                </Text>

                <TextInput
                  style={styles.uniqueInterestInput}
                  placeholder="E.g. I love Wes Anderson films, I'm obsessed with fermentation, I always cry during Pixar movies"
                  placeholderTextColor={colors.textPlaceholder}
                  value={uniqueInterestText}
                  onChangeText={setUniqueInterestText}
                  multiline={true}
                  textAlignVertical="top"
                />
              </View>

              <PrimaryButton
                title="Next"
                onPress={validateAndProceed}
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
    fontFamily: fonts.interExtraBold,
    fontSize: fontSizes.xxxl * scaleFactor, // 36px from Figma
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.sm * scaleFactor,
  },
  subtitle1Text: {
    fontFamily: fonts.interMedium, // Figma: fontWeight 500
    fontSize: fontSizes.xl * scaleFactor, // 24px from Figma
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.md * scaleFactor,
  },
  instructionText: {
    fontFamily: fonts.interMedium, // Figma: fontWeight 500
    fontSize: fontSizes.md * scaleFactor, // 16px from Figma
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.lg * scaleFactor,
    maxWidth: "95%",
    lineHeight: fontSizes.md * 1.4 * scaleFactor,
  },
  uniqueInterestInput: {
    width: "100%",
    minHeight: 150 * scaleFactor, // Based on Figma visual proportion
    backgroundColor: "#F6F6F6", // Figma color
    borderRadius: 25 * scaleFactor, // Figma value
    paddingHorizontal: spacing.lg * scaleFactor,
    paddingVertical: spacing.md * scaleFactor,
    fontFamily: fonts.interRegular,
    fontSize: fontSizes.md * scaleFactor,
    color: colors.textPrimary, // Ensure this is defined in your theme or use a default
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: spacing.xl * scaleFactor,
  },
  nextButton: {
    width: "80%",
    maxWidth: 300,
    minHeight: 55 * scaleFactor,
    marginTop: spacing.md * scaleFactor,
  },
});

export default UniqueInterestScreen;
