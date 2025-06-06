import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useClerk } from "@clerk/clerk-expo";
import { colors, fonts } from "../theme";

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
    fontFamily: fonts.interMedium,
    fontSize: 16,
  },
});
