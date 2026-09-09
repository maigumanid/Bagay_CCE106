// components/CourseCard.tsx

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  COLORS,
  DESIGN,
  SHADOW,
  TYPOGRAPHY,
} from '../constants/theme';

type CourseCardProps = {
  courseId: string;
  courseName: string;
  onPress: () => void;
};

export default function CourseCard({
  courseId,
  courseName,
  onPress,
}: CourseCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.courseCode}>
        <Text style={styles.courseCodeText}>
          {courseId}
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.courseName}>
          {courseName}
        </Text>

        <Text style={styles.action}>
          View course details
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: DESIGN.radiusMedium,
    padding: DESIGN.spacingMD,
    marginBottom: DESIGN.spacingSM,
    borderWidth: DESIGN.borderWidth,
    borderColor: COLORS.border,
    ...SHADOW,
  },

  pressed: {
    opacity: 0.75,
  },

  courseCode: {
    width: 58,
    height: 58,
    borderRadius: DESIGN.radiusMedium,
    backgroundColor: COLORS.maroonSoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: DESIGN.spacingMD,
  },

  courseCodeText: {
    color: COLORS.maroon,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: '800',
  },

  content: {
    flex: 1,
  },

  courseName: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: 21,
  },

  action: {
    marginTop: 5,
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.maroon,
    fontWeight: '600',
  },
});
