import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Animated, TouchableOpacity } from "react-native";

const achievements = [
  {
    id: 1,
    title: 'Green Guardian 🌱',
    description: 'Log eco-friendly products with low CO2 emissions.',
    point:50,
    img_name: 'green-guardian.png'
  },
  {
    id: 2,
    title: 'Plastic-Free Hero ♻️',
    description: 'Purchase products with recyclable or minimal plastic packaging.',
    point:100
  },
  {
    id: 3,
    title: 'Sugar Buster 🍬❌',
    description: 'Buy products with low sugar content.',
    point:10,
    img_name: 'sugar-buster.jpg'
  },
  {
    id: 4,
    title: 'Health Guru 🥗',
    description: 'Select products with a better Nutri-Score (above E).',
    point:200
  },
  {
    id: 5,
    title: 'Water Saver 💧',
    description: 'Log purchases of water-efficient products.',
    point:250,
  },

  {
    id: 6,
    title: 'Organic Advocate 🌾',
    description: 'Support organic products and farmers.',
    point:10,
    img_name: 'green-guardian.jpg'
  }
];

const Achievements = () => {
  const [currentGreenPoints, setCurrentGreenPoints] = useState();
  const { user,flagAchievements, setFlagAchievements } = useGlobalContext();
  

  useEffect(()=> {
    const fetchPoints = async () => {
      try {
        const res = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/user/getPoints`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json", 
            Authorization: `Bearer ${user.token}`, 
          },
        });
        const data = await res.json();
        setCurrentGreenPoints(data.GreenPoints);
       
      } catch (e) {
        console.error(e);
      }
    };
    fetchPoints();
  },[flagAchievements]);

  const handlePost = (item) =>{
    console.log('Post');
    router.push({
      pathname: '/rewards/[badge]',
      params: { badge: JSON.stringify(item) }
    });
    // router.push(`/rewards/${item}`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sustainability Achievements</Text>

      <FlatList
        data={achievements}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>
                {item.title} <Text style={styles.cardSubtitle}>{`(${item.point} Green Score)`}</Text>
              </Text>
              <TouchableOpacity style={styles.badgeContainer} onPress={()=>handlePost(item)}
                disabled={Math.round((currentGreenPoints/item.point) * 100) < 100}
              >
                {Math.round((currentGreenPoints/item.point) * 100) >= 100 ? <Text style={styles.unlocked}>✅</Text> : <Text style={styles.locked}>🔒</Text>}
              </TouchableOpacity>
            </View>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.progressBarContainer}>
              <Animated.View
                style={[styles.progressBar, { width: `${(currentGreenPoints/item.point) * 100}%` }]}
              />
              <View style={styles.progressTextContainer}>
                <Text style={styles.progressText}>{Math.round((currentGreenPoints/item.point) * 100) >= 100 ? 100 : Math.round((currentGreenPoints/item.point) * 100)}%</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4caf50",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4caf50",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#aaa",
  },
  badgeContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#444",
    justifyContent: "center",
    alignItems: "center",
  },
  unlocked: {
    fontSize: 18,
    color: "#4caf50",
  },
  locked: {
    fontSize: 18,
    color: "#aaa",
  },
  description: {
    fontSize: 14,
    color: "#bbb",
    marginTop: 10,
  },
  progressBarContainer: {
    height: 20,
    backgroundColor: "#555",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 15,
    position: "relative",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4caf50",
  },
  progressTextContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  progressText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default Achievements;
