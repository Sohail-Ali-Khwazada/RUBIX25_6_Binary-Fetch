import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';
import { Picker } from '@react-native-picker/picker';

const Account = () => {
  const { user } = useGlobalContext();
  const { language, setLanguage } = useGlobalContext();

  console.log('language: ' + language);
  //  const user={"_id": "679280408a9bd09d9a1c1952", "profilePic": "https://avatar.iran.liara.run/public/boy?username=Ashishq", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzkyODA0MDhhOWJkMDlkOWExYzE5NTIiLCJpYXQiOjE3Mzc2NTY2NzIsImV4cCI6MTczODk1MjY3Mn0.WGZx68-MMCzYpKEwnufWMVF3HKofuiqgIfeOAg7w8vQ", "username": "Ashishq"}
   console.log('User:', user);
  // const [selectedLanguage, setSelectedLanguage] = useState('en'); // State to store selected language

  console.log('User:', user);

  const navigateToLogin = () => {
    router.push('/sign-up'); // Navigate to sign-up page if no user
  };

  const navigateToProfile = () => {
    if (user) {
      router.push('/profile'); // Navigate to profile if user is logged in
    }
  };

  const navigateToLeaderBoard = () => {
    router.push('/leaderboard'); // Navigate to profile if user is logged in
  }

  const [selectLanguageText, setSelectedLanguageText] = useState('');
  const [accountText, setAccountText] = useState('');
  useEffect(()=>{
    const account = language === 'en' ? setAccountText('Account') : setAccountText('खाता');
    const text = language === 'en' ? setSelectedLanguageText('Select Language') : setSelectedLanguageText('भाषा चुनें');
  }, [language])

  return (
    <ImageBackground
      source={{ uri: 'https://cdn.pixabay.com/photo/2020/03/08/15/08/icon-4912702_960_720.png' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{accountText}</Text>

        {/* Language Picker */}
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>{selectLanguageText}</Text>
          <Picker
            selectedValue={language}
            onValueChange={(itemValue) => setLanguage(itemValue)} // Update selected language
            style={styles.picker}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Hindi" value="hi" />
          </Picker>
        </View>

        {/* Register / Login button */}
        <TouchableOpacity
          style={styles.button}
          onPress={navigateToLogin}
          disabled={user !== null} // Disable the button if user is logged in
        >
          <Text style={styles.buttonText}>
            {user === null ? 'Register / Login' : 'Already Logged In'}
          </Text>
        </TouchableOpacity>

        {/* Go to Profile button */}
        <TouchableOpacity
          style={[styles.button, styles.profileButton]}
          onPress={navigateToProfile}
          disabled={user === null} // Disable the button if user is not logged in
        >
          <Text style={styles.buttonText}>
            {user === null ? 'Please Log In' : 'Go to Profile'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.profileButton]}
          onPress={navigateToLeaderBoard}
        >
          <Text style={styles.buttonText}>
            Leaderboard
          </Text>
        </TouchableOpacity>
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
    padding: 20,
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
  pickerContainer: {
    width: '90%',
    marginBottom: 30,
  },
  pickerLabel: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  picker: {
    height: 55,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#FFEB3B', // Yellow button color
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 20,
    borderRadius: 30,
    width: '90%',
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
  profileButton: {
    backgroundColor: '#FBC02D', // A slightly different color for the second button
  },
});

export default Account;
