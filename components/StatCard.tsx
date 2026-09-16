import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { COLORS, TYPOGRAPHY } from '../constants/theme';

type StatCardProps = {
  title: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconCircle}>
        <Ionicons
          name={icon}
          size={24}
          color={COLORS.primary}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    gap: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  info: {
    flex: 1,
  },

  value: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
  },

  title: {
    ...TYPOGRAPHY.body,
    color: COLORS.muted,
    marginTop: 2,
  },
});