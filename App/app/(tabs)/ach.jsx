import React from "react";
import { View, Text, StyleSheet, FlatList, Animated, TouchableOpacity } from "react-native";

const Achievements = () => {
  const achievements = [
    {
      id: 1,
      title: 'Eco Explorer 🌱',
      description: 'Log eco-friendly products with low CO2 emissions.',
      progress: 100,
      badge: true, // Achievement completed
      point:100,
    },
    {
      id: 2,
      title: 'Plastic-Free Hero ♻️',
      description: 'Purchase products with recyclable or minimal plastic packaging.',
      progress: 75,
      badge: false, // Achievement not completed
      point:50,
    },
    {
      id: 3,
      title: 'Sugar Buster 🍬❌',
      description: 'Buy products with low sugar content.',
      progress: 40,
      badge: false,
      point:300,
    },
    {
      id: 4,
      title: 'Health Guru 🥗',
      description: 'Select products with a better Nutri-Score (above E).',
      progress: 90,
      badge: false,
      point:1000,
    },
    {
      id: 5,
      title: 'Sodium Smasher 🧂🚫',
      description: 'Track products with low sodium content.',
      progress: 100,
      badge: true,
      point:300,
    },
    {
      id: 6,
      title: 'Organic Advocate 🌾',
      description: 'Support organic products and farmers.',
      progress: 55,
      badge: false,
      point:100,
    },
    {
      id: 7,
      title: 'Water Saver 💧',
      description: 'Log purchases of water-efficient products.',
      progress: 85,
      badge: false,
      point:800,
    },
    {
      id: 8,
      title: 'Local Supporter 🏠',
      description: 'Buy local products and reduce your carbon footprint.',
      progress: 100,
      badge: true,
      point:2000,
    },
    {
      id: 9,
      title: 'Vegan Visionary 🌱🌍',
      description: 'Purchase vegan products for a sustainable future.',
      progress: 70,
      badge: false,
      point:600,
    },
    {
      id: 10,
      title: 'Fair Trade Fighter 🤝',
      description: 'Support products certified with fair trade practices.',
      progress: 60,
      badge: false,
      point:900,
    },
    {
      id: 11,
      title: 'Zero Waste Champion 🗑️🚫',
      description: 'Opt for zero-waste products to minimize landfill contribution.',
      progress: 100,
      badge: true,
      point:2000,
    },
    {
      id: 12,
      title: 'Energy Saver ⚡',
      description: 'Choose energy-efficient electronics and appliances.',
      progress: 30,
      badge: false,
      point:250,
    },
    {
      id: 13,
      title: 'Reusable Revolutionary ♻️',
      description: 'Switch to reusable bags, bottles, and containers.',
      progress: 95,
      badge: false,
      point:750,
    },
    {
      id: 14,
      title: 'Compost Creator 🌿',
      description: 'Compost biodegradable waste to support eco-systems.',
      progress: 100,
      badge: true,
      point:800,
    },
    {
      id: 15,
      title: 'Climate Crusader 🌎',
      description: 'Engage in activities and products that reduce greenhouse gases.',
      progress: 50,
      badge: false,
      point:1000,
    },
  ];

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
                {item.title} <Text style={styles.cardSubtitle}>{`(+${item.point} Green Score)`}</Text>
              </Text>
              <TouchableOpacity style={styles.badgeContainer}>
                {item.badge ? <Text style={styles.unlocked}>✅</Text> : <Text style={styles.locked}>🔒</Text>}
              </TouchableOpacity>
            </View>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.progressBarContainer}>
              <Animated.View
                style={[styles.progressBar, { width: `${item.progress}%` }]}
              />
              <View style={styles.progressTextContainer}>
                <Text style={styles.progressText}>{Math.round(item.progress)}%</Text>
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
