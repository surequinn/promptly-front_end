import PrimaryButton from "@/components/PrimaryButton";
import { colors, fontFamilies, fontSizes, spacing } from "@/theme";
import { getFontFamily } from "@/theme/typography";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import AlertModal from "@/components/modals/AlertModal";

const ombreBackground = require("../../assets/images/ombre_background.png");

const { width, height } = Dimensions.get("window");

const PROMPTS = [
  "Together, we could...",
  "My simple pleasures",
  "A random fact I love is...",
  "I'm looking for...",
];

interface RateMyPromptScreenProps {
  navigateToNext: (prompt: string, response: string) => void;
}

const RateMyPromptScreen: React.FC<RateMyPromptScreenProps> = ({
  navigateToNext,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  const filteredPrompts = searchQuery
    ? PROMPTS.filter((p) => p.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleSelectPrompt = (prompt: string) => {
    setSelectedPrompt(prompt);
    setSearchQuery(prompt);
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
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentView}>
          <Text style={styles.title}>Rate my response</Text>
          <Text style={styles.subtitle}>
            Put your response to the test. We'll judge (nicely). 😉
          </Text>

          <View style={styles.searchContainer}>
            <View style={styles.searchInputWrapper}>
              <Feather
                name="search"
                size={20}
                color={colors.textMuted}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for your prompt"
                placeholderTextColor="#808080"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onFocus={() => setSelectedPrompt("")}
              />
            </View>
            {filteredPrompts.length > 0 && !selectedPrompt && (
              <View style={styles.dropdown}>
                {filteredPrompts.map((prompt) => (
                  <TouchableOpacity
                    key={prompt}
                    style={styles.dropdownItem}
                    onPress={() => handleSelectPrompt(prompt)}
                  >
                    <Text style={styles.dropdownItemText}>{prompt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.responseContainer}>
            <TextInput
              style={styles.responseInput}
              multiline
              placeholder="Your response here"
              placeholderTextColor="#898A8D"
              value={response}
              onChangeText={setResponse}
              textAlignVertical="top"
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Next"
            onPress={() => navigateToNext(selectedPrompt, response)}
            disabled={!selectedPrompt || !response}
          />
        </View>
      </ScrollView>
      <AlertModal
        visible={alertVisible}
        title="Selection Required"
        message="Please select a prompt and write a response."
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
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  contentView: {
    flex: 1,
    paddingTop: 120,
    alignItems: "center",
  },
  title: {
    fontFamily: getFontFamily("Inter_800ExtraBold", fontFamilies.inter),
    fontSize: 36,
    color: "#402F73",
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: getFontFamily("Inter_400Regular", fontFamilies.inter),
    fontSize: 16,
    color: "#808080",
    marginBottom: spacing.xl,
    textAlign: "center",
    width: "80%",
  },
  searchContainer: {
    width: "100%",
    marginBottom: spacing.lg,
    zIndex: 1, // Ensure dropdown appears over other content
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 58,
    paddingHorizontal: spacing.lg,
    height: 58,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 5,
  },
  searchIcon: {
    marginRight: spacing.md,
  },
  searchInput: {
    flex: 1,
    fontFamily: getFontFamily("Inter_400Regular", fontFamilies.inter),
    fontSize: 16,
    color: colors.textPrimary,
  },
  dropdown: {
    position: "absolute",
    top: 62,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 5,
  },
  dropdownItem: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBackground,
  },
  dropdownItemText: {
    fontFamily: getFontFamily("Inter_400Regular", fontFamilies.inter),
    fontSize: 16,
    color: colors.textPrimary,
  },
  responseContainer: {
    width: "100%",
    flex: 1,
    marginBottom: spacing.xl,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  responseInput: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    borderRadius: 25,
    padding: spacing.lg,
    fontFamily: getFontFamily("Inter_200ExtraLight", fontFamilies.inter),
    fontSize: 14,
    color: colors.textPrimary,
    paddingTop: spacing.lg,
    textAlignVertical: "top",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
});

export default RateMyPromptScreen;
