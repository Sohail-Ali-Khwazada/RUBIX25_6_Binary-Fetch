import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { useRouter } from "expo-router"; // Import useRouter for navigation
import RNPickerSelect from "react-native-picker-select"; // Import the picker component

import { useGlobalContext } from "@/context/GlobalProvider";


const SignUpPage = () => {
  const {setUser,loading,setLoading} = useGlobalContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      if (!username || !password || !gender) {
        alert("Please fill in all fields.");
        return;
      }
      
      console.log('Button clicked');
      setLoading(true);
      const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, gender }),
      });
      
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong!");
      }

      const data = await res.json();
      
  
      console.log(data);
      setUser(data);
      setLoading(false);
      
      router.push("/account"); // Redirect to the home page
    } catch (e) {
      console.log("Error:", e.message);
      alert(`Signup failed: ${e.message}`);
    }
  };
  

  const handleLoginRedirect = () => {
    router.push("/sign-in"); // Redirect to the login page
  };

  return (
    <LinearGradient
      colors={["#A8D5BA", "#D9E7D0", "#A3C5B9"]} // Green/earthy theme gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Logo */}
      <Image
        source={require("./../assets/images/logo-removebg-preview.png")}
        style={styles.logo}
      />

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

      {/* Gender dropdown */}
      <RNPickerSelect
        onValueChange={(value) => setGender(value)}
        items={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ]}
        style={pickerSelectStyles}
        placeholder={{
          label: "Select Gender",
          value: null,
        }}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Login option link */}
      <View style={styles.loginLinkContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={handleLoginRedirect}>
          <Text style={styles.loginButton}>Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

// Style for picker dropdown
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 50,
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  inputAndroid: {
    height: 50,
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: "#fff",
    marginLeft: 33
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 500,
    height: 200,
    marginLeft: 70,
  },
  input: {
    height: 50,
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#4CAF50", // Green button for sustainability
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  loginLinkContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50", // Green color for login link
    marginLeft: 5,
  },
});

export default SignUpPage;
