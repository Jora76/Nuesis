import React, { useEffect } from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";

// import Player from "../components/home/player";
import Resume from "../components/description/resume";
import usePlayer from "../contexts/playerContext";
import { useThemeColor } from "../hooks/useThemeColor";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Description() {
  const { recordings, loadRecordings } = usePlayer();

  useEffect(() => {
    (async () => {
      loadRecordings();
    })();
  }, []);

  return (
    <GestureHandlerRootView>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: useThemeColor({}, "background"),
        }}
      >
        <FlatList
          data={recordings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Resume item={item} />
          )}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}