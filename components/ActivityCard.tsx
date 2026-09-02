import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type ActivityCardProps = {
  number: string;
  title: string;
  description: string;
  onPress: () => void;
};

export default function ActivityCard({
  number,
  title,
  description,
  onPress,
}: ActivityCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.numberContainer}>
        <Text style={styles.number}>{number}</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description}>
          {description}
        </Text>
      </View>

      <Text style={styles.arrow}>→</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 600,
    minHeight: 95,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },

  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  numberContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E7A0AA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },

  number: {
    color: '#3B0A18',
    fontSize: 20,
    fontWeight: '800',
  },

  textContainer: {
    flex: 1,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 5,
  },

  description: {
    color: '#FFFFFF',
    opacity: 0.6,
    fontSize: 14,
  },

  arrow: {
    color: '#E7A0AA',
    fontSize: 28,
    marginLeft: 10,
  },
});
