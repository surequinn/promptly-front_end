import { fontFamilies, getFontFamily } from "@/theme/typography";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import { colors, spacing } from "../theme";
import AlertModal from "@/components/modals/AlertModal";

const { width, height } = Dimensions.get("window");
const isWebApp = Platform.OS === "web";
const innerContentMaxWidth = isWebApp ? 428 : Math.min(width - 40, 380);
const scaleFactor = height < 700 ? 0.88 : height < 800 ? 0.94 : 1;

const ombreBackground = require("../../assets/images/ombre_background.png");

export default function VerificationScreen({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: (code: string) => void;
}) {
  const [code, setCode] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");

  return (
    <ImageBackground
      source={ombreBackground}
      style={styles.backgroundImageFullScreen}
      imageStyle={styles.fullScreenImageStyle}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.root}>
          <LinearGradient
            colors={["#EDEAFF", "#F6E6F8", "#FDE6E6"]}
            style={styles.background}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            {/* Back Arrow */}
            <TouchableOpacity
              style={styles.backArrow}
              onPress={onBack}
              activeOpacity={0.7}
            >
              <Text style={styles.backArrowText}>{"<"}</Text>
            </TouchableOpacity>

            {/* Title */}
            <View
              style={[styles.contentView, { maxWidth: innerContentMaxWidth }]}
            >
              <Text
                style={[
                  styles.title,
                  {
                    fontSize: 22 * scaleFactor,
                    marginBottom: 36 * scaleFactor,
                    marginTop: 40 * scaleFactor,
                  },
                ]}
              >
                Enter your verification code
              </Text>

              {/* Verification Field */}
              <View
                style={[
                  styles.verificationField,
                  {
                    width: Math.min(width - 80, 274) * scaleFactor,
                    height: 52 * scaleFactor,
                    marginBottom: 40 * scaleFactor,
                  },
                ]}
              >
                <TextInput
                  style={[
                    styles.codeInput,
                    {
                      fontSize: 18 * scaleFactor,
                      letterSpacing: 4 * scaleFactor,
                    },
                  ]}
                  value={code}
                  onChangeText={setCode}
                  placeholder="123456"
                  placeholderTextColor={colors.textPlaceholder || "#A0A0A0"}
                  keyboardType="number-pad"
                  maxLength={6}
                  textAlign="center"
                  autoFocus
                />
              </View>
            </View>
            <PrimaryButton
              title="Next"
              onPress={() => onNext(code)}
              style={styles.nextButton}
              disabled={code.length === 0}
            />
          </LinearGradient>
        </View>
      </ScrollView>
      <AlertModal
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onConfirm={() => setAlertVisible(false)}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F2E6FF",
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    paddingHorizontal: 24,
  },
  contentView: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: spacing.xl,
  },
  backArrow: {
    position: "absolute",
    top: Platform.OS === "ios" ? 48 : 32,
    left: 18,
    zIndex: 2,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  backArrowText: {
    fontFamily: getFontFamily("Inter_600SemiBold", fontFamilies.inter),
    fontSize: 28,
    color: "#402F73",
    lineHeight: 32,
  },
  title: {
    fontFamily: getFontFamily("Inter_600SemiBold", fontFamilies.inter),
    color: colors.primary,
    textAlign: "center",
  },
  verificationField: {
    backgroundColor: colors.white,
    borderRadius: 110,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0,0,0,0.07)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5,
  },
  codeInput: {
    flex: 1,
    fontFamily: getFontFamily("Inter_400Regular", fontFamilies.inter),
    color: colors.textPrimary,
    width: "100%",
    paddingHorizontal: 10,
    textAlign: "center",
  },
  nextButton: {
    width: "80%",
    maxWidth: 300,
    minHeight: 55 * scaleFactor,
    alignSelf: "center",
  },
  backgroundImageFullScreen: {
    flex: 1,
  },
  fullScreenImageStyle: {
    // ... (existing fullScreenImageStyle)
  },
  scrollContainer: {
    // ... (existing scrollContainer)
  },
});
