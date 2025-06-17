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
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
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
import Header from "@/components/common/Header";
import SettingsDropdown from "@/components/common/SettingsDropdown";
import ContactUsScreen from "@/screens/ContactUsScreen";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import AccountSettingsScreen from "@/screens/AccountSettingsScreen";
import RatingNextStepScreen, { NextStep } from "@/screens/RatingNextStepScreen";

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
  | "Verification"
  | "AccountSettings"
  | "ContactUs"
  | "RatingNextStep";

// Get the Clerk publishable key
const publishableKey =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  "pk_test_ZXhwZXJ0LWdvcGhlci0yNS5jbGVyay5hY2NvdW50cy5kZXYk";

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

// Component for the Signed-Out flow (Landing, Auth, Verification)
function AuthFlow() {
  const [currentScreen, setCurrentScreen] = useState<
    "Landing" | "Auth" | "Verification"
  >("Landing");
  const [verificationSession, setVerificationSession] = useState<any>(null);
  const [navigationHistory, setNavigationHistory] = useState<string[]>([
    "Landing",
  ]);

  const navigate = (screen: "Auth" | "Verification") => {
    setNavigationHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = navigationHistory.slice(0, -1);
      setNavigationHistory(newHistory);
      setCurrentScreen(
        newHistory[newHistory.length - 1] as "Landing" | "Auth" | "Verification"
      );
    }
  };

  const navigateToAuthScreen = () => navigate("Auth");

  const handleRequireVerification = (session: any) => {
    setVerificationSession(session);
    navigate("Verification");
  };

  const handleVerificationNext = async (code: string) => {
    if (!verificationSession) return;
    try {
      const strategy = verificationSession.supportedFirstFactors.find(
        (ff: any) => ff.strategy === "email_code"
      );

      if (strategy) {
        // Sign-in attempt
        const completeSignIn = await verificationSession.attemptFirstFactor({
          strategy: "email_code",
          code,
        });
        if (completeSignIn.status === "complete") {
          // This will trigger the <SignedIn> component to render
        }
      } else {
        // Sign-up attempt
        const completeSignUp =
          await verificationSession.attemptEmailAddressVerification({
            code,
          });
        if (completeSignUp.status === "complete") {
          // This will trigger the <SignedIn> component to render
        }
      }
    } catch (err: any) {
      console.error(
        "Verification error",
        err.errors ? JSON.stringify(err.errors) : err
      );
      // You can show an alert here
    }
  };

  let screenContent;
  switch (currentScreen) {
    case "Landing":
      screenContent = <LandingPage onSkip={navigateToAuthScreen} />;
      break;
    case "Auth":
      screenContent = (
        <AuthScreen
          navigateToThanks={() => {}} // Thanks screen is not needed here
          navigateToVerification={handleRequireVerification}
        />
      );
      break;
    case "Verification":
      screenContent = (
        <>
          <Header onBack={goBack} hideSettings />
          <VerificationScreen onNext={handleVerificationNext} onBack={goBack} />
        </>
      );
      break;
    default:
      screenContent = <LandingPage onSkip={navigateToAuthScreen} />;
  }
  return screenContent;
}

