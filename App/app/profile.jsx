import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider"; // Assuming you're using a global context to manage user state
import { useRouter } from "expo-router"; // Importing useRouter for navigation
import { LinearGradient } from "expo-linear-gradient"; // Adding gradient background for a fresh look

const ProfilePage = () => {
  // Assuming user data is stored in global context
  // const { user, setUser } = useGlobalContext();
  const setUser = null;
  const user={"_id": "679280408a9bd09d9a1c1952", "profilePic": "https://avatar.iran.liara.run/public/boy?username=Ashishq", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzkyODA0MDhhOWJkMDlkOWExYzE5NTIiLCJpYXQiOjE3Mzc2NTY2NzIsImV4cCI6MTczODk1MjY3Mn0.WGZx68-MMCzYpKEwnufWMVF3HKofuiqgIfeOAg7w8vQ", "username": "Ashishq"}

  const router = useRouter();

  const handleLogout = () => {
    setUser(null); // Clear the user data from context
    router.replace("/sign-in"); // Redirect to sign-in page after logout
  };

  return (
    <LinearGradient
      colors={["#6DBE45", "#A4D68C", "#A3C5B9"]} // Earthy green gradient for background
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileCard}>
          {/* Profile Image */}
          <Image source={{ uri: user?.profilePic }} style={styles.profilePic} />

          {/* Username */}
          <Text style={styles.username}>{user?.username}</Text>

          {/* Bio (can be added here) */}
          <Text style={styles.bio}>Eco-conscious traveler 🌍🌱</Text>

          {/* Profile Actions */}
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40, // Add padding on top for a smooth scroll experience
    paddingBottom: 20,
  },
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  profileCard: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly transparent white for the card
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6, // Adds shadow on Android
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60, // Circular profile picture
    marginBottom: 15,
    borderWidth: 4,
    borderColor: "#6DBE45", // Green border to match the theme
  },
  username: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50", // Green text for the username
    marginBottom: 10,
    textShadowColor: "#888",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  bio: {
    fontSize: 16,
    color: "#333",
    fontStyle: "italic",
    marginBottom: 15,
    textAlign: "center",
    maxWidth: 280, // Limit text width for readability
  },
  token: {
    fontSize: 12,
    color: "#888",
    marginBottom: 25,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4CAF50", // Earthy green button color
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 20,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6, // Android shadow
    transform: [{ scale: 1 }],
    transition: "transform 0.2s ease-in-out",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default ProfilePage;
