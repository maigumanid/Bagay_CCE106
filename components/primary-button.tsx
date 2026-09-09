// components/PrimaryButton.tsx

import {
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import {
  COLORS,
  DESIGN,
  TYPOGRAPHY,
} from '../constants/theme';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
};

export default function PrimaryButton({
  title,
  onPress,
}: PrimaryButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingHorizontal: DESIGN.spacingLG,
    paddingVertical: DESIGN.spacingSM,
    borderRadius: DESIGN.radiusMedium,
    backgroundColor: COLORS.maroon,
    justifyContent: 'center',
    alignItems: 'center',
  },

  pressed: {
    backgroundColor: COLORS.maroonDark,
  },

  text: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
  },
});
