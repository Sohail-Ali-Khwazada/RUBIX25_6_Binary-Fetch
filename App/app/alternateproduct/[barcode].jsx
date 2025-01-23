import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { barcode } = useLocalSearchParams();

  const [product_name, setProductname] = useState("");
  const [ecoscore, setEcoscore] = useState("");
  const [categories, setCategories] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://world.openfoodfacts.net/api/v2/product/${barcode}`);
        const data = await response.json();

        const product_name = data.product.product_name;
        const eco = data.product.ecoscore_score || 10;
        const categories = data.product.categories_old || [];

        setProductname(product_name);
        setEcoscore(eco);
        setCategories(categories);
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
      }
    };
    fetchProducts();
  }, [barcode]);

  const apiUrl = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${categories}&search_simple=1&action=process&json=1`;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const productsData = data.products || [];

        const filtered = productsData.filter(
          (product) =>
            product.ecoscore_score !== undefined &&
            product.ecoscore_score >= ecoscore
        );

        setProducts(productsData);
        setFilteredProducts(filtered);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <LinearGradient colors={["#c8f7c5", "#a8e6cf"]} style={styles.gradient}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2c6e49" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient colors={["#c8f7c5", "#a8e6cf"]} style={styles.gradient}>
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={["#c8f7c5", "#a8e6cf"]} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>🌿 Alternatives with Better Eco Scores</Text>
        <Text style={styles.subHeader}>
          Your Product: <Text style={styles.bold}>{product_name}</Text> (Eco Score: {ecoscore})
        </Text>

        <FlatList
          data={filteredProducts}
          keyExtractor={(item, index) => item.code || index.toString()}
          renderItem={({ item }) => <Product product={item} />}
          ListEmptyComponent={<Text style={styles.noDataText}>No alternatives with better Eco Scores found.</Text>}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

const Product = ({ product }) => {
  const cleanCategories = (categories) => {
    return categories.map((category) => category.replace("en:", ""));
  };

  return (
    <View style={styles.productCard}>
      {product.image_url ? (
        <Image source={{ uri: product.image_url }} style={styles.image} />
      ) : (
        <View style={styles.noImage}>
          <Text style={styles.noImageText}>No Image Available</Text>
        </View>
      )}

      <Text style={styles.productName}>
        {product.product_name_en || product.product_name_es || product.product_name || "Unknown Product"}
      </Text>

      <Text style={styles.detailText}>
        <Text style={styles.bold}>Eco Score:</Text> {product.ecoscore_score || "None"}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.bold}>Brand:</Text> {product.brands || "N/A"}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.bold}>Categories:</Text>{" "}
        {product.categories_tags ? cleanCategories(product.categories_tags).join(", ") : "N/A"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#2c6e49",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#2c6e49",
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 15,
    color: "#555",
  },
  noDataText: {
    fontSize: 16,
    textAlign: "center",
    color: "#888",
    marginTop: 20,
  },
  productCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    borderRadius: 8,
    marginBottom: 10,
  },
  noImage: {
    width: "100%",
    height: 150,
    backgroundColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 10,
  },
  noImageText: {
    color: "#777",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c6e49",
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: "#444",
    marginBottom: 4,
  },
  bold: {
    fontWeight: "bold",
    color: "#2c6e49",
  },
});

export default ProductList;
