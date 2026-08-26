import { Image } from 'expo-image';
import { StyleSheet, View, Dimensions } from 'react-native';
import { ThemedText } from '@/components/themed-text';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <ThemedText style={styles.name}>
          Michaela Darry G. Bagay
        </ThemedText>
      </View>

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
            that will help users track their expenses, manage their income,
            and monitor their spending habits.
          </ThemedText>

          <ThemedText type="subtitle" style={styles.smallSubtitle}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B0A18',
    position: 'relative',
    paddingHorizontal: 34,
    paddingTop: 45,
    overflow: 'hidden',
  },

  header: {
    marginTop: 20,
  },

  name: {
    fontSize: 25,
    fontWeight: '700',
  },

  heroSection: {
    flex: 1,
    flexDirection: width < 650 ? 'column' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
