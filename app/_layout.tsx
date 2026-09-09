// app/_layout.tsx

import { Stack } from 'expo-router';
import { COLORS } from '../constants/theme';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.maroon,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          fontWeight: '700',
        },
        contentStyle: {
          backgroundColor: COLORS.background,
        },
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="course/[id]"
        options={{
          title: 'Course Details',
        }}
      />

      <Stack.Screen
        name="student/[id]"
        options={{
          title: 'Student Details',
        }}
      />
    </Stack>
  );
}
