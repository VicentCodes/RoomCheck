import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
  Dimensions,
} from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

type Task = {
  id: string;
  title: string;
  assignee: string;
  urgency: 'low' | 'medium' | 'high';
  completed: boolean;
  dueDate: string;
  description: string;
};

const URGENCY_COLORS = {
  low: '#4CAF50',
  medium: '#FF9800',
  high: '#F44336',
};

export default function TasksScreen() {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<'all' | 'mine' | 'pending'>('all');
  const [sortOption, setSortOption] = useState<'urgencyHigh' | 'urgencyLow' | 'recent' | 'oldest' | 'completed' | 'incomplete'>('recent');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Clean kitchen',
      assignee: 'You',
      urgency: 'high',
      completed: false,
      dueDate: '2025-05-07',
      description: 'Deep clean all surfaces and organize cabinets',
    },
    {
      id: '2',
      title: 'Take out trash',
      assignee: 'Alex',
      urgency: 'medium',
      completed: true,
      dueDate: '2025-05-06',
      description: 'Empty all bins and replace bags',
    },
    {
      id: '3',
      title: 'Buy groceries',
      assignee: 'Sarah',
      urgency: 'low',
      completed: false,
      dueDate: '2025-05-08',
      description: 'Get items from the shared shopping list',
    },
    {
      id: '4',
      title: 'Fix bathroom light',
      assignee: 'You',
      urgency: 'medium',
      completed: false,
      dueDate: '2025-05-07',
      description: 'Replace broken bulb in main bathroom',
    },
  ]);

  const toggleCompletion = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  function urgencyRank(urgency: 'low' | 'medium' | 'high') {
    return { low: 1, medium: 2, high: 3 }[urgency];
  }

  const filteredTasks = tasks
    .filter((task) => {
     if (filter === 'mine') return task.assignee === 'You' && !task.completed;
if (filter === 'pending') return !task.completed;
return true; 
    })
 .sort((a, b) => {
    switch (sortOption) {
      case 'urgencyHigh':
        return urgencyRank(b.urgency) - urgencyRank(a.urgency);
      case 'urgencyLow':
        return urgencyRank(a.urgency) - urgencyRank(b.urgency);
      case 'recent':
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      case 'oldest':
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case 'completed':
        return Number(b.completed) - Number(a.completed);
      case 'incomplete':
        return Number(a.completed) - Number(b.completed);
      default:
        return 0;
    }
  });
  const renderTask = ({ item: task }: { item: Task }) => (
    <TouchableOpacity style={styles.taskItem} onPress={() => toggleCompletion(task.id)}>
      <View style={styles.taskHeader}>
        <View style={styles.taskLeft}>
          <View style={[styles.checkbox, task.completed && styles.checkboxChecked]}>
            {task.completed && <Ionicons name="checkmark" size={16} color="#fff" />}
          </View>
          <View>
            <Text style={[styles.taskTitle, task.completed && styles.taskTitleCompleted]}>
              {task.title}
            </Text>
            <Text style={styles.taskMeta}>
              {task.assignee} • Due {task.dueDate}
            </Text>
          </View>
        </View>
        <View style={[styles.urgencyDot, { backgroundColor: URGENCY_COLORS[task.urgency] }]} />
      </View>
      <Text style={styles.description}>{task.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <TouchableOpacity style={styles.iconButton} onPress={() => setShowFilterModal(true)}>
            <Ionicons name="filter" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filters}>
        {(['all', 'mine', 'pending'] as const).map((key) => (
          <TouchableOpacity
            key={key}
            style={[styles.filterButton, filter === key && styles.filterActive]}
            onPress={() => setFilter(key)}
          >
            <Text style={[styles.filterText, filter === key && styles.filterTextActive]}>
              {key === 'all' ? 'All Tasks' : key === 'mine' ? 'My Tasks' : 'Pending'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredTasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="checkmark-done-circle-outline" size={80} color="#ccc" />
          <Text style={styles.emptyText}>No tasks match this filter</Text>
        </View>
      ) : (
        <FlatList
          data={filteredTasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Modal visible={showFilterModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.pickerContainer}>
            <Text style={styles.modalTitle}>Sort Tasks By</Text>
            <Picker
              selectedValue={sortOption}
              onValueChange={(itemValue) => setSortOption(itemValue)}
              itemStyle={{ color: '#000' }}
            >
              <Picker.Item label="Urgency (High → Low)" value="urgencyHigh" />
              <Picker.Item label="Urgency (Low → High)" value="urgencyLow" />
              <Picker.Item label="Due Date (Newest First)" value="recent" />
              <Picker.Item label="Due Date (Oldest First)" value="oldest" />
              <Picker.Item label="Completed First" value="completed" />
              <Picker.Item label="Incomplete First" value="incomplete" />
            </Picker>

            <TouchableOpacity
              onPress={() => {
                setFilter('all');
                setSortOption('recent');
                setShowFilterModal(false);
              }}
              style={styles.resetButton}
            >
              <Text style={styles.resetText}>Reset Filters</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowFilterModal(false)} style={styles.modalCloseIcon}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  title: { fontSize: 24, fontWeight: '600', color: '#1a1a1a' },
  iconButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filters: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  filterActive: {
    backgroundColor: '#007AFF',
  },
  filterText: { color: '#666', fontWeight: '500' },
  filterTextActive: { color: '#fff' },
  list: { paddingHorizontal: 16, paddingBottom: 32 },
  taskItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: '#007AFF' },
  taskTitle: { fontSize: 16, color: '#1a1a1a', marginBottom: 4 },
  taskTitleCompleted: { textDecorationLine: 'line-through', color: '#999' },
  taskMeta: { fontSize: 14, color: '#666' },
  description: { fontSize: 14, color: '#666', marginLeft: 36 },
  urgencyDot: { width: 8, height: 8, borderRadius: 4 },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 12,
  },
  emptyText: { fontSize: 16, color: '#aaa' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 10,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: width * 0.8,
    padding: 16,
    elevation: 5,
    zIndex: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  resetButton: { marginTop: 12, alignSelf: 'center' },
  resetText: { color: '#007AFF', fontWeight: '600' },
  modalCloseIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
});
