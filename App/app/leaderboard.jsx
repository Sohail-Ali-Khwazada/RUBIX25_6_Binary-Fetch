import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Dummy data for the leaderboard
const DUMMY_LEADERBOARD = [
  {
    username: "GreenGuardian",
    points: 4500,
    profile_pic: "https://i.pravatar.cc/100?img=1",
  },
  {
    username: "EcoWarrior123",
    points: 4000,
    profile_pic: "https://i.pravatar.cc/100?img=2",
  },
  {
    username: "NatureLover",
    points: 3800,
    profile_pic: "https://i.pravatar.cc/100?img=3",
  },
  {
    username: "PlanetSaver",
    points: 3500,
    profile_pic: "https://i.pravatar.cc/100?img=4",
  },
  {
    username: "SustainabilityStar",
    points: 3000,
    profile_pic: "https://i.pravatar.cc/100?img=5",
  },
];



const Leaderboard = () => {

  const[users, setUsers] = useState([]);

useEffect(() => {
  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/user/getLeaderboard`);
      const data = await response.json();
      console.log('Leaderboard data:', data);
      setUsers(data);
    } catch (error) {
      console.log("Error fetching leaderboard data", error);
    }
  }
  fetchLeaderboard();
}, []);

  const renderItem = ({ item, index }) => {
    return (
      <LinearGradient
        colors={["#A8D5BA", "#4CAF50", "#567D63"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.card,
          index === 0 ? styles.firstPlace : index === 1 ? styles.secondPlace : {},
        ]}
      >
        <View style={styles.profileContainer}>
          <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.username}>{`${index + 1}. ${item.username}`}</Text>
          <Text style={styles.points}>{`Points: ${item.GreenPoints}`}</Text>
        </View>
      </LinearGradient>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌟 Leaderboard 🌟</Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0FFF0",
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4CAF50",
    marginBottom: 20,
    textShadowColor: "#7CAF82",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#A8D5BA",
    borderRadius: 20,
    marginBottom: 15,
    padding: 15,
    elevation: 5,
    shadowColor: "#567D63",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  firstPlace: {
    borderWidth: 2,
    borderColor: "#FFD700",
    backgroundColor: "#FFF8DC", // Gold for first place
  },
  secondPlace: {
    borderWidth: 2,
    borderColor: "#C0C0C0", // Silver for second place
  },
  profileContainer: {
    marginRight: 15,
  },
  profilePic: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#FFF",
    backgroundColor: "#E7F5E7",
  },
  detailsContainer: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3C6E47",
    marginBottom: 5,
  },
  points: {
    fontSize: 16,
    color: "#567D63",
  },
});

export default Leaderboard;
