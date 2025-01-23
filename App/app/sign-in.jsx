import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useGlobalContext(); // Assuming you have a context to manage user state

  const handleSignIn = async () => {
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.status === 200) {
        // Assuming the response contains user info and token
        setUser(data); // Store user data in context
        router.push('/account'); // Navigate to profile page after successful sign in
      } else {
        alert('Invalid credentials, please try again.');
      }
    } catch (error) {
      console.error('SignIn Error:', error);
      alert('An error occurred during sign-in.');
    }
  };

  const navigateToSignUp = () => {
    router.push('/sign-up'); // Redirect to SignUp page if not registered
  };

  return (
    <ImageBackground
      source={{ uri: 'https://cdn.pixabay.com/photo/2020/03/08/15/08/icon-4912702_960_720.png' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>

        {/* Username input */}
        <TextInput
          style={styles.input}
          placeholder="Enter Username"
          value={username}
          onChangeText={setUsername}
        />

        {/* Password input */}
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Sign In Button */}
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        {/* SignUp option link */}
        <View style={styles.signUpLinkContainer}>
          <Text style={styles.signUpText}>Don't have an account?</Text>
          <TouchableOpacity onPress={navigateToSignUp}>
            <Text style={styles.signUpButton}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    resizeMode: 'cover',
  },
  container: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Added semi-transparent overlay for better text visibility
    padding: 30,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  input: {
    height: 50,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#FFEB3B', // Yellow button color
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 20,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6, // Android shadow
    transform: [{ scale: 1 }],
    transition: 'transform 0.2s ease-in-out',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  signUpLinkContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signUpText: {
    fontSize: 16,
    color: '#333',
  },
  signUpButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50', // Green color for sign-up link
    marginLeft: 5,
  },
});

export default SignInPage;
