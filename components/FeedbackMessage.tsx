import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';

type FeedbackMessageProps = {
  message: string;
  success: boolean;
};

export default function FeedbackMessage({
  message,
  success,
}: FeedbackMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <View
      style={[
        styles.messageBox,
        success
          ? styles.successMessage
          : styles.errorMessage,
      ]}
    >
      <ThemedText style={styles.messageText}>
        {message}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
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
