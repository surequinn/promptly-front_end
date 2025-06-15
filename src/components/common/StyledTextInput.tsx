import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";

interface StyledTextInputProps {
  placeholder: string;
  icon: React.ReactNode;
  secureTextEntry?: boolean;
}

const StyledTextInput: React.FC<StyledTextInputProps> = ({
  placeholder,
  icon,
  secureTextEntry,
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.iconContainer}>{icon}</View>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#A9A9A9"
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 56,
  },
  iconContainer: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
});

export default StyledTextInput;
