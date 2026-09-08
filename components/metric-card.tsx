import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from '@/constants/theme';

type MetricCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  description: string;
};

export default function MetricCard({
  icon,
  label,
  value,
  description,
}: MetricCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons
          name={icon}
          size={20}
          color={COLORS.textPrimary}
        />
      </View>

      <Text style={styles.label}>{label}</Text>

      <Text style={styles.value}>{value}</Text>

      <Text style={styles.description}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    flexBasis: 220,
    minWidth: 160,

    backgroundColor: COLORS.surface,

    borderRadius: RADIUS.xl,

    padding: SPACING.lg,

    marginBottom: SPACING.md,

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  iconBox: {
    width: 42,
    height: 42,

    borderRadius: RADIUS.md,

    backgroundColor: COLORS.primary,

    alignItems: 'center',
    justifyContent: 'center',

    marginBottom: SPACING.md,
  },

  label: {
    ...TYPOGRAPHY.metricLabel,

    color: COLORS.textSecondary,

    marginBottom: SPACING.xs,
  },

  value: {
    ...TYPOGRAPHY.metricValue,

    color: COLORS.textPrimary,

    marginBottom: SPACING.xs,
  },

  description: {
    ...TYPOGRAPHY.caption,

    color: COLORS.textMuted,
  },
});
