import React from 'react';
import { Platform } from 'react-native';

import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useThemeColor } from '../hooks/useThemeColor';

// Ce composant définit la barre de navigation de l'application.
// Il utilise le composant Tabs pour afficher les onglets de navigation.
// Chaque onglet est associé à un écran de l'application.

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: useThemeColor({}, 'tint'),
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {
            backgroundColor: useThemeColor({}, 'tabIconDefault'),
            position: 'absolute',
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
