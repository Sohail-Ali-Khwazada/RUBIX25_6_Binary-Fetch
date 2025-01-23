import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import * as Location from "expo-location";
import { WebView } from "react-native-webview";

const RetailFinder = () => {
  const [location, setLocation] = useState(null);
  const [stores, setStores] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setLoading(false);
        return;
      }

      try {
        let myLocation = await Location.getCurrentPositionAsync({});
        setLocation(myLocation.coords);
      } catch (error) {
        setErrorMsg("Error fetching location");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      fetchNearbyStores(location.latitude, location.longitude);
    }
  }, [location]);

  const fetchNearbyStores = async (latitude, longitude) => {
    try {
      const radius = 1000;
      const query = `
        [out:json];
        node["shop"="bulk_refill"](around:${radius},${latitude},${longitude});
        node["shop"="zero_waste"](around:${radius},${latitude},${longitude});
        node["shop"="organic"](around:${radius},${latitude},${longitude});
        node["shop"="sustainable"](around:${radius},${latitude},${longitude});
        node["shop"="eco"](around:${radius},${latitude},${longitude});
        node["shop"="package_free"](around:${radius},${latitude},${longitude});
        node["shop"="packageless"](around:${radius},${latitude},${longitude});
        node["shop"="unpackaged"](around:${radius},${latitude},${longitude});
        node["shop"="refill_station"](around:${radius},${latitude},${longitude});
        node["shop"="refill"](around:${radius},${latitude},${longitude});
        

        node["shop"](around:${radius},${latitude},${longitude});
        out body;
      `;
      const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
      const response = await fetch(url);
      const data = await response.json();

      const fetchedStores = data.elements.map((store) => ({
        id: store.id,
        latitude: store.lat,
        longitude: store.lon,
        name: store.tags.name || "Unnamed Store",
        type: store.tags.shop || "Unknown",
      }));
      setStores(fetchedStores);
    } catch (error) {
      Alert.alert("Error", "Unable to fetch nearby stores. Please try again.");
    }
  };

  
  const generateMapHTML = () => {
    if (!location) return "";

    const { latitude, longitude } = location;

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
          <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
          <style>
            #map { height: 100vh; width: 100vw; }
            body { margin: 0; }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script>
            const map = L.map('map').setView([${latitude}, ${longitude}], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            var blackIcon = L.icon({
                iconUrl: 'https://cdn.pixabay.com/photo/2013/07/13/10/29/icon-157354_1280.png',
                iconSize:     [38, 50], // size of the icon
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            });

            L.marker([${latitude}, ${longitude}], {icon: blackIcon})
              .bindPopup('You are here')
              .addTo(map);

            var greenIcon = L.icon({
                iconUrl: 'https://cdn.pixabay.com/photo/2014/04/03/10/03/google-309741_1280.png',
                iconSize:     [38, 50], // size of the icon
                popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            });


            const stores = ${JSON.stringify(stores)};
            stores.forEach(store => {
              L.marker([store.latitude, store.longitude], {icon: greenIcon})
                .bindPopup('<b>' + store.name + '</b><br>' + store.type)
                .addTo(map);
            });
          </script>
        </body>
      </html>
    `;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Fetching your location...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        style={styles.map}
        source={{ html: generateMapHTML() }}
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#4CAF50",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  map: {
    flex: 1,
  },
});

export default RetailFinder;
