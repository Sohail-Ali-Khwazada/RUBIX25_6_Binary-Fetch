import { View, Text, StyleSheet, Image, FlatList, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons"; // For icons

// Helper function for eco-score grading colors
const getEcoScoreColor = (grade) => {
  switch (grade) {
    case "A":
      return "#4CAF50"; // Green for A
    case "B":
      return "#8BC34A"; // Light Green for B
    case "C":
      return "#FFEB3B"; // Yellow for C
    case "D":
      return "#FF9800"; // Orange for D
    case "E":
      return "#F44336"; // Red for E
    default:
      return "#ddd"; // Gray for not applicable
  }
};

const EcoScore = () => {
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://world.openfoodfacts.org/api/v2/product/3017620425035`
        );
        const data = await res.json();
        console.log("Data", data.product);
        setProductInfo(data.product);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <LinearGradient
      colors={["#4CAF50", "#8BC34A", "#f5f5f5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.barcodeText}>🌿 Scan Results 🌿</Text>
          <Image
            style={styles.productImage}
            source={{ uri: productInfo?.image_url }}
          />
          <Text style={styles.productName}>
            {productInfo?.product_name || "Unknown Product"}
          </Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.title}>
            <Ionicons name="barcode-outline" size={20} color="#333" /> Barcode:
          </Text>
          <Text style={styles.detailText}>{productInfo?.code}</Text>

          <Text style={styles.title}>
            <Ionicons name="pricetag-outline" size={20} color="#333" /> Brand:
          </Text>
          <Text style={styles.detailText}>{productInfo?.brands || "Unknown"}</Text>

          <Text style={styles.title}>
            <Ionicons name="leaf-outline" size={20} color="#333" /> Eco-Score:
          </Text>
          <Text
            style={[
              styles.gradeText,
              { backgroundColor: getEcoScoreColor(productInfo?.ecoscore_grade.toUpperCase()) },
            ]}
          >
            {productInfo?.ecoscore_grade.toUpperCase() || "N/A"}
          </Text>

          <Text style={styles.title}>
            <Ionicons name="cube-outline" size={20} color="#333" /> Packaging:
          </Text>
          <Text style={styles.detailText}>
            {productInfo?.packaging || "No Information"}
          </Text>

          <Text style={styles.title}>
            <Ionicons name="restaurant-outline" size={20} color="#333" /> Nutrition Grade:
          </Text>
          <Text style={styles.detailText}>
            {productInfo?.nutriscore_grade?.toUpperCase() || "N/A"}
          </Text>
          
          <Text style={styles.title}>
            <Ionicons name="globe-outline" size={20} color="#333" /> Sold In:
          </Text>
          <Text style={styles.detailText}>
            {productInfo?.countries || "No Information"}
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
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  barcodeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginBottom: 15,
    resizeMode: "contain",
    borderWidth: 3,
    borderColor: "#fff",
  },
  productName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  detailsContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
    display: "flex",
    alignItems: "center",
  },
  detailText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  gradeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    paddingVertical: 5,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
  },
});

export default EcoScore;
