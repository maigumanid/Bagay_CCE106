import {
  Pressable,
  StyleSheet,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';

type SaveButtonProps = {
  title?: string;
  onPress: () => void;
};

export default function SaveButton({
  title = 'Save Changes',
  onPress,
}: SaveButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.saveButton,
        pressed && styles.buttonPressed,
      ]}
    >
      <ThemedText style={styles.saveButtonText}>
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  saveButton: {
    minHeight: 50,
    backgroundColor: '#E7A0AA',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  saveButtonText: {
    color: '#3B0A18',
    fontSize: 16,
    fontWeight: '800',
  },

  buttonPressed: {
    opacity: 0.65,
    transform: [{ scale: 0.98 }],
  },
});
