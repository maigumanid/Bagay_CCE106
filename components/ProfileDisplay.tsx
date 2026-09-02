import { Image } from 'expo-image';
import { StyleSheet, View, Dimensions } from 'react-native';
import { ThemedText } from '@/components/themed-text';

const { width } = Dimensions.get('window');

type ProfileDisplayProps = {
  fullName: string;
  program: string;
  bio: string;
  contact: string;
};

export default function ProfileDisplay({
  fullName,
  program,
  bio,
  contact,
}: ProfileDisplayProps) {
  return (
    <View style={styles.card}>
      <ThemedText style={styles.sectionTitle}>
        Profile Information
      </ThemedText>

      <View style={styles.profileTop}>
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.profileImage}
          contentFit="cover"
        />

        <View style={styles.profileIdentity}>
          <ThemedText style={styles.name}>
            {fullName}
          </ThemedText>

          <ThemedText style={styles.program}>
            {program}
          </ThemedText>
        </View>
      </View>

      <ThemedText style={styles.label}>
        SHORT BIO
      </ThemedText>

      <ThemedText style={styles.addInfo}>
        {bio}
      </ThemedText>

      <View style={styles.infoSpacing} />

      <ThemedText style={styles.label}>
        CONTACT INFORMATION
      </ThemedText>

      <ThemedText style={styles.addInfo}>
        {contact}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 650,
    backgroundColor: '#521525',
    borderRadius: 18,
    padding: width < 400 ? 18 : 24,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 20,
  },

  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  profileImage: {
    width: 95,
    height: 95,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },

  profileIdentity: {
    flex: 1,
    marginLeft: 18,
  },

  name: {
    fontSize: width < 400 ? 20 : 23,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  program: {
    fontSize: 14,
    lineHeight: 20,
    color: '#E7A0AA',
    marginTop: 6,
  },

  label: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#E7A0AA',
    marginBottom: 7,
  },

  addInfo: {
    fontSize: 16,
    lineHeight: 24,
    color: '#F4DDE2',
  },

  infoSpacing: {
    height: 18,
  },
});
