import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { router } from 'expo-router';

import BurgerMenu from '@/components/BurgerMenu';
import ActivityCard from '@/components/ActivityCard';

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <BurgerMenu />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.header}>
          <Text style={styles.smallTitle}>
            MY EXPO ACTIVITIES
          </Text>

          <Text style={styles.title}>
            Activities
          </Text>

          <Text style={styles.description}>
            A collection of my React Native and Expo activities.
          </Text>
        </View>

        <View style={styles.activitySection}>

          <ActivityCard
            number="1"
            title="My First Mobile App"
            description="Personal introduction and mobile app concept"
            onPress={() => router.push('/activity1')}
          />

          <ActivityCard
            number="2"
            title="Profile Editor"
            description="Edit and display profile information"
            onPress={() => router.push('/activity2')}
          />

          <ActivityCard
            number="3"
            title="Counter App"
            description="Edit and display profile information"
            onPress={() => router.push('/activity3')}
          />

          <ActivityCard
            number="4"
            title="Simple Calculator App"
            description="Mini Project: Simple Calculator"
            onPress={() => router.push('/activity4')}
          />

        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B0A18',
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 34,
    paddingTop: 100,
    paddingBottom: 40,
  },

  header: {
    width: '100%',
    maxWidth: 650,
    marginBottom: 40,
  },

  smallTitle: {
    color: '#E7A0AA',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 8,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '800',
    marginBottom: 12,
  },

  description: {
    color: '#FFFFFF',
    opacity: 0.7,
    fontSize: 17,
    lineHeight: 25,
  },

  activitySection: {
    width: '100%',
    alignItems: 'center',
  },
});
