import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Button, FlatList, Pressable, View, Text } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

import { useEffect, useState } from "react";

export default function Index() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordings, setRecordings] = useState<string[]>([]);

  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access microphone is required!");
      }

      // Load existing recordings
      const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory || '');
      setRecordings(files.filter(file => file.endsWith('.m4a')));
    })();
  }, [recordings]);

  const toggleRecording = async () => {
    if (isRecording) {
      console.log("Stopping recording..");
      setRecording(null);
      await recording?.stopAndUnloadAsync();
      const uri = recording?.getURI();
      const newUri = `${FileSystem.documentDirectory}recording-${Date.now()}.m4a`;
      await FileSystem.moveAsync({
        from: uri!,
        to: newUri,
      });
      setRecordings([...recordings, newUri]);
      console.log("Recording stopped and stored at", newUri);
    } else {
      try {
        console.log("Requesting permissions..");
        // await Audio.requestPermissionsAsync();
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== "granted") {
          alert("Permission to access microphone is required!");
        }
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        console.log("Starting recording..");
        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HighQuality
        );
        setRecording(recording);
        console.log("Recording started");
      } catch (err) {
        console.error("Failed to start recording", err);
      }
    }
    setIsRecording(!isRecording);
  }

  const playRecording = async (uri: string) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    await sound.playAsync();
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        onPress={toggleRecording}
        // onPressIn={startRecording}
        // onPressOut={stopRecording}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white'
          },
          {
            padding: 10,
            borderRadius: 5,
          }
        ]}
      >
        <MaterialIcons size={28} name="mic" />
      </Pressable>
      <FlatList
        data={recordings}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item}</Text>
            <Button title="Play" onPress={() => playRecording(`${FileSystem.documentDirectory}${item}`)} />
          </View>
        )}
      />

    </View>
  );
}
