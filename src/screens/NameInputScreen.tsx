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

interface NameInputScreenProps {
  navigateToNext: (name: string) => void;
}

const NameInputScreen: React.FC<NameInputScreenProps> = ({
  navigateToNext,
}) => {
  const [name, setName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const handleNextPress = () => {
    if (name.trim() === "") {
      setModalVisible(true);
      return;
    }
    console.log("Name submitted:", name);
    navigateToNext(name);
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
            <Text style={styles.titleText}>What's your name? ✨</Text>

            <TextInput
              style={styles.inputField}
              placeholder="Your name"
              placeholderTextColor={colors.textPlaceholder}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

          <PrimaryButton
            title="Next"
            onPress={handleNextPress}
            style={styles.nextButton}
          />
        </View>
      </ScrollView>
      <AlertModal
        visible={modalVisible}
        title="Name Required"
        message="Please enter your name."
        onConfirm={() => {
          setModalVisible(false);
        }}
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
    fontSize: fontSizes.xxl * scaleFactor, // Figma: 24px, theme.xxl is 24px
    color: colors.primary,
    textAlign: "center",
    lineHeight: fontSizes.xxl * scaleFactor * 1.5, // Figma: 1.5em
    marginBottom: spacing.xxl * scaleFactor * 1.5, // Increased space below title
  },
  inputField: {
    fontFamily: getFontFamily("Inter_500Medium", fontFamilies.inter),
    fontSize: fontSizes.lg * scaleFactor, // Figma: ~20px, theme.lg is 18px, close enough with scaling
    color: colors.textPrimary,
    backgroundColor: colors.white,
    width: "100%",
    maxWidth: 320, // Max width for the input field itself
    height: 55 * scaleFactor, // Adjusted height with scaling
    borderRadius: 30, // Figma: 32px, common pill shape
    paddingHorizontal: spacing.lg * scaleFactor,
    textAlign: "center",
    // marginBottom: spacing.xxl * scaleFactor * 2, // Margin now handled by justifyContent or mainContent wrapper
    // Shadow properties from Figma (effect_90GOI7)
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2, // Figma suggests 4px, but 2px is common for subtle shadows
    },
    shadowOpacity: 0.2, // Reduced from 0.25 for subtlety
    shadowRadius: 3.0, // Reduced from 3.84
    elevation: 4, // Elevation for Android shadow
  },
  nextButton: {
    width: "80%",
    maxWidth: 300,
    minHeight: 55 * scaleFactor,
    // marginTop: spacing.lg * scaleFactor, // No longer needed if space-between is effective
  },
});

export default NameInputScreen;
