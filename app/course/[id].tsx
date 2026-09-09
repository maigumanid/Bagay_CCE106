// app/course/[id].tsx

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

const validCourses = ['CCE106', 'IT12', 'PHYS101', 'IT11'];

const courseInfo: Record<
  string,
  {
    name: string;
    units: string;
    time: string;
  }
> = {
  CCE106: {
    name: 'Application Development and Emerging Technologies',
    units: '3 Units',
    time: '8:00 AM - 10:00 AM',
  },
  IT12: {
    name: 'Systems Integration & Architecture',
    units: '3 Units',
    time: '10:00 AM - 12:00 AM',
  },
  PHYS101: {
    name: 'College Physics 1',
    units: '4 Units',
    time: '1:30 AM - 3:30 AM',
  },
  IT11: {
    name: 'Networking 2',
    units: '3 Units',
    time: '5:30 PM - 7:30 PM'
  },
};

export default function CourseDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const isValidCourse =
    typeof id === 'string' && validCourses.includes(id);

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  };

  if (!isValidCourse) {
    return (
      <View style={styles.centerContainer}>
        <View style={styles.errorCard}>
          <Text style={styles.errorTitle}>
            Course Not Found
          </Text>

          <Text style={styles.errorText}>
            The course {id} does not exist in the
            student portal.
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

  const course = courseInfo[id];

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.courseHeader}>
          <Text style={styles.eyebrow}>
            COURSE INFORMATION
          </Text>

          <Text style={styles.title}>
            {course.name}
          </Text>

          <Text style={styles.courseCode}>
            {id}
          </Text>
        </View>

        <View style={styles.card}>
          <InfoRow
            label="Course ID"
            value={id}
          />

          <InfoRow
            label="Course Name"
            value={course.name}
          />

          <InfoRow
            label="Units"
            value={course.units}
          />

          <InfoRow
            label="Class Schedule"
            value={course.time}
          />

          <InfoRow
            label="Status"
            value="Enrolled"
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

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: DESIGN.spacingLG,
  },

  courseHeader: {
    backgroundColor: COLORS.maroon,
    borderRadius: DESIGN.radiusLarge,
    padding: DESIGN.spacingLG,
    marginBottom: DESIGN.spacingLG,
  },

  eyebrow: {
    color: COLORS.maroonSoft,
    fontSize: TYPOGRAPHY.small,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 10,
  },

  title: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.title,
    fontWeight: '800',
    lineHeight: 36,
    marginBottom: 15,
  },

  courseCode: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.subheading,
    fontWeight: '700',
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
