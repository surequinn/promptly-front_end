import { fontFamilies, getFontFamily } from "@/theme/typography";
import React from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface AlertModalProps {
  visible: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  // Optionally allow closing by tapping outside
  dismissOnBackdropPress?: boolean;
  customModalContainerStyle?: object;
}

const { width } = Dimensions.get("window");

const AlertModal: React.FC<AlertModalProps> = ({
  visible,
  title = "Alert",
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  dismissOnBackdropPress = false,
  customModalContainerStyle = {},
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <TouchableOpacity
          style={styles.backdropTouchable}
          activeOpacity={1}
          onPress={dismissOnBackdropPress ? onCancel : undefined}
        />
        <View style={[styles.iosModalContainer, customModalContainerStyle]}>
          {title ? <Text style={styles.iosTitle}>{title}</Text> : null}
          <Text style={styles.iosMessage}>{message}</Text>
          <View style={styles.iosButtonRow}>
            {onCancel && (
              <TouchableOpacity
                style={styles.iosButton}
                onPress={onCancel}
                activeOpacity={0.7}
              >
                <Text style={styles.iosCancelButtonText}>{cancelText}</Text>
              </TouchableOpacity>
            )}
            {onCancel && <View style={styles.iosDivider} />}
            <TouchableOpacity
              style={styles.iosButton}
              onPress={onConfirm}
              activeOpacity={0.7}
            >
              <Text style={styles.iosConfirmButtonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  backdropTouchable: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  iosModalContainer: {
    maxWidth: 340,
    minWidth: 260,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingTop: 20,
    paddingBottom: 0,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 12,
  },
  iosTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111",
    textAlign: "center",
    marginBottom: 6,
    fontFamily: getFontFamily("Inter_600SemiBold", fontFamilies.inter),
  },
  iosMessage: {
    fontSize: 13.5,
    color: "#444",
    textAlign: "center",
    marginBottom: 18,
    fontFamily: getFontFamily("Inter_400Regular", fontFamilies.inter),
  },
  iosButtonRow: {
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderTopColor: "#e5e5ea",
    width: "100%",
    height: 44,
  },
  iosButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 44,
  },
  iosDivider: {
    width: 0.5,
    backgroundColor: "#e5e5ea",
    height: "100%",
  },
  iosConfirmButtonText: {
    color: "#007AFF",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: getFontFamily("Inter_600SemiBold", fontFamilies.inter),
  },
  iosCancelButtonText: {
    color: "#007AFF",
    fontSize: 17,
    fontWeight: "400",
    textAlign: "center",
    fontFamily: getFontFamily("Inter_400Regular", fontFamilies.inter),
  },
});

export default AlertModal;
