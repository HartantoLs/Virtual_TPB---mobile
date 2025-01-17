import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs
      // screenOptions={({ route }) => ({
      //   tabBarIcon: ({ color, size }) => {
      //     let iconName;

      //     if (route.name === "dashboard") iconName = "home";
      //     else if (route.name === "login") iconName = "log-in";
      //     else if (route.name === "register") iconName = "person-add";

      //     return <Ionicons name={iconName} size={size} color={color} />;
      //   },
      //   tabBarActiveTintColor: "#007BFF",
      //   tabBarInactiveTintColor: "gray",
      //   headerShown: false,
      // })}
      screenOptions={{
        tabBarStyle: { display: 'none' }, // Menyembunyikan tab bar
        headerShown: false, // Menyembunyikan header default
      }}
    >
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="login" />
      <Tabs.Screen name="register" />
      
      {/* <Tabs.Screen name="index" /> */}
    </Tabs>
  );
}
