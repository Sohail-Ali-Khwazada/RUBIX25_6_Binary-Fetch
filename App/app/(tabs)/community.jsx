import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Text, RefreshControl } from 'react-native';
import MessageForm from './../../components/MessageForm';

const CommunityForum = () => {
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing
  const flatListRef = useRef(); // Reference to FlatList

  // Fetch messages from the server
  const fetchMessages = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/community/get-messages`);
      const data = await response.json();
      setMessages(data);
      console.log('Data:', data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Fetch messages on initial load
  useEffect(() => {
    fetchMessages();
  }, []);

  // Add new message to the list
  const addMessage = (newMessage) => {
    setMessages(prevMessages => [...prevMessages, newMessage]); // Add new message to the bottom of the list
  };

  // Handle pull-to-refresh action
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMessages();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Community Forum</Text>
      <FlatList
        ref={flatListRef} // Attach the ref to FlatList
        data={messages}
        inverted 
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageMeta}>- {item.username} at {new Date(item.timestamp).toLocaleTimeString()}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <MessageForm onAddMessage={addMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#38a169',
    marginBottom: 16,
  },
  messageContainer: {
    backgroundColor: '#2d3748',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  messageText: {
    color: '#e2e8f0',
    fontSize: 16,
  },
  messageMeta: {
    marginTop: 4,
    color: '#a0aec0',
    fontSize: 12,
  },
});

export default CommunityForum;
