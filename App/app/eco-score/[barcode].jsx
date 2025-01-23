import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons"; // For icons

const getEcoScoreColor = (grade) => {
  switch (grade) {
    case "A":
      return "#4CAF50"; // Green
    case "B":
      return "#8BC34A"; // Light Green
    case "C":
      return "#FFEB3B"; // Yellow
    case "D":
      return "#FF9800"; // Orange
    case "E":
      return "#F44336"; // Red
    default:
      return "#ddd"; // Gray for not applicable
  }
};

const EcoScore = () => {
  const [productInfo, setProductInfo] = useState(null);
  const { barcode } = useLocalSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://world.openfoodfacts.org/api/v2/product/${barcode}`
        );
        const data = await res.json();
        setProductInfo(data.product);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [barcode]);

  return (
    <LinearGradient
      colors={["#4CAF50", "#8BC34A", "#f5f5f5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <ScrollView>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>🌿 Scan Results 🌿</Text>
          <Image
            style={styles.productImage}
            source={{ uri: productInfo?.image_url }}
          />
          <Text style={styles.productName}>
            {productInfo?.product_name || "Unknown Product"}
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.alternateButton}
            onPress={() => router.push(`/alternateproduct/${barcode}`)}
          >
            <Ionicons name="refresh-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Find Alternatives</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addToCartButton}>
            <Ionicons name="cart-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>

        {/* Details */}
        <View style={styles.card}>
          <Text style={styles.label}>
            <Ionicons name="barcode-outline" size={18} color="#4CAF50" /> Barcode:
          </Text>
          <Text style={styles.value}>{barcode || "Not Available"}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            <Ionicons name="pricetag-outline" size={18} color="#4CAF50" /> Brand:
          </Text>
          <Text style={styles.value}>
            {productInfo?.brands || "Not Available"}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            <Ionicons name="leaf-outline" size={18} color="#4CAF50" /> Eco-Score Grade:
          </Text>
          <Text
            style={[
              styles.grade,
              { backgroundColor: getEcoScoreColor(productInfo?.ecoscore_grade?.toUpperCase() || "C") },
            ]}
          >
            {productInfo?.ecoscore_grade?.toUpperCase() || "C"}
          </Text>

          <Text style={styles.title}>
            <Ionicons name="information-circle-outline" size={20} color="#333" /> Eco-Score Details: 
            {productInfo?.ecoscore_score || "30"}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            <Ionicons name="cube-outline" size={18} color="#4CAF50" /> Packaging:
          </Text>
          <Text style={styles.value}>
            {productInfo?.packaging?.split(",").join(", ")  || "Not Available"}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            <Ionicons name="restaurant-outline" size={18} color="#4CAF50" /> Nutrition Grade:
          </Text>
          <Text style={styles.value}>
            {productInfo?.nutriscore_grade?.toUpperCase() || "Not Available"}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            <Ionicons name="globe-outline" size={18} color="#4CAF50" /> Sold In:
          </Text>
          <Text style={styles.value}>
            {productInfo?.countries?.split(",").join(", ") || "Not Available"}
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  titleText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 15,
    marginBottom: 10,
    resizeMode: "contain",
    borderWidth: 2,
    borderColor: "#fff",
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
  },
  grade: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    paddingVertical: 5,
    textAlign: "center",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  alternateButton: {
    flexDirection: "row",
    backgroundColor: "#FF9800",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginRight: 10,
    elevation: 3,
  },
  addToCartButton: {
    flexDirection: "row",
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginLeft: 10,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default EcoScore;
