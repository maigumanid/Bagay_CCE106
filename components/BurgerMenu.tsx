import { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';

export default function BurgerMenu() {
  const [menuVisible, setMenuVisible] = useState(false);

  const navigateTo = (screen: string) => {
    setMenuVisible(false);
    router.push(screen as any);
  };

  return (
    <>
      {/* Burger Button */}
      <Pressable
        style={styles.burgerButton}
        onPress={() => setMenuVisible(true)}
      >
        <Text style={styles.burgerIcon}>☰</Text>
      </Pressable>

      {/* Menu */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.menu}>

            {/* Menu Header */}
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>ACTIVITIES</Text>

              <Pressable
                onPress={() => setMenuVisible(false)}
              >
                <Text style={styles.closeButton}>×</Text>
              </Pressable>
            </View>

            <Pressable
              style={styles.menuItem}
              onPress={() => navigateTo('/')}
            >
              <Text style={styles.menuIcon}>⌂</Text>
              <Text style={styles.menuText}>Home</Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => navigateTo('/activity1')}
            >
              <Text style={styles.menuIcon}>①</Text>
              <Text style={styles.menuText}>Activity 1</Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => navigateTo('/activity2')}
            >
              <Text style={styles.menuIcon}>②</Text>
              <Text style={styles.menuText}>Activity 2</Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => navigateTo('/activity3')}
            >
              <Text style={styles.menuIcon}>③</Text>
              <Text style={styles.menuText}>Activity 3</Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => navigateTo('/activity4')}
            >
              <Text style={styles.menuIcon}>④</Text>
              <Text style={styles.menuText}>Activity 4</Text>
            </Pressable>

          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  burgerButton: {
    position: 'absolute',
    top: 45,
    right: 25,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E7A0AA',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },

  burgerIcon: {
    fontSize: 25,
    color: '#3B0A18',
    fontWeight: '700',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },

  menu: {
    width: 280,
    height: '100%',
    backgroundColor: '#3B0A18',
    paddingTop: 55,
    paddingHorizontal: 20,
  },

  menuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.15)',
  },

  menuTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },

  closeButton: {
    color: '#E7A0AA',
    fontSize: 35,
    lineHeight: 35,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 10,
  },

  menuIcon: {
    color: '#E7A0AA',
    fontSize: 23,
    width: 40,
  },

  menuText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
