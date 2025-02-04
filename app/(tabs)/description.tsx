import React, { useEffect, useRef } from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";

import Resume from "../components/description/resume";
import usePlayer from "../contexts/playerContext";
import { useThemeColor } from "../hooks/useThemeColor";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

// Rendu du composant :

// Affiche la liste des enregistrements audio.

// Fonctions principales :

// useEffect : Charge les enregistrements audio au montage du composant.
// FlatList : Affiche la liste des enregistrements audio sous forme de composants Resume.

// TODO :

// Terminer le style comme sur le figma.
// Implémenter les données du dropdown pour indiquer la langue de la transcription.

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