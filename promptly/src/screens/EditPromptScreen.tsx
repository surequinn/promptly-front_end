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
  TouchableOpacity,
  Alert,
} from "react-native";
import { colors, fonts, fontSizes, spacing } from "../theme";
import PrimaryButton from "../components/PrimaryButton";
import PromptCard from "../components/PromptCard"; // To display the original prompt
import { PromptObjectType } from "../types"; // Import from shared types

const ombreBackground = require("../../assets/images/ombre_background.png");

const { width, height } = Dimensions.get("window");
const isWebApp = Platform.OS === "web";

const scaleFactor = height < 700 ? 0.88 : height < 800 ? 0.94 : 1;
const innerContentMaxWidth = isWebApp ? 428 : Math.min(width - 40, 380);

interface EditPromptScreenProps {
  promptToEdit: PromptObjectType | null;
  onSaveChanges: (promptId: string, editText: string) => void;
  onCancel: () => void;
}

const EditPromptScreen: React.FC<EditPromptScreenProps> = ({
  promptToEdit,
  onSaveChanges,
  onCancel,
}) => {
  const [editText, setEditText] = useState("");

  if (!promptToEdit) {
    // Should not happen if navigation is set up correctly
    return (
      <View style={styles.rootScreenContainer}>
        <Text>Error: No prompt selected for editing.</Text>
      </View>
    );
  }

  const handleSubmit = () => {
    if (editText.trim() === "") {
      Alert.alert(
        "Feedback Needed",
        "Please tell us how to improve the prompt."
      );
      return;
    }
    onSaveChanges(promptToEdit.id, editText);
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
            keyboardShouldPersistTaps="handled"
          >
            <View
              style={[styles.contentView, { maxWidth: innerContentMaxWidth }]}
            >
              <View style={styles.mainContent}>
                <Text style={styles.titleText}>Let's remix this!</Text>

                <PromptCard
                  category={promptToEdit.category}
                  responseText={promptToEdit.responseText}
                  onCopy={() => {}} // No copy/edit actions on this screen for the displayed card
                  onEdit={() => {}}
                  cardStyle={styles.originalPromptCard}
                />

                <View style={styles.instructionBox}>
                  <Text style={styles.instructionText}>
                    Didn't quite hit the mark? Tell us what's missing and we'll
                    take another swing. What did or didn't work for you? Want a
                    new tone? (e.g., more confident, playful, sincere, weirdly
                    poetic) We're all ears.
                  </Text>
                </View>

                <TextInput
                  style={styles.feedbackInput}
                  placeholder="Add your two cents here..."
                  placeholderTextColor={colors.textPlaceholder}
                  value={editText}
                  onChangeText={setEditText}
                  multiline={true}
                  textAlignVertical="top"
                  numberOfLines={5} // Suggests a larger input area
                />
              </View>

              <View style={styles.buttonContainer}>
                <PrimaryButton
                  title="Submit"
                  onPress={handleSubmit}
                  style={styles.submitButton}
                />
                <TouchableOpacity
                  onPress={onCancel}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelButtonText}>
                    I'm good! Take me back
                  </Text>
                </TouchableOpacity>
              </View>
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
    justifyContent: "flex-start",
    width: "100%",
    alignItems: "center",
  },
  titleText: {
    fontFamily: fonts.interExtraBold,
    fontSize: fontSizes.xxxl * scaleFactor, // 36px from Figma
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.lg * scaleFactor,
  },
  originalPromptCard: {
    backgroundColor: colors.white, // Figma shows gradient, using white for now
    opacity: 0.8, // Slightly muted to differentiate from main action area
    marginBottom: spacing.md * scaleFactor,
  },
  instructionBox: {
    backgroundColor: colors.inputBackground, // Simplified from Figma gradient
    borderRadius: 16 * scaleFactor,
    padding: spacing.md * scaleFactor,
    marginBottom: spacing.md * scaleFactor,
    width: "100%",
    borderColor: colors.primaryMuted,
    borderWidth: 1,
  },
  instructionText: {
    fontFamily: fonts.interMedium,
    fontSize: fontSizes.sm * scaleFactor, // 14px from Figma
    color: colors.primary,
    lineHeight: fontSizes.sm * 1.4 * scaleFactor,
  },
  feedbackInput: {
    width: "100%",
    minHeight: 120 * scaleFactor, // Based on Figma visual proportion for comments
    backgroundColor: colors.inputBackground, // Figma #F6F6F6
    borderRadius: 20 * scaleFactor, // Figma: 30px, using slightly less
    paddingHorizontal: spacing.lg * scaleFactor,
    paddingVertical: spacing.md * scaleFactor,
    fontFamily: fonts.interRegular,
    fontSize: fontSizes.md * scaleFactor,
    color: colors.textPrimary,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2, // Figma suggests 4px for some boxes, using 2 for subtlety
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: spacing.lg * scaleFactor,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  submitButton: {
    width: "80%",
    maxWidth: 200, // Figma button is smaller "Submit"
    minHeight: 50 * scaleFactor,
    marginBottom: spacing.md * scaleFactor,
  },
  cancelButton: {
    paddingVertical: spacing.sm * scaleFactor,
  },
  cancelButtonText: {
    fontFamily: fonts.interSemiBold,
    fontSize: fontSizes.md * scaleFactor, // 16px from Figma
    color: colors.primary, // Figma #402F73
    textAlign: "center",
  },
});

export default EditPromptScreen;
