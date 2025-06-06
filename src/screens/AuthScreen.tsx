import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  SafeAreaView,
  Platform,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useOAuth, useSignIn, useSignUp } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { colors, spacing, fonts } from "../theme";

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
<svg width="24" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.9792 13.638C17.0659 11.2947 18.7592 10.0407 18.9192 9.87135C17.2926 8.77269 16.0726 6.67002 16.0726 4.58335C16.0726 1.98802 17.9726 0.313354 18.2192 0.00602079C16.2932 -0.230646 14.0199 1.03402 12.7666 2.26269C11.6399 3.31469 10.8666 4.96002 10.8666 6.63469C10.8666 8.41469 11.7999 9.92469 12.9866 10.9147C12.0199 11.5927 9.73325 11.2907 8.26658 11.3227C6.03992 11.3947 3.90658 12.602 2.73325 14.686C0.0799191 19.406 -1.00675 27.012 2.41325 30.06C3.90658 31.406 5.81325 31.9167 7.61325 31.878C8.22792 31.862 8.84258 31.846 9.45725 31.83C9.71325 31.8247 9.96925 31.8193 10.2253 31.814C10.7999 31.8013 11.3746 31.788 11.9492 31.7747C12.1133 31.7707 12.2772 31.7673 12.4413 31.764C13.8533 31.7207 15.3533 31.246 16.7466 30.006C18.2399 28.706 19.2199 26.614 19.3266 24.5174C19.3533 23.8807 19.3799 23.244 19.3933 22.6074C19.4006 22.2894 19.4072 21.9714 19.4133 21.654C19.4206 21.2787 19.4272 20.904 19.4333 20.53C19.4399 20.1407 19.4459 19.752 19.4513 19.364C19.4539 19.2207 19.4559 19.078 19.4573 18.9354C19.4599 18.6807 19.4626 18.4267 19.4646 18.1727C19.4659 17.9767 19.4666 17.7807 19.4666 17.5847C19.4666 17.538 19.4666 17.492 19.4666 17.446C19.4666 16.582 19.2192 14.718 16.9792 13.638ZM13.6933 5.94802C14.5999 4.98602 15.0533 3.53002 14.9199 2.17602C13.5733 2.29402 12.2266 3.20802 11.3599 4.18002C10.4133 5.21202 9.86658 6.67802 10.0599 8.00802C10.7199 8.06002 11.5599 7.98269 12.3866 7.40269C12.7333 7.17002 13.2266 6.58202 13.6933 5.94802Z" fill="black"/>
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
}

const AuthScreen: React.FC<AuthScreenProps> = ({ navigateToThanks }) => {
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
      Alert.alert("Error", "Failed to sign in with Google. Please try again.");
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
      Alert.alert("Error", "Failed to sign in with Apple. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Email authentication (try sign in first, then sign up if user doesn't exist)
  const handleEmailAuth = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address.");
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

        // If we need a password, we'll create an account instead
        if (signInAttempt.status === "needs_first_factor") {
          // User exists but needs password - for simplicity, we'll redirect to sign up
          // In a real app, you might want to handle password authentication
          Alert.alert(
            "Account exists",
            "This email is already registered. Please use social login for now."
          );
          return;
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

          Alert.alert(
            "Check your email",
            "We've sent you a verification link. Please check your email and click the link to complete your registration.",
            [{ text: "OK", onPress: navigateToThanks }]
          );
          return;
        }
        throw signInError;
      }
    } catch (err: any) {
      console.error("Email auth error", err);
      Alert.alert("Error", "Failed to process your email. Please try again.");
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
                      fontSize: 19 * scaleFactor,
                      lineHeight: 19 * 1.25 * scaleFactor,
                      marginBottom: 30 * scaleFactor,
                    },
                  ]}
                >
                  Stand out on Hinge effortlessly ✨
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

                  <View
                    style={[
                      styles.emailInputContainer,
                      {
                        height: 52 * scaleFactor,
                        marginBottom: (height < 700 ? 20 : 40) * scaleFactor,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.emailIconContainer,
                        { paddingHorizontal: spacing.md },
                      ]}
                    >
                      <SvgXml
                        xml={envelopeIconXml}
                        width={21 * scaleFactor}
                        height={21 * scaleFactor}
                      />
                    </View>
                    <TextInput
                      style={[
                        styles.emailTextInput,
                        { fontSize: 16 * scaleFactor },
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
                      style={[
                        styles.emailSubmitButton,
                        {
                          width: 52 * scaleFactor,
                          opacity: isLoading ? 0.6 : 1,
                        },
                      ]}
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
    fontFamily: fonts.playfairBold,
    color: colors.primary,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.15)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  heroText: {
    fontFamily: fonts.interMedium,
    color: colors.primaryMuted,
    textAlign: "center",
    maxWidth: "90%",
  },
  continueWithText: {
    fontFamily: fonts.interSemiBold,
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
    fontFamily: fonts.interSemiBold,
    color: colors.textPrimary,
  },
  orUseEmailText: {
    fontFamily: fonts.interSemiBold,
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
    flex: 1,
    fontFamily: fonts.interRegular,
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
