import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  Alert,
  ScrollView,
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
  const [savedName, setSavedName] = useState(profile.fullName);
  const [savedProgram, setSavedProgram] = useState(profile.program);

  const [fullName, setFullName] = useState(profile.fullName);
  const [program, setProgram] = useState(profile.program);

  const [nameError, setNameError] = useState('');
  const [programError, setProgramError] = useState('');

  const loadProfile = async () => {
    try {
      const storedProfile = await AsyncStorage.getItem(PROFILE_KEY);

      if (storedProfile) {
        const parsed = JSON.parse(storedProfile);

        profile.fullName = parsed.fullName;
        profile.program = parsed.program;

        setSavedName(parsed.fullName);
        setSavedProgram(parsed.program);

        setFullName(parsed.fullName);
        setProgram(parsed.program);
      } else {
        setSavedName(profile.fullName);
        setSavedProgram(profile.program);

        setFullName(profile.fullName);
        setProgram(profile.program);
      }
    } catch {
      Alert.alert('Error', 'Unable to load profile.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const saveProfile = async () => {
    setNameError('');
    setProgramError('');

    const cleanName = fullName.trim();
    const cleanProgram = program.trim();

    let valid = true;

    if (!cleanName) {
      setNameError('Student name is required.');
      valid = false;
    }

    if (!cleanProgram) {
      setProgramError('Course / Program is required.');
      valid = false;
    }

    if (!valid) {
      return;
    }

    const updatedProfile = {
      fullName: cleanName,
      program: cleanProgram,
    };

    try {
      await AsyncStorage.setItem(
        PROFILE_KEY,
        JSON.stringify(updatedProfile)
      );

      profile.fullName = cleanName;
      profile.program = cleanProgram;

      setSavedName(cleanName);
      setSavedProgram(cleanProgram);

      setFullName(cleanName);
      setProgram(cleanProgram);

      Alert.alert(
        'Profile Saved',
        'Your profile has been updated successfully.'
      );
    } catch {
      Alert.alert(
        'Error',
        'Unable to save your profile.'
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.pageTitle}>
        My Profile
      </Text>

      <View style={styles.profileCard}>
        <View style={styles.avatarWrapper}>
          <Image
            source={require('../../assets/icon.jpg')}
            style={styles.avatar}
            contentFit="cover"
          />
        </View>

        <Text style={styles.savedName}>
          {savedName}
        </Text>

        <View style={styles.programRow}>
          <Ionicons
            name="school-outline"
            size={18}
            color={COLORS.primary}
          />

          <Text style={styles.savedProgram}>
            {savedProgram}
          </Text>
        </View>
      </View>

      <View style={styles.editSection}>
        <View style={styles.editHeader}>
          <Ionicons
            name="create-outline"
            size={22}
            color={COLORS.primary}
          />

          <Text style={styles.sectionTitle}>
            Edit Profile
          </Text>
        </View>

        <Text style={styles.label}>
          Full Name
        </Text>

        <TextInput
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);

            if (text.trim()) {
              setNameError('');
            }
          }}
          placeholder="Enter your full name"
          placeholderTextColor={COLORS.muted}
          style={[
            styles.input,
            nameError ? styles.inputError : null,
          ]}
        />

        {nameError ? (
          <View style={styles.errorRow}>
            <Ionicons
              name="alert-circle-outline"
              size={15}
              color={COLORS.danger}
            />

            <Text style={styles.error}>
              {nameError}
            </Text>
          </View>
        ) : null}

        <Text style={styles.label}>
          Course / Program
        </Text>

        <TextInput
          value={program}
          onChangeText={(text) => {
            setProgram(text);

            if (text.trim()) {
              setProgramError('');
            }
          }}
          placeholder="Enter your course or program"
          placeholderTextColor={COLORS.muted}
          style={[
            styles.input,
            programError ? styles.inputError : null,
          ]}
        />

        {programError ? (
          <View style={styles.errorRow}>
            <Ionicons
              name="alert-circle-outline"
              size={15}
              color={COLORS.danger}
            />

            <Text style={styles.error}>
              {programError}
            </Text>
          </View>
        ) : null}

        <View style={styles.saveButton}>
          <AppButton
            title="Save Changes"
            icon="save-outline"
            onPress={saveProfile}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 20,
    paddingBottom: 60,
  },

  pageTitle: {
    ...TYPOGRAPHY.title,
    color: COLORS.text,
    marginBottom: 20,
  },

  profileCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },

  avatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    overflow: 'hidden',
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  savedName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },

  programRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 7,
  },

  savedProgram: {
    ...TYPOGRAPHY.body,
    color: COLORS.muted,
  },

  editSection: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    padding: 20,
  },

  editHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 18,
  },

  sectionTitle: {
    ...TYPOGRAPHY.heading,
    color: COLORS.text,
  },

  label: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
    marginBottom: 7,
    marginTop: 8,
  },

  input: {
    backgroundColor: COLORS.background,
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

  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 5,
  },

  error: {
    color: COLORS.danger,
    fontSize: 13,
  },

  saveButton: {
    marginTop: 22,
  },
});
