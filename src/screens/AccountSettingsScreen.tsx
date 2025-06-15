import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import FormField from "@/components/common/FormField";
import PillButton from "@/components/common/PillButton";

import UserIcon from "@/../assets/icons/user-icon.svg";
import EmailIcon from "@/../assets/icons/email-icon.svg";
import LockIcon from "@/../assets/icons/lock-icon.svg";

interface AccountSettingsScreenProps {
  onBack: () => void;
  onSettings: () => void;
}

const GENDERS = ["Male", "Female", "Non-binary"];
const ORIENTATIONS = ["Male", "Female", "Non-binary"];

const AccountSettingsScreen: React.FC<AccountSettingsScreenProps> = ({
  onBack,
}) => {
  const [name, setName] = useState("Tyler");
  const [age, setAge] = useState("20");
  const [email, setEmail] = useState("youremail@email.com");
  const [gender, setGender] = useState("Male");
  const [interestedIn, setInterestedIn] = useState(["Female"]);

  const handleInterestToggle = (interest: string) => {
    setInterestedIn((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <ScreenWrapper onBack={onBack} hideSettings title="Update Info">
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <FormField label="Name" value={name} onChangeText={setName} />
        <FormField
          label="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <FormField
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gender</Text>
          <View style={styles.pillsContainer}>
            {GENDERS.map((g) => (
              <PillButton
                key={g}
                label={g}
                isActive={gender === g}
                onPress={() => setGender(g)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interested in</Text>
          <View style={styles.pillsContainer}>
            {ORIENTATIONS.map((o) => (
              <PillButton
                key={o}
                label={o}
                isActive={interestedIn.includes(o)}
                onPress={() => handleInterestToggle(o)}
              />
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <LinearGradient
            colors={["#7F69D5", "#402F73"]}
            style={styles.gradient}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.deleteButtonText}>Delete account</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 35,
    paddingTop: 120,
    paddingBottom: 40,
  },
  header: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 28,
    color: "#402F73",
    marginBottom: 40,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontFamily: "Inter_500Medium",
    fontSize: 18,
    color: "#664EA4",
    marginBottom: 16,
  },
  pillsContainer: {
    flexDirection: "row",
  },
  saveButton: {
    borderRadius: 30,
    marginTop: 40,
    marginBottom: 28,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  gradient: {
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
  },
  saveButtonText: {
    fontFamily: "Inter_700Bold",
    fontSize: 24,
    color: "#FFFFFF",
  },
  deleteButtonText: {
    fontFamily: "Inter_500Medium",
    fontSize: 18,
    color: "#664EA4",
    textAlign: "center",
  },
});

export default AccountSettingsScreen;
