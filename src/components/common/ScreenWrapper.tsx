import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Header from "./Header";

const ombreBackground = require("../../../assets/images/ombre_background.png");

interface ScreenWrapperProps {
  children: React.ReactNode;
  title?: string;
  onBack?: () => void;
  onSettings?: () => void;
  hideBack?: boolean;
  hideSettings?: boolean;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  title,
  onBack,
  onSettings,
  hideBack,
  hideSettings,
}) => {
  const showHeader = onBack || onSettings;

  return (
    <ImageBackground
      source={ombreBackground}
      style={styles.backgroundImageFullScreen}
      resizeMode="cover"
    >
      <View style={styles.rootScreenContainer}>
        {showHeader && (
          <Header
            title={title}
            onBack={onBack}
            onSettings={onSettings}
            hideBack={hideBack}
            hideSettings={hideSettings}
          />
        )}
        {children}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  rootScreenContainer: {
    flex: 1,
  },
  backgroundImageFullScreen: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default ScreenWrapper;
