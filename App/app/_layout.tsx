import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import GlobalProvider from "@/context/GlobalProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GlobalProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#4caf50", // Slightly darker green
            },
            headerTintColor: "#fff", // White text for contrast
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 18,
            },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="scanner" options={{ headerShown: true }} />
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="sign-up" options={{ headerShown: false }} />  
          <Stack.Screen name="achievement" options={{ headerShown: false }} />  
          <Stack.Screen name="leaderboard" options={{ headerShown: false }} />  
          <Stack.Screen name="rewards/[badge]" options={{ headerShown: false }} />  
          <Stack.Screen
            name="eco-score/[barcode]"
            options={{
              headerShown: true,
              title: "Product Details",
            }}
          />
          <Stack.Screen
            name="alternateproduct/[barcode]"
            options={{
              headerShown: false,
              title: "Alternate Products",
            }}
          />
          <Stack.Screen name="profile" options={{ title: "Profile" }} />
          <Stack.Screen name="+not-found" options={{ title: "Oops!" }} />
        </Stack>
      </ThemeProvider>
    </GlobalProvider>
  );
}
