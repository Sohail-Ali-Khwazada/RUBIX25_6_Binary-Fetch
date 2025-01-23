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
import { router } from "expo-router"; // Import useRouter for navigation

const BarCodeScanner = () => {
  const [productName, setProductName] = useState(""); // State to store barcode input

  // This function handles scanning the barcode and requests camera permission
  const handleScan = async () => {
    console.log("Scanning barcode...");
    router.push("/scanner"); // Use router.push to navigate to scanner screen
  };

  // Handle manual input of barcode
  const handleManualInput = async () => {

    console.log('Product Name:', productName);

    if (productName.trim() === "") {
      alert("Please enter a Product Name");
    } else {
      alert(`Entered Product Name: ${productName}`);
      try {
        const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${productName}&search_simple=1&action=process&json=1`)
        const data = await res.json();
        console.log(data.products[0].code); 
        const barcode = data.products[0].code;

        router.push({
          pathname: "/eco-score/[barcode]",
          params: { barcode: barcode },
        });
      } catch (error) {
        console.error("Navigation error:", error);
      }
    }
  };

  return (
    <LinearGradient
      colors={["#4CAF50", "#CDDC39", "#FAF3E0"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* <Text style={styles.text}>Scan & Save the Planet!</Text> */}
      <Image
        source={require("./../../assets/images/logo-removebg-preview.png")}
        style={{ width: 450, height: 450, marginLeft: 70 }}
      />

      {/* Input for manual barcode entry */}
      <TextInput
        style={styles.input}
        placeholder="Enter Product Name"
        value={productName}
        onChangeText={setProductName}
        // keyboardType="numeric" // Ensure numeric input for barcode
      />

      {/* Button to handle manual barcode input */}
      <TouchableOpacity style={styles.button} onPress={handleManualInput}>
        <Text style={styles.buttonText}>Submit Product Name</Text>
      </TouchableOpacity>

      {/* Button to allow scanning */}
      <TouchableOpacity style={styles.button} onPress={handleScan}>
        <Text style={styles.buttonText}>Scan Barcode</Text>
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
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    height: 60,
    width: "80%",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#FFEB3B",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default BarCodeScanner;
