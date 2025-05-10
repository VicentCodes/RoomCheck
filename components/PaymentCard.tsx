import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabParamList } from '../components/BottomTabNavigator'; // ajusta la ruta si es diferente
import type { NavigationProp } from '@react-navigation/native';

type Payment = {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  paidBy: string;
};

export const PaymentCard = () => {
  const payments: Payment[] = [
    { id: '1', title: 'Electricity Bill', amount: 120, dueDate: '2025-05-10', paidBy: 'Alex' },
    { id: '2', title: 'Internet Bill', amount: 80, dueDate: '2025-05-15', paidBy: 'You' },
  ];

  const navigation = useNavigation<NavigationProp<BottomTabParamList>>();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Pending Payments</Text>
        <TouchableOpacity onPress={() => navigation.navigate('PaymentsTab')}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      {payments.map((payment) => (
        <View key={payment.id} style={styles.paymentItem}>
          <View style={styles.paymentInfo}>
            <View style={styles.iconContainer}>
              <Ionicons name="receipt-outline" size={24} color="#007AFF" />
            </View>
            <View>
              <Text style={styles.paymentTitle}>{payment.title}</Text>
              <Text style={styles.paymentMeta}>
                Due {payment.dueDate} • Paid by {payment.paidBy}
              </Text>
            </View>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>${payment.amount}</Text>
            <TouchableOpacity style={styles.payButton}>
              <Text style={styles.payButtonText}>Pay Now</Text>
            </TouchableOpacity>
          </View>
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
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  payButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});
