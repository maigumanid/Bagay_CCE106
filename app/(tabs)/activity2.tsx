import { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import ActivityHeader from '@/components/ActivityHeader';
import ProfileDisplay from '@/components/ProfileDisplay';
import ProfileInput from '@/components/ProfileInput';
import SaveButton from '@/components/SaveButton';
import FeedbackMessage from '@/components/FeedbackMessage';

const { width } = Dimensions.get('window');

export default function Activity2Screen() {
  const [fullName, setFullName] = useState('');
  const [program, setProgram] = useState('');
  const [bio, setBio] = useState('');
  const [contact, setContact] = useState('');

  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const save = () => {
    if (
      !fullName.trim() ||
      !program.trim() ||
      !bio.trim() ||
      !contact.trim()
    ) {
      setMessage(
        'Please complete all required fields before saving.'
      );
      setIsSuccess(false);
      return;
    }

    setMessage('Profile updated successfully!');
    setIsSuccess(true);
  };

  return (
    <View style={styles.container}>

      <ActivityHeader title="Activity 2" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        {/* DISPLAY VIEW */}
        <ProfileDisplay
          fullName={fullName}
          program={program}
          bio={bio}
          contact={contact}
        />

        {/* INPUT VIEW */}
        <View style={styles.card}>

          <ThemedText style={styles.sectionTitle}>
            Edit Profile
          </ThemedText>

          <ProfileInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />

          <ProfileInput
            label="Program"
            value={program}
            onChangeText={setProgram}
            autoCapitalize="characters"
          />

          <ProfileInput
            label="Short Bio"
            value={bio}
            onChangeText={setBio}
            multiline
            textAlignVertical="top"
          />

          <ProfileInput
            label="Contact Information"
            value={contact}
            onChangeText={setContact}
            autoCapitalize="none"
          />

          <SaveButton onPress={save} />

          <FeedbackMessage
            message={message}
            success={isSuccess}
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
    paddingHorizontal: 28,
    paddingTop: 20,
  },

  scrollContent: {
    paddingHorizontal: width < 400 ? 0 : 0,
    paddingTop: 25,
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
});
