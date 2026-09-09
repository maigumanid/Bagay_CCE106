// components/InfoRow.tsx

import { StyleSheet, Text, View } from 'react-native';
import { COLORS, DESIGN, TYPOGRAPHY } from '../constants/theme';

type InfoRowProps = {
  label: string;
  value: string;
};

export default function InfoRow({
  label,
  value,
}: InfoRowProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: DESIGN.spacingSM,
    borderBottomWidth: DESIGN.borderWidth,
    borderBottomColor: COLORS.border,
  },

  label: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 3,
  },

  value: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
});
