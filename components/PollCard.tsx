import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Poll = {
  id: string;
  title: string;
  deadline: string;
  votesCount: number;
};

export const PollCard = () => {
  const polls: Poll[] = [
    { id: '1', title: 'New Cleaning Schedule', deadline: '2025-05-08', votesCount: 3 },
    { id: '2', title: 'Movie Night Theme', deadline: '2025-05-09', votesCount: 2 },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Active Polls</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      {polls.map((poll) => (
        <TouchableOpacity key={poll.id} style={styles.pollItem}>
          <View style={styles.pollContent}>
            <Text style={styles.pollTitle}>{poll.title}</Text>
            <Text style={styles.pollMeta}>
              Ends {poll.deadline} • {poll.votesCount} votes
            </Text>
          </View>
          <TouchableOpacity style={styles.voteButton}>
            <Text style={styles.voteButtonText}>Vote</Text>
          </TouchableOpacity>
        </TouchableOpacity>
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
  pollItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  pollContent: {
    flex: 1,
  },
  pollTitle: {
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  pollMeta: {
    fontSize: 14,
    color: '#666',
  },
  voteButton: {
    backgroundColor: 'rgba(0,122,255,0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
  },
  voteButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
});