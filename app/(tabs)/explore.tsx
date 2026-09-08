import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import SectionHeader from '@/components/section-header';

import {
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from '@/constants/theme';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.brand}>FORMULA 1</Text>
        <Text style={styles.title}>Explore</Text>

        <SectionHeader title="F1 Information" />

        <View style={styles.card}>
          <View style={styles.iconBox}>
            <Ionicons
              name="flag-outline"
              size={22}
              color={COLORS.textPrimary}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Race Calendar</Text>
            <Text style={styles.description}>
              View upcoming races and circuits.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.iconBox}>
            <Ionicons
              name="people-outline"
              size={22}
              color={COLORS.textPrimary}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Drivers</Text>
            <Text style={styles.description}>
              Explore drivers and their teams.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.iconBox}>
            <Ionicons
              name="trophy-outline"
              size={22}
              color={COLORS.textPrimary}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Championship</Text>
            <Text style={styles.description}>
              Check the current championship standings.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: SPACING.xl,
    paddingTop: 60,
    paddingBottom: SPACING.xl,
  },

  brand: {
    ...TYPOGRAPHY.brand,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },

  title: {
    ...TYPOGRAPHY.screenTitle,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xxxl,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },

  textContainer: {
    flex: 1,
  },

  cardTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },

  description: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
  },
});
