import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface PillButtonProps {
  label: string;
  onPress: () => void;
  isActive: boolean;
}

const PillButton: React.FC<PillButtonProps> = ({
  label,
  onPress,
  isActive,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, isActive && styles.activeContainer]}
      onPress={onPress}
    >
      <Text style={[styles.label, isActive && styles.activeLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 100,
  },
  activeContainer: {
    backgroundColor: "#FFFFFF",
  },
  label: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    color: "rgba(34, 23, 42, 0.4)",
  },
  activeLabel: {
    fontFamily: "Inter_700Bold",
    color: "#5B2D5C",
  },
});

export default PillButton;
