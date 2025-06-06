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
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Clipboard from "expo-clipboard";
import { colors, fonts, fontSizes, spacing } from "@/theme";
import PromptCard from "@/components/PromptCard";
import ChangePromptModal from "@/components/modals/ChangePromptModal";
import { SignOutButton } from "@/components/SignOutButton";
import { PromptObjectType } from "@/types";

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
      "Finding a parking spot right in front of the store on a busy day—unexpectedly perfect and makes you feel like you've won.",
  },
  {
    id: "2",
    category: "Dating me is like...",
    responseText:
      "A software update. Mostly improves your life, occasionally has a weird bug, but always trying to get better.",
  },
  {
    id: "3",
    category: "Dating me is like...",
    responseText: `A perfectly curated playlist. There's a song for every mood, some unexpected deep cuts, and it's guaranteed to make you dance.`,
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
  prompts,
  navigateToNextFlow,
  navigateToEditPrompt,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const promptsToRender =
    prompts && prompts.length > 0 ? prompts : DUMMY_PROMPTS;

  const handleCopy = async (textToCopy: string) => {
    await Clipboard.setStringAsync(textToCopy);
    Alert.alert("Copied!", "Prompt copied to clipboard.");
  };

  const handleEdit = (prompt: PromptObjectType) => {
    console.log(`Navigating to edit prompt: ${prompt.id}`);
    navigateToEditPrompt(prompt);
  };

  const handleChangePrompt = () => {
    setIsModalVisible(true);
    // Alternative approach: could call navigateToNextFlow() directly
    // if we want to skip the modal and go straight to edit flow
  };

  const handleSelectPrompt = (prompt: string) => {
    console.log("Selected new prompt category:", prompt);
    // Here you would typically trigger an API call to get new prompts
    // For now, we just close the modal.
    setIsModalVisible(false);
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
                <View style={styles.headerTop}>
                  <Text style={styles.titleText}>✨ Magic's done!</Text>
                  <SignOutButton
                    style={styles.signOutButton}
                    textStyle={styles.signOutText}
                  />
                </View>
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
                {promptsToRender.map((prompt) => (
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
      <ChangePromptModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelectPrompt={handleSelectPrompt}
      />
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
  headerContainer: {
    alignItems: "center",
    marginBottom: spacing.xl * scaleFactor,
    width: "100%",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: spacing.md * scaleFactor,
  },
  titleText: {
    fontFamily: fonts.interSemiBold, // Figma: Inter SemiBold
    fontSize: fontSizes.xxxl * scaleFactor, // Figma: 36px
    color: colors.primary, // Figma: #000000, using primary for consistency
    textAlign: "center",
    flex: 1,
  },
  signOutButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 12 * scaleFactor,
    paddingVertical: 6 * scaleFactor,
    borderRadius: 20,
  },
  signOutText: {
    fontSize: 12 * scaleFactor,
    color: colors.primary,
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
    marginVertical: spacing.lg * scaleFactor,
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
