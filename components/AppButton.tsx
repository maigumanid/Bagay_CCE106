import { Ionicons } from '@expo/vector-icons';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
} from 'react-native';
  
  import { COLORS, TYPOGRAPHY } from '../constants/theme';
  
  type AppButtonProps = {
    title: string;
    onPress: () => void;
    icon?: keyof typeof Ionicons.glyphMap;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    loading?: boolean;
  };
  
  export default function AppButton({
    title,
    onPress,
    icon,
    variant = 'primary',
    disabled = false,
    loading = false,
  }: AppButtonProps) {
    const isSecondary = variant === 'secondary';
  
    return (
      <Pressable
        disabled={disabled || loading}
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          isSecondary
            ? styles.secondaryButton
            : styles.primaryButton,
          disabled && styles.disabled,
          pressed && !disabled && styles.pressed,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.text} />
        ) : (
          <>
            {icon && (
              <Ionicons
                name={icon}
                size={18}
                color={COLORS.text}
              />
            )}
  
            <Text
              style={[
                styles.text,
                isSecondary && styles.secondaryText,
              ]}
            >
              {title}
            </Text>
          </>
        )}
      </Pressable>
    );
  }
  
  const styles = StyleSheet.create({
    button: {
      minHeight: 48,
      paddingHorizontal: 18,
      borderRadius: 15,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
    },
  
    primaryButton: {
      backgroundColor: COLORS.primary,
    },
  
    secondaryButton: {
      backgroundColor: COLORS.card,
      borderWidth: 1,
      borderColor: COLORS.border,
    },
  
    disabled: {
      backgroundColor: '#DDD7B4',
      opacity: 0.7,
    },
  
    pressed: {
      opacity: 0.65,
      transform: [{ scale: 0.98 }],
    },
  
    text: {
      ...TYPOGRAPHY.button,
      color: COLORS.text,
    },
  
    secondaryText: {
      color: COLORS.textSecondary,
    },
  });