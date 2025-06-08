import { colors, fontSizes, spacing } from "@/theme";
import { fontFamilies, getFontFamily } from "@/theme/typography";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PROMPT_CATEGORIES = [
  "Dating me is like...",
  "My simple pleasures",
  "A random fact I love is...",
  "I'm looking for...",
  "My greatest strength",
  "A pro and con of dating me",
  "I geek out on...",
  "My most controversial opinion is...",
  "Together, we could...",
];

interface ChangePromptModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelectPrompt: (prompt: string) => void;
}

const ChangePromptModal: React.FC<ChangePromptModalProps> = ({
  isVisible,
  onClose,
  onSelectPrompt,
}) => {
  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <BlurView intensity={30} tint="dark" style={styles.blurView}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.title}>Change Prompt</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Feather name="x" size={24} color={colors.white} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {PROMPT_CATEGORIES.map((prompt, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.promptButton}
                  onPress={() => onSelectPrompt(prompt)}
                >
                  <Text style={styles.promptText}>{prompt}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  blurView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "70%",
    backgroundColor: "rgba(40, 20, 60, 0.85)", // Dark purple with opacity
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  modalContent: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: getFontFamily("Inter_700Bold", fontFamilies.inter),
    fontSize: fontSizes.xl,
    color: colors.white,
  },
  closeButton: {
    padding: spacing.xs,
  },
  promptButton: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  promptText: {
    fontFamily: getFontFamily("Inter_400Regular", fontFamilies.inter),
    fontSize: fontSizes.md,
    color: colors.white,
  },
});

export default ChangePromptModal;
