import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../components/Header';
import { TaskCard } from '../components/TaskCard';
import { PaymentCard } from '../components/PaymentCard';
import { PollCard } from '../components/PollCard';
import { BottomNav } from '../components/BottomNav';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TaskCard />
        <PaymentCard />
        <PollCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
  },
});