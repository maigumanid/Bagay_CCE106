// app/(tabs)/_layout.tsx

import { Tabs } from 'expo-router';
import { COLORS, TYPOGRAPHY } from '../../constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.maroon,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          fontWeight: '700',
        },
        tabBarActiveTintColor: COLORS.maroon,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          height: 65,
          paddingTop: 6,
          paddingBottom: 8,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          backgroundColor: COLORS.white,
        },
        tabBarLabelStyle: {
          fontSize: TYPOGRAPHY.caption,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
        }}
      />
    </Tabs>
  );
}
