import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from '@/constants/theme';

type QuickActionProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
};

export default function QuickAction({
  icon,
  title,
}: QuickActionProps) {
  return (
    <TouchableOpacity
      style={styles.action}
      accessibilityLabel={title}
    >
      <Ionicons
        name={icon}
        size={22}
        color={COLORS.primary}
        style={styles.icon}
      />

      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  action: {
    flex: 1,

    minWidth: 90,

    backgroundColor: COLORS.surface,

    borderRadius: RADIUS.lg,

    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.sm,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: SPACING.sm,

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  icon: {
    marginBottom: SPACING.sm,
  },

  title: {
    ...TYPOGRAPHY.action,

    color: COLORS.textPrimary,

    textAlign: 'center',
  },
});
