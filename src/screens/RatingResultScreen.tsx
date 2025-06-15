import PromptCard from "@/components/PromptCard";
import { colors, fontSizes, spacing } from "@/theme";
import { fontFamilies, getFontFamily } from "@/theme/typography";
import { PromptObjectType } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";

const ombreBackground = require("../../assets/images/ombre_background.png");

// Dummy data for display
const dummyRatedPrompt: PromptObjectType = {
  id: "user-1",
  userId: "test-user-id",
  aiGenerated: false,
  status: "active",
  createdAt: new Date().toISOString(),
  category: "Together, we could...",
  responseText:
    "Finally figure out what the dog is thinking. And also, maybe travel.",
};

const dummyRating = {
  score: "7/10",
  explanation: [
    {
      title: "Strong Start!",
      body: "Great opening! It's quirky and immediately shows off your sense of humor. The idea of figuring out what a dog is thinking is a fun, universal concept that many people can relate to.",
    },
    {
      title: "Room for a Little More 'You'",
      body: "The second part, 'maybe travel,' feels a bit generic. It's a common interest, which is fine, but it doesn't add as much personality as the first part. What kind of travel excites you? A spontaneous road trip? Visiting every ramen shop in Tokyo? Getting more specific can make your response even more memorable.",
    },
    {
      title: "The Verdict",
      body: "This is a solid, engaging response that's likely to get a smile. To elevate it, consider replacing the travel line with another unique, specific idea that complements the humor of the first part. Keep up the great work!",
    },
  ],
};

interface RatingResultScreenProps {
  ratedPrompt: PromptObjectType;
  rating?: typeof dummyRating;
  navigateToNext: () => void;
}

const RatingResultScreen: React.FC<RatingResultScreenProps> = ({
  ratedPrompt = dummyRatedPrompt,
  rating = dummyRating,
  navigateToNext,
}) => {
  return (
    <ImageBackground
      source={ombreBackground}
      style={styles.backgroundImageFullScreen}
      imageStyle={styles.fullScreenImageStyle}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentView}>
          <Text style={styles.scoreText}>{rating.score} 🎉</Text>
          <Text style={styles.scoreSubtitle}>NICE!</Text>

          <View style={styles.cardContainer}>
            <PromptCard
              promptId={ratedPrompt.id}
              {...ratedPrompt}
              hideEditButton
              hideCopyButton
              onCopy={() => {}}
              onEdit={() => {}}
            />
          </View>

          <View style={styles.explanationContainer}>
            {rating.explanation.map((item, index) => (
              <View key={index} style={styles.explanationItem}>
                <Text style={styles.explanationTitle}>{item.title}</Text>
                <Text style={styles.explanationBody}>{item.body}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton title="Done" onPress={navigateToNext} />
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImageFullScreen: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  contentView: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
  },
  fullScreenImageStyle: {
    width: "100%",
    height: "100%",
  },
  scoreText: {
    fontFamily: getFontFamily("Inter_800ExtraBold", fontFamilies.inter),
    fontSize: 36,
    color: "#402F73",
    textAlign: "center",
  },
  scoreSubtitle: {
    fontFamily: getFontFamily("Inter_600SemiBold", fontFamilies.inter),
    fontSize: fontSizes.lg,
    color: "#402F73",
    letterSpacing: 2,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  cardContainer: {
    width: "100%",
    marginBottom: spacing.xl,
    // Using a simple background for now, as PromptCard has its own styling.
    // The complex gradient from Figma might be better applied inside PromptCard if needed.
  },
  explanationContainer: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: spacing.xl,
    marginBottom: spacing.xl,
  },
  explanationItem: {
    marginBottom: spacing.lg,
  },
  explanationTitle: {
    fontFamily: getFontFamily("Inter_700Bold", fontFamilies.inter),
    fontSize: fontSizes.lg,
    color: "#402F73",
    marginBottom: spacing.sm,
  },
  explanationBody: {
    fontFamily: getFontFamily("Inter_400Regular", fontFamilies.inter),
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    lineHeight: fontSizes.md * 1.5,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
});

export default RatingResultScreen;
