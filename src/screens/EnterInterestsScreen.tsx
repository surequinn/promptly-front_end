import AlertModal from "@/components/modals/AlertModal";
import { fontFamilies, getFontFamily } from "@/theme/typography";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { colors, fontSizes, spacing } from "../theme";

const ombreBackground = require("../../assets/images/ombre_background.png");

const { width, height } = Dimensions.get("window");
const isWebApp = Platform.OS === "web";

const scaleFactor = height < 700 ? 0.88 : height < 800 ? 0.94 : 1;
const innerContentMaxWidth = isWebApp ? 428 : Math.min(width - 40, 380);

interface EnterInterestsScreenProps {
  navigateToNextScreen: (interests: string[]) => void;
  selectedInterests: string[];
}

const EnterInterestsScreen: React.FC<EnterInterestsScreenProps> = ({
  navigateToNextScreen,
  selectedInterests: initialInterests,
}) => {
  const [interestsText, setInterestsText] = useState(
    initialInterests.join(", ")
  );
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const validateAndProceed = () => {
    console.log(
      "%c [ validateAndProceed ]-35",
      "font-size:13px; background:pink; color:#bf2c9f;",
      interestsText
    );
    const interestsArray = interestsText
      .split(/[,\n]+/)
      .map((interest) => interest.trim())
      .filter((interest) => interest !== "");

    if (interestsArray.length < 3) {
      setAlertTitle("More Interests Needed");
      setAlertMessage("Please list at least 3 interests.");
      setAlertVisible(true);
      return;
    }
    console.log("Entered interests:", interestsArray);
    navigateToNextScreen(interestsArray);
  };

  return (
    <ImageBackground
      source={ombreBackground}
      style={styles.backgroundImageFullScreen}
      imageStyle={styles.fullScreenImageStyle}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.contentView, { maxWidth: innerContentMaxWidth }]}>
          <View style={styles.mainContent}>
            <Text style={styles.titleText}>What are your interests? 🤔</Text>
            <Text style={styles.subtitle1Text}>Give us at least 3!</Text>
            <Text style={styles.instructionText}>
              We're not looking for a resume — just 3 things you genuinely
              enjoy. Could be something classic or something random like
              collecting passport stamps or building playlists for every mood.
            </Text>

            <TextInput
              style={styles.interestsInput}
              placeholder="E.g. I love cooking, tennis, writing"
              placeholderTextColor={colors.textPlaceholder}
              value={interestsText}
              onChangeText={setInterestsText}
              multiline={true}
              textAlignVertical="top" // Align placeholder and text to top for multiline
            />
          </View>

          <PrimaryButton
            title="Next"
            onPress={validateAndProceed}
            style={styles.nextButton}
          />
        </View>
      </ScrollView>
      <AlertModal
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onConfirm={() => setAlertVisible(false)}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImageFullScreen: {
    flex: 1,
  },
  fullScreenImageStyle: {
    width: "100%",
    height: "100%",
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
    paddingHorizontal: spacing.lg * scaleFactor, // Figma seems to have generous padding for this screen content
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
    marginBottom: spacing.sm * scaleFactor,
  },
  subtitle1Text: {
    fontFamily: getFontFamily("Inter_500Medium", fontFamilies.inter), // Figma: fontWeight 500
    fontSize: fontSizes.xl * scaleFactor, // 24px from Figma (using xl as xxl is 24 but might be too big with scaling)
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.md * scaleFactor,
  },
  instructionText: {
    fontFamily: getFontFamily("Inter_500Medium", fontFamilies.inter), // Figma: fontWeight 500
    fontSize: fontSizes.md * scaleFactor, // 16px from Figma
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.lg * scaleFactor,
    maxWidth: "95%",
    lineHeight: fontSizes.md * 1.4 * scaleFactor,
  },
  interestsInput: {
    fontFamily: getFontFamily("Inter_400Regular", fontFamilies.inter), // Assuming regular for input
    fontSize: fontSizes.md * scaleFactor, // Assuming standard input text size
    color: colors.textPrimary,
    width: "100%",
    minHeight: 150 * scaleFactor, // Based on Figma visual proportion
    backgroundColor: "#F6F6F6", // Figma color
    borderRadius: 25 * scaleFactor, // Figma value
    paddingHorizontal: spacing.lg * scaleFactor,
    paddingVertical: spacing.md * scaleFactor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Standard elevation for shadow
    marginBottom: spacing.xl * scaleFactor,
  },
  nextButton: {
    width: "80%",
    maxWidth: 300,
    minHeight: 55 * scaleFactor,
    marginTop: spacing.md * scaleFactor, // Reduced top margin a bit
  },
});

export default EnterInterestsScreen;
