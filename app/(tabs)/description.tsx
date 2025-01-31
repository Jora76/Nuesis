import React, { useEffect, useRef } from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";

// import Player from "../components/home/player";
import Resume from "../components/description/resume";
import usePlayer from "../contexts/playerContext";
import { useThemeColor } from "../hooks/useThemeColor";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

export default function Description() {
  const { recordings, loadRecordings } = usePlayer();

  const scrollRef = useRef<FlatList>(null);

  useEffect(() => {
    (async () => {
      loadRecordings();
    })();
  }, []);

  return (
    <GestureHandlerRootView>
      <View style={{ backgroundColor: useThemeColor({}, "background"), flex: 1 }}>
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            maxHeight: '93%'
          }}
        >
          <FlatList
            ref={scrollRef}
            data={recordings}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <Resume item={item} index={index} scrollRef={scrollRef} />
            )}
          />
        </SafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
}