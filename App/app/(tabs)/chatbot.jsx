import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, SafeAreaView, Animated, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

const MistralChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = 'https://api-inference.huggingface.co/models/mistralai/Mistral-Nemo-Instruct-2407';
  const API_TOKEN = process.env.EXPO_PUBLIC_HUGGING_FACE_API_URL; // Replace with actual token

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30-second timeout

      const response = await axios.post(
        API_URL,
        { inputs: input },
        {
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      const botResponse = response.data[0]?.generated_text || 'No response generated';
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, sender: 'bot' },
      ]);
    } catch (error) {
      console.error('Detailed Error:', error);
      const errorMessage =
        error.code === 'ECONNABORTED'
          ? 'Request timed out'
          : error.response?.status === 429
          ? 'Too many requests'
          : error.response?.status === 401
          ? 'Unauthorized'
          : 'Network error occurred';

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: errorMessage, sender: 'bot' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }) => {
    const fadeAnim = new Animated.Value(0);

    // Trigger fade-in animation for messages
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    return (
      <Animated.View
        style={[
          styles.messageContainer,
          { opacity: fadeAnim },
          item.sender === 'user' ? styles.userMessage : styles.botMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#CDDC39', '#FAF3E0']} // Gradient background
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(_, index) => index.toString()}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Ask me anything..."
            placeholderTextColor="#888"
          />
          <TouchableOpacity onPress={sendMessage} disabled={isLoading}>
            <View style={[styles.sendButton, isLoading && styles.loadingButton]}>
              <Text style={styles.buttonText}>{isLoading ? 'Sending...' : 'Send'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#E8F5E9',
    fontSize: 16,
    color: '#333',
    marginRight: 15,
  },
  sendButton: {
    backgroundColor: '#388E3C', // Vibrant Green for the send button
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingButton: {
    backgroundColor: '#C8E6C9', // Lighter green when loading
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageContainer: {
    marginVertical: 8,
    marginHorizontal: 15,
    padding: 12,
    borderRadius: 20,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#D1E7DC', // Light green for user messages
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  botMessage: {
    backgroundColor: '#F1F8E9', // Light yellowish green for bot messages
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});

export default MistralChatbot;
