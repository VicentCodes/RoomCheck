import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import type { BottomTabParamList } from '../layout/BottomTabNavigator'; // Ajusta la ruta

type Task = {
  id: string;
  title: string;
  assignee: string;
  urgency: 'low' | 'medium' | 'high';
  completed: boolean;
};

const URGENCY_COLORS = {
  low: '#4CAF50',
  medium: '#FF9800',
  high: '#F44336',
};

export const TaskCard = () => {
  const navigation = useNavigation<NavigationProp<BottomTabParamList>>();
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Clean kitchen', assignee: 'You', urgency: 'high', completed: false },
    { id: '2', title: 'Take out trash', assignee: 'Alex', urgency: 'medium', completed: true },
    { id: '3', title: 'Buy groceries', assignee: 'Sarah', urgency: 'low', completed: false },
  ]);

  const toggleTaskCompleted = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Today's Tasks</Text>
        <TouchableOpacity onPress={() => navigation.navigate('TasksTab')}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      {tasks.map((task) => (
        <View key={task.id} style={styles.taskItem}>
          <View style={styles.taskLeft}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                task.completed && styles.checkboxChecked
              ]}
              onPress={() => toggleTaskCompleted(task.id)}
            >
              {task.completed && (
                <Ionicons name="checkmark" size={16} color="#fff" />
              )}
            </TouchableOpacity>
            <View>
              <Text style={[
                styles.taskTitle,
                task.completed && styles.taskTitleCompleted
              ]}>
                {task.title}
              </Text>
              <Text style={styles.assignee}>{task.assignee}</Text>
            </View>
          </View>
          <View style={[styles.urgencyDot, { backgroundColor: URGENCY_COLORS[task.urgency] }]} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  seeAll: {
    fontSize: 14,
    color: '#007AFF',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
  },
  taskTitle: {
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  assignee: {
    fontSize: 14,
    color: '#666',
  },
  urgencyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
