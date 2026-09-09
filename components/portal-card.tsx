// components/PortalCard.tsx

import { StyleSheet, Text, View } from 'react-native';
import {
  COLORS,
  DESIGN,
  SHADOW,
  TYPOGRAPHY,
} from '../constants/theme';

type PortalCardProps = {
  title: string;
  value: string;
  subtitle?: string;
};

export default function PortalCard({
  title,
  value,
  subtitle,
}: PortalCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.value}>{value}</Text>

      {subtitle && (
        <Text style={styles.subtitle}>{subtitle}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: DESIGN.radiusMedium,
    padding: DESIGN.spacingMD,
    borderWidth: DESIGN.borderWidth,
    borderColor: COLORS.border,
    ...SHADOW,
  },

  title: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 8,
  },

  value: {
    fontSize: TYPOGRAPHY.heading,
    fontWeight: '800',
    color: COLORS.maroon,
  },

  subtitle: {
    marginTop: 3,
    fontSize: TYPOGRAPHY.small,
    color: COLORS.textLight,
  },
});
