import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';

type CounterButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function CounterButton({
  title,
  onPress,
  disabled = false,
}: CounterButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabledButton,
        pressed && !disabled && styles.pressedButton,
      ]}
    >
      <ThemedText style={styles.buttonText}>
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 50,
    backgroundColor: '#E7A0AA',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  disabledButton: {
    opacity: 0.4,
  },

  pressedButton: {
    opacity: 0.65,
    transform: [{ scale: 0.96 }],
  },

  buttonText: {
    color: '#3B0A18',
    fontSize: 24,
    fontWeight: '800',
  },
});
