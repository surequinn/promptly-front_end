import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons"; // Using Feather icons
import { colors, fonts, fontSizes, spacing } from "../theme";

const { width, height } = Dimensions.get("window");
const scaleFactor = height < 700 ? 0.88 : height < 800 ? 0.94 : 1;

interface PromptCardProps {
  category: string;
  responseText: string;
  onCopy: () => void;
  onEdit: () => void;
  cardStyle?: object;
}

const PromptCard: React.FC<PromptCardProps> = ({
  category,
  responseText,
  onCopy,
  onEdit,
  cardStyle,
}) => {
  return (
    <View style={[styles.cardContainer, cardStyle]}>
      <View style={styles.textContainer}>
        <Text style={styles.categoryText}>{category}</Text>
        <Text style={styles.responseText}>"{responseText}"</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
          <Feather
            name="edit-2"
            size={20 * scaleFactor}
            color={colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onCopy} style={styles.iconButton}>
          <Feather name="copy" size={20 * scaleFactor} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 16 * scaleFactor,
    padding: spacing.md * scaleFactor,
    marginBottom: spacing.lg * scaleFactor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3 * scaleFactor,
    elevation: 3,
    width: "100%",
  },
  textContainer: {
    marginBottom: spacing.md * scaleFactor,
  },
  categoryText: {
    fontFamily: fonts.interMedium,
    fontSize: fontSizes.sm * scaleFactor, // Figma: 14px
    color: colors.textMuted, // Figma: #333333, using a muted color
    marginBottom: spacing.xs * scaleFactor,
  },
  responseText: {
    fontFamily: fonts.playfairExtraBold, // Use the correct font name from theme
    fontSize: fontSizes.lg * scaleFactor, // Figma: 20px
    color: colors.textPrimary, // Figma: Black
    lineHeight: fontSizes.lg * 1.4 * scaleFactor, // Adjust for readability
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.inputBackground, // Use an existing light grey from theme
    paddingTop: spacing.sm * scaleFactor,
    marginTop: spacing.sm * scaleFactor,
  },
  iconButton: {
    padding: spacing.xs * scaleFactor,
    marginLeft: spacing.md * scaleFactor, // Space between icons
  },
});

export default PromptCard;
