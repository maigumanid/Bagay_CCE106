import { ThemedText } from '@/components/themed-text';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, TextInput, View, } from 'react-native';
const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [fullName, setFullName] = useState('');
  const [program, setProgram] = useState('');
  const [bio, setBio] = useState('');
  const [contact, setContact] = useState('');

  const [message, setMessage] = useState('');

  const save = () => {
    if (
      !fullName.trim() ||
      !program.trim() ||
      !bio.trim() ||
      !contact.trim()
    ) {
      setMessage('Please complete all required fields before saving.');
      return;
    }

    setMessage('Profile updated successfully!');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >

        {/* DISPLAY VIEWWW*/}
        <View style={styles.card}>
          <ThemedText style={styles.sectionTitle}>
            Profile Information
          </ThemedText>

          {/* PICTURE, NAME, PROGRAM*/}
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

          {/*BIO UG CONTACTS*/}
          <ThemedText style={styles.label}>SHORT BIO</ThemedText>
          <ThemedText style={styles.addInfo}>{bio}</ThemedText>
          <View style={styles.infoSpacing} />
          <ThemedText style={styles.label}>CONTACT INFORMATION</ThemedText>
          <ThemedText style={styles.addInfo}>{contact}</ThemedText>
        </View>
        {/*END SA DISPLAY VIEW*/}


        {/*INPUT VIEW*/}
        <View style={styles.card}>
          <ThemedText style={styles.sectionTitle}>
            Edit Profile
          </ThemedText>

          {/*MGA INPUT FIELDS*/}
          <View style={styles.field}>
            <ThemedText style={styles.inputLabel}>
              Full Name
            </ThemedText>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
            />
          </View>
          <View style={styles.field}>
            <ThemedText style={styles.inputLabel}>
              Program
            </ThemedText>
            <TextInput
              value={program}
              onChangeText={setProgram}
              style={styles.input}
              autoCapitalize="characters"
            />
          </View>
          <View style={styles.field}>
            <ThemedText style={styles.inputLabel}>
              Short Bio
            </ThemedText>
            <TextInput
              value={bio}
              onChangeText={setBio}
              style={[styles.input, styles.bioInput]}
              multiline
              textAlignVertical="top"
            />
          </View>
          <View style={styles.field}>
            <ThemedText style={styles.inputLabel}>
              Contact Information
            </ThemedText>
            <TextInput
              value={contact}
              onChangeText={setContact}
              style={styles.input}
              autoCapitalize="none"
            />
          </View>

          {/*SAVE BTN*/}
          <Pressable
            onPress={save}
            style={({ pressed }) => [
              styles.saveButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <ThemedText style={styles.saveButtonText}>
              Save Changes
            </ThemedText>
          </Pressable>

          {/*FEEDBACK*/}
          {message !== '' && (
            <View
              style={[
                styles.messageBox,
                message.includes('successfully')
                  ? styles.successMessage
                  : styles.errorMessage,
              ]}
            >
              <ThemedText style={styles.messageText}>
                {message}
              </ThemedText>
            </View>
          )}
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

  scrollContent: {
    paddingHorizontal: width < 400 ? 18 : 28,
    paddingTop: 45,
    paddingBottom: 40,
    alignItems: 'center',
  },

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

  field: {
    marginBottom: 17,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E7A0AA',
    marginBottom: 7,
  },

  input: {
    minHeight: 48,
    backgroundColor: '#3B0A18',
    borderWidth: 1,
    borderColor: '#8E4A5B',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 16,
  },

  bioInput: {
    height: 60,
    paddingTop: 12,
  },

  saveButton: {
    minHeight: 50,
    backgroundColor: '#E7A0AA',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  saveButtonText: {
    color: '#3B0A18',
    fontSize: 16,
    fontWeight: '800',
  },

  buttonPressed: {
    opacity: 0.65,
    transform: [{ scale: 0.98 }],
  },

  messageBox: {
    marginTop: 15,
    padding: 12,
    borderRadius: 10,
  },

  successMessage: {
    backgroundColor: 'rgba(95, 190, 125, 0.18)',
    borderWidth: 1,
    borderColor: '#5FBE7D',
  },

  errorMessage: {
    backgroundColor: 'rgba(230, 90, 90, 0.18)',
    borderWidth: 1,
    borderColor: '#E65A5A',
  },

  messageText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});

