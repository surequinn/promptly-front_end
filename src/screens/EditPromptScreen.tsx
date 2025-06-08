import PromptCard from "@/components/PromptCard";
import { colors, fontSizes, spacing } from "@/theme";
import { fontFamilies, getFontFamily } from "@/theme/typography";
import { PromptObjectType } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ombreBackground = require("../../assets/images/ombre_background.png");

const { width, height } = Dimensions.get("window");
const isWebApp = Platform.OS === "web";

// Responsive design: limit width on web to phone-like dimensions
const scaleFactor = height < 700 ? 0.88 : height < 800 ? 0.94 : 1;
const innerContentMaxWidth = isWebApp ? 428 : Math.min(width - 40, 380);

interface EditPromptScreenProps {
  promptToEdit: PromptObjectType;
  onSave: (promptId: string, editedText: string) => void;
  onCancel: () => void;
}

const EditPromptScreen: React.FC<EditPromptScreenProps> = ({
  promptToEdit,
  onSave,
  onCancel,
}) => {
  const [remixText, setRemixText] = useState("");

  return (
    <View style={styles.rootScreenContainer}>
      <ImageBackground
        source={ombreBackground}
        style={styles.backgroundImageFullScreen}
        imageStyle={styles.fullScreenImageStyle}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeAreaContentContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.flexContainer}
          >
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View
                style={[styles.contentView, { maxWidth: innerContentMaxWidth }]}
              >
                <Text style={styles.title}>Let's remix this!</Text>

                <PromptCard
                  promptId={promptToEdit.id}
                  {...promptToEdit}
                  onCopy={() => {}}
                  onEdit={() => {}}
                  hideEditButton
                />

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>
                    Didn't quite hit the mark? Tell us what's missing and we'll
                    take another swing. What did or didn't work for you? Want a
                    new tone? (e.g., more confident, playful, sincere, weirdly
                    poetic) We're all ears.
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    multiline
                    placeholder="Add your two cents here..."
                    placeholderTextColor={colors.textMuted}
                    value={remixText}
                    onChangeText={setRemixText}
                  />
                </View>

                <TouchableOpacity
                  onPress={() => onSave(promptToEdit.id, remixText)}
                  activeOpacity={0.8}
                  style={styles.submitButtonContainer}
                >
                  <LinearGradient
                    colors={[colors.primaryDark, colors.primary]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.submitButton}
                  >
                    <Text style={styles.submitButtonText}>Submit</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={onCancel}>
                  <Text style={styles.cancelText}>I'm good! Take me back</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  rootScreenContainer: {
    flex: 1,
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
    justifyContent: "center",
  },
  flexContainer: {
    flex: 1,
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
    justifyContent: "space-around",
    paddingHorizontal: spacing.lg * scaleFactor,
  },
  title: {
    fontFamily: getFontFamily("Inter_800ExtraBold", fontFamilies.inter),
    fontSize: fontSizes.xxxl * scaleFactor,
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.lg * scaleFactor,
  },
  inputContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: spacing.lg * scaleFactor,
    marginVertical: spacing.lg * scaleFactor,
    width: "100%",
  },
  inputLabel: {
    fontFamily: getFontFamily("Inter_400Regular", fontFamilies.inter),
    fontSize: fontSizes.sm * scaleFactor,
    color: colors.textSecondary,
    marginBottom: spacing.md * scaleFactor,
    lineHeight: fontSizes.sm * 1.4 * scaleFactor,
  },
  textInput: {
    fontFamily: getFontFamily("Inter_400Regular", fontFamilies.inter),
    fontSize: fontSizes.md * scaleFactor,
    color: colors.textPrimary,
    minHeight: 100 * scaleFactor,
    textAlignVertical: "top",
  },
  submitButtonContainer: {
    width: "80%",
    maxWidth: 250,
    marginBottom: spacing.md * scaleFactor,
  },
  submitButton: {
    borderRadius: 15,
    paddingVertical: spacing.md * scaleFactor,
    alignItems: "center",
  },
  submitButtonText: {
    fontFamily: getFontFamily("Inter_600SemiBold", fontFamilies.inter),
    fontSize: fontSizes.lg * scaleFactor,
    color: colors.white,
  },
  cancelText: {
    fontFamily: getFontFamily("Inter_600SemiBold", fontFamilies.inter),
    fontSize: fontSizes.md * scaleFactor,
    color: colors.primary,
    textAlign: "center",
  },
});

export default EditPromptScreen;
