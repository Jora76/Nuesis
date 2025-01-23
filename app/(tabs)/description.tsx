import { FlatList, View } from "react-native";
import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";

import Player from "../components/home/player";

export default function Description() {
  const [recordings, setRecordings] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      // Load existing recordings
      const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory || '');
      setRecordings(files.filter(file => file.endsWith('.m4a')));
    })();
  }, []);
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={recordings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Player item={item} />
        )}
      />
    </View>
  );
}