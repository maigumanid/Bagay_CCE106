import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from '@/constants/theme';

type DashboardHeaderProps = {
  title: string;
};

export default function DashboardHeader({
  title,
}: DashboardHeaderProps) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.brand}>
          FORMULA 1
        </Text>

        <Text style={styles.title}>
          {title}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.profileButton}
        accessibilityLabel="Open profile"
      >
        <Ionicons
          name="person-outline"
          size={21}
          color={COLORS.textPrimary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: SPACING.xxxl,
  },

  brand: {
    ...TYPOGRAPHY.brand,

    color: COLORS.primary,

    marginBottom: SPACING.xs,
  },

  title: {
    ...TYPOGRAPHY.screenTitle,

    color: COLORS.textPrimary,
  },

  profileButton: {
    width: 46,
    height: 46,

    borderRadius: RADIUS.round,

    backgroundColor: COLORS.surface,

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: COLORS.border,
  },
});
