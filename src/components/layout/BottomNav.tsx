import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Tasks: undefined;
  Payments: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export const BottomNav = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 16) }]}>
      <TouchableOpacity 
        style={styles.tab}
        onPress={() => navigation.navigate('Home')}
      >
        <Ionicons 
          name="home" 
          size={24} 
          color={route.name === 'Home' ? '#007AFF' : '#666'} 
        />
        <Text style={[styles.label, route.name === 'Home' && styles.activeLabel]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.tab}
        onPress={() => navigation.navigate('Tasks')}
      >
        <Ionicons 
          name="list" 
          size={24} 
          color={route.name === 'Tasks' ? '#007AFF' : '#666'} 
        />
        <Text style={[styles.label, route.name === 'Tasks' && styles.activeLabel]}>
          Tasks
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.tab}
        onPress={() => navigation.navigate('Payments')}
      >
        <Ionicons 
          name="cash" 
          size={24} 
          color={route.name === 'Payments' ? '#007AFF' : '#666'} 
        />
        <Text style={[styles.label, route.name === 'Payments' && styles.activeLabel]}>
          Payments
        </Text>
      </TouchableOpacity>      
      <TouchableOpacity 
        style={styles.tab}
        onPress={() => navigation.navigate('Notifications')}
      >
        <Ionicons 
          name="notifications" 
          size={24} 
          color={route.name === 'Notifications' ? '#007AFF' : '#666'} 
        />
        <Text style={[styles.label, route.name === 'Notifications' && styles.activeLabel]}>
          Notifications
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.tab}
        onPress={() => navigation.navigate('Profile')}
      >
        <Ionicons 
          name="person" 
          size={24} 
          color={route.name === 'Profile' ? '#007AFF' : '#666'} 
        />
        <Text style={[styles.label, route.name === 'Profile' && styles.activeLabel]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  activeLabel: {
    color: '#007AFF',
    fontWeight: '500',
  },
});