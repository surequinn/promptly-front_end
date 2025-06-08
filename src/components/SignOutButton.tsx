import { fontFamilies, getFontFamily } from "@/theme/typography";
import { useClerk } from "@clerk/clerk-expo";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../theme";

interface SignOutButtonProps {
  onSignOut?: () => void;
  style?: any;
  textStyle?: any;
}

export const SignOutButton: React.FC<SignOutButtonProps> = ({
  onSignOut,
  style,
  textStyle,
}) => {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Call the optional callback
      onSignOut?.();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={handleSignOut}>
      <Text style={[styles.text, textStyle]}>Sign Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    color: colors.white,
    fontFamily: getFontFamily("Inter_500Medium", fontFamilies.inter),
    fontSize: 16,
  },
});
