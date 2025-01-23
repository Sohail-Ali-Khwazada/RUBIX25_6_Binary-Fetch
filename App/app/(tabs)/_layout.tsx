import { Tabs } from "expo-router";
import React from "react";
import { Platform, View, StyleSheet } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
// import Feather from '@expo/vector-icons/Feather';

// Additional imports
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="retail-finder"
        options={{
          title: "Find Retailers",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="map-marker-alt" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => {
            // Adjust the color and background when focused
            const backgroundColor = focused ? "#FBC02D" : "#FFEB3B"; // Darker yellow on focus
            const iconColor = focused ? "black" : "black"; // You can also change the icon color on focus

            return (
              <View style={[styles.iconWrapper, { backgroundColor }]}>
                <MaterialIcons
                  name="qr-code-scanner"
                  size={40}
                  color={iconColor}
                />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-sharp" size={size || 28} color={color} />
          ),
        }}
      />


      {/* <Tabs.Screen
        name="accout"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => (
            // <MaterialIcons name="settings" size={28} color={color} />
            <AntDesign name="stepforward" size={28} color={color} />
          ),
        }}
      /> */}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30, // Make it round
    padding: 10, // Add some padding to make the icon appear larger
  },
});
