import AlertModal from "@/components/modals/AlertModal";
import { fontFamilies, getFontFamily } from "@/theme/typography";
import { useOAuth, useSignIn, useSignUp } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { colors, spacing } from "../theme";

const ombreBackground = require("../../assets/images/ombre_background.png");
const promptlyLogo = require("../../assets/Promptly_logo.png");

// SVGs for Icons (placeholders if actual SVGs are not available)
// Ideally, these would be imported from separate .svg files or a library
const googleIconXml = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.56 12.25C22.56 11.42 22.49 10.62 22.35 9.84H12V14.51H17.96C17.69 15.99 17.02 17.29 15.84 18.09V20.61H19.68C21.56 18.97 22.56 16.03 22.56 12.25Z" fill="#4285F4"/>
<path d="M12 23C14.97 23 17.45 22.04 19.19 20.61L15.84 18.09C14.82 18.79 13.51 19.24 12 19.24C9.39 19.24 7.14 17.56 6.32 15.24H2.37V17.84C4.04 20.44 7.69 23 12 23Z" fill="#34A853"/>
<path d="M6.32 15.24C6.07 14.54 5.93 13.79 5.93 13C5.93 12.21 6.07 11.46 6.32 10.76V8.16H2.37C1.51 9.77 1 11.32 1 13C1 14.68 1.51 16.23 2.37 17.84L6.32 15.24Z" fill="#FBBC05"/>
<path d="M12 6.76C13.66 6.76 15.05 7.32 16.03 8.25L19.28 5.14C17.45 3.44 14.97 2.5 12 2.5C7.69 2.5 4.04 5.06 2.37 8.16L6.32 10.76C7.14 8.44 9.39 6.76 12 6.76Z" fill="#EA4335"/>
</svg>
`;

const appleIconXml = `
<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.7808 18.424C21.433 19.2275 21.0213 19.9672 20.5442 20.6472C19.894 21.5743 19.3616 22.216 18.9513 22.5724C18.3153 23.1573 17.6338 23.4568 16.9041 23.4739C16.3802 23.4739 15.7485 23.3248 15.013 23.0224C14.2752 22.7214 13.5972 22.5724 12.9772 22.5724C12.327 22.5724 11.6296 22.7214 10.8837 23.0224C10.1366 23.3248 9.53481 23.4824 9.07468 23.498C8.37491 23.5278 7.6774 23.2197 6.98118 22.5724C6.53681 22.1848 5.98099 21.5204 5.31515 20.5791C4.60075 19.5739 4.01342 18.4084 3.55329 17.0795C3.06051 15.6442 2.81348 14.2543 2.81348 12.9087C2.81348 11.3673 3.14654 10.0379 3.81366 8.92385C4.33796 8.029 5.03546 7.32312 5.90844 6.80493C6.78142 6.28674 7.72468 6.02267 8.74048 6.00578C9.2963 6.00578 10.0252 6.1777 10.931 6.51559C11.8342 6.85462 12.4141 7.02655 12.6684 7.02655C12.8585 7.02655 13.5028 6.82552 14.5949 6.42473C15.6278 6.05305 16.4995 5.89916 17.2136 5.95978C19.1487 6.11595 20.6024 6.87876 21.5693 8.25303C19.8386 9.30163 18.9826 10.7703 18.9996 12.6544C19.0152 14.122 19.5476 15.3432 20.5939 16.3129C21.0681 16.7629 21.5977 17.1107 22.1868 17.3578C22.0591 17.7283 21.9242 18.0832 21.7808 18.424ZM17.3428 0.960131C17.3428 2.11039 16.9226 3.18439 16.0849 4.17847C15.0741 5.36023 13.8514 6.04311 12.5256 5.93536C12.5087 5.79736 12.4989 5.65213 12.4989 5.49951C12.4989 4.39526 12.9796 3.21349 13.8333 2.24724C14.2595 1.75801 14.8015 1.35122 15.4588 1.02671C16.1147 0.707053 16.7352 0.530273 17.3187 0.5C17.3357 0.653772 17.3428 0.807554 17.3428 0.960116V0.960131Z" fill="black"/>
</svg>
`;

const heartIconXml = `
<svg width="28" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.0002 24.1667C14.0002 24.1667 0.833496 17.5833 0.833496 9.25C0.833496 4.52083 4.52108 0.833336 9.25024 0.833336C11.5836 0.833336 12.3336 2.16667 14.0002 2.16667C15.6669 2.16667 16.4169 0.833336 18.7502 0.833336C23.4794 0.833336 27.1669 4.52083 27.1669 9.25C27.1669 17.5833 14.0002 24.1667 14.0002 24.1667Z" fill="#BFA49A"/>
</svg>
`; // Light brown/beige heart as per image

const envelopeIconXml = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="#A0A0A0"/>
</svg>
`; // Grey envelope

