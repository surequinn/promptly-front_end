import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import {
  Inter_200ExtraLight,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_500Medium,
  PlayfairDisplay_600SemiBold,
  PlayfairDisplay_700Bold,
  PlayfairDisplay_800ExtraBold,
  PlayfairDisplay_900Black,
} from "@expo-google-fonts/playfair-display";
import {
  Gelasio_400Regular,
  Gelasio_500Medium,
  Gelasio_600SemiBold,
  Gelasio_700Bold,
} from "@expo-google-fonts/gelasio";
import { PaytoneOne_400Regular } from "@expo-google-fonts/paytone-one";
import AuthScreen from "./src/screens/AuthScreen";
import ThanksForSigningUpScreen from "./src/screens/ThanksForSigningUpScreen";
import NameInputScreen from "./src/screens/NameInputScreen";
import AgeInputScreen from "./src/screens/AgeInputScreen";
import GenderOrientationScreen from "./src/screens/GenderOrientationScreen";
import WriteOrRateScreen from "./src/screens/WriteOrRateScreen";
import PickYourVibeScreen from "./src/screens/PickYourVibeScreen";
import EnterInterestsScreen from "./src/screens/EnterInterestsScreen";
import UniqueInterestScreen from "./src/screens/UniqueInterestScreen";
import ProfileCompletionScreen from "./src/screens/ProfileCompletionScreen";
import PromptResultScreen from "./src/screens/PromptResultScreen";
import EditPromptScreen from "./src/screens/EditPromptScreen";
import { PromptObjectType } from "./src/types";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export type ScreenName =
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
  | "EditPrompt";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
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
    // We can add more weights/styles later if needed by other components
  });

  const [appIsReady, setAppIsReady] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<ScreenName>("Auth");

  // State to hold user data
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

  useEffect(() => {
    if (fontsLoaded || fontError) {
      setAppIsReady(true);
    }
  }, [fontsLoaded, fontError]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

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

  // Navigation handler for WriteOrRateScreen
  const handleWriteOrRateNext = (selection: string) => {
    if (selection === "write") {
      navigateToPickYourVibeScreen();
    } else {
      navigateToAuthScreen();
    }
  };

  // Placeholder for the next step after interests
  const handleInterestsNext = (interests: string[]) => {
    setUserInterests(interests);
    navigateToUniqueInterestScreen(); // Navigate to the new UniqueInterestScreen
  };

  // Placeholder for the next step after unique interest
  const handleUniqueInterestNext = (uniqueInterest: string) => {
    setUserUniqueInterest(uniqueInterest);
    console.log("User Profile Data (up to unique interest):", {
      name: userName,
      age: userAge,
      gender: userGender,
      orientation: userOrientation,
      vibes: userSelectedVibes,
      interests: userInterests,
      uniqueInterest: uniqueInterest,
    });
    navigateToProfileCompletionScreen(); // Navigate to profile completion
  };

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
  const handleSaveEditedPrompt = (promptId: string, editText: string) => {
    console.log(`Simulating save for prompt ${promptId}: "${editText}"`);
    // Here you would typically update your main prompts array or call an API
    setPromptToEdit(null); // Clear the editing state
    setCurrentScreen("PromptResult"); // Go back to results
  };

  // Handler for cancelling prompt edit
  const handleCancelEditPrompt = () => {
    setPromptToEdit(null); // Clear the editing state
    setCurrentScreen("PromptResult"); // Go back to results
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
      {currentScreen === "Auth" && (
        <AuthScreen navigateToThanks={navigateToThanksScreen} />
      )}
      {currentScreen === "Thanks" && (
        <ThanksForSigningUpScreen navigateToNext={navigateToNameInputScreen} />
      )}
      {currentScreen === "NameInput" && (
        <NameInputScreen navigateToNext={navigateToAgeInputScreen} />
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
        />
      )}
      {currentScreen === "EnterInterests" && (
        <EnterInterestsScreen navigateToNextScreen={handleInterestsNext} />
      )}
      {currentScreen === "UniqueInterest" && (
        <UniqueInterestScreen navigateToNextScreen={handleUniqueInterestNext} />
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
          prompts={[]} // Pass empty array or dummy prompts. Screen has its own dummy data for now.
          navigateToNextFlow={handlePromptResultFlow}
          navigateToEditPrompt={navigateToEditPromptScreen}
        />
      )}
      {currentScreen === "EditPrompt" && (
        <EditPromptScreen
          promptToEdit={promptToEdit}
          onSaveChanges={handleSaveEditedPrompt}
          onCancel={handleCancelEditPrompt}
        />
      )}
    </View>
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
