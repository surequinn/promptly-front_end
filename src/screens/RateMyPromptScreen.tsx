import PrimaryButton from "@/components/PrimaryButton";
import { colors, fontFamilies, fontSizes, spacing } from "@/theme";
import { getFontFamily } from "@/theme/typography";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
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

  const filteredPrompts = searchQuery
    ? PROMPTS.filter((p) => p.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const handleSelectPrompt = (prompt: string) => {
    setSelectedPrompt(prompt);
    setSearchQuery(prompt);
  };

  return (
    <ImageBackground source={ombreBackground} style={styles.backgroundImage}>
      <SafeAreaView style={styles.flexContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.flexContainer}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
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
                  placeholderTextColor={colors.textMuted}
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

            <TextInput
              style={styles.responseInput}
              multiline
              placeholder="Your response here"
              placeholderTextColor={colors.textMuted}
              value={response}
              onChangeText={setResponse}
              textAlignVertical="top"
            />

            <PrimaryButton
              title="Next"
              onPress={() => navigateToNext(selectedPrompt, response)}
              disabled={!selectedPrompt || !response}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  flexContainer: { flex: 1 },
  backgroundImage: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    padding: spacing.lg,
    justifyContent: "center",
  },
  title: {
    fontFamily: getFontFamily("Inter_800ExtraBold", fontFamilies.inter),
    fontSize: fontSizes.xxxl,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: getFontFamily("Inter_400Regular", fontFamilies.inter),
    fontSize: fontSizes.md,
    color: colors.textMuted,
    marginBottom: spacing.xl,
    width: "80%",
  },
  searchContainer: {
    marginBottom: spacing.lg,
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 58,
    paddingHorizontal: spacing.lg,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 5,
    height: 58,
  },
  searchIcon: {
    marginRight: spacing.md,
  },
  searchInput: {
    flex: 1,
    fontFamily: getFontFamily("Inter_400Regular", fontFamilies.inter),
    fontSize: fontSizes.md,
    color: colors.textPrimary,
  },
  dropdown: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: spacing.sm,
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
    fontSize: fontSizes.md,
    color: colors.textPrimary,
  },
  responseInput: {
    backgroundColor: colors.inputBackground,
    borderRadius: 25,
    padding: spacing.lg,
    fontFamily: getFontFamily("Inter_400Regular", fontFamilies.inter),
    fontSize: fontSizes.md,
    color: colors.textPrimary,
    minHeight: 150,
    marginBottom: spacing.xl,
    paddingTop: spacing.lg,
  },
});

export default RateMyPromptScreen;
