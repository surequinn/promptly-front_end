import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fonts, fontSizes, spacing } from "@/theme";

const { height } = Dimensions.get("window");
const scaleFactor = height < 700 ? 0.9 : 1;

interface PromptCardProps {
  category: string;
  responseText: string;
  onCopy: () => void;
  onEdit: () => void;
  hideEditButton?: boolean;
}

const PromptCard: React.FC<PromptCardProps> = ({
  category,
  responseText,
  onCopy,
  onEdit,
  hideEditButton,
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
        <TouchableOpacity onPress={onCopy} style={styles.actionButton}>
          <Feather name="copy" size={22 * scaleFactor} color={colors.primary} />
        </TouchableOpacity>
        {!hideEditButton && (
          <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
            <Feather
              name="edit-2"
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
    fontFamily: fonts.interMedium,
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
    fontFamily: fonts.playfairExtraBold,
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
    fontFamily: fonts.playfairExtraBold,
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
