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

interface AgeInputScreenProps {
  navigateToNext: (age: number) => void;
}

const AgeInputScreen: React.FC<AgeInputScreenProps> = ({ navigateToNext }) => {
  const [age, setAge] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleAgeChange = (text: string) => {
    // Allow only numbers and limit to 3 digits
    const numericText = text.replace(/[^0-9]/g, "");
    if (numericText.length <= 3) {
      setAge(numericText);
    }
  };

  const handleNextPress = () => {
    if (!isValidAge(age)) {
      setAlertTitle("Invalid Age");
      setAlertMessage("Please enter a valid age.");
      setAlertVisible(true);
      return;
    }
    const ageNumber = parseInt(age, 10);
    console.log("Age submitted:", ageNumber);
    navigateToNext(ageNumber);
  };

  const isValidAge = (age: string): boolean => {
    if (age.trim() === "") return false;
    const ageNumber = parseInt(age, 10);
    return ageNumber > 0 && ageNumber <= 120;
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
                <Text style={styles.titleText}>How old are you? 🥳</Text>

                <TextInput
                  style={styles.inputField}
                  placeholder="Your age ..."
                  placeholderTextColor={colors.textPlaceholder}
                  value={age}
                  onChangeText={handleAgeChange}
                  keyboardType="number-pad"
                  maxLength={3} // Redundant due to handleAgeChange but good practice
                />
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
    paddingHorizontal: spacing.xl * scaleFactor,
  },
  mainContent: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
  },
  titleText: {
    fontFamily: getFontFamily("Inter_800ExtraBold", fontFamilies.inter),
    fontSize: fontSizes.xxl * scaleFactor, // 24px base from Figma
    color: colors.primary,
    textAlign: "center",
    lineHeight: fontSizes.xxl * scaleFactor * 1.2, // Figma: 1.2em for this title variant
    marginBottom: spacing.xxl * scaleFactor * 1.5,
  },
  inputField: {
    fontFamily: getFontFamily("Inter_500Medium", fontFamilies.inter),
    fontSize: fontSizes.lg * scaleFactor, // ~20px from Figma
    color: colors.textPrimary,
    backgroundColor: colors.white,
    width: "100%",
    maxWidth: 320, // Changed from 200 to 320 for consistency
    height: 55 * scaleFactor,
    borderRadius: 30, // Figma: 32px, using consistent 30px pill shape
    paddingHorizontal: spacing.lg * scaleFactor,
    textAlign: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.0,
    elevation: 4,
  },
  nextButton: {
    width: "80%",
    maxWidth: 300,
    minHeight: 55 * scaleFactor,
  },
});

export default AgeInputScreen;
