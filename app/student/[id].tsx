// app/student/[id].tsx

import {
  useLocalSearchParams,
  useRouter,
} from 'expo-router';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import InfoRow from '../../components/info-row';
import {
  COLORS,
  DESIGN,
  SHADOW,
  TYPOGRAPHY,
} from '../../constants/theme';

const validStudents = ['147123'];

const studentInfo: Record<
  string,
  {
    name: string;
    studentID: string;
    program: string;
    address: string;
    contact: string;
  }
> = {
  147123: {
    name: 'Michaela Darry G. Bagay',
    studentID: '147123',
    program: 'BSIT',
    address: 'Tulalian, Santo Tomas, Davao del Norte',
    contact: '0951 692 1111',
  },
};

export default function StudentDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const isValidStudent =
    typeof id === 'string' &&
    validStudents.includes(id);

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  if (!isValidStudent) {
    return (
      <View style={styles.centerContainer}>
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>
            Student Not Found
          </Text>

          <Text style={styles.errorText}>
            The student ID {id} is not valid.
          </Text>

          <Pressable
            style={styles.button}
            onPress={handleGoBack}
          >
            <Text style={styles.buttonText}>
              Go Back
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const student = studentInfo[id];

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.studentHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>MB</Text>
          </View>

          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>
              STUDENT INFORMATION
            </Text>

            <Text style={styles.title}>
              Michaela Darry G. Bagay
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <InfoRow
            label="Student ID"
            value={id}
          />

          <InfoRow
            label="Student Name"
            value={student.name}
          />

          <InfoRow
            label="Program"
            value={student.program}
          />

          <InfoRow
            label="Address"
            value={student.address}
          />

          <InfoRow
            label="Contact Number"
            value={student.contact}
          />

          <InfoRow
            label="Status"
            value="Active"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    padding: DESIGN.spacingLG,
  },

  studentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.maroon,
    borderRadius: DESIGN.radiusLarge,
    padding: DESIGN.spacingLG,
    marginBottom: DESIGN.spacingLG,
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

  eyebrow: {
    color: COLORS.maroonSoft,
    fontSize: TYPOGRAPHY.small,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 6,
  },

  title: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.subheading,
    fontWeight: '800',
    lineHeight: 23,
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

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: DESIGN.spacingLG,
  },

  errorCard: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: DESIGN.radiusLarge,
    padding: DESIGN.spacingLG,
    alignItems: 'center',
    borderWidth: DESIGN.borderWidth,
    borderColor: COLORS.border,
    ...SHADOW,
  },

  errorTitle: {
    color: COLORS.error,
    fontSize: TYPOGRAPHY.heading,
    fontWeight: '800',
    marginBottom: 10,
  },

  errorText: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.body,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: DESIGN.spacingLG,
  },

  button: {
    minHeight: 48,
    paddingHorizontal: DESIGN.spacingLG,
    borderRadius: DESIGN.radiusMedium,
    backgroundColor: COLORS.maroon,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
  },
});
