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
  View,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import SelectableButton from "../components/SelectableButton";
import { colors, fontSizes, spacing } from "../theme";

const ombreBackground = require("../../assets/images/ombre_background.png");

const { width, height } = Dimensions.get("window");
const isWebApp = Platform.OS === "web";

const scaleFactor = height < 700 ? 0.88 : height < 800 ? 0.94 : 1;
const innerContentMaxWidth = isWebApp ? 428 : Math.min(width - 40, 380);

const VIBE_OPTIONS = [
  "Funny",
  "Straightforward",
  "Cheesy",
  "Playful",
  "Flirty",
  "Witty",
];

interface PickYourVibeScreenProps {
  navigateToNextScreen: (selectedVibes: string[]) => void;
  selectedVibes: string[];
}

// Define vibeButtonBase style object outside of StyleSheet.create
const vibeButtonBaseStyle = {
  width: "48%",
  minHeight: 52 * scaleFactor,
  marginVertical: spacing.xs * scaleFactor,
  marginHorizontal: 0,
  minWidth: 0,
};

const PickYourVibeScreen: React.FC<PickYourVibeScreenProps> = ({
  navigateToNextScreen,
  selectedVibes: initialVibes,
}) => {
  const [selectedVibes, setSelectedVibes] = useState<string[]>(initialVibes);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const toggleVibe = (vibe: string) => {
    setSelectedVibes((prevVibes) =>
      prevVibes.includes(vibe)
        ? prevVibes.filter((v) => v !== vibe)
        : [...prevVibes, vibe]
    );
  };

  const handleNextPress = () => {
    if (selectedVibes.length === 0) {
      setAlertTitle("Selection Required");
      setAlertMessage("Please pick at least one vibe.");
      setAlertVisible(true);
      return;
    }
    console.log("Selected vibes:", selectedVibes);
    navigateToNextScreen(selectedVibes);
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
                <Text style={styles.titleText}>Pick your vibe ✨</Text>
                <Text style={styles.subtitleText}>
                  Choose one or more tones you like from the list below.
                </Text>

                <View style={styles.vibesContainer}>
                  {VIBE_OPTIONS.map((vibe) => (
                    <SelectableButton
                      key={vibe}
                      title={vibe}
                      isSelected={selectedVibes.includes(vibe)}
                      onPress={() => toggleVibe(vibe)}
                      useGradientWhenSelected={true}
                      gradientColors={[
                        colors.buttonGradientStop1,
                        colors.buttonGradientStop2,
                      ]}
                      style={
                        selectedVibes.includes(vibe)
                          ? styles.vibeButtonSelected
                          : styles.vibeButtonUnselected
                      }
                      textStyle={
                        selectedVibes.includes(vibe)
                          ? styles.vibeTextSelected
                          : styles.vibeTextUnselected
                      }
                    />
                  ))}
                </View>

                <Text style={styles.infoText}>
                  Go with whatever feels most "you." We'll do the rest.
                </Text>
              </View>

              <PrimaryButton
                title="Next"
                onPress={handleNextPress}
                style={styles.nextButton}
                disabled={selectedVibes.length === 0}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
      <AlertModal
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onConfirm={() => setAlertVisible(false)}
      />
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
    paddingHorizontal: spacing.md * scaleFactor,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  titleText: {
    fontFamily: getFontFamily("Inter_800ExtraBold", fontFamilies.inter),
    fontSize: fontSizes.xxxl * scaleFactor,
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.sm * scaleFactor,
  },
  subtitleText: {
    fontFamily: getFontFamily("Inter_400Regular", fontFamilies.inter),
    fontSize: fontSizes.md * scaleFactor,
    color: colors.primaryMuted,
    textAlign: "center",
    marginBottom: spacing.xl * scaleFactor,
    maxWidth: "90%",
  },
  vibesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
  },
  vibeButtonSelected: {
    ...(vibeButtonBaseStyle as object),
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  vibeButtonUnselected: {
    ...(vibeButtonBaseStyle as object),
    backgroundColor: colors.white,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  vibeTextSelected: {
    fontFamily: getFontFamily("Inter_600SemiBold", fontFamilies.inter),
    fontSize: fontSizes.md * scaleFactor,
  },
  vibeTextUnselected: {
    fontFamily: getFontFamily("Inter_400Regular", fontFamilies.inter),
    fontSize: fontSizes.md * scaleFactor,
    color: colors.primary,
  },
  infoText: {
    fontFamily: getFontFamily("Inter_500Medium", fontFamilies.inter),
    fontSize: fontSizes.sm * scaleFactor,
    color: colors.primary,
    textAlign: "center",
    marginTop: spacing.lg * scaleFactor,
    lineHeight: fontSizes.sm * 1.3 * scaleFactor,
  },
  nextButton: {
    width: "80%",
    maxWidth: 300,
    minHeight: 55 * scaleFactor,
    marginTop: spacing.lg * scaleFactor,
  },
});

export default PickYourVibeScreen;
