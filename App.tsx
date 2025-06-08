import AlertModal from "@/components/modals/AlertModal";
import { useGoogleFontsLink } from "@/hooks/useGoogleFontsLink";
import AgeInputScreen from "@/screens/AgeInputScreen";
import AuthScreen from "@/screens/AuthScreen";
import EditPromptScreen from "@/screens/EditPromptScreen";
import EnterInterestsScreen from "@/screens/EnterInterestsScreen";
import GenderOrientationScreen from "@/screens/GenderOrientationScreen";
import GeneratingScreen from "@/screens/GeneratingScreen";
import LandingPage from "@/screens/LandingPage";
import NameInputScreen from "@/screens/NameInputScreen";
import PickYourVibeScreen from "@/screens/PickYourVibeScreen";
import ProfileCompletionScreen from "@/screens/ProfileCompletionScreen";
import PromptResultScreen from "@/screens/PromptResultScreen";
import RateMyPromptScreen from "@/screens/RateMyPromptScreen";
import RatingResultScreen from "@/screens/RatingResultScreen";
import ThanksForSigningUpScreen from "@/screens/ThanksForSigningUpScreen";
import UniqueInterestScreen from "@/screens/UniqueInterestScreen";
import VerificationScreen from "@/screens/VerificationScreen";
import WriteOrRateScreen from "@/screens/WriteOrRateScreen";
import { useApiClient, UserProfileData } from "@/services/api";
import { PromptObjectType } from "@/types";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import {
  Gelasio_600SemiBold,
  Gelasio_700Bold,
} from "@expo-google-fonts/gelasio";
import {
  Inter_200ExtraLight,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import { PaytoneOne_400Regular } from "@expo-google-fonts/paytone-one";
import {
  PlayfairDisplay_700Bold,
  PlayfairDisplay_800ExtraBold,
} from "@expo-google-fonts/playfair-display";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export type ScreenName =
  | "Landing"
  | "Auth"
  | "Thanks"
  | "NameInput"
  | "AgeInput"
  | "GenderOrientation"
  | "WriteOrRate"
  | "PickYourVibe"
  | "EnterInterests"
  | "UniqueInterest"
  | "ProfileCompletion"
  | "PromptResult"
  | "EditPrompt"
  | "Generating"
  | "RateMyPrompt"
  | "RatingResult"
  | "Verification";

// Get the Clerk publishable key from environment variables or expo config
const publishableKey =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  "pk_test_ZXhwZXJ0LWdvcGhlci0yNS5jbGVyay5hY2NvdW50cy5kZXYk";

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

// Main app content component that uses Clerk hooks
function AppContent() {
  const { isLoaded: clerkLoaded, isSignedIn } = useAuth();
  const { updateUserProfile, getUserProfile } = useApiClient();

  useGoogleFontsLink();

  // Only load custom fonts on native platforms, use system fonts on web
  const [fontsLoaded, fontError] = useFonts(
    Platform.OS === "web"
      ? {}
      : {
          // Inter
          Inter_200ExtraLight,
          Inter_400Regular,
          Inter_500Medium,
          Inter_600SemiBold,
          Inter_700Bold,
          Inter_800ExtraBold,
          // Playfair Display (matching what we have in typography.ts)
          PlayfairDisplay_700Bold,
          PlayfairDisplay_800ExtraBold,
          // Gelasio (matching what we have in typography.ts)
          Gelasio_600SemiBold,
          Gelasio_700Bold,
          // Paytone One
          PaytoneOne_400Regular,
        }
  );

  const [appIsReady, setAppIsReady] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<ScreenName>("Landing");
  const [isInitialUserProfileLoaded, setIsInitialUserProfileLoaded] =
    useState(false);
  const [verificationSession, setVerificationSession] = useState<any>(null); // Store Clerk session or identifier for verification
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // Update initial screen based on auth state
  useEffect(() => {
    const initUserProfile = async () => {
      const userProfile = await getUserProfile();
      console.log("User profile:", userProfile);
      return userProfile.data;
    };
    setIsInitialUserProfileLoaded(false);
    if (clerkLoaded) {
      if (isSignedIn) {
        // request user profile
        initUserProfile()
          .then((userProfile: UserProfileData) => {
            // we set the user profile to the state
            setUserName(userProfile.name || null);
            setUserAge(userProfile.age || null);
            setUserGender(userProfile.gender || null);
            setUserOrientation(userProfile.orientation || null);
            setUserSelectedVibes(userProfile.selectedVibes || null);
            setUserInterests(userProfile.interests || null);
            setUserUniqueInterest(userProfile.uniqueInterest || null);

            // from userProfile, we should check those user fields and if they are not set, we should navigate to the NameInputScreen
            if (!userProfile.name) {
              setCurrentScreen("NameInput");
            } else if (!userProfile.age) {
              setCurrentScreen("AgeInput");
            } else if (!userProfile.gender || !userProfile.orientation) {
              setCurrentScreen("GenderOrientation");
              // } else if (!userProfile.selectedVibes) {
              //   setCurrentScreen("PickYourVibe");
              // } else if (!userProfile.interests) {
              //   setCurrentScreen("EnterInterests");
              // } else if (!userProfile.uniqueInterest) {
              //   setCurrentScreen("UniqueInterest");
            } else {
              setCurrentScreen("WriteOrRate");
            }
          })
          .then(() => {
            setIsInitialUserProfileLoaded(true);
          });
      } else {
        setCurrentScreen("Landing");
      }
    }
  }, [clerkLoaded, isSignedIn]);

  // Handle font loading and errors - allow app to continue even if fonts fail on web
  useEffect(() => {
    // On web, skip font loading entirely and just wait for Clerk
    if (Platform.OS === "web") {
      if (clerkLoaded) {
        setAppIsReady(true);
      }
    } else {
      // On native, wait for both fonts and Clerk
      if (clerkLoaded && (fontsLoaded || fontError)) {
        setAppIsReady(true);
      }
    }
  }, [fontsLoaded, fontError, clerkLoaded]);

  // State to hold user data
  const [userName, setUserName] = useState<string | null>("Jane");
  const [userAge, setUserAge] = useState<number | null>(null);
  const [userGender, setUserGender] = useState<string | null>(null);
  const [userOrientation, setUserOrientation] = useState<string[] | null>(null);
  const [userSelectedVibes, setUserSelectedVibes] = useState<string[] | null>(
    null
  );
  const [userInterests, setUserInterests] = useState<string[] | null>(null);
  const [userUniqueInterest, setUserUniqueInterest] = useState<string | null>(
    null
  );
  const [promptToEdit, setPromptToEdit] = useState<PromptObjectType | null>({
    id: "1",
    category: "Dating me is like...",
    responseText:
      "Finding a parking spot right in front of the store on a busy day—unexpectedly perfect and makes you feel like you've won.",
    userId: "1",
    aiGenerated: true,
    status: "active",
    createdAt: new Date().toISOString(),
  });
  const [dummyRatedPrompt] = useState<PromptObjectType>({
    id: "user-1",
    category: "Together, we could...",
    responseText:
      "Finally figure out what the dog is thinking. And also, maybe travel.",
    userId: "1",
    aiGenerated: true,
    status: "active",
    createdAt: new Date().toISOString(),
  });
  const [dummyRating] = useState({
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
  });

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const navigateToLandingScreen = () => setCurrentScreen("Landing");
  const navigateToAuthScreen = () => setCurrentScreen("Auth");
  const navigateToThanksScreen = () => setCurrentScreen("Thanks");

  const navigateToNameInputScreen = () => setCurrentScreen("NameInput");

  const navigateToAgeInputScreen = (name: string) => {
    setUserName(name);
    setCurrentScreen("AgeInput");
  };

  const navigateToGenderOrientationScreen = (age: number) => {
    setUserAge(age);
    setCurrentScreen("GenderOrientation");
  };

  const navigateToWriteOrRateScreen = (
    gender: string,
    orientation: string[]
  ) => {
    setUserGender(gender);
    setUserOrientation(orientation);
    setCurrentScreen("WriteOrRate");
  };

  const navigateToPickYourVibeScreen = () => {
    setCurrentScreen("PickYourVibe");
  };

  const navigateToEnterInterestsScreen = (selectedVibes: string[]) => {
    setUserSelectedVibes(selectedVibes);
    setCurrentScreen("EnterInterests");
  };

  const navigateToUniqueInterestScreen = () => {
    setCurrentScreen("UniqueInterest");
  };

  const navigateToProfileCompletionScreen = () => {
    setCurrentScreen("ProfileCompletion");
  };

  const navigateToPromptResultScreen = () => {
    setCurrentScreen("PromptResult");
  };

  const navigateToEditPromptScreen = (prompt: PromptObjectType) => {
    setPromptToEdit(prompt);
    setCurrentScreen("EditPrompt");
  };

  const navigateToGeneratingScreen = () => {
    setCurrentScreen("Generating");
  };

  const navigateToRateMyPromptScreen = () => {
    setCurrentScreen("RateMyPrompt");
  };

  // Navigation handler for WriteOrRateScreen
  const handleWriteOrRateNext = (selection: string) => {
    if (selection === "write") {
      navigateToPickYourVibeScreen();
    } else {
      navigateToRateMyPromptScreen();
    }
  };

  // Placeholder for the next step after interests
  const handleInterestsNext = (interests: string[]) => {
    setUserInterests(interests);
    navigateToUniqueInterestScreen(); // Navigate to the new UniqueInterestScreen
  };

  // Placeholder for the next step after unique interest
  const handleUniqueInterestNext = async (uniqueInterest: string) => {
    setUserUniqueInterest(uniqueInterest);

    navigateToProfileCompletionScreen(); // Navigate to profile completion
  };

  useEffect(() => {
    console.log(
      "%c [ isInitialUserProfileLoaded ]-321",
      "font-size:13px; background:pink; color:#bf2c9f;",
      isInitialUserProfileLoaded
    );
    if (!isInitialUserProfileLoaded) return;
    const update = async () => {
      const profileData = {
        name: userName || undefined,
        age: userAge || undefined,
        gender: userGender || undefined,
        orientation: userOrientation || undefined,
        selectedVibes: userSelectedVibes || undefined,
        interests: userInterests || undefined,
        uniqueInterest: userUniqueInterest || undefined,
        profileCompleted: true,
      };
      console.log("Saving user profile data:", profileData);
      try {
        const result = await updateUserProfile(profileData);
        console.log("Profile saved successfully:", result);
      } catch (error) {
        console.error("Failed to save profile:", error);
      }
    };
    update();
  }, [
    userName,
    userAge,
    userGender,
    userOrientation,
    userSelectedVibes,
    userInterests,
    userUniqueInterest,
    isInitialUserProfileLoaded,
  ]);

  // Handler for the final step after profile completion
  const handleProfileCompletionNext = () => {
    console.log("Profile onboarding complete. All User Data:", {
      name: userName,
      age: userAge,
      gender: userGender,
      orientation: userOrientation,
      vibes: userSelectedVibes,
      interests: userInterests,
      uniqueInterest: userUniqueInterest,
    });
    navigateToPromptResultScreen(); // Navigate to the new PromptResultScreen
  };

  // Handler for actions from PromptResultScreen (e.g., Change Prompt)
  const handlePromptResultFlow = () => {
    console.log(
      "Action from PromptResultScreen, e.g., Change Prompt. Looping to Auth for now."
    );
    navigateToAuthScreen();
  };

  // Handler for saving edited prompt
  const onSave = (promptId: string, editText: string) => {
    console.log(`Simulating save for prompt ${promptId}: "${editText}"`);
    // Here you would typically update your main prompts array or call an API
    navigateToGeneratingScreen();
  };

  // Handler for cancelling prompt edit
  const handleCancelEditPrompt = () => {
    setPromptToEdit(null); // Clear the editing state
    setCurrentScreen("PromptResult"); // Go back to results
  };

  const handleRateMyPromptNext = (prompt: string, response: string) => {
    console.log("Prompt to rate:", { prompt, response });
    // For now, navigate to the result screen
    setCurrentScreen("RatingResult");
  };

  // Handler to trigger verification screen after email sign up/login
  const handleRequireVerification = (sessionOrIdentifier: any) => {
    setVerificationSession(sessionOrIdentifier);
    setCurrentScreen("Verification");
  };

  // Handler for submitting verification code
  const handleVerificationNext = async (code: string) => {
    const session: any = verificationSession;
    if (!session) return;
    try {
      // For signUp
      if (typeof session.attemptEmailAddressVerification === "function") {
        const completeSignUp = await session.attemptEmailAddressVerification({
          code,
        });
        if (completeSignUp.status === "complete") {
          setVerificationSession(null);
          setCurrentScreen("Thanks");
        } else {
          setAlertTitle("Verification failed");
          setAlertMessage("Please check your code and try again.");
          setAlertVisible(true);
        }
      }
      // For signIn (if you support email_code sign-in)
      else if (typeof session.attemptFirstFactor === "function") {
        const completeSignIn = await session.attemptFirstFactor({
          strategy: "email_code",
          code,
        });
        if (completeSignIn.status === "complete") {
          setVerificationSession(null);
          setCurrentScreen("Thanks");
        } else {
          setAlertTitle("Verification failed");
          setAlertMessage("Please check your code and try again.");
          setAlertVisible(true);
        }
      } else {
        setAlertTitle("Verification error");
        setAlertMessage("Unknown verification session type.");
        setAlertVisible(true);
      }
    } catch (err: any) {
      setAlertTitle("Verification error");
      setAlertMessage(err.message || "An error occurred during verification.");
      setAlertVisible(true);
    }
  };

  // Handler for going back from verification
  const handleVerificationBack = () => {
    setVerificationSession(null);
    setCurrentScreen("Auth");
  };

  if (!appIsReady) {
    return null;
  }

  if (fontError) {
    console.error("Font loading error:", fontError);
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        onLayout={onLayoutRootView}
      >
        <Text>Error loading fonts. Please restart the app.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {currentScreen === "Landing" && (
        <LandingPage onSkip={navigateToAuthScreen} />
      )}
      {currentScreen === "Auth" && (
        <AuthScreen
          navigateToThanks={navigateToThanksScreen}
          navigateToVerification={handleRequireVerification}
        />
      )}
      {currentScreen === "Thanks" && (
        <ThanksForSigningUpScreen navigateToNext={navigateToNameInputScreen} />
      )}
      {currentScreen === "NameInput" && (
        <NameInputScreen
          navigateToNext={(name) => {
            navigateToAgeInputScreen(name);
          }}
        />
      )}
      {currentScreen === "AgeInput" && (
        <AgeInputScreen navigateToNext={navigateToGenderOrientationScreen} />
      )}
      {currentScreen === "GenderOrientation" && (
        <GenderOrientationScreen navigateToNext={navigateToWriteOrRateScreen} />
      )}
      {currentScreen === "WriteOrRate" && (
        <WriteOrRateScreen navigateToNextScreen={handleWriteOrRateNext} />
      )}
      {currentScreen === "PickYourVibe" && (
        <PickYourVibeScreen
          navigateToNextScreen={navigateToEnterInterestsScreen}
          selectedVibes={userSelectedVibes || []}
        />
      )}
      {currentScreen === "EnterInterests" && (
        <EnterInterestsScreen
          navigateToNextScreen={handleInterestsNext}
          selectedInterests={userInterests || []}
        />
      )}
      {currentScreen === "UniqueInterest" && (
        <UniqueInterestScreen
          navigateToNextScreen={handleUniqueInterestNext}
          selectedUniqueInterest={userUniqueInterest || ""}
        />
      )}
      {currentScreen === "ProfileCompletion" && (
        <ProfileCompletionScreen
          userName={userName}
          navigateToNext={handleProfileCompletionNext}
        />
      )}
      {currentScreen === "PromptResult" && (
        <PromptResultScreen
          userName={userName}
          prompts={[]} // Pass empty array to use dummy data in the component
          navigateToNextFlow={handlePromptResultFlow}
          navigateToEditPrompt={navigateToEditPromptScreen}
        />
      )}
      {currentScreen === "EditPrompt" && promptToEdit && (
        <EditPromptScreen
          promptToEdit={promptToEdit}
          onSave={onSave}
          onCancel={handleCancelEditPrompt}
        />
      )}
      {currentScreen === "Generating" && (
        <GeneratingScreen onGenerationComplete={navigateToPromptResultScreen} />
      )}
      {currentScreen === "RateMyPrompt" && (
        <RateMyPromptScreen navigateToNext={handleRateMyPromptNext} />
      )}
      {currentScreen === "RatingResult" && (
        <RatingResultScreen
          ratedPrompt={dummyRatedPrompt}
          rating={dummyRating}
          navigateToNext={navigateToAuthScreen}
        />
      )}
      {currentScreen === "Verification" && (
        <VerificationScreen
          onBack={handleVerificationBack}
          onNext={handleVerificationNext}
        />
      )}
      <AlertModal
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onConfirm={() => setAlertVisible(false)}
      />
    </View>
  );
}

// Main App component that wraps everything with ClerkProvider
export default function App() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <AppContent />
    </ClerkProvider>
  );
}

// Original styles (can be removed or kept as needed)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
