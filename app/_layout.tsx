import { Stack } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React from "react";
import { PlayerProvider } from "./contexts/playerContext";

export default function RootLayout() {
  return (
    <PlayerProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ title: "Nuesis" }} />
      </Stack>
      <StatusBar style="auto" />
    </PlayerProvider>
  );
}