// Component for the Signed-In flow (main app)
function MainApp() {
  const { updateUserProfile, getUserProfile } = useApiClient();

  // --- DEVELOPER START PAGE ---
  // To test a specific screen, set it as the initial screen here and comment out the
  // `useEffect` below that handles profile-based navigation.
  const [currentScreen, setCurrentScreen] = useState<ScreenName>("WriteOrRate");
  const [navigationHistory, setNavigationHistory] = useState<ScreenName[]>([
    "WriteOrRate",
  ]);
  const [isInitialUserProfileLoaded, setIsInitialUserProfileLoaded] =
    useState(true); // Bypass loading screen for testing
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  // User data state
  const [userName, setUserName] = useState<string | null>(null);
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
  const [promptToEdit, setPromptToEdit] = useState<PromptObjectType | null>(
    null
  );
  const [promptToRate, setPromptToRate] = useState<{
    prompt: string;
    response: string;
  } | null>(null);

  const navigate = (screen: ScreenName, replace = false) => {
    if (replace) {
      setNavigationHistory([screen]);
    } else {
      setNavigationHistory((prev) => [...prev, screen]);
    }
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = navigationHistory.slice(0, -1);
      setNavigationHistory(newHistory);
      setCurrentScreen(newHistory[newHistory.length - 1]);
    }
  };

  useEffect(() => {
    // [DEV MODE] To enable normal startup flow, uncomment the code below.
    /*
    const initUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        if (profile && profile.data) {
          setUserName(profile.data.name);
          setUserAge(profile.data.age);
          setUserGender(profile.data.gender);
          setUserOrientation(profile.data.orientation);
          setUserSelectedVibes(profile.data.selectedVibes);
          setUserInterests(profile.data.interests);
          setUserUniqueInterest(profile.data.uniqueInterest);

          if (profile.data.profileCompleted) {
            navigate("WriteOrRate", true);
          } else if (!profile.data.name) {
            navigate("NameInput", true);
          } else if (!profile.data.age) {
            navigate("AgeInput", true);
          } else if (!profile.data.gender || !profile.data.orientation) {
            navigate("GenderOrientation", true);
          } else {
            navigate("PickYourVibe", true);
          }
        } else {
          navigate("NameInput", true);
        }
      } catch (error) {
        console.error("Failed to fetch user profile", error);
        navigate("NameInput", true); // Fallback to a safe screen
      } finally {
        setIsInitialUserProfileLoaded(true);
      }
    };
    initUserProfile();
    */
  }, []);

  useEffect(() => {
    if (!isInitialUserProfileLoaded) return;
    const saveProfile = async () => {
      const profileData: UserProfileData = {
        name: userName ?? undefined,
        age: userAge ?? undefined,
        gender: userGender ?? undefined,
        orientation: userOrientation ?? undefined,
        selectedVibes: userSelectedVibes ?? undefined,
        interests: userInterests ?? undefined,
        uniqueInterest: userUniqueInterest ?? undefined,
        profileCompleted:
          currentScreen === "PromptResult" || currentScreen === "WriteOrRate",
      };
      try {
        await updateUserProfile(profileData);
      } catch (error) {
        console.error("Failed to save profile:", error);
      }
    };
    saveProfile();
  }, [
    userName,
    userAge,
    userGender,
    userOrientation,
    userSelectedVibes,
    userInterests,
    userUniqueInterest,
  ]);

  if (!isInitialUserProfileLoaded) {
    return null; // Or a loading screen
  }

  // Navigation handlers
  const navigateToSettingsScreen = () => setIsSettingsVisible(true);
  const handleDropdownNavigate = (screen: "AccountSettings" | "ContactUs") => {
    navigate(screen);
  };

  const navigateToAgeInputScreen = (name: string) => {
    setUserName(name);
    navigate("AgeInput");
  };
  const navigateToGenderOrientationScreen = (age: number) => {
    setUserAge(age);
    navigate("GenderOrientation");
  };
  const navigateToWriteOrRateScreen = (
    gender: string,
    orientation: string[]
  ) => {
    setUserGender(gender);
    setUserOrientation(orientation);
    navigate("WriteOrRate");
  };
  const handleWriteOrRateNext = (selection: string) =>
    navigate(selection === "write" ? "PickYourVibe" : "RateMyPrompt");
  const navigateToEnterInterestsScreen = (selectedVibes: string[]) => {
    setUserSelectedVibes(selectedVibes);
    navigate("EnterInterests");
  };
  const handleInterestsNext = (interests: string[]) => {
    setUserInterests(interests);
    navigate("UniqueInterest");
  };
  const handleUniqueInterestNext = (interest: string) => {
    setUserUniqueInterest(interest);
    navigate("ProfileCompletion");
  };
  const handleProfileCompletionNext = () => navigate("PromptResult", true);
  const navigateToEditPromptScreen = (prompt: PromptObjectType) => {
    setPromptToEdit(prompt);
    navigate("EditPrompt");
  };
  const onSaveEdit = (id: string, text: string) => {
    /* update logic here */ goBack();
  };
  const handleRateMyPromptNext = (prompt: string, response: string) => {
    setPromptToRate({ prompt, response });
    navigate("RatingResult");
  };

  const handleRatingNextStep = (selection: NextStep) => {
    switch (selection) {
      case "improve":
        // A bit of a workaround: navigate to EditPrompt, but we need to create a temporary prompt object
        const tempPromptToEdit: PromptObjectType = {
          id: `temp-${Date.now()}`,
          category: promptToRate?.prompt || "Selected prompt",
          responseText: promptToRate?.response || "",
          userId: "current-user", // This should be replaced with actual user ID if available
          aiGenerated: false,
          status: "active",
          createdAt: new Date().toISOString(),
        };
        setPromptToEdit(tempPromptToEdit);
        navigate("EditPrompt");
        break;
      case "rate_another":
        navigate("RateMyPrompt", true); // Replace history
        break;
      case "write_new":
        navigate("PickYourVibe", true); // Replace history
        break;
    }
  };

  let screenContent;
  // ... Render screens based on currentScreen ...
  switch (currentScreen) {
    case "NameInput":
      screenContent = (
        <ScreenWrapper
          onBack={goBack}
          onSettings={navigateToSettingsScreen}
          hideBack
        >
          <NameInputScreen navigateToNext={navigateToAgeInputScreen} />
        </ScreenWrapper>
      );
      break;
    case "AgeInput":
      screenContent = (
        <ScreenWrapper onBack={goBack} onSettings={navigateToSettingsScreen}>
          <AgeInputScreen navigateToNext={navigateToGenderOrientationScreen} />
        </ScreenWrapper>
      );
      break;
    case "GenderOrientation":
      screenContent = (
        <ScreenWrapper onBack={goBack} onSettings={navigateToSettingsScreen}>
          <GenderOrientationScreen
            navigateToNext={navigateToWriteOrRateScreen}
          />
        </ScreenWrapper>
      );
      break;
    case "WriteOrRate":
      screenContent = (
        <ScreenWrapper onBack={goBack} onSettings={navigateToSettingsScreen}>
          <WriteOrRateScreen navigateToNextScreen={handleWriteOrRateNext} />
        </ScreenWrapper>
      );
      break;
    case "PickYourVibe":
      screenContent = (
        <ScreenWrapper onBack={goBack} onSettings={navigateToSettingsScreen}>
          <PickYourVibeScreen
            navigateToNextScreen={navigateToEnterInterestsScreen}
            selectedVibes={userSelectedVibes || []}
          />
        </ScreenWrapper>
      );
      break;
    case "EnterInterests":
      screenContent = (
        <ScreenWrapper onBack={goBack} onSettings={navigateToSettingsScreen}>
          <EnterInterestsScreen
            navigateToNextScreen={handleInterestsNext}
            selectedInterests={userInterests || []}
          />
        </ScreenWrapper>
      );
      break;
    case "UniqueInterest":
      screenContent = (
        <ScreenWrapper onBack={goBack} onSettings={navigateToSettingsScreen}>
          <UniqueInterestScreen
            navigateToNextScreen={handleUniqueInterestNext}
            selectedUniqueInterest={userUniqueInterest || ""}
          />
        </ScreenWrapper>
      );
      break;
    case "ProfileCompletion":
      screenContent = (
        <ScreenWrapper onBack={goBack} onSettings={navigateToSettingsScreen}>
          <ProfileCompletionScreen
            userName={userName}
            navigateToNext={handleProfileCompletionNext}
          />
        </ScreenWrapper>
      );
      break;
    case "PromptResult":
      screenContent = (
        <ScreenWrapper
          onBack={goBack}
          onSettings={navigateToSettingsScreen}
          title="✨ Magic's done!"
        >
          <PromptResultScreen
            userName={userName}
            prompts={[]}
            navigateToEditPrompt={navigateToEditPromptScreen}
            navigateToNextFlow={() => navigate("WriteOrRate", true)}
          />
        </ScreenWrapper>
      );
      break;
    case "EditPrompt":
      screenContent = (
        <ScreenWrapper onBack={goBack} onSettings={navigateToSettingsScreen}>
          <EditPromptScreen promptToEdit={promptToEdit!} onSave={onSaveEdit} />
        </ScreenWrapper>
      );
      break;
    case "Generating":
      screenContent = (
        <GeneratingScreen
          onGenerationComplete={() => navigate("PromptResult")}
        />
      );
      break;
    case "RateMyPrompt":
      screenContent = (
        <ScreenWrapper onBack={goBack} onSettings={navigateToSettingsScreen}>
          <RateMyPromptScreen navigateToNext={handleRateMyPromptNext} />
        </ScreenWrapper>
      );
      break;
    case "RatingResult":
      screenContent = (
        <ScreenWrapper onBack={goBack} onSettings={navigateToSettingsScreen}>
          <RatingResultScreen
            ratedPrompt={
              {
                category: promptToRate?.prompt,
                responseText: promptToRate?.response,
              } as any
            }
            navigateToNext={() => navigate("RatingNextStep")}
          />
        </ScreenWrapper>
      );
      break;
    case "AccountSettings":
      screenContent = (
        <AccountSettingsScreen
          onBack={goBack}
          onSettings={navigateToSettingsScreen}
        />
      );
      break;
    case "ContactUs":
      screenContent = (
        <ContactUsScreen
          onBack={goBack}
          onClose={() => {
            setIsSettingsVisible(false);
            goBack();
          }}
        />
      );
      break;
    case "RatingNextStep":
      screenContent = (
        <ScreenWrapper onBack={goBack} onSettings={navigateToSettingsScreen}>
          <RatingNextStepScreen onSelect={handleRatingNextStep} />
        </ScreenWrapper>
      );
      break;
    default:
      screenContent = (
        <ScreenWrapper
          onBack={goBack}
          onSettings={navigateToSettingsScreen}
          hideBack
        >
          <NameInputScreen navigateToNext={navigateToAgeInputScreen} />
        </ScreenWrapper>
      );
  }

  return (
    <>
      {screenContent}
      <SettingsDropdown
        visible={isSettingsVisible}
        onClose={() => setIsSettingsVisible(false)}
        onNavigate={handleDropdownNavigate}
      />
    </>
  );
}

function AppContent() {
  useGoogleFontsLink();
  const { isLoaded: clerkLoaded } = useAuth();
  const [fontsLoaded, fontError] = useFonts(
    Platform.OS === "web"
      ? {}
      : {
          Inter_400Regular,
          Inter_500Medium,
          Inter_600SemiBold,
          Inter_700Bold,
          Inter_800ExtraBold,
          PlayfairDisplay_700Bold,
          PlayfairDisplay_800ExtraBold,
          Gelasio_600SemiBold,
          Gelasio_700Bold,
          PaytoneOne_400Regular,
        }
  );

  const onLayoutRootView = useCallback(async () => {
    if (clerkLoaded && (fontsLoaded || fontError || Platform.OS === "web")) {
      await SplashScreen.hideAsync();
    }
  }, [clerkLoaded, fontsLoaded, fontError]);

  if (!clerkLoaded || !(fontsLoaded || fontError || Platform.OS === "web")) {
    return null; // Show splash screen
  }

  if (fontError) {
    console.error("Font loading error:", fontError);
    // Optionally render a fallback UI
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <SignedIn>
        <MainApp />
      </SignedIn>
      <SignedOut>
        <AuthFlow />
      </SignedOut>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
