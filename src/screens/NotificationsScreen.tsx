import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type Notification = {
  id: string;
  type: 'task' | 'payment' | 'poll' | 'general';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
};

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'task',
      title: 'New Task Assigned',
      message: 'Alex assigned you to clean the kitchen',
      timestamp: '2h ago',
      read: false,
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Reminder',
      message: 'Electricity bill payment is due tomorrow',
      timestamp: '5h ago',
      read: false,
    },
    {
      id: '3',
      type: 'poll',
      title: 'New Poll',
      message: 'Sarah created a poll for weekend activities',
      timestamp: '1d ago',
      read: true,
    },
    {
      id: '4',
      type: 'general',
      title: 'Welcome!',
      message: 'Welcome to your new home management app',
      timestamp: '2d ago',
      read: true,
    },
  ];

  const getIconName = (type: Notification['type']) => {
    switch (type) {
      case 'task':
        return 'checkbox-outline';
      case 'payment':
        return 'cash-outline';
      case 'poll':
        return 'stats-chart-outline';
      default:
        return 'notifications-outline';
    }
  };

  const getIconColor = (type: Notification['type']) => {
    switch (type) {
      case 'task':
        return '#4CAF50';
      case 'payment':
        return '#F44336';
      case 'poll':
        return '#FF9800';
      default:
        return '#007AFF';
    }
  };

  const renderNotification = ({ item: notification }: { item: Notification }) => (
    <TouchableOpacity 
      style={[
        styles.notificationItem,
        !notification.read && styles.unreadItem
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${getIconColor(notification.type)}20` }]}>
        <Ionicons 
          name={getIconName(notification.type)} 
          size={24} 
          color={getIconColor(notification.type)} 
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.timestamp}>{notification.timestamp}</Text>
        </View>
        <Text style={styles.message}>{notification.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="#1a1a1a" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  settingsButton: {
    padding: 8,
  },
  list: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  unreadItem: {
    backgroundColor: '#fff',
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  message: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});