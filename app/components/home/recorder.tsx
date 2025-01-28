import { useState } from "react";
import { Pressable } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

import usePlayer from "@/app/contexts/playerContext";
import { useThemeColor } from "@/app/hooks/useThemeColor";

export default function Recorder() {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);

    const { sendRecording, loadRecordings } = usePlayer();

    const [isRecording, setIsRecording] = useState(false);

    const toggleRecording = async () => {
        if (isRecording) {
            console.log("Stopping recording..");
            await recording?.stopAndUnloadAsync();
            const uri = recording?.getURI();
            console.log("Recording stopped and stored at", uri);
            const newUri = `${FileSystem.documentDirectory}recording-${Date.now()}.m4a`;
            await FileSystem.moveAsync({
                from: uri!,
                to: newUri,
            });
            // Convert the recording to base64
            if (uri && sendRecording) {
                sendRecording(uri);
            }
            loadRecordings();
        } else {
            try {

                console.log("Requesting permissions..");
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
                    Audio.RecordingOptionsPresets.HIGH_QUALITY
                );
                setRecording(recording);
                console.log("Recording started");
            } catch (err) {
                console.error("Failed to start recording", err);
            }
        }
        setIsRecording(!isRecording);
    }

    return (
        <Pressable
            onPress={toggleRecording}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? 'white' : 'transparent',
                    borderColor: useThemeColor({}, 'icon'),
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 100,
                    width: 200,
                    height: 200,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            ]}
        >
            <MaterialIcons size={150} name="mic" color={'purple'} />
        </Pressable>
    )

}
