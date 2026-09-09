// components/SectionHeader.tsx

import { StyleSheet, Text, View } from 'react-native';
import { COLORS, DESIGN, TYPOGRAPHY } from '../constants/theme';

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function SectionHeader({
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {subtitle && (
        <Text style={styles.subtitle}>{subtitle}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: DESIGN.spacingMD,
  },

  title: {
    fontSize: TYPOGRAPHY.heading,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  subtitle: {
    marginTop: 4,
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
});
