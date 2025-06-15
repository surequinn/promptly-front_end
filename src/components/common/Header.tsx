import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  title?: string;
  onBack?: () => void;
  onSettings?: () => void;
  hideBack?: boolean;
  hideSettings?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  onSettings,
  hideBack = false,
  hideSettings = false,
  containerStyle,
  titleStyle,
}) => {
  return (
    <View style={[styles.headerContainer, containerStyle]}>
      <View style={styles.buttonContainer}>
        {!hideBack && (
          <TouchableOpacity onPress={onBack} style={styles.button}>
            <Ionicons name="arrow-back" size={28} color="#333" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.titleContainer}>
        {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      </View>
      <View style={styles.buttonContainer}>
        {!hideSettings && (
          <TouchableOpacity onPress={onSettings} style={styles.button}>
            <Ionicons name="menu" size={32} color="#333" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: "transparent",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  buttonContainer: {
    width: 40,
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  button: {
    padding: 4,
  },
});

export default Header;
