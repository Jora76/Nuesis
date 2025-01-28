import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, useColorScheme } from 'react-native';
import { Colors } from '@/app/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
    const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            backgroundColor: Colors[colorScheme ?? 'light'].tabIconDefault,
            position: 'absolute',
            // backgroundColor: 'blue',
            borderRadius: 50,
            borderTopWidth: 0,
            width: '80%',
            marginLeft: '10%',
            marginBottom: 15,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="description"
        options={{
          title: 'Description',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="description" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="settings" color={color} />,
        }}
      />
    </Tabs>
  );
}
