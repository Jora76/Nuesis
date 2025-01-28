import { FlatList, View } from "react-native";
import { useEffect, useState } from "react";

import Player from "../components/home/player";
import usePlayer from "../contexts/playerContext";
import { useThemeColor } from "../hooks/useThemeColor";

export default function Description() {
  const { recordings, loadRecordings } = usePlayer();

  useEffect(() => {
    (async () => {
      loadRecordings();
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: useThemeColor({}, "background"),
      }}
    >
      <View style={{ width: "100%", height: "80%" }}>
        <FlatList
          data={recordings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Player item={item} />
          )}
        />
      </View>
    </View>
  );
}