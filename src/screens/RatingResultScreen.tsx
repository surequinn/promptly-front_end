import PromptCard from "@/components/PromptCard";
import { colors, fontSizes, spacing } from "@/theme";
import { fontFamilies, getFontFamily } from "@/theme/typography";
import { PromptObjectType } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ombreBackground = require("../../assets/images/ombre_background.png");

// Dummy data for display
const dummyRatedPrompt: PromptObjectType = {
  id: "user-1",
  userId: "test-user-id",
  aiGenerated: true,
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
  rating: typeof dummyRating;
  navigateToNext: () => void;
}

const RatingResultScreen: React.FC<RatingResultScreenProps> = ({
  ratedPrompt = dummyRatedPrompt,
  rating = dummyRating,
  navigateToNext,
}) => {
  return (
    <ImageBackground source={ombreBackground} style={styles.backgroundImage}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.scoreText}>{rating.score}</Text>
          <Text style={styles.scoreSubtitle}>NICE!</Text>

          <View style={styles.cardContainer}>
            <PromptCard
              promptId={ratedPrompt.id}
              {...ratedPrompt}
              hideEditButton
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

          <TouchableOpacity onPress={navigateToNext} activeOpacity={0.8}>
            <LinearGradient
              colors={[colors.primaryDark, colors.primary]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.doneButton}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    padding: spacing.lg,
    alignItems: "center",
  },
  scoreText: {
    fontFamily: getFontFamily("Inter_800ExtraBold", fontFamilies.inter),
    fontSize: 64,
    color: colors.primary,
  },
  scoreSubtitle: {
    fontFamily: getFontFamily("Inter_600SemiBold", fontFamilies.inter),
    fontSize: fontSizes.lg,
    color: colors.primary,
    letterSpacing: 2,
    marginBottom: spacing.lg,
  },
  cardContainer: {
    width: "100%",
    marginBottom: spacing.lg,
  },
  explanationContainer: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  explanationItem: {
    marginBottom: spacing.lg,
  },
  explanationTitle: {
    fontFamily: getFontFamily("Inter_700Bold", fontFamilies.inter),
    fontSize: fontSizes.lg,
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  explanationBody: {
    fontFamily: getFontFamily("Inter_400Regular", fontFamilies.inter),
    fontSize: fontSizes.md,
    color: colors.textSecondary,
    lineHeight: fontSizes.md * 1.5,
  },
  doneButton: {
    borderRadius: 15,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl,
    alignItems: "center",
  },
  doneButtonText: {
    fontFamily: getFontFamily("Inter_600SemiBold", fontFamilies.inter),
    fontSize: fontSizes.lg,
    color: colors.white,
  },
});

export default RatingResultScreen;
