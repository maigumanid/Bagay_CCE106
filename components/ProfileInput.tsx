import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';

type ProfileInputProps = TextInputProps & {
  label: string;
};

export default function ProfileInput({
  label,
  ...textInputProps
}: ProfileInputProps) {
  return (
    <View style={styles.field}>
      <ThemedText style={styles.inputLabel}>
        {label}
      </ThemedText>

      <TextInput
        {...textInputProps}
        style={[
          styles.input,
          textInputProps.multiline && styles.bioInput,
          textInputProps.style,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
