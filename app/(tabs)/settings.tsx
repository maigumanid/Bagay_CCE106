// app/(tabs)/settings.tsx

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import SectionHeader from '../../components/section-header';
import {
  COLORS,
  DESIGN,
  SHADOW,
  TYPOGRAPHY,
} from '../../constants/theme';

type SettingRowProps = {
  title: string;
  description: string;
};

function SettingRow({
  title,
  description,
}: SettingRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.rowContent}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowDescription}>
          {description}
        </Text>
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.intro}>
        <Text style={styles.introTitle}>
          Portal Settings
        </Text>

        <Text style={styles.introText}>
          Manage your student portal preferences and
          account options.
        </Text>
      </View>

      <SectionHeader
        title="Preferences"
        subtitle="Customize your portal experience"
      />

      <View style={styles.card}>
        <SettingRow
          title="Notifications"
          description="Manage student portal notifications"
        />

        <SettingRow
          title="Appearance"
          description="Use the standard portal appearance"
        />

        <SettingRow
          title="Language"
          description="English"
        />
      </View>

      <View style={styles.section}>
        <SectionHeader
          title="Account"
          subtitle="Student account options"
        />

        <View style={styles.card}>
          <SettingRow
            title="Account Status"
            description="Active student account"
          />

          <SettingRow
            title="Sign Out"
            description="Sign out of your student account"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    padding: DESIGN.spacingLG,
    paddingBottom: DESIGN.spacingXL,
  },

  intro: {
    backgroundColor: COLORS.maroon,
    borderRadius: DESIGN.radiusLarge,
    padding: DESIGN.spacingLG,
    marginBottom: DESIGN.spacingXL,
  },

  introTitle: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.title,
    fontWeight: '800',
    marginBottom: 8,
  },

  introText: {
    color: COLORS.white,
    opacity: 0.9,
    fontSize: TYPOGRAPHY.body,
    lineHeight: 22,
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: DESIGN.radiusMedium,
    paddingHorizontal: DESIGN.spacingMD,
    borderWidth: DESIGN.borderWidth,
    borderColor: COLORS.border,
    ...SHADOW,
  },

  row: {
    minHeight: 70,
    justifyContent: 'center',
    borderBottomWidth: DESIGN.borderWidth,
    borderBottomColor: COLORS.border,
  },

  rowContent: {
    paddingVertical: DESIGN.spacingSM,
  },

  rowTitle: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },

  rowDescription: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },

  section: {
    marginTop: DESIGN.spacingXL,
  },
});
