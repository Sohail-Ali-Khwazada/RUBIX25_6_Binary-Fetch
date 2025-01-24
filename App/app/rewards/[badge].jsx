import React, { useEffect } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Asset } from "expo-asset";
import * as Sharing from "expo-sharing";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

// Create an object mapping badge image names to their require paths
const BADGE_IMAGES = {
  'green-guardian.jpg': require('./../../assets/images/green-guardian.jpg'),
  'sugar-buster.jpg': require('./../../assets/images/sugar-buster.jpg'),
  // Add other badge images here
};

const ShareImage = () => {
  const [imageUri, setImageUri] = React.useState(null);

  const { badge } = useLocalSearchParams();
  const badgeObj = badge ? JSON.parse(badge) : null;

  // Use a predefined mapping for dynamic image selection
  const imageSource = badgeObj && BADGE_IMAGES[badgeObj.img_name]
    ? BADGE_IMAGES[badgeObj.img_name]
    : require('./../../assets/images/logo.png');

  useEffect(() => {
    const loadAsset = async () => {
      const asset = Asset.fromModule(imageSource);
      await asset.downloadAsync();
      setImageUri(asset.localUri || null);
    };
    loadAsset();
  }, []);

  const shareImage = async () => {
    try {
      if (imageUri) {
        await Sharing.shareAsync(imageUri);
      } else {
        console.log("Image not found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LinearGradient
      colors={["#A8D5BA", "#5F9C5A", "#4E7D49"]} // Darker green gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Image
        source={imageSource}
        style={styles.image}
      />
      <Text style={styles.title}>{badgeObj?.title || "Eco Warrior"}</Text>
      <Text style={styles.description}>
        {badgeObj?.description || "Keep up your efforts to make the planet greener and cleaner!"}
      </Text>
      <View style={styles.pointsContainer}>
        <Text style={styles.points}>{`🌿 Points: ${badgeObj?.point || 0}`}</Text>
      </View>

      <TouchableOpacity style={styles.shareButton} onPress={shareImage}>
        <Text style={styles.shareButtonText}>🌱 Share Your Badge</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderWidth: 3,
    borderColor: "#4E7D49",
    borderRadius: 25,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
    borderColor: "#E7F5E7", // Softer white border
    borderWidth: 5,
    shadowColor: "#4E7D49",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#3C6E47", // Rich green for title
    marginBottom: 10,
    textAlign: "center",
    textShadowColor: "white",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 16,
    color: "white", // Medium green for description
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  pointsContainer: {
    backgroundColor: "#7CAF82", // Darker green container
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#4E7D49",
    shadowColor: "#567D63",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  points: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF", // White text for points to stand out
    textAlign: "center",
  },
  shareButton: {
    backgroundColor: "#5F9C5A", // Deeper green button
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#3C6E47",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF", // White text for contrast
    textAlign: "center",
  },
});

export default ShareImage;
