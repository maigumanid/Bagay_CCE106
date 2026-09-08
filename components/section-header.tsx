import { StyleSheet, Text, View } from 'react-native';

import {
  COLORS,
  SPACING,
  TYPOGRAPHY,
} from '@/constants/theme';

type SectionHeaderProps = {
  title: string;
  action?: string;
};

export default function SectionHeader({
  title,
  action,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      {action && (
        <Text style={styles.action}>
          {action}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: SPACING.md,
  },

  title: {
    ...TYPOGRAPHY.sectionTitle,

    color: COLORS.textPrimary,
  },

  action: {
    ...TYPOGRAPHY.action,

    color: COLORS.primary,
  },
});
