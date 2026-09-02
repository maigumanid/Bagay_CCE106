import {
  Pressable,
  StyleSheet,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';

type CalculatorButtonProps = {
  label: string;
  onPress: () => void;
};

export default function CalculatorButton({
  label,
  onPress,
}: CalculatorButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
      ]}
    >
      <ThemedText style={styles.buttonText}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    minHeight: 50,
    backgroundColor: '#E7A0AA',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pressed: {
    opacity: 0.65,
    transform: [{ scale: 0.97 }],
  },

  buttonText: {
    color: '#3B0A18',
    fontSize: 20,
    fontWeight: '800',
  },
});
