import { colors, fonts, fontSizes, spacing } from "@/theme";
import { fontFamilies, getFontFamily } from "@/theme/typography";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ombreBackground = require("../../assets/images/ombre_background.png");

const { width, height } = Dimensions.get("window");
const isWebApp = Platform.OS === "web";

// Responsive design: limit width on web to phone-like dimensions
const scaleFactor = height < 700 ? 0.88 : height < 800 ? 0.94 : 1;
const innerContentMaxWidth = isWebApp ? 428 : Math.min(width - 40, 380);

interface LandingPageProps {
  onSkip: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSkip }) => {
  // Animation states
  const [animationStage, setAnimationStage] = useState(1); // 1, 2, 3
  const [isBlinking, setIsBlinking] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");

  // Animated values
  const crossOutWidth = useRef(new Animated.Value(0)).current;
  const blinkOpacity = useRef(new Animated.Value(1)).current;

  const targetText =
    "delete this app and spend Sundays analyzing TV finales like its our part-time job✨";

  useEffect(() => {
    // Stage 1: Show initial text for 1.5 seconds
    const stage1Timer = setTimeout(() => {
      // Cross out animation
      Animated.timing(crossOutWidth, {
        toValue: 100, // 100% width
        duration: 800,
        useNativeDriver: false,
      }).start(() => {
        // Move to stage 2
        setAnimationStage(2);
        setIsBlinking(true);

        // Start blinking animation
        const blinkAnimation = () => {
          Animated.sequence([
            Animated.timing(blinkOpacity, {
              toValue: 0.3,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(blinkOpacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
          ]).start(blinkAnimation);
        };
        blinkAnimation();

        // Stage 2: Show "AI generating response" for 2 seconds
        const stage2Timer = setTimeout(() => {
          setIsBlinking(false);
          blinkOpacity.stopAnimation();
          setAnimationStage(3);

          // Stage 3: Typewriter effect
          let currentIndex = 0;
          const typewriter = () => {
            if (currentIndex <= targetText.length) {
              setTypewriterText(targetText.substring(0, currentIndex));
              currentIndex++;
              setTimeout(typewriter, 60); // 60ms per character for natural feel
            }
          };
          typewriter();
        }, 2000);

        return () => clearTimeout(stage2Timer);
      });
    }, 1500);

    return () => clearTimeout(stage1Timer);
  }, []);

  const renderPromptCard = () => {
    return (
      <View style={styles.promptCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.promptLabel}>Together, we can...</Text>
        </View>

        <View style={styles.promptContent}>
          {animationStage === 1 && (
            <View>
              <Text style={styles.promptText}>get off this app...</Text>
              <Animated.View
                style={[
                  styles.crossOutLine,
                  {
                    width: crossOutWidth.interpolate({
                      inputRange: [0, 100],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>
          )}

          {animationStage === 2 && (
            <Animated.Text
              style={[styles.aiGeneratingText, { opacity: blinkOpacity }]}
            >
              AI generating response
            </Animated.Text>
          )}

          {animationStage === 3 && (
            <Text style={styles.promptText}>
              {typewriterText}
              <Text style={styles.cursor}>|</Text>
            </Text>
          )}
        </View>

        <View style={styles.likeButtonContainer}>
          <TouchableOpacity style={styles.likeButton} activeOpacity={0.8}>
            <Image
              source={require("../../assets/images/hinge_like.png")}
              style={styles.likeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
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
          <View style={styles.scrollContainer}>
            <View
              style={[styles.contentView, { maxWidth: innerContentMaxWidth }]}
            >
              {renderPromptCard()}

              <View style={styles.headerContainer}>
                <Text style={styles.titleText}>Stand out{"\n"}on Hinge</Text>
                <Text style={styles.subtitleText}>Effortlessly✨</Text>
                <Text style={styles.descriptionText}>
                  Describe yourself in a few words,{"\n"}we'll do the rest
                </Text>
              </View>

              <View style={styles.bottomContainer}>
                <TouchableOpacity
                  onPress={onSkip}
                  style={styles.skipButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.skipButtonText}>Skip</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
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
  },
  scrollContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.xl * scaleFactor,
  },
  contentView: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20 * scaleFactor,
    paddingTop: 40 * scaleFactor,
    paddingBottom: 60 * scaleFactor,
  },
  promptCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20 * scaleFactor,
    marginBottom: spacing.xl * 1.2 * scaleFactor,
    width: "95%",
    maxWidth: 400,
    shadowColor: "rgba(0, 0, 0, 0.08)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 6,
    minHeight: 200 * scaleFactor,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20 * scaleFactor,
  },
  promptLabel: {
    fontFamily: getFontFamily(fonts.interMedium, fontFamilies.inter),
    fontSize: fontSizes.sm * scaleFactor,
    color: colors.textSecondary,
    lineHeight: fontSizes.sm * 1.5 * scaleFactor,
  },

  promptContent: {
    flex: 1,
    justifyContent: "flex-start",
    position: "relative",
    paddingTop: 8 * scaleFactor,
    paddingBottom: 16 * scaleFactor,
    paddingRight: 60 * scaleFactor, // Extra space for like button
  },
  promptText: {
    fontFamily: getFontFamily(fonts.playfairBold, fontFamilies.playfair),
    fontSize: 22 * scaleFactor,
    color: colors.textPrimary,
    lineHeight: 28 * scaleFactor,
    textAlign: "left",
  },
  crossOutLine: {
    position: "absolute",
    top: "50%",
    left: 0,
    height: 3,
    backgroundColor: colors.textPrimary,
    transform: [{ translateY: -1.5 }],
  },
  aiGeneratingText: {
    fontFamily: getFontFamily(fonts.playfairBold, fontFamilies.playfair),
    fontSize: 20 * scaleFactor,
    color: "#999999", // Lighter gray for hint text
    textAlign: "left",
    lineHeight: 26 * scaleFactor,
    flexWrap: "wrap", // Allow natural wrapping
  },
  cursor: {
    fontFamily: getFontFamily(fonts.playfairBold, fontFamilies.playfair),
    fontSize: 22 * scaleFactor,
    color: colors.textPrimary,
    opacity: 1,
  },
  headerContainer: {
    alignItems: "flex-start",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    marginTop: -20 * scaleFactor,
    paddingHorizontal: 8 * scaleFactor,
  },
  titleText: {
    fontFamily: getFontFamily(fonts.gelasioBold, fontFamilies.gelasio),
    fontSize: 58 * scaleFactor,
    color: colors.primaryLight,
    textAlign: "left",
    marginBottom: 8 * scaleFactor,
    lineHeight: 62 * scaleFactor,
    letterSpacing: -1 * scaleFactor,
  },
  subtitleText: {
    fontFamily: getFontFamily(fonts.gelasioSemiBold, fontFamilies.gelasio),
    fontSize: 46 * scaleFactor,
    color: colors.primaryDark,
    textAlign: "left",
    marginBottom: 20 * scaleFactor,
    lineHeight: 50 * scaleFactor,
    letterSpacing: -0.8 * scaleFactor,
    fontStyle: "italic",
  },
  descriptionText: {
    fontFamily: getFontFamily(fonts.interMedium, fontFamilies.inter),
    fontSize: 18 * scaleFactor,
    color: colors.primaryMuted,
    textAlign: "left",
    lineHeight: 24 * scaleFactor,
    marginBottom: 32 * scaleFactor,
  },
  skipButton: {
    width: 140 * scaleFactor,
    height: 48 * scaleFactor,
    borderRadius: 24,
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: colors.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  skipButtonText: {
    fontFamily: getFontFamily(fonts.interMedium, fontFamilies.inter),
    fontSize: 17 * scaleFactor,
    color: colors.primaryLight,
    textAlign: "center",
    fontWeight: "500",
  },
  bottomContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20 * scaleFactor,
  },
  likeButtonContainer: {
    position: "absolute",
    bottom: 20 * scaleFactor,
    right: 20 * scaleFactor,
  },
  likeButton: {
    // No background, just the image
  },
  likeIcon: {
    width: 40 * scaleFactor,
    height: 40 * scaleFactor,
    resizeMode: "contain",
  },
});

export default LandingPage;
