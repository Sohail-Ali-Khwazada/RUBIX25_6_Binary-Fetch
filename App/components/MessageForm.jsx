import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const MessageForm = ({ onAddMessage }) => {
  const [text, setText] = useState('');
  const [name, setName] = useState(''); // The name will be the username

  const handleSubmit = async () => {
    if (!text.trim() || !name.trim()) {
      Alert.alert('Missing Fields', 'Please provide both a name and a message.');
      return;
    }

    const messageData = {
      username: name, // Using name as username
      text,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await axios.post(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/community/add-message`, messageData);
      setText(''); // Clear message text
      setName(''); // Clear name
      onAddMessage(response.data); // Assuming the API returns the created message
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Your name"
        placeholderTextColor="#808080" 
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        placeholderTextColor="#808080"
        value={text}
        onChangeText={setText}
        multiline
      />
      <Button title="Post" onPress={handleSubmit} color="#38a169" />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
    backgroundColor: '#2d3748',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    height: 40,
    backgroundColor: '#1a202c',
    placeholderText: 'white',
    color: 'white',
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 4,
  },
});

export default MessageForm;
