import { StyleSheet, Text, View } from 'react-native';
import BurgerMenu from './BurgerMenu';

type ActivityHeaderProps = {
  title: string;
};

export default function ActivityHeader({
  title,
}: ActivityHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>

      <BurgerMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    minHeight: 70,
    justifyContent: 'center',
  },

  title: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '700',
  },
});
