import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import PrimaryButton from "@/components/PrimaryButton";

interface ContactUsScreenProps {
  onBack: () => void;
  onClose: () => void;
}

const ContactUsScreen: React.FC<ContactUsScreenProps> = ({
  onBack,
  onClose,
}) => {
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <ScreenWrapper onBack={onBack} hideSettings>
        <View style={styles.responseContainer}>
          <Text style={styles.responseHeader}>
            Thanks for contacting us! 🙌
          </Text>
          <Text style={styles.responseSubtext}>
            We're on it and will be in touch before you know it!
          </Text>
          <PrimaryButton title="Close" onPress={onClose} />
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper onBack={onBack} hideSettings>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.content}>
          <Text style={styles.header}>Tell us what you think</Text>
          <Text style={styles.subtext}>
            Something not working? Or just want to say hi? Hit us up.
          </Text>
          <TextInput
            style={styles.input}
            multiline
            placeholder="Add your two cents here..."
            placeholderTextColor="#898A8D"
            value={message}
            onChangeText={setMessage}
          />
          <PrimaryButton title="Submit" onPress={() => setIsSubmitted(true)} />
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 35,
    paddingTop: 80,
  },
  header: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 28,
    color: "#402F73",
    marginBottom: 16,
  },
  subtext: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    color: "#808080",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    height: 280,
    padding: 20,
    textAlignVertical: "top",
    fontSize: 16,
    color: "#333",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 32,
  },
  responseContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 35,
  },
  responseHeader: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 36,
    color: "#402F73",
    textAlign: "center",
    marginBottom: 24,
  },
  responseSubtext: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    color: "#808080",
    textAlign: "center",
    marginBottom: 40,
  },
});

export default ContactUsScreen;
