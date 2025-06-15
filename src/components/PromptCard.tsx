import { colors, fontSizes, spacing } from "@/theme";
import { fontFamilies, getFontFamily } from "@/theme/typography";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height } = Dimensions.get("window");
const scaleFactor = height < 700 ? 0.9 : 1;

interface PromptCardProps {
  promptId: string;
  category: string;
  responseText: string;
  onCopy: () => void;
  onEdit: () => void;
  hideEditButton?: boolean;
  hideCopyButton?: boolean;
  onSave?: (promptId: string, category: string, responseText: string) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({
  promptId,
  category,
  responseText,
  onCopy,
  onEdit,
  onSave,
  hideEditButton,
  hideCopyButton,
}) => {
  return (
    <LinearGradient
      colors={["#FFFFFF", "#FDF4F8", "#F5E6F5", "#E6E6FA"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardContainer}
    >
      <Text style={styles.categoryText}>{category}</Text>
      <View style={styles.responseOuterContainer}>
        <Text style={[styles.quoteText, styles.beginQuote]}>“</Text>
        <View style={styles.responseInnerContainer}>
          <Text style={styles.responseText}>{responseText}</Text>
        </View>
        <Text style={[styles.quoteText, styles.endQuote]}>”</Text>
      </View>
      <View style={styles.actionsContainer}>
        {!hideCopyButton && (
          <TouchableOpacity onPress={onCopy} style={styles.actionButton}>
            <Feather
              name="copy"
              size={22 * scaleFactor}
              color={colors.primary}
            />
          </TouchableOpacity>
        )}
        {!hideEditButton && (
          <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
            <Feather
              name="edit-2"
              size={22 * scaleFactor}
              color={colors.primary}
            />
          </TouchableOpacity>
        )}
        {onSave && !1 && (
          <TouchableOpacity
            onPress={() => onSave(promptId, category, responseText)}
            style={styles.actionButton}
          >
            <Feather
              name="save"
              size={22 * scaleFactor}
              color={colors.primary}
            />
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    padding: spacing.lg,
    marginVertical: spacing.md,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 8,
  },
  categoryText: {
    fontFamily: getFontFamily("Inter_500Medium", fontFamilies.inter),
    fontSize: fontSizes.sm * scaleFactor,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  responseOuterContainer: {
    // New container to manage the quotes and text as a block
  },
  responseInnerContainer: {
    paddingHorizontal: spacing.xl, // Indent the text from the quotes
    paddingVertical: spacing.sm,
  },
  quoteText: {
    fontFamily: getFontFamily(
      "PlayfairDisplay_800ExtraBold",
      fontFamilies.playfair
    ),
    fontSize: fontSizes.xxxl * scaleFactor,
    color: colors.primaryMuted,
    position: "absolute",
  },
  beginQuote: {
    top: -spacing.md,
    left: 0,
    transform: [{ translateY: 5 }],
  },
  endQuote: {
    bottom: -spacing.md,
    right: 0,
    transform: [{ translateY: -5 }],
  },
  responseText: {
    fontFamily: getFontFamily(
      "PlayfairDisplay_800ExtraBold",
      fontFamilies.playfair
    ),
    fontSize: fontSizes.xl * scaleFactor,
    color: colors.textPrimary,
    lineHeight: fontSizes.xl * 1.5 * scaleFactor,
    textAlign: "left",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: spacing.sm,
  },
  actionButton: {
    marginLeft: spacing.lg,
  },
});

export default PromptCard;
