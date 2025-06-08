import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  Platform,
} from "react-native";
import { colors, fonts, fontSizes, spacing } from "@/theme";

const ombreBackground = require("../../assets/images/ombre_background.png");

const { width, height } = Dimensions.get("window");
const isWebApp = Platform.OS === "web";

// Responsive design: limit width on web to phone-like dimensions
const scaleFactor = height < 700 ? 0.88 : height < 800 ? 0.94 : 1;
const innerContentMaxWidth = isWebApp ? 428 : Math.min(width - 40, 380);

interface GeneratingScreenProps {
  onGenerationComplete: () => void;
}

const GeneratingScreen: React.FC<GeneratingScreenProps> = ({
  onGenerationComplete,
}) => {
  useEffect(() => {
    // Simulate a network request for 2-3 seconds
    const timer = setTimeout(() => {
      onGenerationComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onGenerationComplete]);

  return (
    <View style={styles.rootScreenContainer}>
      <ImageBackground
        source={ombreBackground}
        style={styles.backgroundImageFullScreen}
        imageStyle={styles.fullScreenImageStyle}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeAreaContentContainer}>
          <View style={styles.container}>
            <View
              style={[styles.contentView, { maxWidth: innerContentMaxWidth }]}
            >
              <View style={styles.content}>
                <Text style={styles.generatingText}>Generating...</Text>
                <ActivityIndicator
                  size="large"
                  color={colors.primary}
                  style={styles.activityIndicator}
                />
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
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg * scaleFactor,
  },
  content: {
    alignItems: "center",
    padding: spacing.lg * scaleFactor,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    paddingVertical: spacing.xl * scaleFactor,
    paddingHorizontal: spacing.xl * scaleFactor,
    minWidth: 200 * scaleFactor,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 8,
  },
  generatingText: {
    fontFamily: fonts.interSemiBold,
    fontSize: fontSizes.xl * scaleFactor,
    color: colors.primary,
    marginBottom: spacing.xl * scaleFactor,
    textAlign: "center",
  },
  activityIndicator: {
    transform: [{ scale: scaleFactor }],
  },
});

export default GeneratingScreen;
