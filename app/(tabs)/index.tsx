import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import DashboardHeader from '@/components/dashboard-header';
import MetricCard from '@/components/metric-card';
import QuickAction from '@/components/quick-action';
import SectionHeader from '@/components/section-header';

import {
  COLORS,
  SPACING,
} from '@/constants/theme';

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <DashboardHeader title="Driver Dashboard" />

        <SectionHeader title="Performance" />

        <View style={styles.metricsContainer}>
          <MetricCard
            icon="flag-outline"
            label="POSITION"
            value="P3"
            description="Race position"
          />

          <MetricCard
            icon="trophy-outline"
            label="POINTS"
            value="187"
            description="Season points"
          />

          <MetricCard
            icon="stats-chart-outline"
            label="RANK"
            value="P4"
            description="Championship"
          />
        </View>

        <SectionHeader title="Quick Actions" />

        <View style={styles.actionsContainer}>
          <QuickAction
            icon="flag-outline"
            title="Races"
          />

          <QuickAction
            icon="stats-chart-outline"
            title="Stats"
          />

          <QuickAction
            icon="trophy-outline"
            title="Standings"
          />
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

  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.xxl,
  },

  actionsContainer: {
    flexDirection: 'row',
  },
});
