// app/(tabs)/index.tsx

import { Link } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import CourseCard from '../../components/course-card';
import PortalCard from '../../components/portal-card';
import SectionHeader from '../../components/section-header';
import {
  COLORS,
  DESIGN,
  TYPOGRAPHY,
} from '../../constants/theme';

export default function HomeScreen() {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>
          STUDENT PORTAL
        </Text>

        <Text style={styles.title}>
          Welcome back
        </Text>

        <Text style={styles.subtitle}>
          Access your student information and courses
          in one place.
        </Text>
      </View>

      <View style={styles.summaryRow}>
        <PortalCard
          title="Program"
          value="BSIT"
          subtitle="Bachelor of Science in Information Technology"
        />

        <View style={styles.cardGap} />

        <PortalCard
          title="Status"
          value="Active"
          subtitle="Current student"
        />
      </View>

      <View style={styles.section}>
        <SectionHeader
          title="My Courses"
          subtitle="Select a course to view its details"
        />

        <Link href="/course/CCE106" asChild>
          <CourseCard
            courseId="CCE106"
            courseName="Application Development and Emerging Technologies"
            onPress={() => {}}
          />
        </Link>

        <Link href="/course/IT12" asChild>
          <CourseCard
            courseId="IT12"
            courseName="Systems Integration & Architecture"
            onPress={() => {}}
          />
        </Link>

        <Link href="/course/PHYS101" asChild>
          <CourseCard
            courseId="PHYS101"
            courseName="College Physics 1"
            onPress={() => {}}
          />
        </Link>

        <Link href="/course/IT11" asChild>
          <CourseCard
            courseId="IT11"
            courseName="Networking 2"
            onPress={() => {}}
          />
        </Link>
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

  hero: {
    backgroundColor: COLORS.maroon,
    borderRadius: DESIGN.radiusLarge,
    padding: DESIGN.spacingLG,
    marginBottom: DESIGN.spacingLG,
  },

  eyebrow: {
    color: COLORS.maroonSoft,
    fontSize: TYPOGRAPHY.small,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 8,
  },

  title: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.title,
    fontWeight: '800',
    marginBottom: 8,
  },

  subtitle: {
    color: COLORS.white,
    opacity: 0.9,
    fontSize: TYPOGRAPHY.body,
    lineHeight: 22,
  },

  summaryRow: {
    flexDirection: 'row',
    marginBottom: DESIGN.spacingXL,
  },

  cardGap: {
    width: DESIGN.spacingSM,
  },

  section: {
    marginBottom: DESIGN.spacingLG,
  },
});
