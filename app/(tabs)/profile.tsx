// app/(tabs)/profile.tsx

import { useRouter } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import InfoRow from '../../components/info-row';
import PrimaryButton from '../../components/primary-button';
import SectionHeader from '../../components/section-header';
import {
  COLORS,
  DESIGN,
  SHADOW,
  TYPOGRAPHY,
} from '../../constants/theme';

export default function ProfileScreen() {
  const router = useRouter();

  const openStudentDetails = () => {
    router.push('/student/147123');
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>MB</Text>
        </View>

        <View style={styles.headerText}>
          <Text style={styles.name}>
            Michaela Darry G. Bagay
          </Text>

          <Text style={styles.program}>
            Bachelor of Science in Information Technology
          </Text>
        </View>
      </View>

      <SectionHeader
        title="Student Information"
        subtitle="Your registered student information"
      />

      <View style={styles.card}>
        <InfoRow
          label="Student Name"
          value="Michaela Darry G. Bagay"
        />

        <InfoRow
          label="Program"
          value="BSIT"
        />

        <InfoRow
          label="Student ID"
          value="147123"
        />

        <InfoRow
          label="Status"
          value="Active"
        />
      </View>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="View Student Details"
          onPress={openStudentDetails}
        />
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

  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.maroon,
    borderRadius: DESIGN.radiusLarge,
    padding: DESIGN.spacingLG,
    marginBottom: DESIGN.spacingXL,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: DESIGN.spacingMD,
  },

  avatarText: {
    color: COLORS.maroon,
    fontSize: TYPOGRAPHY.heading,
    fontWeight: '800',
  },

  headerText: {
    flex: 1,
  },

  name: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.subheading,
    fontWeight: '800',
    marginBottom: 5,
  },

  program: {
    color: COLORS.white,
    opacity: 0.9,
    fontSize: TYPOGRAPHY.caption,
    lineHeight: 18,
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: DESIGN.radiusMedium,
    paddingHorizontal: DESIGN.spacingMD,
    paddingVertical: DESIGN.spacingSM,
    borderWidth: DESIGN.borderWidth,
    borderColor: COLORS.border,
    ...SHADOW,
  },

  buttonContainer: {
    marginTop: DESIGN.spacingLG,
  },
});
