import AlertModal from "@/components/modals/AlertModal";
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
import { colors, fonts, fontSizes, spacing } from "../theme";

const ombreBackground = require("../../assets/images/ombre_background.png");

const { width, height } = Dimensions.get("window");
const isWebApp = Platform.OS === "web";

const scaleFactor = height < 700 ? 0.88 : height < 800 ? 0.94 : 1;
const innerContentMaxWidth = isWebApp ? 428 : Math.min(width - 40, 380);

const GENDER_OPTIONS = ["Male", "Female", "Non-binary"];
const ORIENTATION_OPTIONS = ["Male", "Female", "Non-binary"];

interface GenderOrientationScreenProps {
  navigateToNext: (gender: string, orientation: string[]) => void;
}

const GenderOrientationScreen: React.FC<GenderOrientationScreenProps> = ({
  navigateToNext,
}) => {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedOrientation, setSelectedOrientation] = useState<string[]>([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const toggleOrientation = (orientation: string) => {
    setSelectedOrientation((prev) =>
      prev.includes(orientation)
        ? prev.filter((item) => item !== orientation)
        : [...prev, orientation]
    );
  };

  const handleNextPress = () => {
    if (!selectedGender || selectedOrientation.length === 0) {
      setAlertTitle("Selection Required");
      setAlertMessage(
        "Please select your gender and at least one orientation."
      );
      setAlertVisible(true);
      return;
    }
    // Ensure selectedGender is not null before proceeding, though the check above should cover it.
    if (selectedGender) {
      console.log(
        "Gender:",
        selectedGender,
        "Orientation:",
        selectedOrientation
      );
      navigateToNext(selectedGender, selectedOrientation);
    }
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
                <View style={styles.sectionContainer}>
                  <Text style={styles.titleText}>You are a...</Text>
                  <View style={styles.optionsRowContainer}>
                    {GENDER_OPTIONS.map((gender) => (
                      <SelectableButton
                        key={`gender-${gender}`}
                        title={gender}
                        isSelected={selectedGender === gender}
                        onPress={() => setSelectedGender(gender)}
                      />
                    ))}
                  </View>
                </View>

                <View style={styles.sectionContainer}>
                  <Text style={styles.titleText}>You are interested in...</Text>
                  <View style={styles.optionsRowContainer}>
                    {ORIENTATION_OPTIONS.map((orientation) => (
                      <SelectableButton
                        key={`orientation-${orientation}`}
                        title={orientation}
                        isSelected={selectedOrientation.includes(orientation)}
                        onPress={() => toggleOrientation(orientation)}
                      />
                    ))}
                  </View>
                </View>
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
  sectionContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: spacing.xl * scaleFactor * 1.5,
  },
  titleText: {
    fontFamily: fonts.interExtraBold,
    fontSize: fontSizes.xxl * scaleFactor,
    color: colors.primary,
    textAlign: "center",
    lineHeight: fontSizes.xxl * scaleFactor * 1.5,
    marginBottom: spacing.lg * scaleFactor,
  },
  optionsRowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: 360,
  },
  nextButton: {
    width: "80%",
    maxWidth: 300,
    minHeight: 55 * scaleFactor,
  },
});

export default GenderOrientationScreen;
