import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  Image,
} from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { colors, fontSizes, spacing } from "@/theme";
import { getFontFamily, fontFamilies } from "@/theme/typography";

const promptlyLogo = require("../../../assets/images/promptly-logo.png");

interface SettingsDropdownProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: (screen: "AccountSettings" | "ContactUs") => void;
}

const SettingsDropdown: React.FC<SettingsDropdownProps> = ({
  visible,
  onClose,
  onNavigate,
}) => {
  const { signOut } = useAuth();
  const { user } = useUser();

  const menuItems = [
    { title: "Account Settings", screen: "AccountSettings" as const },
    { title: "Contact Us", screen: "ContactUs" as const },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <SafeAreaView>
          <View style={styles.container}>
            <View style={styles.header}>
              <Image source={promptlyLogo} style={styles.logo} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>
                  Hi, {user?.firstName || "User"}!
                </Text>
                <Text style={styles.userEmail}>
                  {user?.primaryEmailAddress?.emailAddress}
                </Text>
              </View>
            </View>
            <View style={styles.menu}>
              {menuItems.map((item) => (
                <TouchableOpacity
                  key={item.title}
                  style={styles.menuItem}
                  onPress={() => {
                    onNavigate(item.screen);
                    onClose();
                  }}
                >
                  <Text style={styles.menuItemText}>{item.title}</Text>
                  <Ionicons name="chevron-forward" size={22} color="#402F73" />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => {
                  signOut();
                  onClose();
                }}
              >
                <Text style={styles.logoutButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    paddingTop: 90,
    paddingHorizontal: 15,
  },
  container: {
    backgroundColor: "#F6F6F6",
    borderRadius: 25,
    paddingVertical: 20,
    paddingHorizontal: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
  },
  logo: {
    width: 76,
    height: 74,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: "Inter_800ExtraBold",
    fontSize: 24,
    color: "#402F73",
  },
  userEmail: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: "#6F6099",
  },
  menu: {
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA",
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  menuItemText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 18,
    color: "#402F73",
  },
  footer: {
    marginTop: 20,
  },
  logoutButton: {
    paddingVertical: 10,
  },
  logoutButtonText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: "#402F73",
  },
});

export default SettingsDropdown;
