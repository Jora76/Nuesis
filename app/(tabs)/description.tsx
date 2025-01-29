import { FlatList, View, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";

import Player from "../components/home/player";
import Resume from "../components/description/resume";
import usePlayer from "../contexts/playerContext";
import { useThemeColor } from "../hooks/useThemeColor";

export default function Description() {
  const { recordings, loadRecordings } = usePlayer();
  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
  });

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
      <View
        style={{ width: "100%", height: "80%" }}
        onLayout={(event) => setLayout(event.nativeEvent.layout)}
      >
        <FlatList
          data={recordings}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            // <Player item={item} />
            <Resume item={item} />
          )
          }
          contentContainerStyle={styles.flatList}

        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flatList: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  }
});