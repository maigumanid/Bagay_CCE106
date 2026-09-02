import { Image } from 'expo-image';
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import ActivityHeader from '@/components/ActivityHeader';

const { width } = Dimensions.get('window');

export default function Activity1Screen() {
  return (
    <View style={styles.container}>

      <ActivityHeader title="Activity 1" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>

          <View style={styles.textSide}>

            <View style={styles.titleWrapper}>
              <ThemedText style={styles.heroTitle}>
                My first
              </ThemedText>

              <View style={styles.highlight}>
                <ThemedText style={styles.highlightText}>
                  mobile app
                </ThemedText>
              </View>
            </View>

            <ThemedText style={styles.description}>
              I plan to develop{' '}
              <ThemedText style={styles.inlineHighlight}>
                a budgeting app
              </ThemedText>{' '}
              that will help users track their expenses,
              manage their income, and monitor their
              spending habits.
            </ThemedText>

            <ThemedText
              type="subtitle"
              style={styles.smallSubtitle}
            >
              Ayaw sa i-judge sir (╥ ᴗ ╥)
            </ThemedText>

          </View>

          <View style={styles.pictureSection}>

            <View style={styles.imageGlow} />

            <Image
              source={require('@/assets/images/sampleImage.png')}
              style={styles.picture}
              contentFit="contain"
            />

          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B0A18',
    position: 'relative',
    paddingHorizontal: 34,
    paddingTop: 20,
    overflow: 'hidden',
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },

  heroSection: {
    flex: 1,
    flexDirection: width < 650 ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 600,
  },

  textSide: {
    flex: 1,
    maxWidth: 560,
    paddingRight: width < 650 ? 0 : 30,
    zIndex: 2,
    justifyContent: 'center',
  },

  titleWrapper: {
    marginBottom: 22,
  },

  heroTitle: {
    fontSize: 45,
    lineHeight: 60,
    fontWeight: '800',
  },

  highlight: {
    alignSelf: 'flex-start',
    backgroundColor: '#E7A0AA',
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 8,
  },

  highlightText: {
    fontSize: width < 500 ? 48 : 64,
    lineHeight: width < 500 ? 56 : 70,
    fontWeight: '800',
    color: '#3B0A18',
    letterSpacing: -2,
  },

  description: {
    fontSize: 18,
    opacity: 0.88,
  },

  inlineHighlight: {
    fontWeight: '800',
    color: '#E7A0AA',
  },

  smallSubtitle: {
    fontSize: 14,
    lineHeight: 21,
    opacity: 0.5,
    maxWidth: 330,
    marginTop: 18,
  },

  pictureSection: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  imageGlow: {
    position: 'absolute',
    width: width < 500 ? 260 : 360,
    height: width < 500 ? 260 : 360,
    borderRadius: 200,
    backgroundColor: 'rgba(231, 160, 170, 0.08)',
  },

  picture: {
    width: width < 500 ? 330 : 470,
    height: width < 500 ? 350 : 480,
    zIndex: 1,
  },
});
