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
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // For gradient buttons
import { colors, fonts, fontSizes, spacing } from "../theme";
import PrimaryButton from "../components/PrimaryButton";

const ombreBackground = require("../../assets/images/ombre_background.png");

const { width, height } = Dimensions.get("window");
const isWebApp = Platform.OS === "web";

const scaleFactor = height < 700 ? 0.88 : height < 800 ? 0.94 : 1;
const innerContentMaxWidth = isWebApp ? 428 : Math.min(width - 40, 380);

type SelectionType = "write" | "rate";

interface WriteOrRateScreenProps {
  navigateToNextScreen: (selection: SelectionType) => void; // Will eventually take user to different screens
}

const WriteOrRateScreen: React.FC<WriteOrRateScreenProps> = ({
  navigateToNextScreen,
}) => {
  const [selectedOption, setSelectedOption] = useState<SelectionType>("write"); // Default to 'write'

  const handleNextPress = () => {
    if (!selectedOption) {
      Alert.alert("Selection Required", "Please choose an option.");
      return;
    }
    console.log("Selected option:", selectedOption);
    navigateToNextScreen(selectedOption);
    // Later, this will navigate to different screens based on selectedOption
  };

  // Placeholder for choice button styles - will be detailed later
  const getChoiceButtonStyle = (option: SelectionType) => {
    return selectedOption === option
      ? styles.choiceButtonSelected
      : styles.choiceButtonUnselected;
  };
  const getChoiceSubTextStyle = (option: SelectionType) => {
    return selectedOption === option
      ? styles.choiceSubTextSelected
      : styles.choiceSubTextUnselected;
  };
  const getChoiceMainTextStyle = (option: SelectionType) => {
    return selectedOption === option
      ? styles.choiceMainTextSelected
      : styles.choiceMainTextUnselected;
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
                  Need a hand with your Hinge prompt?
                </Text>

                {/* Option 1: Write */}
                <TouchableOpacity
                  style={[
                    styles.choiceButtonBase,
                    getChoiceButtonStyle("write"),
                  ]}
                  onPress={() => setSelectedOption("write")}
                  activeOpacity={0.7}
                >
                  {selectedOption === "write" ? (
                    <LinearGradient
                      colors={[
                        colors.buttonGradientStop1,
                        colors.buttonGradientStop2,
                      ]}
                      style={styles.gradientBackground}
                    >
                      <Text style={getChoiceSubTextStyle("write")}>
                        Let our AI make you shine:
                      </Text>
                      <Text style={getChoiceMainTextStyle("write")}>
                        Write a response for me
                      </Text>
                    </LinearGradient>
                  ) : (
                    <>
                      <Text style={getChoiceSubTextStyle("write")}>
                        Let our AI make you shine:
                      </Text>
                      <Text style={getChoiceMainTextStyle("write")}>
                        Write a response for me
                      </Text>
                    </>
                  )}
                </TouchableOpacity>

                {/* Option 2: Rate */}
                <TouchableOpacity
                  style={[
                    styles.choiceButtonBase,
                    getChoiceButtonStyle("rate"),
                    { marginTop: spacing.lg * scaleFactor },
                  ]}
                  onPress={() => setSelectedOption("rate")}
                  activeOpacity={0.7}
                >
                  {selectedOption === "rate" ? (
                    <LinearGradient
                      colors={[
                        colors.buttonGradientStop1,
                        colors.buttonGradientStop2,
                      ]}
                      style={styles.gradientBackground}
                    >
                      <Text style={getChoiceSubTextStyle("rate")}>
                        Already have one? Let's rate and refine it:
                      </Text>
                      <Text style={getChoiceMainTextStyle("rate")}>
                        Rate my response
                      </Text>
                    </LinearGradient>
                  ) : (
                    <>
                      <Text style={getChoiceSubTextStyle("rate")}>
                        Already have one? Let's rate and refine it:
                      </Text>
                      <Text style={getChoiceMainTextStyle("rate")}>
                        Rate my response
                      </Text>
                    </>
                  )}
                </TouchableOpacity>

                <Text style={styles.infoText}>
                  Takes less than a minute. Give it a try, and you won't regret
                  it!
                </Text>
              </View>

              <PrimaryButton
                title="Next"
                onPress={handleNextPress}
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
    paddingHorizontal: spacing.xl * scaleFactor,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  titleText: {
    fontFamily: fonts.interExtraBold,
    fontSize: fontSizes.xxxl * scaleFactor, // Figma: 36px (approx)
    color: colors.primary,
    textAlign: "center",
    lineHeight: fontSizes.xxxl * 1.2 * scaleFactor,
    marginBottom: spacing.xxl * scaleFactor,
  },
  choiceButtonBase: {
    width: "100%",
    maxWidth: 303, // From Figma
    minHeight: 70, // From Figma
    borderRadius: 16 * scaleFactor, // From Figma
    padding: spacing.md * scaleFactor,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // For LinearGradient border radius
  },
  choiceButtonSelected: {
    // Uses LinearGradient for background
  },
  choiceButtonUnselected: {
    backgroundColor: colors.white, // Figma was #5B2D5C (primaryMuted), using white for better contrast with purple text
    borderWidth: 1,
    borderColor: colors.primary,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.md * scaleFactor,
  },
  choiceSubTextSelected: {
    fontFamily: fonts.interRegular, // Figma: Inter Regular 16
    fontSize: fontSizes.sm * scaleFactor, // 16px approx
    color: colors.white,
    textAlign: "center",
    opacity: 0.8, // Slight mute for subtext
    marginBottom: spacing.xs * scaleFactor,
  },
  choiceSubTextUnselected: {
    fontFamily: fonts.interRegular,
    fontSize: fontSizes.sm * scaleFactor,
    color: colors.primaryMuted, // Figma: #808080 for "write", #402F73 for "rate"
    textAlign: "center",
    opacity: 0.8,
    marginBottom: spacing.xs * scaleFactor,
  },
  choiceMainTextSelected: {
    fontFamily: fonts.interSemiBold, // Figma: Inter SemiBold 23
    fontSize: fontSizes.xl * scaleFactor, // 23px approx
    color: colors.white,
    textAlign: "center",
  },
  choiceMainTextUnselected: {
    fontFamily: fonts.interRegular, // Figma: Inter Regular 23 for "rate"
    fontSize: fontSizes.xl * scaleFactor,
    color: colors.primary, // Figma: #402F73
    textAlign: "center",
  },
  infoText: {
    fontFamily: fonts.interMedium, // Figma: Inter Medium 16
    fontSize: fontSizes.sm * scaleFactor, // 16px
    color: colors.primary, // Figma: #402F73
    textAlign: "center",
    marginTop: spacing.xl * scaleFactor,
    lineHeight: fontSizes.sm * 1.3 * scaleFactor,
  },
  nextButton: {
    width: "80%",
    maxWidth: 300, // Consistent with other screens
    minHeight: 55 * scaleFactor, // Consistent
    marginTop: spacing.lg * scaleFactor, // Give some space above if content is short
  },
});

export default WriteOrRateScreen;
