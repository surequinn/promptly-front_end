import React from "react";
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
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
// import * as Clipboard from 'expo-clipboard'; // Comment out until installed
import { colors, fonts, fontSizes, spacing } from "../theme";
import PromptCard from "../components/PromptCard";
import { PromptObjectType } from "../types";

const ombreBackground = require("../../assets/images/ombre_background.png");

const { width, height } = Dimensions.get("window");
const isWebApp = Platform.OS === "web";

const scaleFactor = height < 700 ? 0.88 : height < 800 ? 0.94 : 1;
const innerContentMaxWidth = isWebApp ? 428 : Math.min(width - 40, 380);

const DUMMY_PROMPTS: PromptObjectType[] = [
  {
    id: "1",
    category: "Dating me is like...",
    responseText:
      "A choose-your-own-adventure book: full of surprises, and you get to pick the happy ending.",
  },
  {
    id: "2",
    category: "My simple pleasures:",
    responseText:
      "Finding the perfect avocado, the smell of rain on hot pavement, and a playlist that just *gets* it.",
  },
  {
    id: "3",
    category: "A random fact I love is...",
    // Use template literal for multi-line string and to avoid issues with apostrophes
    responseText: `Otters hold hands when they sleep so they don\'t float away from each other. We could be like those otters.`,
  },
];

interface PromptResultScreenProps {
  userName: string | null;
  prompts: PromptObjectType[];
  navigateToNextFlow: () => void; // For "Change Prompt"
  navigateToEditPrompt: (prompt: PromptObjectType) => void; // For editing a specific prompt
}

const PromptResultScreen: React.FC<PromptResultScreenProps> = ({
  userName,
  prompts = DUMMY_PROMPTS,
  navigateToNextFlow,
  navigateToEditPrompt,
}) => {
  const handleCopy = async (textToCopy: string) => {
    // await Clipboard.setStringAsync(textToCopy); // Comment out until Clipboard is installed
    Alert.alert("Copied (Simulated)", "Prompt copied to clipboard."); // Simulate for now
  };

  const handleEdit = (prompt: PromptObjectType) => {
    console.log(`Navigating to edit prompt: ${prompt.id}`);
    navigateToEditPrompt(prompt);
  };

  const handleChangePrompt = () => {
    console.log("Change Prompt pressed");
    Alert.alert(
      "Change Prompt",
      "Functionality to fetch new prompts to be implemented."
    );
    // This would typically trigger fetching new prompts or navigate to another state
    // For now, can call navigateToNextFlow which might loop back or go to a placeholder
    if (navigateToNextFlow) navigateToNextFlow();
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
          >
            <View
              style={[styles.contentView, { maxWidth: innerContentMaxWidth }]}
            >
              <View style={styles.headerContainer}>
                <Text style={styles.titleText}>✨ Magic's done!</Text>
                <Text style={styles.subtitleText}>
                  Here are three responses our AI generated. Like one? Hit{" "}
                  <Feather
                    name="copy"
                    size={fontSizes.md * scaleFactor}
                    color={colors.primary}
                  />{" "}
                  to copy. Want to tweak it? Tap{" "}
                  <Feather
                    name="edit-2"
                    size={fontSizes.md * scaleFactor}
                    color={colors.primary}
                  />{" "}
                  to add your thoughts.
                </Text>
              </View>

              <View style={styles.promptsListContainer}>
                {prompts.map((prompt) => (
                  <PromptCard
                    key={prompt.id}
                    category={prompt.category}
                    responseText={prompt.responseText}
                    onCopy={() => handleCopy(prompt.responseText)}
                    onEdit={() => handleEdit(prompt)}
                  />
                ))}
              </View>

              <TouchableOpacity
                style={styles.changePromptButton}
                onPress={handleChangePrompt}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#8655D5", "#A585EF"]} // Figma: fill_GUGYUW
                  style={styles.changePromptGradient}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                >
                  <Text style={styles.changePromptButtonText}>
                    Change Prompt
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
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
    justifyContent: "space-between", // Pushes button to bottom if content is short
    paddingHorizontal: spacing.lg * scaleFactor,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: spacing.xl * scaleFactor,
    width: "100%",
  },
  titleText: {
    fontFamily: fonts.interSemiBold, // Figma: Inter SemiBold
    fontSize: fontSizes.xxxl * scaleFactor, // Figma: 36px
    color: colors.primary, // Figma: #000000, using primary for consistency
    textAlign: "center",
    marginBottom: spacing.md * scaleFactor,
  },
  subtitleText: {
    fontFamily: fonts.interMedium,
    fontSize: fontSizes.md * scaleFactor, // Figma: 16px
    color: colors.primary, // Figma: #402F73
    textAlign: "center",
    lineHeight: fontSizes.md * 1.5 * scaleFactor, // Increased for icon inclusion
    maxWidth: "95%",
  },
  promptsListContainer: {
    width: "100%",
    marginBottom: spacing.lg * scaleFactor, // Space above the change prompt button
    flex: 1, // Allows scrollview to take up space if prompts are many
  },
  changePromptButton: {
    width: "80%",
    maxWidth: 250, // Figma seems smaller than PrimaryButton
    minHeight: 50 * scaleFactor, // Figma: 50px height
    borderRadius: 16 * scaleFactor, // Figma: 15.97, rounded
    overflow: "hidden", // To make borderRadius work for LinearGradient
    marginTop: spacing.lg * scaleFactor, // Ensure space from prompts if they are short
    marginBottom: spacing.sm * scaleFactor, // Some bottom margin
  },
  changePromptGradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  changePromptButtonText: {
    fontFamily: fonts.interSemiBold, // Figma: Inter SemiBold
    fontSize: fontSizes.lg * scaleFactor, // Figma: 17px
    color: colors.white,
    textAlign: "center",
  },
});

export default PromptResultScreen;