const arrowIconXml = `
<svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.5 18.5L10 10L1.5 1.5" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

interface AuthScreenProps {
  navigateToThanks: () => void;
  navigateToVerification: (session: any) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({
  navigateToThanks,
  navigateToVerification,
}) => {
  const { width, height } = Dimensions.get("window");
  const isWebApp = Platform.OS === "web";
  const innerContentMaxWidth = isWebApp ? 428 : Math.min(width - 40, 380);

  const scaleFactor = height < 700 ? 0.88 : height < 800 ? 0.94 : 1;
  const imageLogoSize = Math.min(width * 0.42, 160) * scaleFactor;

  // Clerk hooks
  const { startOAuthFlow: startGoogleOAuth } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startAppleOAuth } = useOAuth({
    strategy: "oauth_apple",
  });
  const {
    signIn,
    setActive: setActiveSignIn,
    isLoaded: signInLoaded,
  } = useSignIn();
  const {
    signUp,
    setActive: setActiveSignUp,
    isLoaded: signUpLoaded,
  } = useSignUp();

  // State for email authentication
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // Warm up the browser for OAuth
  WebBrowser.maybeCompleteAuthSession();

  // Google OAuth
  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      const { createdSessionId, setActive } = await startGoogleOAuth();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        navigateToThanks();
      }
    } catch (err) {
      console.error("OAuth error", err);
      setAlertTitle("Error");
      setAlertMessage("Failed to sign in with Google. Please try again.");
      setAlertVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Apple OAuth
  const handleAppleAuth = async () => {
    try {
      setIsLoading(true);
      const { createdSessionId, setActive } = await startAppleOAuth();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        navigateToThanks();
      }
    } catch (err) {
      console.error("OAuth error", err);
      setAlertTitle("Error");
      setAlertMessage("Failed to sign in with Apple. Please try again.");
      setAlertVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Email authentication (try sign in first, then sign up if user doesn't exist)
  const handleEmailAuth = async () => {
    if (!email.trim()) {
      setAlertTitle("Error");
      setAlertMessage("Please enter your email address.");
      setAlertVisible(true);
      return;
    }

    if (!signInLoaded || !signUpLoaded) return;

    try {
      setIsLoading(true);

      // First try to sign in
      try {
        const signInAttempt = await signIn.create({
          identifier: email,
        });

        // If we need a password or email_code, handle accordingly
        const emailCodeFactor = signInAttempt.supportedFirstFactors?.find(
          (factor: any) =>
            factor.strategy === "email_code" && "emailAddressId" in factor
        );

        if (emailCodeFactor) {
          await signInAttempt.prepareFirstFactor({
            strategy: "email_code",
            emailAddressId: emailCodeFactor.emailAddressId,
          });
          setAlertTitle("Check your email");
          setAlertMessage(
            "We've sent you a verification code. Please check your email and enter the code to continue."
          );
          setAlertVisible(true);
          navigateToVerification(signInAttempt);
          return;
        } else {
          throw new Error("No valid emailAddressId found");
        }
      } catch (signInError: any) {
        // If sign in fails, try to sign up
        if (signInError.errors?.[0]?.code === "form_identifier_not_found") {
          // User doesn't exist, create account
          const signUpAttempt = await signUp.create({
            emailAddress: email,
          });

          // Send verification email
          await signUpAttempt.prepareEmailAddressVerification({
            strategy: "email_code",
          });

          setAlertTitle("Check your email");
          setAlertMessage(
            "We've sent you a verification link. Please check your email and click the link to complete your registration."
          );
          setAlertVisible(true);
          navigateToVerification(signUpAttempt);
          return;
        }
        throw signInError;
      }
    } catch (err: any) {
      console.error("Email auth error", err);
      setAlertTitle("Error");
      setAlertMessage("Failed to process your email. Please try again.");
      setAlertVisible(true);
    } finally {
      setIsLoading(false);
    }
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
          <TouchableOpacity
            activeOpacity={1}
            onPress={navigateToThanks}
            style={{ flex: 1 }} // This TouchableOpacity also needs to fill the SafeAreaView
          >
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
              alwaysBounceVertical={false}
              keyboardShouldPersistTaps="handled"
            >
              <View
                style={[styles.contentView, { maxWidth: innerContentMaxWidth }]}
              >
                <Image
                  source={promptlyLogo}
                  style={[
                    {
                      width: imageLogoSize,
                      height: imageLogoSize,
                      marginBottom: 18 * scaleFactor,
                    },
                  ]}
                  resizeMode="contain"
                />

                <Text
                  style={[
                    styles.appName,
                    {
                      fontSize: 65 * scaleFactor,
                      lineHeight: 65 * 1 * scaleFactor,
                      marginBottom: 12 * scaleFactor,
                    },
                  ]}
                >
                  Promptly
                </Text>

                <Text
                  style={[
                    styles.heroText,
                    {
                      fontSize: 22 * scaleFactor,
                      lineHeight: 22 * 1.25 * scaleFactor,
                      marginBottom: 30 * scaleFactor,
                    },
                  ]}
                >
                  Stand out on Hinge{" "}
                  <Text style={styles.effortlesslyText}>effortlessly ✨</Text>
                </Text>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={(e) => e.stopPropagation()}
                  style={{ width: "100%" }}
                >
                  <Text
                    style={[
                      styles.continueWithText,
                      {
                        fontSize: 17 * scaleFactor,
                        marginBottom: 18 * scaleFactor,
                      },
                    ]}
                  >
                    Continue with:
                  </Text>

                  <TouchableOpacity
                    style={[
                      styles.authButton,
                      {
                        paddingVertical: 14 * scaleFactor,
                        marginBottom: 15 * scaleFactor,
                        opacity: isLoading ? 0.6 : 1,
                      },
                    ]}
                    onPress={handleGoogleAuth}
                    disabled={isLoading}
                  >
                    <SvgXml
                      xml={googleIconXml}
                      width={21 * scaleFactor}
                      height={21 * scaleFactor}
                    />
                    <Text
                      style={[
                        styles.authButtonText,
                        {
                          fontSize: 16 * scaleFactor,
                          marginLeft: 12 * scaleFactor,
                        },
                      ]}
                    >
                      Log In with Google
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.authButton,
                      {
                        paddingVertical: 14 * scaleFactor,
                        marginBottom: 30 * scaleFactor,
                        opacity: isLoading ? 0.6 : 1,
                      },
                    ]}
                    onPress={handleAppleAuth}
                    disabled={isLoading}
                  >
                    <SvgXml
                      xml={appleIconXml}
                      width={22 * scaleFactor}
                      height={22 * scaleFactor}
                    />
                    <Text
                      style={[
                        styles.authButtonText,
                        {
                          fontSize: 16 * scaleFactor,
                          marginLeft: 12 * scaleFactor,
                        },
                      ]}
                    >
                      Log In with Apple
                    </Text>
                  </TouchableOpacity>

                  <Text
                    style={[
                      styles.orUseEmailText,
                      {
                        fontSize: 17 * scaleFactor,
                        marginBottom: 12 * scaleFactor,
                      },
                    ]}
                  >
                    Or use your email
                  </Text>

                  {/* CAPTCHA for web only */}
                  {Platform.OS === "web" && (
                    <View
                      style={{
                        width: "100%",
                        alignItems: "center",
                        marginBottom: 16,
                      }}
                    >
                      {React.createElement("div", {
                        id: "clerk-captcha",
                        "data-cl-theme": "auto",
                        "data-cl-size": "normal",
                        "data-cl-language": "auto",
                        style: { width: 300, height: 80 },
                      })}
                    </View>
                  )}

                  <View
                    style={[
                      styles.emailInputContainer,
                      {
                        height: 52 * scaleFactor,
                        marginBottom: (height < 700 ? 20 : 40) * scaleFactor,
                        backgroundColor: colors.white,
                        borderRadius: 110,
                        flexDirection: "row",
                        alignItems: "center",
                        shadowColor: "rgba(0,0,0,0.07)",
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.8,
                        shadowRadius: 6,
                        elevation: 5,
                      },
                    ]}
                  >
                    <View style={{ paddingHorizontal: spacing.md }}>
                      <SvgXml
                        xml={envelopeIconXml}
                        width={21 * scaleFactor}
                        height={21 * scaleFactor}
                      />
                    </View>
                    <TextInput
                      style={[
                        styles.emailTextInput,
                        {
                          flex: 1,
                          fontFamily: getFontFamily(
                            "Inter_400Regular",
                            fontFamilies.inter
                          ),
                          fontSize: 16 * scaleFactor,
                          color: colors.textPrimary,
                          fontStyle: "italic",
                          paddingVertical: 0,
                          paddingHorizontal: 0,
                          backgroundColor: "transparent",
                          height: "100%",
                        },
                      ]}
                      placeholder="Your email"
                      placeholderTextColor={colors.textPlaceholder}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
                      editable={!isLoading}
                    />
                    <TouchableOpacity
                      style={{
                        height: "100%",
                        width: 52 * scaleFactor,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: colors.primary,
                        borderTopRightRadius: 110,
                        borderBottomRightRadius: 110,
                      }}
                      onPress={handleEmailAuth}
                      disabled={isLoading}
                    >
                      <SvgXml
                        xml={arrowIconXml}
                        width={11 * scaleFactor}
                        height={18 * scaleFactor}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
      <AlertModal
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onConfirm={() => setAlertVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootScreenContainer: {
    // New root container
    flex: 1,
    backgroundColor: "#F2E6FF", // Fallback background, same as old safeArea
  },
  backgroundImageFullScreen: {
    // Styles for the ImageBackground component itself
    flex: 1,
  },
  fullScreenImageStyle: {
    // Styles for the actual image within ImageBackground
    width: "100%",
    height: "100%",
  },
  safeAreaContentContainer: {
    // SafeAreaView for content, sits inside ImageBackground
    flex: 1,
    backgroundColor: "transparent", // Ensures ImageBackground shows through
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  contentView: {
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    width: "100%",
    paddingBottom: Platform.OS === "ios" ? 20 : 40,
  },
  appName: {
    fontFamily: getFontFamily("PlayfairDisplay_700Bold", fontFamilies.playfair),
    color: colors.primary,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.15)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  heroText: {
    fontFamily: getFontFamily("Inter_500Medium", fontFamilies.inter),
    color: "#6F6099",
    textAlign: "center",
    maxWidth: "95%",
  },
  effortlesslyText: {
    fontFamily: getFontFamily("Inter_700Bold", fontFamilies.inter),
    fontWeight: "700",
    fontStyle: "italic",
    fontSize: 22,
    lineHeight: 20,
    letterSpacing: 0,
    color: "#6F6099",
  },
  continueWithText: {
    fontFamily: getFontFamily("Inter_600SemiBold", fontFamilies.inter),
    color: colors.primary,
    textAlign: "left",
    width: "100%",
  },
  authButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: 110,
    width: "100%",
    shadowColor: "rgba(0,0,0,0.07)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5,
  },
  authButtonText: {
    fontFamily: getFontFamily("Inter_600SemiBold", fontFamilies.inter),
    color: colors.textPrimary,
  },
  orUseEmailText: {
    fontFamily: getFontFamily("Inter_600SemiBold", fontFamilies.inter),
    color: colors.primary,
    textAlign: "left",
    width: "100%",
    marginTop: 8,
  },
  emailInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 110,
    width: "100%",
    shadowColor: "rgba(0,0,0,0.07)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5,
  },
  emailIconContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 110,
    borderBottomLeftRadius: 110,
    paddingHorizontal: spacing.md,
  },
  emailTextInput: {
    fontFamily: getFontFamily("Inter_400Regular", fontFamilies.inter),
    color: colors.textPrimary,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  emailSubmitButton: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderTopRightRadius: 110,
    borderBottomRightRadius: 110,
  },
});

export default AuthScreen;
