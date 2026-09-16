import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import AppButton from '../../components/AppButton';
import { COLORS, TYPOGRAPHY } from '../../constants/theme';
import { profile } from '../../data/profile';

const PROFILE_KEY = '@studyflow_profile';

export default function ProfileScreen() {
  const [fullName, setFullName] = useState('');
  const [program, setProgram] = useState('');
  const [nameError, setNameError] = useState('');
  const [programError, setProgramError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem(PROFILE_KEY);

      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);

        setFullName(parsed.fullName);
        setProgram(parsed.program);

        profile.fullName = parsed.fullName;
        profile.program = parsed.program;
      } else {
        setFullName(profile.fullName);
        setProgram(profile.program);
      }
    } catch (error) {
      setFullName(profile.fullName);
      setProgram(profile.program);
    }
  };

  const saveProfile = async () => {
    setNameError('');
    setProgramError('');
    setSaved(false);

    let valid = true;

    if (!fullName.trim()) {
      setNameError('Student name is required.');
      valid = false;
    }

    if (!program.trim()) {
      setProgramError('Course is required.');
      valid = false;
    }

    if (!valid) return;

    const updatedProfile = {
      fullName: fullName.trim(),
      program: program.trim(),
    };

    try {
      await AsyncStorage.setItem(
        PROFILE_KEY,
        JSON.stringify(updatedProfile)
      );

      profile.fullName = updatedProfile.fullName;
      profile.program = updatedProfile.program;

      setFullName(updatedProfile.fullName);
      setProgram(updatedProfile.program);

      setSaved(true);

      Alert.alert('Saved', 'Profile information has been saved.');
    } catch (error) {
      Alert.alert('Error', 'Unable to save profile.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.avatarWrapper}>
        <Image
          source={require('../../assets/icon.jpg')}
          style={styles.avatar}
        />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>

        <TextInput
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);
            setNameError('');
            setSaved(false);
          }}
          placeholder="Enter your full name"
          style={[
            styles.input,
            nameError ? styles.inputError : null,
          ]}
        />

        {nameError ? (
          <Text style={styles.error}>{nameError}</Text>
        ) : null}

        <Text style={styles.label}>Course</Text>

        <TextInput
          value={program}
          onChangeText={(text) => {
            setProgram(text);
            setProgramError('');
            setSaved(false);
          }}
          placeholder="Enter your course"
          style={[
            styles.input,
            programError ? styles.inputError : null,
          ]}
        />

        {programError ? (
          <Text style={styles.error}>{programError}</Text>
        ) : null}

        <AppButton
          title="Save Profile"
          icon="save-outline"
          onPress={saveProfile}
        />

        {saved && (
          <View style={styles.successBox}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={COLORS.success}
            />
            <Text style={styles.successText}>
              Profile saved successfully.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },

  title: {
    ...TYPOGRAPHY.title,
    color: COLORS.text,
    marginBottom: 20,
  },

  avatarWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  form: {
    gap: 8,
  },

  label: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
    marginTop: 8,
  },

  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 16,
    color: COLORS.text,
  },

  inputError: {
    borderColor: COLORS.danger,
  },

  error: {
    color: COLORS.danger,
    fontSize: 13,
    marginBottom: 4,
  },

  successBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 10,
  },

  successText: {
    color: COLORS.success,
    fontSize: 14,
    fontWeight: '600',
  },
});