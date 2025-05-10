import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Payment = {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  paidBy: string;
  category: string;
  status: 'pending' | 'paid' | 'overdue';
};

export default function PaymentsScreen() {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid'>('all');

  const payments: Payment[] = [
    {
      id: '1',
      title: 'Electricity Bill',
      amount: 120,
      dueDate: '2025-05-10',
      paidBy: 'Alex',
      category: 'Utilities',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Internet Bill',
      amount: 80,
      dueDate: '2025-05-15',
      paidBy: 'You',
      category: 'Utilities',
      status: 'paid'
    },
    {
      id: '3',
      title: 'Groceries',
      amount: 200,
      dueDate: '2025-05-05',
      paidBy: 'Sarah',
      category: 'Food',
      status: 'overdue'
    },
    {
      id: '4',
      title: 'Netflix',
      amount: 15,
      dueDate: '2025-05-20',
      paidBy: 'You',
      category: 'Entertainment',
      status: 'pending'
    }
  ];

  const filteredPayments = payments.filter(payment => {
    if (filter === 'pending') return payment.status === 'pending' || payment.status === 'overdue';
    if (filter === 'paid') return payment.status === 'paid';
    return true;
  });

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'paid': return '#4CAF50';
      case 'overdue': return '#F44336';
      default: return '#FF9800';
    }
  };

  const renderPayment = ({ item: payment }: { item: Payment }) => (
    <TouchableOpacity style={styles.paymentItem}>
      <View style={styles.paymentHeader}>
        <View style={styles.paymentLeft}>
          <View style={styles.iconContainer}>
            <Ionicons name="receipt-outline" size={24} color="#007AFF" />
          </View>
          <View>
            <Text style={styles.paymentTitle}>{payment.title}</Text>
            <Text style={styles.paymentMeta}>
              Due {payment.dueDate} • {payment.category}
            </Text>
          </View>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>${payment.amount}</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(payment.status) }]}>
            <Text style={styles.statusText}>{payment.status}</Text>
          </View>
        </View>
      </View>
      <View style={styles.paymentFooter}>
        <Text style={styles.paidBy}>Paid by: {payment.paidBy}</Text>
        {payment.status !== 'paid' && (
          <TouchableOpacity style={styles.payButton}>
            <Text style={styles.payButtonText}>Pay Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Payments</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.filters}>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'all' && styles.filterActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'pending' && styles.filterActive]}
          onPress={() => setFilter('pending')}
        >
          <Text style={[styles.filterText, filter === 'pending' && styles.filterTextActive]}>
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, filter === 'paid' && styles.filterActive]}
          onPress={() => setFilter('paid')}
        >
          <Text style={[styles.filterText, filter === 'paid' && styles.filterTextActive]}>
            Paid
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredPayments}
        renderItem={renderPayment}
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
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  addButton: {
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
  filterText: {
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
  },
  list: {
    padding: 16,
  },
  paymentItem: {
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
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,122,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentTitle: {
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  paymentMeta: {
    fontSize: 14,
    color: '#666',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  paymentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  paidBy: {
    fontSize: 14,
    color: '#666',
  },
  payButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});